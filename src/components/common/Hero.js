import TrackedLink from "./TrackedLink";

export default function Hero() {
  return (
    <section className="relative px-6 lg:px-10 pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Glow central detrás del titular */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 h-72 w-72 md:h-96 md:w-96 rounded-full bg-blue-600/20 blur-[120px]"
      />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="font-bold text-5xl md:text-7xl text-balance text-center max-w-[18ch] md:leading-[1.1] tracking-tight">
          Construye proyectos reales y{" "}
          <span className="text-gradient">avanza como desarrollador</span>
        </h1>

        <p className="text-lg md:text-2xl py-6 text-zinc-400 max-w-[42ch] text-center">
          Guías prácticas para aprender a programar, preparar tu portafolio y usar la IA con criterio.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <TrackedLink href="/empieza-aqui" className="btn-primary" eventName="start_here_click" eventLabel="hero">
            Empieza aquí
            <span aria-hidden>→</span>
          </TrackedLink>
          <TrackedLink href="/rss.xml" className="btn-ghost" eventName="rss_subscribe_click" eventLabel="hero">
            Seguir por RSS
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
