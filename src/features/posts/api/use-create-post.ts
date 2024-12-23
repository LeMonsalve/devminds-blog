import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.posts)['$post']>
type RequestType = InferRequestType<(typeof client.api.posts)['$post']>

export function useCreatePost() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.posts.$post({ json })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['my-posts'] })
      toast.success('Post created successfully')
      router.push('/my-posts')
    },
    onError: () => {
      toast.error('Failed to create post')
    },
  })
}
