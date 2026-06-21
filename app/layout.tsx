import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Elimux - Discover courses & institutions across Africa",
  description:
    "Elimux helps students discover verified institutions and courses using real data. By AfriBot AI, an Afribot Ventures Limited brand.",
  metadataBase: new URL("https://elimux.app"),
  openGraph: {
    title: "Elimux",
    description:
      "Discover verified institutions and courses across Africa with real data.",
    siteName: "Elimux",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}



