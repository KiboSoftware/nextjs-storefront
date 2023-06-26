/**
 * @module useAddCheckoutPayment
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCheckoutPaymentActionMutation } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { PaymentActionInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface CheckoutPaymentActionInput {
  checkoutId: string
  paymentAction: PaymentActionInput
}

const createCheckoutPayment = async (params: CheckoutPaymentActionInput) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: createCheckoutPaymentActionMutation,
    variables: params,
  })

  return response?.createCheckoutPaymentAction
}

/**
 * [Mutation hook] useAddCheckoutPayment uses the graphQL mutation
 *
 * <b>createCheckoutPaymentAction(checkoutId: String!, paymentActionInput: PaymentActionInput): Checkout</b>
 *
 * Description : Sets the action of the specified payment transaction interaction. Available actions depend on the current status of the payment transaction.
 *
 * Parameters passed to function createCheckoutPayment(params: CheckoutPaymentActionInput) => expects checkoutId and paymentAction
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.createCheckoutPaymentAction' which contains payment related information
 */
export const useAddCheckoutPayment = () => {
  const queryClient = useQueryClient()

  return {
    addCheckoutPayment: useMutation({
      mutationFn: createCheckoutPayment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
