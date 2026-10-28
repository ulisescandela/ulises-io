import Link from 'next/link';

export default function About({ language = "es" }) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-left text-slate-900">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">{language === "en" ? "I am Ulises Rodríguez Candela" : "Soy Ulises Rodríguez Candela"}</h1>
      <p className="text-xl text-slate-700 leading-relaxed mb-6">{language === "en" ? "I develop software and work in information security. Here I share what I learn while building applications, automating processes and advancing my career." : "Desarrollo software y trabajo en seguridad de la información. Aquí comparto lo que aprendo construyendo aplicaciones, automatizando procesos y avanzando en mi carrera."}</p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">{language === "en" ? "Where these guides come from" : "De dónde vienen estas guías"}</h2>
      <p className="text-slate-600 leading-relaxed">{language === "en" ? "My experience includes internal security tools with Python, Django and Flask, API integrations and automation with ServiceNow. I have worked at John Deere, HandCloud and Quickapps. You can find details of my experience in my CV." : "Mi experiencia incluye herramientas internas de seguridad con Python, Django y Flask, integraciones de APIs y automatización con ServiceNow. He trabajado en John Deere, HandCloud y Quickapps. Puedes consultar los detalles de mi trayectoria en mi CV."}</p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">{language === "en" ? "A project you can explore" : "Un proyecto que puedes explorar"}</h2>
      <p className="text-slate-600 leading-relaxed mb-4">{language === "en" ? "This blog is built with Next.js, React and Markdown articles. You can explore the code and read what I learned while developing it." : "Este blog está construido con Next.js, React y artículos en Markdown. Puedes revisar el código y leer lo que aprendí durante su desarrollo."}</p>
      <div className="flex flex-wrap gap-4">
        <a href="https://github.com/ulisescandela/ulises-io" className="text-blue-700 hover:text-blue-700 underline underline-offset-4">{language === "en" ? "Ulises.io source code" : "Código de Ulises.io"}</a>
        <Link href={language === "en" ? "/en/what-i-learned-building-this-blog" : "/blog/mi-aprendizaje-hasta-ahora-con-este-blog"} className="text-blue-700 hover:text-blue-700 underline underline-offset-4">{language === "en" ? "What I learned building the blog" : "Mi aprendizaje construyendo el blog"}</Link>
      </div>
      <h2 className="text-2xl font-semibold mt-10 mb-4">{language === "en" ? "What you will find here" : "Qué encontrarás aquí"}</h2>
      <p className="text-slate-600 leading-relaxed mb-8">{language === "en" ? "Paths to learn programming, projects for your portfolio and reflections on working with AI. If this is your first visit, start with the goal you want to achieve." : "Rutas para aprender a programar, proyectos para tu portafolio y reflexiones sobre cómo trabajar con IA. Si es tu primera visita, empieza por el objetivo que quieres conseguir."}</p>
      <div className="flex flex-wrap gap-4">
        <Link href={language === "en" ? "/en/start-here" : "/empieza-aqui"} className="btn-primary">{language === "en" ? "Start here" : "Empieza aquí"} <span aria-hidden>→</span></Link>
        <Link href={language === "en" ? "/en/cv" : "/cv"} className="btn-ghost">{language === "en" ? "View CV" : "Ver CV"}</Link>
        <Link href={language === "en" ? "/en/contact" : "/contacto"} className="btn-ghost">{language === "en" ? "Contact" : "Contacto"}</Link>
      </div>
    </section>
  );
}
