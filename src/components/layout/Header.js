"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Blog',
    href: '/blog'
  },
  {
    label: 'Sobre mí',
    href: '/about'
  },
  {
    label: 'Contacto',
    href: '/contacto'
  },
  {
    label: 'Privacidad',
    href: '/privacy'
  }
]

export default function Header() {
  return (
    <GlassBackground>

      <Logo />
      
      <NavLinks />
      
    </GlassBackground>
  );
}

function GlassBackground({ children }) {
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      {/* Capa de cristal líquido: blur + saturación + degradado translúcido */}
      <div className="absolute inset-0 -z-10 backdrop-blur-2xl backdrop-saturate-200 bg-gradient-to-b from-white/[0.14] to-white/[0.05] border-b border-white/15 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]" />
      {/* Brillo superior tipo reflejo de cristal */}
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-row justify-between items-center px-4 sm:px-6 lg:px-8 py-3.5">
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" scroll={false} className="shrink-0">
      <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
        ulises.io
      </span>
    </Link>
  );
}

function NavLinks() {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Main navigation"
      className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base"
    >
      {LINKS.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-blue-400 after:transition-all ${
              active
                ? "text-white after:w-full"
                : "text-zinc-300 hover:text-white after:w-0 hover:after:w-full"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}