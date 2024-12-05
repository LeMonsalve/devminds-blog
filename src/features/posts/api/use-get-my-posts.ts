import { client } from '@/lib/rpc'
import { useQuery } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'

type ResponseType = InferResponseType<
  (typeof client.api.posts)['by-user']['$get']
>
type RequestType = InferRequestType<
  (typeof client.api.posts)['by-user']['$get']
>

export function useGetMyPosts() {
  return useQuery<ResponseType, Error, RequestType>({
    queryKey: ['my-posts'],
    queryFn: async () => {
      const response = await client.api.posts['by-user'].$get()

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return await response.json()
    },
  })
}
