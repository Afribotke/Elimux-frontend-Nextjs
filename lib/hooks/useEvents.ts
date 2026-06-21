import useSWR from 'swr'
import { Events } from '@/types/events'
import { eventsSchema } from '@/lib/validation/events'

const fetcher = (url) => fetch(url).then(res => res.json())

export function useEventss() {
  const { data, error, isLoading, mutate } = useSWR('/api/events', fetcher)
  return {
    data: data?.data ?? [],
    isLoading,
    isError: !!error,
    refresh: () => mutate()
  }
}

export async function createEvents(input) {
  const parsed = eventsSchema.parse(input)

  const res = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed)
  })

  if (!res.ok) throw new Error('Failed to create events')
  return res.json()
}

