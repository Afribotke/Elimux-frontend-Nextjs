export function toDocumentsRow(item) {
  return {
    id: item.id,
    name: item.name,
    url: item.url,
    type: item.type,
  }
}
