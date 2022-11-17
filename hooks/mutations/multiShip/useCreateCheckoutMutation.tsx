import { useMutation } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCheckoutMutation } from '@/lib/gql/mutations'

const createCheckout = async (cartId?: string | null) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: createCheckoutMutation,
    variables: { cartId },
  })

  return response?.createCheckout
}

export const useCreateCheckoutMutation = () => {
  return {
    createCheckout: useMutation(createCheckout),
  }
}
