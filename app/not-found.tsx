import Link from "next/link";

// Global fallback for routes outside any locale. Renders its own <html> because
// the root layout is a pass-through (the locale layout owns the normal shell).
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0F0E17", color: "#F5F7FA", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "120px 32px", textAlign: "center" }}>
          <h1 style={{ fontSize: 34, fontWeight: 700 }}>Page not found</h1>
          <p style={{ color: "rgba(217,223,238,.6)" }}>The page you requested does not exist.</p>
          <Link href="/ko" style={{ color: "#6DE7EF" }}>
            ← Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
