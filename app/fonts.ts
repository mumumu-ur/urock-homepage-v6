import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

export const pretendard = localFont({
  src: [
    { path: "./fonts/Pretendard-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Pretendard-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/Pretendard-SemiBold.otf", weight: "600", style: "normal" },
    { path: "./fonts/Pretendard-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-pretendard-next",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const spoqa = localFont({
  src: [
    { path: "./fonts/SpoqaHanSansNeo-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/SpoqaHanSansNeo-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/SpoqaHanSansNeo-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-spoqa-next",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});
