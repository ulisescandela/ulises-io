import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://ulises.io"),
  title: {
    default: "Ulises Rodríguez Candela - Software Engineer",
    template: "%s | Ulises.io",
  },
  description: "Portfolio y blog personal de Ulises Rodríguez Candela. Especialista en desarrollo web, Python, JavaScript, Next.js y ciberseguridad.",
  keywords: ["Ulises Rodríguez", "Software Engineer", "Desarrollador", "Python", "JavaScript", "Next.js", "Portfolio"],
  authors: [{ name: "Ulises Rodríguez Candela" }],
  creator: "Ulises Rodríguez Candela",
  alternates: {
    canonical: "https://ulises.io",
  },
  openGraph: {
    title: "Ulises Rodríguez Candela - Software Engineer",
    description: "Portfolio y blog personal de Ulises Rodríguez Candela",
    url: "https://ulises.io",
    siteName: "Ulises.io",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ulises Rodríguez Candela - Software Engineer",
    description: "Portfolio y blog personal de Ulises Rodríguez Candela",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="es">
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`bg-[#020617] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
