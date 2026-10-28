"use client";

import { useEffect, useState } from "react";

// Botón flotante para volver arriba. Aparece cuando el lector ha bajado lo
// suficiente y facilita seguir explorando sin fatigar el scroll.
export default function ScrollToTop({ language = "es" }) {
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
      aria-label={language === "en" ? "Back to top" : "Volver arriba"}
      className={`fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-slate-100 text-slate-900 backdrop-blur-sm shadow-[0_8px_30px_-8px_rgba(37,99,235,0.2)] transition-all duration-300 hover:bg-blue-600/30 hover:border-blue-400/50 hover:text-blue-700 ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
      }`}
    >
      <span aria-hidden className="text-lg leading-none">↑</span>
    </button>
  );
}
