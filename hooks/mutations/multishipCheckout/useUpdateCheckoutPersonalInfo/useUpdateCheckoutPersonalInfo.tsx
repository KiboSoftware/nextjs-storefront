/**
 * @module useUpdateCheckoutPersonalInfo
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { setMultiShipPersonalInfo } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { Checkout } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface MultiShipPersonalInfo {
  checkout: Checkout
  email: string
}

const updatePersonalInfo = async ({ checkout, email }: MultiShipPersonalInfo) => {
  const client = makeGraphQLClient()

  const { items, destinations, ...rest } = checkout
  const personalInfo = {
    checkoutId: checkout?.id,
    checkoutInput: {
      ...rest,
      email,
    },
  }
  const response = await client.request({
    document: setMultiShipPersonalInfo,
    variables: personalInfo,
  })

  return response?.checkout
}

/**
 * [Mutation hook] useUpdateCheckoutPersonalInfo uses the graphQL mutation
 *
 * <b>updateCheckout(checkoutId: String!, checkoutInput: CheckoutInput): Checkout</b>
 *
 * Description : Updates the details(like email id) of a checkout specified by the checkout ID.
 *
 * Parameters passed to function updatePersonalInfo({ checkout, email }: MultiShipPersonalInfo) => expects checkoutId and email
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.checkout' which contains the updated personal details(email id)
 */

export const useUpdateCheckoutPersonalInfo = () => {
  const queryClient = useQueryClient()

  return {
    updateMultiShipCheckoutPersonalInfo: useMutation({
      mutationFn: updatePersonalInfo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
