import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCheckoutActionMutation } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { Checkout, CheckoutActionInput } from '@/lib/gql/types'

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

export const useCreateMultiShipCheckoutMutation = useCreateCheckoutActionMutation
