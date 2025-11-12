import Link from "next/link";
import { HiOutlineAcademicCap } from "react-icons/hi";

export default function About() {
  return (
    <section className="mb-16 px-16 mx-16 text-white">
      {/* About Section */}
      <h2 className="text-3xl px-24 font-bold mb-6 flex items-center gap-2">
        <HiOutlineAcademicCap /> Sobre mí
      </h2>
      <div className="px-24 text-justify text-lg">
        <p>
          ¡Hola! Soy Ulises, un desarrollador de software apasionado por crear
          soluciones innovadoras y compartir conocimientos con la comunidad
          tecnológica.
        </p>
        <Link href="/cv">
          <div className="mt-4 w-fit text-blue-700 font-medium text-sm bg-white border border-gray-200 rounded-xl p-2.5 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-gray-300 hover:cursor-pointer">
            Ver CV →
          </div>
        </Link>
      </div>
    </section>
  );
}