import useSWR from 'swr'
import { Programs } from '@/types/programs'
import { programsSchema } from '@/lib/validation/programs'

const fetcher = (url) => fetch(url).then(res => res.json())

export function useProgramss() {
  const { data, error, isLoading, mutate } = useSWR('/api/programs', fetcher)
  return {
    data: data?.data ?? [],
    isLoading,
    isError: !!error,
    refresh: () => mutate()
  }
}

export async function createPrograms(input) {
  const parsed = programsSchema.parse(input)

  const res = await fetch('/api/programs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed)
  })

  if (!res.ok) throw new Error('Failed to create programs')
  return res.json()
}
