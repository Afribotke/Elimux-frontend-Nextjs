export function toProgramsRow(item) {
  return {
    id: item.id,
    name: item.name,
    level: item.level,
    duration_months: item.duration_months,
    tuition_fee: item.tuition_fee,
    mode: item.mode,
  }
}