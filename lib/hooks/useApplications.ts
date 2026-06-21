import useSWR from 'swr'
import { Applications } from '@/types/applications'
import { applicationsSchema } from '@/lib/validation/applications'

const fetcher = (url) => fetch(url).then(res => res.json())

export function useApplicationss() {
  const { data, error, isLoading, mutate } = useSWR('/api/applications', fetcher)
  return {
    data: data?.data ?? [],
    isLoading,
    isError: !!error,
    refresh: () => mutate()
  }
}

export async function createApplications(input) {
  const parsed = applicationsSchema.parse(input)

  const res = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed)
  })

  if (!res.ok) throw new Error('Failed to create applications')
  return res.json()
}

