"use client";

import Link from "next/link";
import translationMap from "../../../lib/translation-map.json";
import { pagePaths, translateCategory, sourceCategory, translateTag, tagTranslations } from "../../../lib/locales";
import { usePathname } from "next/navigation";

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
      {/* Fondo oscuro con transparencia y desenfoque sutil. */}
      <div className="absolute inset-0 -z-10 backdrop-blur-sm bg-[#020617]/95 border-b border-white/15 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]" />
      {/* Brillo superior tipo reflejo de cristal */}
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-between items-center px-4 sm:px-6 lg:px-8 py-3.5">
        {children}
      </div>
    </div>
  );
}

function Logo({ language }) {
  return (
    <Link href={language === "en" ? "/en" : "/"} scroll={false} className="shrink-0">
      <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
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

  return (
    <nav
      aria-label={language === "en" ? "Main navigation" : "Navegación principal"}
      className="flex items-center flex-wrap gap-3 sm:gap-5 text-xs sm:text-sm"
    >
      {links.map((link) => {
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