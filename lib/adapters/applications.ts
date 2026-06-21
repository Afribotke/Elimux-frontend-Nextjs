export function toApplicationsRow(item) {
  return {
    id: item.id,
    student_id: item.student_id,
    program_id: item.program_id,
    status: item.status,
  }
}

