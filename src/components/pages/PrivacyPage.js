import Header from '@/components/layout/Header';

export default function PrivacyPage({ language = "es" }) {
  return (
    <>
      <Header language={language} />
      <main className="pt-16 w-screen text-center text-slate-900 font-sans min-h-screen">
        <section className="mb-16 px-4 sm:px-6 max-w-5xl mx-auto py-12 text-slate-900">
          <h1 className="text-5xl font-bold mb-8">{language === "en" ? "Privacy Policy" : "Política de Privacidad"}</h1>
          <div className="max-w-4xl mx-auto text-left text-lg">
            <p className="mb-4">
              {language === "en" ? "This privacy policy describes how we collect, use and protect your information when you visit our website." : "Esta política de privacidad describe cómo recopilamos, usamos y protegemos tu información cuando visitas nuestro sitio web."}
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-4">{language === "en" ? "Information we collect" : "Información que recopilamos"}</h2>
            <p className="mb-4">
              {language === "en" ? "We may collect personal information such as your name, email address and other information you voluntarily provide through contact forms or comments." : "Podemos recopilar información personal como tu nombre, dirección de correo electrónico y otra información que nos proporciones voluntariamente a través de formularios de contacto o comentarios."}
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-4">{language === "en" ? "How we use information" : "Uso de la información"}</h2>
            <p className="mb-4">
              {language === "en" ? "We use the information collected to respond to your inquiries, improve our website and provide relevant content." : "Utilizamos la información recopilada para responder a tus consultas, mejorar nuestro sitio web y proporcionarte contenido relevante."}
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-4">Cookies</h2>
            <p className="mb-4">
              {language === "en" ? "Our website uses cookies to improve the user experience. You can manage cookie preferences in your browser." : "Nuestro sitio utiliza cookies para mejorar la experiencia del usuario. Puedes gestionar las preferencias de cookies en tu navegador."}
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-4">{language === "en" ? "Third-party links" : "Enlaces a terceros"}</h2>
            <p className="mb-4">
              {language === "en" ? "This website may contain links to third-party websites. We are not responsible for their privacy practices." : "Este sitio puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad de estos sitios."}
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-4">{language === "en" ? "Changes to this policy" : "Cambios a esta política"}</h2>
            <p className="mb-4">
              {language === "en" ? "We may update this privacy policy at any time. We recommend reviewing it periodically." : "Podemos actualizar esta política de privacidad en cualquier momento. Te recomendamos revisarla periódicamente."}
            </p>

            <p className="mt-6">
              {language === "en" ? "If you have questions about this policy, get in touch through our contact page." : "Si tienes preguntas sobre esta política, contáctanos a través de nuestra página de contacto."}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}