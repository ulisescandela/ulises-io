import TrackedLink from './TrackedLink';

export default function ReaderResources({ portfolio = false, language = "es" }) {
  const en = language === "en";
  return (
    <aside aria-label={en ? "Keep learning" : "Recursos para seguir aprendiendo"} className="my-12 rounded-2xl border border-blue-400/20 bg-blue-600/10 p-6 sm:p-8 text-left">
      <h2 className="text-2xl font-bold text-zinc-100 mb-3">
        {en ? (portfolio ? 'Review your portfolio before sending it' : 'A guide for your next project') : (portfolio ? 'Revisa tu portafolio antes de enviarlo' : 'Llévate una guía para tu próximo proyecto')}
      </h2>
      <p className="text-zinc-300 mb-6">{en ? "A free checklist to review your project’s problem, demo, README and technical decisions." : "Una checklist gratuita para revisar el problema, la demo, el README y las decisiones de tu proyecto."}</p>
      <div className="flex flex-wrap gap-4">
        <TrackedLink href={en ? "/recursos/portfolio-checklist.txt" : "/recursos/checklist-portafolio.txt"} download eventName="resource_download" eventLabel="portfolio_checklist" className="btn-primary">{en ? "Download checklist" : "Descargar checklist"} <span aria-hidden>↓</span></TrackedLink>
        <TrackedLink href={en ? "/en/rss.xml" : "/rss.xml"} eventName="rss_subscribe_click" eventLabel="reader_resources" className="btn-ghost">{en ? "Follow the blog via RSS" : "Seguir el blog por RSS"}</TrackedLink>
      </div>
      <p className="text-sm text-zinc-400 mt-4">{en ? "Add the RSS link to your feed reader to receive new articles." : "Añade el enlace RSS a tu lector de feeds para recibir los nuevos artículos."}</p>
    </aside>
  );
}
