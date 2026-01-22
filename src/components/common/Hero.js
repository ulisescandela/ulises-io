

export default function Hero() {
  return (
    // Gradiente background with title and subtitle centered
    <section 
      className="py-50 px-10 lg:px-35"
    >
      <h1 className="font-bold md:text-7xl text-balance text-center max-w-[20ch] mx-auto md:leading-[1.16] text-5xl">
        Aprende sobre <span className="text-blue-500">Programación y Tecnología</span>
      </h1>
      <p className="text-2xl tracking-wider py-4 text-zinc-300">
        Todo en un mismo lugar
      </p>
    </section>
    // <section className="mb-16">
    //   <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
    //     Ulises Rodríguez Candela
    //   </h1>
    //   <p className="text-lg text-gray-900 mb-4 leading-relaxed">
    //     ¡Hola! 👋🏻 Soy Ulises, una persona normal con curiosidad constante sobre áreas multidisciplinarias.
    //   </p>
    //   <p className="text-lg text-gray-900 leading-relaxed">
    //     Me gusta aprender y compartir lo que aprendo, por eso creo este blog.
    //   </p>
    // </section>
  );
}