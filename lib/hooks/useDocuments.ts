import useSWR from 'swr'
import { Documents } from '@/types/documents'
import { documentsSchema } from '@/lib/validation/documents'

const fetcher = (url) => fetch(url).then(res => res.json())

export function useDocumentss() {
  const { data, error, isLoading, mutate } = useSWR('/api/documents', fetcher)
  return {
    data: data?.data ?? [],
    isLoading,
    isError: !!error,
    refresh: () => mutate()
  }
}

export async function createDocuments(input) {
  const parsed = documentsSchema.parse(input)

  const res = await fetch('/api/documents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed)
  })

  if (!res.ok) throw new Error('Failed to create documents')
  return res.json()
}

