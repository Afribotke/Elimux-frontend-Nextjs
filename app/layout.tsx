import "./globals.css";

export const metadata = {
  title: "ElimuX",
  description: "AI‑powered course discovery for Africa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
