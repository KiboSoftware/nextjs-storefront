/**
 * @module useInitiateCheckout
 */
import { useMutation } from '@tanstack/react-query'

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

/**
 * [Mutation hook] useInitiateCheckout uses the graphQL mutation
 *
 * <b>createCheckout(cartId: String): Checkout</b>
 *
 * Description : Creates a new checkout from an existing cart, that is, when the customer chooses to proceed to checkout.
 *
 * Parameters passed to function createCheckout(cartId?: string | null) => expects cartId
 *
 * @returns 'response?.checkout' which contains which contains data for checkout pages(product items, fulfillment method etc.;)
 */
export const useInitiateCheckout = () => {
  return {
    initiateCheckout: useMutation({ mutationFn: createCheckout }),
  }
}
