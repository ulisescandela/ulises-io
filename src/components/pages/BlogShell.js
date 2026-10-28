import Header from '@/components/layout/Header';

export default function BlogShell({ children, language = 'es' }) {
  return <><Header language={language} /><main className="pt-18 text-slate-900">{children}</main></>;
}
