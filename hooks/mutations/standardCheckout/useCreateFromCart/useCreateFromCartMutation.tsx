/**
 * @module useCreateFromCartMutation
 */
import { useMutation } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getOrCreateCheckoutFromCartMutation } from '@/lib/gql/queries'

const getOrCreateCheckout = async (cartId?: string | null) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getOrCreateCheckoutFromCartMutation,
    variables: { cartId },
  })

  return response?.checkout
}

/**
 * [Mutation hook] useCreateFromCartMutation uses the graphQL mutation
 *
 * <b>createOrder(cartId: String, quoteId: String, orderInput: OrderInput): Order</b>
 *
 * Description : Prepares data for checkout page from cart
 *
 * Parameters passed to function getOrCreateCheckout(cartId?: string | null) => expects cartId
 *
 * @returns 'response?.checkout' which contains data for checkout pages(product items, fulfillment method etc.;)
 */
export const useCreateFromCartMutation = () => {
  return {
    createFromCart: useMutation(getOrCreateCheckout),
  }
}
