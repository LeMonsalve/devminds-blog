import { client } from '@/lib/rpc'
import { useQuery } from '@tanstack/react-query'

type Props = {
  id: string
}

export function useAuthor({ id }: Props) {
  return useQuery({
    queryKey: ['author', { id }],
    queryFn: async () => {
      const response = await client.api.posts.author[':id'].$get({
        param: { id },
      })

      if (!response.ok) return null

      const { data } = await response.json()
      return data
    },
  })
}
