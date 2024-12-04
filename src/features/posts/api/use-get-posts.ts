import { client } from '@/lib/rpc'
import { useQuery } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'

type ResponseType = InferResponseType<(typeof client.api.posts)['$get']>
type RequestType = InferRequestType<(typeof client.api.posts)['$get']>

export function useGetPosts() {
  return useQuery<ResponseType, Error, RequestType>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await client.api.posts.$get()

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return await response.json()
    },
  })
}
