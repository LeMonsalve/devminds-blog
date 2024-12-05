import { client } from '@/lib/rpc'
import { useQuery } from '@tanstack/react-query'

export function useGetPosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await client.api.posts.$get()

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const { data } = await response.json()
      return data
    },
  })
}
