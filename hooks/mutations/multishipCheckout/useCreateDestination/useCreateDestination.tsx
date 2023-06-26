/**
 * @module useCreateDestination
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCheckoutDestination } from '@/lib/gql/mutations'
import { checkoutDestinationKeys, checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrDestinationInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface AddCheckoutDestinationParams {
  checkoutId: string
  destinationInput: CrDestinationInput
}

const addCheckoutDestination = async (params: AddCheckoutDestinationParams) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: createCheckoutDestination,
    variables: params,
  })

  return response?.createCheckoutDestination
}

/**
 * [Mutation hook] useCreateDestination uses the graphQL mutation
 *
 * <b>createCheckoutDestination(checkoutId: String!,destinationInput: CrDestinationInput): CrDestination</b>
 *
 * Description : Adds a specific destination to the checkout.
 *
 * Parameters passed to function addCheckoutDestination(params: AddCheckoutDestinationParams) => expects checkoutId and destinationInput
 *
 * On success, calls invalidateQueries on checkoutKeys and checkoutDestinationKeys and fetches the updated result.
 *
 * @returns 'response?.createCheckoutDestination' which contains destinationContact added to the checkout.
 */
export const useCreateDestination = () => {
  const queryClient = useQueryClient()

  return {
    createCheckoutDestination: useMutation({
      mutationFn: addCheckoutDestination,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: checkoutDestinationKeys.all })
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
