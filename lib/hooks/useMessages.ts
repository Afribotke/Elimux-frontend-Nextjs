import useSWR from 'swr'
import { Messages } from '@/types/messages'
import { messagesSchema } from '@/lib/validation/messages'

const fetcher = (url) => fetch(url).then(res => res.json())

export function useMessagess() {
  const { data, error, isLoading, mutate } = useSWR('/api/messages', fetcher)
  return {
    data: data?.data ?? [],
    isLoading,
    isError: !!error,
    refresh: () => mutate()
  }
}

export async function createMessages(input) {
  const parsed = messagesSchema.parse(input)

  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed)
  })

  if (!res.ok) throw new Error('Failed to create messages')
  return res.json()
}
