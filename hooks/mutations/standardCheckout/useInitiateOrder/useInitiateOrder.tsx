/**
 * @module useInitiateOrder
 */
import { useMutation } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getOrCreateCheckoutFromCartMutation } from '@/lib/gql/queries'

const getOrCreateCheckout = async ({ cartId, quoteId }: { cartId?: string; quoteId?: string }) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getOrCreateCheckoutFromCartMutation,
    variables: cartId ? { cartId } : { quoteId },
  })

  return response?.checkout
}

/**
 * [Mutation hook] useInitiateOrder uses the graphQL mutation
 *
 * <b>createOrder(cartId: String, quoteId: String, orderInput: OrderInput): Order</b>
 *
 * Description : Prepares data for checkout page from cart
 *
 * Parameters passed to function getOrCreateCheckout(cartId?: string | null) => expects cartId
 *
 * @returns 'response?.checkout' which contains data for checkout pages(product items, fulfillment method etc.;)
 */
export const useInitiateOrder = () => {
  return {
    initiateOrder: useMutation({ mutationFn: getOrCreateCheckout }),
  }
}
