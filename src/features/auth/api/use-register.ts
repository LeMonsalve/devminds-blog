import { InferRequestType, InferResponseType } from 'hono'
import { client } from '@/lib/rpc'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)['$post']
>
type RequestType = InferRequestType<(typeof client.api.auth.register)['$post']>

export function useRegister() {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      console.log('Use Register: ', json)
      const response = await client.api.auth.register.$post({ json })

      if (!response.ok) {
        console.error('Use Register: ', response)
        throw new Error(response.statusText)
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Account created successfully')
    },
    onError: () => {
      toast.error('Failed to create account')
    },
  })
}
