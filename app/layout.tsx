import "./globals.css";
import "./concept-c.css";
import type { ReactNode } from "react";

// Pass-through root layout. The <html>/<body> shell is rendered by the
// locale-aware layout at app/[locale]/layout.tsx (next-intl pattern).
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
