import Link from "next/link";

const LINKS = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Blog',
    href: '/blog'
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
    <div className="flex flex-row justify-between items-center px-24 py-3 mb-4 border-b fixed w-full bg-white/5 backdrop-blur-md backdrop-saturate-125 border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 text-left z-50">
      {children}
    </div>
  );
}

function Logo() {
  return (
    <Link href="/">
      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
        ulises.io
      </span>
    </Link>
  );
}

function NavLinks() {
  return (
    <nav className="flex text-white items-center space-x-6">
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href} className="hover:text-blue-600 transition-colors">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}