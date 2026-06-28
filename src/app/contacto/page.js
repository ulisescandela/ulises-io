// src/app/contacto/page.js
import Header from '@/components/layout/Header';

export const metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con Ulises Rodríguez Candela a través de email, LinkedIn o Twitter.',
  alternates: {
    canonical: 'https://ulises.io/contacto',
  },
  openGraph: {
    title: 'Contacto - Ulises.io',
    description: 'Ponte en contacto con Ulises Rodríguez Candela a través de email, LinkedIn o Twitter.',
    url: 'https://ulises.io/contacto',
    siteName: 'Ulises.io',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-16 w-screen text-center text-white font-sans min-h-screen">
        <section className="mb-16 px-16 mx-16 text-white">
          <h1 className="text-5xl font-bold mb-8">Contacto</h1>
          <div className="max-w-2xl mx-auto text-left">
            <p className="text-lg mb-6">
              ¿Quieres ponerte en contacto conmigo? Puedes encontrarme en las siguientes plataformas:
            </p>
            <ul className="space-y-4">
              <li>
                <strong>Email:</strong> contacto@miniprofe.com
              </li>
              <li>
                <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/ulisescandela/" className="text-blue-400 hover:underline">linkedin.com/in/ulisescandela/</a>
              </li>
              <li>
                <strong>Twitter/X:</strong> <a href="https://x.com/UlisesCandela" className="text-blue-400 hover:underline">@UlisesCandela</a>
              </li>
            </ul>
            {/* <p className="mt-6">
              También puedes dejar un comentario en cualquiera de mis posts del blog.
            </p> */}
          </div>
        </section>
      </main>
    </>
  );
}