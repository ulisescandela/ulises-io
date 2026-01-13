import Header from "@/components/layout/header";

export default function CVLayout({ children }) {
  return (
    <>
      <style>{`body { background-color: rgb(248 250 252) !important; }`}</style>
      <main className="pt-18 bg-slate-50 min-h-screen"> {/* pt-20 para compensar el header fixed */}
        {children}
      </main>
    </>
  );
}
