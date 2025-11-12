import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ulises Rodríguez Candela - Software Engineer",
  description: "Portfolio y blog personal de Ulises Rodríguez Candela. Especialista en desarrollo web, Python, JavaScript, Next.js y ciberseguridad.",
  keywords: ["Ulises Rodríguez", "Software Engineer", "Desarrollador", "Python", "JavaScript", "Next.js", "Portfolio"],
  authors: [{ name: "Ulises Rodríguez Candela" }],
  creator: "Ulises Rodríguez Candela",
  openGraph: {
    title: "Ulises Rodríguez Candela - Software Engineer",
    description: "Portfolio y blog personal de Ulises Rodríguez Candela",
    url: "https://ulises.io",
    siteName: "Ulises.io",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`bg-[#020617] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
