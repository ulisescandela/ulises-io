// src/app/contacto/page.js
import Header from '@/components/layout/Header';

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
                <strong>Email:</strong> [Tu email aquí, por ejemplo: ulises@example.com]
              </li>
              <li>
                <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/tu-perfil" className="text-blue-400 hover:underline">linkedin.com/in/ulises</a>
              </li>
              <li>
                <strong>GitHub:</strong> <a href="https://github.com/tu-usuario" className="text-blue-400 hover:underline">github.com/ulisescandela</a>
              </li>
              <li>
                <strong>Twitter/X:</strong> <a href="https://twitter.com/tu-usuario" className="text-blue-400 hover:underline">@ulises</a>
              </li>
            </ul>
            <p className="mt-6">
              También puedes dejar un comentario en cualquiera de mis posts del blog.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}