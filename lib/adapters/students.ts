export function toStudentsRow(item) {
  return {
    id: item.id,
    first_name: item.first_name,
    last_name: item.last_name,
    email: item.email,
    phone: item.phone,
  }
}

