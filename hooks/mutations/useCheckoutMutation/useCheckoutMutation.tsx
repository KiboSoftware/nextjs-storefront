import { useMutation } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getOrCreateCheckoutFromCartMutation } from '@/lib/gql/queries'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

const getOrCreateCheckout = async (cartId?: string | null) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getOrCreateCheckoutFromCartMutation,
    variables: { cartId },
  })

  return response?.checkout
}

export const useCheckoutMutation = () => {
  return {
    checkout: useMutation(getOrCreateCheckout),
  }
}
