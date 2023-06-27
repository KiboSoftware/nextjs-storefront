/**
 * @module useVoidOrderPayment
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateOrderPaymentAction } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { PaymentActionInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UpdateOrderPaymentActionParams {
  orderId: string
  paymentId: string
  paymentAction: PaymentActionInput
}

const updateOrderPaymentActionMutation = async (params: UpdateOrderPaymentActionParams) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateOrderPaymentAction,
    variables: params,
  })

  return response?.createOrderPaymentPaymentAction
}

/**
 * [Mutation hook] useVoidOrderPayment uses the graphQL mutation
 *
 * <b>createOrderPaymentPaymentAction(orderId: String!, paymentId: String!, paymentActionInput: PaymentActionInput): Order</b>
 *
 * Description : Updates user payment action for order at checkout
 *
 * Parameters passed to function updateOrderPaymentActionMutation(params: UpdateOrderPaymentActionParams) => expects object of type ' UpdateOrderPaymentActionParams' containing  orderId, paymentId,paymentAction
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.updateOrderBillingInfo', which contains updated payment information at checkout
 */

export const useVoidOrderPayment = () => {
  const queryClient = useQueryClient()

  return {
    voidOrderPayment: useMutation({
      mutationFn: updateOrderPaymentActionMutation,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
