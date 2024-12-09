import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.posts)[':id']['$patch']
>
type RequestType = InferRequestType<(typeof client.api.posts)[':id']['$patch']>

export function useEditPost() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.posts[':id'].$patch({
        json,
        param,
      })

      console.log('Response Edit: ', response)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['my-posts'] })
      toast.success('Post updated successfully')
      router.push('/my-posts')
    },
    onError: () => {
      toast.error('Failed to update post')
    },
  })
}
