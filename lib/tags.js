// Keep legacy labels searchable while displaying one canonical name.
const aliases = {
  ia: 'IA',
  'inteligencia artificial': 'IA',
  'next.js': 'Next.js',
  nextjs: 'Next.js',
  'soft skills': 'Habilidades Blandas',
  'habilidades blandas': 'Habilidades Blandas',
};

export function normalizeTag(tag) {
  const label = String(tag).trim();
  return aliases[label.toLocaleLowerCase('es')] || label;
}

export function normalizeTags(tags = []) {
  const values = Array.isArray(tags) ? tags : [tags];
  return [...new Set(values.filter(Boolean).map(normalizeTag).filter(Boolean))];
}
