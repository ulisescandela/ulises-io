import Header from "@/components/layout/header";

export default function CVLayout({ children }) {
  return (
    <>
      <style>{`
        body { background-color: rgb(248 250 252) !important; }
        @media print {
          @page { margin: 0; }
          html, body { height: auto !important; min-height: 0 !important; overflow: visible !important; }
          body { 
            margin-top: 0.5cm !important;
            margin-bottom: 0.5cm !important;
            margin-left: 1.25cm !important;
            margin-right: 1.25cm !important;
          }
        }
      `}</style>
      <main className="pt-18 print:pt-0 print:min-h-0 print:h-auto bg-slate-50 min-h-screen"> {/* pt-20 para compensar el header fixed */}
        {children}
      </main>
    </>
  );
}
