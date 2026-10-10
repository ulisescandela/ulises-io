import RootDocument from '@/components/layout/RootDocument';

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
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: "Ulises.io | Blog" }],
    },
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

export default function SpanishLayout({ children }) {
  return <RootDocument lang="es">{children}</RootDocument>;
}
