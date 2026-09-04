"use client";

import { useEffect, useRef, useState } from "react";

// Tabla de contenidos plegable con "scroll-spy": resalta la sección que el
// lector tiene en pantalla y le permite saltar a cualquier apartado. Mejora
// mucho la navegación en artículos largos y el tiempo de permanencia.
export default function TableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState(null);
  // En móvil arranca plegada para no empujar el contenido; en escritorio abierta.
  const [open, setOpen] = useState(true);
  const clickLockRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 767px)").matches) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!headings.length) return;

    const ids = headings.map((h) => h.id);
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLockRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length < 3) return null;

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // Bloquea el scroll-spy un instante para que el resalte no parpadee.
    clickLockRef.current = true;
    setActiveId(id);
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
    if (history && history.replaceState) history.replaceState(null, "", `#${id}`);
    window.setTimeout(() => {
      clickLockRef.current = false;
    }, 700);
  };

  return (
    <nav
      aria-label="Tabla de contenidos"
      className="glass-card rounded-2xl p-5 my-8 not-prose"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-200">
          <span className="h-4 w-1 rounded-full bg-gradient-to-b from-blue-400 to-purple-500" />
          En este artículo
        </span>
        <span
          className={`text-zinc-400 text-xs transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          ▼
        </span>
      </button>

      {open && (
        <ol className="mt-4 space-y-1.5 text-sm">
          {headings.map((h) => {
            const active = activeId === h.id;
            return (
              <li key={h.id} className={h.depth === 3 ? "ml-4" : ""}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleClick(e, h.id)}
                  className={`block border-l-2 py-1 pl-3 transition-colors ${
                    active
                      ? "border-blue-400 text-white font-medium"
                      : "border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-600"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ol>
      )}
    </nav>
  );
}
