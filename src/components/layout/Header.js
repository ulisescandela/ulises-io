"use client";

import Link from "next/link";
import translationMap from "../../../lib/translation-map.json";
import { pagePaths, translateCategory, sourceCategory, translateTag, tagTranslations } from "../../../lib/locales";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { label: 'Home', english: 'Home', page: 'home' },
  { label: 'Blog', english: 'Blog', page: 'blog' },
  { label: 'Sobre mí', english: 'About me', page: 'about' },
  { label: 'Contacto', english: 'Contact', page: 'contact' },
  { label: 'Privacidad', english: 'Privacy', page: 'privacy' },
];

function counterpart(pathname, language) {
  for (const paths of Object.values(pagePaths)) if (pathname === paths[language]) return paths[language === 'en' ? 'es' : 'en'];
  if (language === 'es' && pathname.startsWith('/blog/categoria/')) return '/en/category/' + encodeURIComponent(translateCategory(decodeURIComponent(pathname.slice('/blog/categoria/'.length))));
  if (language === 'en' && pathname.startsWith('/en/category/')) return '/blog/categoria/' + encodeURIComponent(sourceCategory(decodeURIComponent(pathname.slice('/en/category/'.length))));
  if (language === 'es' && pathname.startsWith('/blog/tag/')) return '/en/tag/' + encodeURIComponent(translateTag(decodeURIComponent(pathname.slice('/blog/tag/'.length))));
  if (language === 'en' && pathname.startsWith('/en/tag/')) { const tag = decodeURIComponent(pathname.slice('/en/tag/'.length)); return '/blog/tag/' + encodeURIComponent(Object.keys(tagTranslations).find(key => tagTranslations[key] === tag) || tag); }
  if (language === 'es' && pathname.startsWith('/blog/')) { const translated = translationMap[pathname.slice(6)]; if (translated) return `/en/${translated.slug}`; }
  if (language === 'en' && pathname.startsWith('/en/')) { const source = Object.keys(translationMap).find(key => translationMap[key].slug === pathname.slice(4)); if (source) return `/blog/${source}`; }
  return pagePaths.home[language === 'en' ? 'es' : 'en'];
}

export default function Header({ language = "es" }) {
  return (
    <GlassBackground>

      <Logo language={language} />
      
      <NavLinks language={language} />
      
    </GlassBackground>
  );
}

function GlassBackground({ children }) {
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      {/* Fondo claro con transparencia y desenfoque sutil. */}
      <div className="absolute inset-0 -z-10 backdrop-blur-md bg-white/85 border-b border-slate-200 shadow-[0_8px_30px_-16px_rgba(15,30,80,0.25)]" />
      {/* Brillo superior tipo reflejo de cristal */}
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

      <div className="max-w-6xl mx-auto flex gap-3 justify-between items-center px-4 sm:px-6 lg:px-8 py-3.5">
        {children}
      </div>
    </div>
  );
}

function Logo({ language }) {
  return (
    <Link href={language === "en" ? "/en" : "/"} scroll={false} className="shrink-0">
      <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent leading-tight">
        ulises.io
      </span>
    </Link>
  );
}

function NavLinks({ language }) {
  const pathname = usePathname();
  const links = LINKS.map(link => ({ label: language === 'en' ? link.english : link.label, href: pagePaths[link.page][language] }));
  links.push({ label: language === 'en' ? 'Español' : 'English', href: counterpart(pathname, language) });

  const englishBlogPage = language === 'en' && (
    pathname === '/en/blog' || pathname.startsWith('/en/category/') || pathname.startsWith('/en/tag/') ||
    Object.values(translationMap).some(post => pathname === `/en/${post.slug}`)
  );
  const isActive = href => {
    if (href === '/' || href === '/en') return pathname === href;
    if (href === '/en/blog') return englishBlogPage;
    return pathname.startsWith(href);
  };

  const [open, setOpen] = useState(false);
  const label = language === "en" ? "Main navigation" : "Navegación principal";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? (language === "en" ? "Close menu" : "Cerrar menú") : (language === "en" ? "Open menu" : "Abrir menú")}
        className="md:hidden grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-800"
      >
        <span aria-hidden className="text-xl leading-none">{open ? "✕" : "☰"}</span>
      </button>

      <nav
        id="mobile-menu"
        aria-label={label}
        className={`${open ? "flex" : "hidden"} md:flex absolute md:static top-full inset-x-0 flex-col md:flex-row md:items-center gap-1 md:gap-5 bg-white md:bg-transparent border-b border-slate-200 md:border-0 shadow-lg md:shadow-none px-4 py-3 md:p-0 text-base md:text-sm`}
      >
        {links.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`transition-colors rounded-lg px-3 py-3 md:p-0 md:rounded-none md:relative md:after:absolute md:after:left-0 md:after:-bottom-1 md:after:h-px md:after:bg-blue-600 md:after:transition-all ${
                active
                  ? "text-blue-700 font-medium bg-blue-50 md:bg-transparent md:after:w-full"
                  : "text-slate-700 hover:text-blue-700 hover:bg-slate-50 md:hover:bg-transparent md:after:w-0 md:hover:after:w-full"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
