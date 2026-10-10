export const readingPaths = [
  {
    id: 'aprender',
    title: 'Aprender a programar',
    description: 'Elige tus herramientas, aprende los fundamentos y termina tu primer proyecto.',
    slugs: ['mejores-tecnologias-para-empezar-a-programar-2026', 'guia-completa-logica-estructuras-de-datos', 'tutorial-python-principiantes-proyecto-basico', 'como-salir-del-tutorial-hell'],
  },
  {
    id: 'trabajo',
    title: 'Conseguir trabajo',
    description: 'Construye un portafolio que puedas defender y prepárate para las entrevistas.',
    slugs: ['roadmap-desarrollador-2026-de-cero-a-contratado', 'proyectos-valiosos-para-tu-cv-programador', 'consejos-para-pruebas-tecnicas', 'habilidades-valiosas-desarrollo-software-2026'],
  },
  {
    id: 'ia',
    title: 'Programar con IA',
    description: 'Usa la IA para construir sin dejar de aprender ni perder tu criterio.',
    slugs: ['como-aprender-programacion-era-ia', 'que-es-valioso-cuando-todos-pueden-programar-con-ia', 'como-convertirse-en-ai-engineer-2026'],
  },
];

// Use only published posts so a scheduled article never leaks into a route.
export function getReadingPaths(posts) {
  const bySlug = new Map(posts.map((post) => [post.slug, post]));
  return readingPaths.map((route) => ({
    ...route,
    posts: route.slugs.map((slug) => bySlug.get(slug)).filter(Boolean),
  })).filter((route) => route.posts.length > 0);
}
