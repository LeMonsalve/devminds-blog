import { client } from '@/lib/rpc'
import { useQuery } from '@tanstack/react-query'

export function useGetPost(id?: string) {
  return useQuery({
    enabled: !!id,
    queryKey: ['posts', { id }],
    queryFn: async () => {
      const postId = id as string
      const response = await client.api.posts[':id'].$get({
        param: { id: postId },
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const { data } = await response.json()
      return data
    },
  })
}
