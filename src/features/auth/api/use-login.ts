import { InferRequestType, InferResponseType } from 'hono'
import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

type ResponseType = InferResponseType<(typeof client.api.auth.login)['$post']>
type RequestType = InferRequestType<(typeof client.api.auth.login)['$post']>

export function useLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login.$post({ json })
      return await response.json()
    },
    onSuccess: () => {
      router.push('/')
      queryClient.invalidateQueries({ queryKey: ['current'] }).then()
    },
  })
}
