/**
 * @module useVoidCheckoutPayment
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCheckoutPaymentActionMutation } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { PaymentActionInput } from '@/lib/gql/types'
/**
 * @hidden
 */
export interface UpdateCheckoutPaymentActionInput {
  checkoutId: string
  paymentId: string
  paymentActionInput: PaymentActionInput
}

const updateCheckoutPayment = async (props: UpdateCheckoutPaymentActionInput) => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: updateCheckoutPaymentActionMutation,
    variables: props,
  })

  return response?.updateCheckoutPaymentAction
}

/**
 * [Mutation hook] useVoidCheckoutPayment uses the graphQL mutation
 *
 * <b>updateCheckoutPayment(checkoutId: String!,paymentId: String!,paymentActionInput: PaymentActionInput): Checkout</b>
 *
 * Description : Updates the payment information
 *
 * Parameters passed to function updateCheckoutPayment(props: UpdateCheckoutPaymentActionInput) => expects checkoutId, paymentId and object paymentActionInput
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.updateCheckoutPaymentAction' which contains object of updated checkout information
 */
export const useVoidCheckoutPayment = () => {
  const queryClient = useQueryClient()

  return {
    voidCheckoutPayment: useMutation({
      mutationFn: updateCheckoutPayment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
