export function buildListFilter(search: Record<string, any>) {
  const filterKeys = Object.keys(search).filter((k) => !k.startsWith('_'));
  const filter: Record<string, any> = {};

  filterKeys.forEach((k) => {
    filter[k] = search[k];
  });

  return filter;
}
