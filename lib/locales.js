export const categoryTranslations = {
  Carrera: 'Career', Programación: 'Programming', Herramientas: 'Tools', IA: 'AI', Reflexiones: 'Reflections',
};
export const tagTranslations = {
  'Algoritmos': 'Algorithms', 'Aprendizaje': 'Learning', 'Arquitectura': 'Architecture',
  'Básico': 'Basics', 'Carrera': 'Career', 'Consejos': 'Tips', 'Crecimiento Profesional': 'Career Growth',
  'Desarrollo Personal': 'Personal Development', 'Desarrollo Profesional': 'Professional Development',
  'Desarrollo Web': 'Web Development', 'Empleo Tech': 'Tech Jobs', 'Emprendimiento': 'Entrepreneurship',
  'Entrevistas': 'Interviews', 'Estructuras de Datos': 'Data Structures', 'Evolución': 'Evolution',
  'Fundamentos': 'Fundamentals', 'Futuro': 'Future', 'Futuro del Desarrollo': 'Future of Development',
  'Guía Completa': 'Complete Guide', 'Habilidades': 'Skills', 'Habilidades Blandas': 'Soft Skills',
  'Herramientas': 'Tools', 'Historia Tech': 'Tech History', 'IA': 'AI', 'Lenguajes': 'Languages',
  'Libros': 'Books', 'Liderazgo': 'Leadership', 'Lógica de Programación': 'Programming Logic',
  'Mentalidad': 'Mindset', 'Negocios': 'Business', 'Oportunidades': 'Opportunities',
  'Patrones de Diseño': 'Design Patterns', 'Portafolio': 'Portfolio', 'Principiantes': 'Beginners',
  'Productividad': 'Productivity', 'Profesional': 'Professional', 'Programación': 'Programming',
  'Proyecto': 'Project', 'Proyectos': 'Projects', 'Pruebas Técnicas': 'Coding Interviews',
  'Realismo': 'Realism', 'Salarios': 'Salaries', 'Tecnología': 'Technology',
};
export const translateTag = tag => tagTranslations[tag] || tag;
export const translateCategory = category => categoryTranslations[category] || category;
export const sourceCategory = category => Object.keys(categoryTranslations).find(key => categoryTranslations[key] === category) || category;
export const pagePaths = {
  home: { es: '/', en: '/en' }, blog: { es: '/blog', en: '/en/blog' },
  about: { es: '/about', en: '/en/about' }, contact: { es: '/contacto', en: '/en/contact' },
  privacy: { es: '/privacy', en: '/en/privacy' }, start: { es: '/empieza-aqui', en: '/en/start-here' },
  cv: { es: '/cv', en: '/en/cv' },
};

export const sourceTag = tag => Object.keys(tagTranslations).find(key => tagTranslations[key] === tag) || tag;
