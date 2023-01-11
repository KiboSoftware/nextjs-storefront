import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCheckoutShippingMethod } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CheckoutGroupShippingMethodInput } from '@/lib/gql/types'

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

export const useCreateCheckoutShippingMethodMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(setCheckoutShippingMethod, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
