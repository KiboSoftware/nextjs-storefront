/**
 * @module useCreateMultiShipCheckoutMutation
 */
import { useMutation, useQueryClient } from 'react-query'

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
    checkoutActionInput: { actionName: 'SubmitOrder' },
  }

  const response = await client.request({
    document: createCheckoutActionMutation,
    variables: checkoutInfo,
  })

  return response?.createCheckoutAction
}

const useCreateCheckoutActionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(createCheckout, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}

/**
 * [Mutation hook] useCreateMultiShipCheckoutMutation uses the graphQL mutation
 *
 * <b>createCheckoutAction(checkoutId: String!,checkoutActionInput: CheckoutActionInput): Checkout</b>
 *
 * Description : Perform an action on the checkout and places the new order. Available actions depend on the current state of the checkout.
 *
 * Parameters passed to function createCheckout(checkout: Checkout)
 *
 * On success, calls removeQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.createCheckoutAction' which contains multi ship items order details including orderId, shipping details, items etc.
 */
export const useCreateMultiShipCheckoutMutation = useCreateCheckoutActionMutation
