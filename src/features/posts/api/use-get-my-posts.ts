import { client } from '@/lib/rpc'
import { useQuery } from '@tanstack/react-query'

export function useGetMyPosts() {
  return useQuery({
    queryKey: ['my-posts'],
    queryFn: async () => {
      const response = await client.api.posts['by-user'].$get()

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return response.json()
    },
  })
}
