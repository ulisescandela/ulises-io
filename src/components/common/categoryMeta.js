import { sourceCategory } from "../../../lib/locales";
import { FiBriefcase, FiCode, FiTool, FiCpu, FiFeather, FiHash } from "react-icons/fi";

// Metadatos visuales por categoría: icono, color de acento (clases Tailwind
// literales para que no las purgue el build) y una descripción corta.
export const CATEGORY_META = {
  Carrera: {
    icon: FiBriefcase,
    desc: "Crecimiento profesional, entrevistas y soft skills",
    iconClass: "bg-blue-500/10 text-blue-700",
    hoverBorder: "hover:!border-blue-400/50",
  },
  Programación: {
    icon: FiCode,
    desc: "Lenguajes, lógica y buenas prácticas",
    iconClass: "bg-purple-500/10 text-purple-700",
    hoverBorder: "hover:!border-purple-400/50",
  },
  Herramientas: {
    icon: FiTool,
    desc: "Git, terminal y productividad",
    iconClass: "bg-emerald-500/10 text-emerald-700",
    hoverBorder: "hover:!border-emerald-400/50",
  },
  IA: {
    icon: FiCpu,
    desc: "Inteligencia artificial y su impacto",
    iconClass: "bg-cyan-500/10 text-cyan-700",
    hoverBorder: "hover:!border-cyan-400/50",
  },
  Reflexiones: {
    icon: FiFeather,
    desc: "Ideas, mentalidad y experiencias",
    iconClass: "bg-amber-500/10 text-amber-700",
    hoverBorder: "hover:!border-amber-400/50",
  },
};

const FALLBACK = {
  icon: FiHash,
  desc: "Artículos del blog",
  iconClass: "bg-slate-500/10 text-slate-700",
  hoverBorder: "hover:!border-slate-400/50",
};

export function getCategoryMeta(category, language = "es") {
  const key = sourceCategory(category);
  const meta = { ...(CATEGORY_META[key] || FALLBACK), key };
  const descriptions = { Carrera: "Career growth, interviews and soft skills", Programación: "Languages, logic and best practices", Herramientas: "Git, terminal and productivity", IA: "Artificial intelligence and its impact", Reflexiones: "Ideas, mindset and experiences" };
  return language === "en" ? { ...meta, desc: descriptions[key] || "Blog articles" } : meta;
}
