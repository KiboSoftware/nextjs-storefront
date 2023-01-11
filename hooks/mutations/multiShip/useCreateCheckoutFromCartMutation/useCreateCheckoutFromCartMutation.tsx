import { useMutation } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createMultiShipCheckoutFromCartMutation } from '@/lib/gql/mutations'

const createCheckout = async (cartId?: string | null) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: createMultiShipCheckoutFromCartMutation,
    variables: { cartId },
  })

  return response?.checkout
}

const useCreateCheckoutFromCartMutation = () => {
  return {
    createMultiShipCheckoutFromCart: useMutation(createCheckout),
  }
}

export const useCreateMultiShipCheckoutFromCartMutation = useCreateCheckoutFromCartMutation
