import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)['$post']
>
type RequestType = InferRequestType<(typeof client.api.auth.register)['$post']>

export function useRegister() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register.$post({ json })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Account created successfully')
      queryClient.invalidateQueries({ queryKey: ['current'] })
      router.push('/')
    },
    onError: () => {
      toast.error('Failed to create account')
    },
  })
}
