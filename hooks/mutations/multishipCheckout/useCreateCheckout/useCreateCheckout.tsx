/**
 * @module useCreateCheckout
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCheckoutActionMutation } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { Checkout, CheckoutActionInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface MultiShipCreateActionParams {
  checkoutId: string
  checkoutActionInput: CheckoutActionInput
}

const createCheckout = async (checkout: Checkout) => {
  const client = makeGraphQLClient()
  const checkoutInfo: MultiShipCreateActionParams = {
    checkoutId: checkout.id as string,
    checkoutActionInput: { actionName: 'SubmitCheckout' },
  }

  const response = await client.request({
    document: createCheckoutActionMutation,
    variables: checkoutInfo,
  })

  return response?.createCheckoutAction
}

/**
 * [Mutation hook] useCreateCheckout uses the graphQL mutation
 *
 * <b>createCheckoutAction(checkoutId: String!,checkoutActionInput: CheckoutActionInput): Checkout</b>
 *
 * Description : Perform an action on the checkout and places the new order. Available actions depend on the current state of the checkout.
 *
 * Parameters passed to function createCheckout(checkout: Checkout)
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.createCheckoutAction' which contains multi ship items order details including orderId, shipping details, items etc.
 */
export const useCreateCheckout = () => {
  const queryClient = useQueryClient()

  return {
    createCheckout: useMutation({
      mutationFn: createCheckout,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
