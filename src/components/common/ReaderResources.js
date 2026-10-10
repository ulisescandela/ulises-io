import TrackedLink from './TrackedLink';

export default function ReaderResources({ portfolio = false }) {
  return (
    <aside aria-label="Recursos para seguir aprendiendo" className="my-12 rounded-2xl border border-blue-400/20 bg-blue-600/10 p-6 sm:p-8 text-left">
      <h2 className="text-2xl font-bold text-zinc-100 mb-3">
        {portfolio ? 'Revisa tu portafolio antes de enviarlo' : 'Llévate una guía para tu próximo proyecto'}
      </h2>
      <p className="text-zinc-300 mb-6">Una checklist gratuita para revisar el problema, la demo, el README y las decisiones de tu proyecto.</p>
      <div className="flex flex-wrap gap-4">
        <TrackedLink href="/recursos/checklist-portafolio.txt" download eventName="resource_download" eventLabel="portfolio_checklist" className="btn-primary">Descargar checklist <span aria-hidden>↓</span></TrackedLink>
        <TrackedLink href="/rss.xml" eventName="rss_subscribe_click" eventLabel="reader_resources" className="btn-ghost">Seguir el blog por RSS</TrackedLink>
      </div>
      <p className="text-sm text-zinc-400 mt-4">Añade el enlace RSS a tu lector de feeds para recibir los nuevos artículos.</p>
    </aside>
  );
}
