import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import { ApiProvider } from "@/providers/ApiProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApiProvider>
          <SessionProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </SessionProvider>
        </ApiProvider>
      </body>
    </html>
  );
}
