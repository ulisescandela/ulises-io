// src/app/privacy/page.js
import Header from '@/components/layout/Header';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-16 w-screen text-center text-white font-sans min-h-screen">
        <section className="mb-16 px-16 mx-16 text-white">
          <h1 className="text-5xl font-bold mb-8">Política de Privacidad</h1>
          <div className="max-w-4xl mx-auto text-left text-lg">
            <p className="mb-4">
              Esta política de privacidad describe cómo recopilamos, usamos y protegemos tu información cuando visitas nuestro sitio web.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-4">Información que recopilamos</h2>
            <p className="mb-4">
              Podemos recopilar información personal como tu nombre, dirección de correo electrónico y otra información que nos proporciones voluntariamente a través de formularios de contacto o comentarios.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-4">Uso de la información</h2>
            <p className="mb-4">
              Utilizamos la información recopilada para responder a tus consultas, mejorar nuestro sitio web y proporcionarte contenido relevante.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-4">Cookies</h2>
            <p className="mb-4">
              Nuestro sitio utiliza cookies para mejorar la experiencia del usuario. Puedes gestionar las preferencias de cookies en tu navegador.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-4">Enlaces a terceros</h2>
            <p className="mb-4">
              Este sitio puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad de estos sitios.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-4">Cambios a esta política</h2>
            <p className="mb-4">
              Podemos actualizar esta política de privacidad en cualquier momento. Te recomendamos revisarla periódicamente.
            </p>

            <p className="mt-6">
              Si tienes preguntas sobre esta política, contáctanos a través de nuestra página de contacto.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}