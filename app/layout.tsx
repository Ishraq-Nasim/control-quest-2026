import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Control Quest 2026",
  description:
    "Control Quest 2026: a five-day controls learning event at Unilever Bangladesh's Corporate Office, and Ishraq Nasim's part in organising it.",
};

export const viewport: Viewport = {
  themeColor: "#0b3d24",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
