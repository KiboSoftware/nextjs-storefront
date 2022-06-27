import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateOrder } from '@/lib/gql/mutations/checkout/update-order'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { OrderInput } from '@/lib/gql/types'

export interface CheckoutDetails {
  orderId: string
  updateMode: string
  version?: string
  orderInput: OrderInput
}

const updateCheckout = async (checkoutDetails: CheckoutDetails) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateOrder,
    variables: checkoutDetails,
  })

  return response?.checkout
}

export const useUpdateCheckout = () => {
  const queryClient = useQueryClient()

  return useMutation(updateCheckout, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}
