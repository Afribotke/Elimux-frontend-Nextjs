import useSWR from 'swr'
import { Students } from '@/types/students'
import { studentsSchema } from '@/lib/validation/students'

const fetcher = (url) => fetch(url).then(res => res.json())

export function useStudentss() {
  const { data, error, isLoading, mutate } = useSWR('/api/students', fetcher)
  return {
    data: data?.data ?? [],
    isLoading,
    isError: !!error,
    refresh: () => mutate()
  }
}

export async function createStudents(input) {
  const parsed = studentsSchema.parse(input)

  const res = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed)
  })

  if (!res.ok) throw new Error('Failed to create students')
  return res.json()
}

