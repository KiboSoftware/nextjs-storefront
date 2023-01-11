/**
 * @module useUpdateCheckoutPersonalInfoMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { CheckoutUpdateMode } from '@/lib/constants'
import { makeGraphQLClient } from '@/lib/gql/client'
import { setPersonalInfo } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrOrderInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface PersonalInfo {
  checkout: CrOrderInput
  email: string
}

const updatePersonalInfo = async ({ checkout, email }: PersonalInfo) => {
  const client = makeGraphQLClient()

  const personalInfo = {
    orderId: checkout?.id as string,
    updateMode: CheckoutUpdateMode.APPLY_TO_ORIGINAL,
    orderInput: {
      ...checkout,
      email,
    },
  }
  const response = await client.request({
    document: setPersonalInfo,
    variables: personalInfo,
  })

  return response?.checkout
}

/**
 * [Mutation hook] useUpdateCheckoutPersonalInfoMutation uses the graphQL mutation
 *
 * <b>updateOrder(orderId: String!,updateMode: String, version: String, orderInput: OrderInput): Order</b>
 *
 * Description : Updates user personal info at checkout
 *
 * Parameters passed to function updatePersonalInfo({ checkout, email }: PersonalInfo) => expects object of type ' PersonalInfo' containing  checkout and email
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.checkout', which contains updated checkout information
 */

export const useUpdateCheckoutPersonalInfoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePersonalInfo, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}
