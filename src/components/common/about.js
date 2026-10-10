import Link from 'next/link';

export default function About() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-left text-white">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Soy Ulises Rodríguez Candela</h1>
      <p className="text-xl text-zinc-300 leading-relaxed mb-6">Desarrollo software y trabajo en seguridad de la información. Aquí comparto lo que aprendo construyendo aplicaciones, automatizando procesos y avanzando en mi carrera.</p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">De dónde vienen estas guías</h2>
      <p className="text-zinc-400 leading-relaxed">Mi experiencia incluye herramientas internas de seguridad con Python, Django y Flask, integraciones de APIs y automatización con ServiceNow. He trabajado en John Deere, HandCloud y Quickapps. Puedes consultar los detalles de mi trayectoria en mi CV.</p>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Un proyecto que puedes explorar</h2>
      <p className="text-zinc-400 leading-relaxed mb-4">Este blog está construido con Next.js, React y artículos en Markdown. Puedes revisar el código y leer lo que aprendí durante su desarrollo.</p>
      <div className="flex flex-wrap gap-4">
        <a href="https://github.com/ulisescandela/ulises-io" className="text-blue-300 hover:text-white underline underline-offset-4">Código de Ulises.io</a>
        <Link href="/blog/mi-aprendizaje-hasta-ahora-con-este-blog" className="text-blue-300 hover:text-white underline underline-offset-4">Mi aprendizaje construyendo el blog</Link>
      </div>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Qué encontrarás aquí</h2>
      <p className="text-zinc-400 leading-relaxed mb-8">Rutas para aprender a programar, proyectos para tu portafolio y reflexiones sobre cómo trabajar con IA. Si es tu primera visita, empieza por el objetivo que quieres conseguir.</p>
      <div className="flex flex-wrap gap-4">
        <Link href="/empieza-aqui" className="btn-primary">Empieza aquí <span aria-hidden>→</span></Link>
        <Link href="/cv" className="btn-ghost">Ver CV</Link>
        <Link href="/contacto" className="btn-ghost">Contacto</Link>
      </div>
    </section>
  );
}
