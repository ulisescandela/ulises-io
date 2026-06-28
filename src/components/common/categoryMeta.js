import { FiBriefcase, FiCode, FiTool, FiCpu, FiFeather, FiHash } from "react-icons/fi";

// Metadatos visuales por categoría: icono, color de acento (clases Tailwind
// literales para que no las purgue el build) y una descripción corta.
export const CATEGORY_META = {
  Carrera: {
    icon: FiBriefcase,
    desc: "Crecimiento profesional, entrevistas y soft skills",
    iconClass: "bg-blue-500/15 text-blue-300",
    hoverBorder: "hover:!border-blue-400/50",
  },
  Programación: {
    icon: FiCode,
    desc: "Lenguajes, lógica y buenas prácticas",
    iconClass: "bg-purple-500/15 text-purple-300",
    hoverBorder: "hover:!border-purple-400/50",
  },
  Herramientas: {
    icon: FiTool,
    desc: "Git, terminal y productividad",
    iconClass: "bg-emerald-500/15 text-emerald-300",
    hoverBorder: "hover:!border-emerald-400/50",
  },
  IA: {
    icon: FiCpu,
    desc: "Inteligencia artificial y su impacto",
    iconClass: "bg-cyan-500/15 text-cyan-300",
    hoverBorder: "hover:!border-cyan-400/50",
  },
  Reflexiones: {
    icon: FiFeather,
    desc: "Ideas, mentalidad y experiencias",
    iconClass: "bg-amber-500/15 text-amber-300",
    hoverBorder: "hover:!border-amber-400/50",
  },
};

const FALLBACK = {
  icon: FiHash,
  desc: "Artículos del blog",
  iconClass: "bg-zinc-500/15 text-zinc-300",
  hoverBorder: "hover:!border-zinc-400/50",
};

export function getCategoryMeta(category) {
  return CATEGORY_META[category] || FALLBACK;
}
