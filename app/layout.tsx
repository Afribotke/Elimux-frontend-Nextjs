import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ElimuX",
  description: "Unified education management platform",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
