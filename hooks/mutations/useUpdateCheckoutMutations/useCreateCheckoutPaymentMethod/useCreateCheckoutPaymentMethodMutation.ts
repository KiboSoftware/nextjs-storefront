import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { addPaymentMethodToCheckout } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { PaymentActionInput } from '@/lib/gql/types'

export interface PaymentMethodInput {
  orderId: string
  paymentAction: PaymentActionInput
}

const updatePaymentMethod = async (params: PaymentMethodInput) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: addPaymentMethodToCheckout,
    variables: params,
  })

  return response?.createOrderPaymentAction
}

/**
 * [ Mutation hook => createOrderPaymentAction($orderId: String!, $paymentAction: PaymentActionInput)]
 *
 * Description : Creates payment action for order at checkout
 *
 * Parameters passed to function updatePaymentMethod(props: PaymentMethodInput) => expects object of type 'PaymentMethodInput' containing orderid and payment action
 *
 * On success, calls invalidateQueries on checkoutKeys
 * @returns 'response?.createOrderPaymentAction' containing details of payment method user used for checkout
 */
export const useCreateCheckoutPaymentMethodMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePaymentMethod, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
