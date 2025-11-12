import Header from "@/components/layout/header";

export default function CVLayout({ children }) {
  return (
    <>
      <main className="pt-18 bg-slate-50"> {/* pt-20 para compensar el header fixed */}
        {children}
      </main>
    </>
  );
}
