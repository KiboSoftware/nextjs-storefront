/**
 * @module useAddOrderPaymentInfo
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import getConfig from 'next/config'

import { apiAuthClient } from '@/lib/api/util/api-auth-client'
import { makeGraphQLClient } from '@/lib/gql/client'
import { addPaymentMethodToCheckout } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { PaymentActionInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface PaymentMethodInput {
  orderId: string
  paymentAction: PaymentActionInput
}

const client = makeGraphQLClient(
  `${process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''}/api/checkout/add-payment`
)
const updatePaymentMethod = async (params: PaymentMethodInput) => {
  // const client = makeGraphQLClient()

  const response = await client.request({
    document: addPaymentMethodToCheckout,
    variables: params,
  })

  console.log('hook response', response)

  return response?.createOrderPaymentAction
}

/**
 * [Mutation hook] useAddOrderPaymentInfo uses the graphQL mutation
 *
 * <b>createOrderPaymentAction(orderId: String!, paymentActionInput: PaymentActionInput): Order</b>
 *
 * Description : Creates payment action for order at checkout
 *
 * Parameters passed to function updatePaymentMethod(props: PaymentMethodInput) => expects object of type 'PaymentMethodInput' containing orderId and payment action
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.createOrderPaymentAction', which contains details of payment method user used for checkout
 */

export const useAddOrderPaymentInfo = () => {
  const queryClient = useQueryClient()

  return {
    addOrderPayment: useMutation({
      mutationFn: updatePaymentMethod,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
