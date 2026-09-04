// lib/toc.js
// Utilidades compartidas para la Tabla de Contenidos (TOC) de los artículos.
// El mismo slugify se usa en el servidor (extractHeadings) y en el cliente
// (TableOfContents) y en postContent para que los anclajes coincidan siempre.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita acentos (á -> a)
    .replace(/[^a-z0-9\s-]/g, '') // solo letras, números, espacios y guiones
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Extrae los encabezados H2/H3 de un contenido markdown, ignorando los que
// estén dentro de bloques de código. Devuelve [{ depth, text, id }].
export function extractHeadings(markdown) {
  if (!markdown) return [];
  const lines = markdown.split('\n');
  const headings = [];
  let inFence = false;

  for (const rawLine of lines) {
    const line = rawLine;
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length;
    const text = match[2]
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .trim();

    if (!text) continue;
    headings.push({ depth, text, id: slugify(text) });
  }

  return headings;
}

// Extrae el texto plano de un nodo de React (usado en postContent para
// calcular el id de un encabezado a partir de sus children).
export function nodeToText(node) {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join('');
  if (typeof node === 'object' && node.props) return nodeToText(node.props.children);
  return '';
}
