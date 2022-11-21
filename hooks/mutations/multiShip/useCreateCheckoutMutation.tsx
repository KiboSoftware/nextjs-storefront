import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCheckoutMutation } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

const createCheckout = async (cartId?: string | null) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: createCheckoutMutation,
    variables: { cartId },
  })

  return response?.createCheckout
}

export const useCreateCheckoutMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(createCheckout, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}
