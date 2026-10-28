import Header from '@/components/layout/Header';

export default function ContactPage({ language = "es" }) {
  return (
    <>
      <Header language={language} />
      <main className="pt-16 w-screen text-center text-slate-900 font-sans min-h-screen">
        <section className="mb-16 px-4 sm:px-6 max-w-5xl mx-auto py-12 text-slate-900">
          <h1 className="text-5xl font-bold mb-8">{language === "en" ? "Contact" : "Contacto"}</h1>
          <div className="max-w-2xl mx-auto text-left">
            <p className="text-lg mb-6">
              {language === "en" ? "Want to get in touch? You can find me on the following platforms:" : "¿Quieres ponerte en contacto conmigo? Puedes encontrarme en las siguientes plataformas:"}
            </p>
            <ul className="space-y-4">
              <li>
                <strong>Email:</strong> <a href="mailto:contacto@ulises.io" className="text-blue-600 hover:underline">contacto@ulises.io</a>
              </li>
              <li>
                <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/ulisescandela/" className="text-blue-600 hover:underline">linkedin.com/in/ulisescandela/</a>
              </li>
              <li>
                <strong>Twitter/X:</strong> <a href="https://x.com/UlisesCandela" className="text-blue-600 hover:underline">@UlisesCandela</a>
              </li>
            </ul>

          </div>
        </section>
      </main>
    </>
  );
}