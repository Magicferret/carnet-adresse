// src/app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"; // Ajoutez cet import
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" title="Carnet d'adresses">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
