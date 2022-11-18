import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCheckoutActionMutation } from '@/lib/gql/mutations'
import { buildCreateCheckoutParams } from '@/lib/helpers'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { Checkout, CheckoutActionInput } from '@/lib/gql/types'

export interface OrderMultiShipInfo {
  checkoutId: string
  checkoutActionInput: CheckoutActionInput
}

const createOrder = async (checkout: Checkout) => {
  const checkoutInfo: OrderMultiShipInfo = buildCreateCheckoutParams(checkout)

  const client = makeGraphQLClient()

  const response = await client.request({
    document: createCheckoutActionMutation,
    variables: checkoutInfo,
  })

  return response
}

const useCreateCheckoutActionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(createOrder, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}

export const useCreateMultiShipOrderMutation = useCreateCheckoutActionMutation
