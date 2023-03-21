/**
 * @module useCreateCheckoutShippingMethodMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCheckoutShippingMethod } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CheckoutGroupShippingMethodInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface MultiShipCreateCheckoutShippingMethod {
  checkoutId: string
  checkoutGroupShippingMethodInput: CheckoutGroupShippingMethodInput[]
}

const setCheckoutShippingMethod = async (
  checkoutShippingMethod: MultiShipCreateCheckoutShippingMethod
) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: createCheckoutShippingMethod,
    variables: checkoutShippingMethod,
  })

  return response?.checkout
}

/**
 * [Mutation hook] useCreateCheckoutShippingMethodMutation uses the graphQL mutation
 *
 * <b>createCheckoutShippingMethod(checkoutId: String!, checkoutGroupShippingMethodInput: [CheckoutGroupShippingMethodInput]): Checkout</b>
 *
 * Description : Sets the shipping method for specified groupings in multi ship.
 *
 * Parameters passed to function setCheckoutShippingMethod(checkoutShippingMethod: MultiShipCreateCheckoutShippingMethod) => expects checkoutId and checkoutGroupShippingMethodInput
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.checkout' which contains shipping methods and shipping price for the groupings
 */
export const useCreateCheckoutShippingMethodMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(setCheckoutShippingMethod, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
