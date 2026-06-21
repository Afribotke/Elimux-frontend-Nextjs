import useSWR from 'swr'
import { Staff } from '@/types/staff'
import { staffSchema } from '@/lib/validation/staff'

const fetcher = (url) => fetch(url).then(res => res.json())

export function useStaffs() {
  const { data, error, isLoading, mutate } = useSWR('/api/staff', fetcher)
  return {
    data: data?.data ?? [],
    isLoading,
    isError: !!error,
    refresh: () => mutate()
  }
}

export async function createStaff(input) {
  const parsed = staffSchema.parse(input)

  const res = await fetch('/api/staff', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed)
  })

  if (!res.ok) throw new Error('Failed to create staff')
  return res.json()
}
