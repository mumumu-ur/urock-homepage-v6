"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@workspace/ui/components/button";
import InputText from "@workspace/ui/components/input/input-text";
import { Textarea } from "@workspace/ui/components/textarea";
import { validateContactFields } from "@/lib/contact/schema";

type Fields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

const EMPTY: Fields = { name: "", email: "", company: "", phone: "", message: "" };
type Status = "idle" | "submitting" | "success" | "error";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12.5,
  letterSpacing: "0.04em",
  color: "rgb(var(--brand-muted) / 0.7)",
  marginBottom: 8,
};
const errorStyle: React.CSSProperties = { color: "#FF8A8A", fontSize: 12, marginTop: 6 };

export function ContactForm() {
  const t = useTranslations("contact");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAt = useMemo(() => Date.now(), []);

  const errorMessage = (code?: string) => {
    switch (code) {
      case "required":
        return t("required");
      case "invalidEmail":
        return t("invalidEmail");
      case "tooShort":
        return t("tooShort");
      default:
        return code ? t("required") : undefined;
    }
  };

  const setField = (key: keyof Fields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validateContactFields(fields);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...fields,
          company_website: honeypotRef.current?.value ?? "",
          startedAt,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setFields(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="cC-mono"
        role="status"
        style={{
          border: "1px solid rgb(109 231 239 / 0.4)",
          background: "rgb(109 231 239 / 0.06)",
          borderRadius: 4,
          padding: "28px 24px",
          color: "var(--brand-accent-bright)",
          fontSize: 14,
          lineHeight: 1.7,
        }}
      >
        {t("success")}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Honeypot: hidden from users, tempting to bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Company website
          <input ref={honeypotRef} type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label htmlFor="cf-name" style={labelStyle}>
            {t("name")} *
          </label>
          <InputText id="cf-name" className="w-full" value={fields.name} onChange={(e) => setField("name", e.target.value)} />
          {errors.name && <div style={errorStyle}>{errorMessage(errors.name)}</div>}
        </div>
        <div>
          <label htmlFor="cf-email" style={labelStyle}>
            {t("email")} *
          </label>
          <InputText id="cf-email" type="email" className="w-full" value={fields.email} onChange={(e) => setField("email", e.target.value)} />
          {errors.email && <div style={errorStyle}>{errorMessage(errors.email)}</div>}
        </div>
        <div>
          <label htmlFor="cf-company" style={labelStyle}>
            {t("company")}
          </label>
          <InputText id="cf-company" className="w-full" value={fields.company} onChange={(e) => setField("company", e.target.value)} />
        </div>
        <div>
          <label htmlFor="cf-phone" style={labelStyle}>
            {t("phone")}
          </label>
          <InputText id="cf-phone" type="tel" className="w-full" value={fields.phone} onChange={(e) => setField("phone", e.target.value)} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" style={labelStyle}>
          {t("message")} *
        </label>
        <Textarea
          id="cf-message"
          className="w-full"
          rows={6}
          value={fields.message}
          onChange={(e) => setField("message", e.target.value)}
        />
        {errors.message && <div style={errorStyle}>{errorMessage(errors.message)}</div>}
      </div>

      {status === "error" && (
        <div role="alert" style={{ ...errorStyle, marginTop: 0 }}>
          {t("error")}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <Button type="submit" variant="filled" color="primary" size="L" loading={status === "submitting"}>
          {status === "submitting" ? t("sending") : t("submit")}
        </Button>
        <span className="cC-mono" style={{ fontSize: 11, color: "rgb(var(--brand-muted) / 0.5)" }}>
          {t("privacyNote")}
        </span>
      </div>
    </form>
  );
}
