import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact/schema";

export const runtime = "nodejs";

// Best-effort in-memory rate limit (per warm instance).
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; ts: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

async function verifyTurnstile(token?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured -> skip
  if (!token) return false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      },
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function sendEmail(payload: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    // No delivery configured — log so the submission isn't lost in dev.
    console.info("[contact] submission (email delivery not configured):", payload);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject: `[UROCK] Contact — ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company ?? "-"}`,
        `Phone: ${payload.phone ?? "-"}`,
        "",
        payload.message,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend error: ${res.status}`);
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Spam layer 1: honeypot must be empty.
  if (data.company_website && data.company_website.length > 0) {
    return NextResponse.json({ ok: true }); // silently accept, don't send
  }

  // Spam layer 2: time-trap — submitted too fast to be human.
  if (data.startedAt && Date.now() - data.startedAt < 3000) {
    return NextResponse.json({ ok: true });
  }

  // Spam layer 3: CAPTCHA (if configured).
  const captchaOk = await verifyTurnstile(data.turnstileToken);
  if (!captchaOk) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
  }

  try {
    await sendEmail({
      name: data.name,
      email: data.email,
      company: data.company || undefined,
      phone: data.phone || undefined,
      message: data.message,
    });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
