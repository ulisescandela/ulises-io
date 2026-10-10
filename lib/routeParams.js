// Next.js route values may retain URL escaping for statically generated paths.
export function decodeRouteParam(value = '') {
  try {
    return decodeURIComponent(value);
  } catch {
    // A malformed percent sequence must resolve to a 404, not a server error.
    return value;
  }
}
