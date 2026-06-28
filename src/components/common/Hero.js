import Link from "next/link";

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
          Aprende sobre{" "}
          <span className="text-gradient">Programación y Tecnología</span>
        </h1>

        <p className="text-lg md:text-2xl py-6 text-zinc-400 max-w-[42ch] text-center">
          Guías, consejos y reflexiones para crecer como desarrollador. Todo en un mismo lugar.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link href="/blog" className="btn-primary" aria-label="Ver el blog">
            Explorar el blog
            <span aria-hidden>→</span>
          </Link>
          <Link href="/about" className="btn-ghost" aria-label="Conocer más sobre mí">
            Sobre mí
          </Link>
        </div>
      </div>
    </section>
  );
}
