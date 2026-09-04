"use client";

import { useEffect, useState } from "react";

// Botón flotante para volver arriba. Aparece cuando el lector ha bajado lo
// suficiente y facilita seguir explorando sin fatigar el scroll.
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-zinc-200 backdrop-blur-md shadow-[0_8px_30px_-8px_rgba(37,99,235,0.6)] transition-all duration-300 hover:bg-blue-600/30 hover:border-blue-400/50 hover:text-white ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
      }`}
    >
      <span aria-hidden className="text-lg leading-none">↑</span>
    </button>
  );
}
