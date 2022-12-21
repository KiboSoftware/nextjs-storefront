/**
 * @module useUpdateCheckoutDestinationMutations
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCheckoutDestination } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrDestinationInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseCheckoutDestination {
  checkoutId: string
  destinationId: string
  destinationInput: CrDestinationInput
}

const setCheckoutDestination = async (params: UseCheckoutDestination) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateCheckoutDestination,
    variables: params,
  })

  return response?.updateCheckoutDestination
}

/**
 * [Mutation hook] useUpdateCheckoutDestinationMutations uses the graphQL mutation
 *
 * <b>updateCheckoutDestination(checkoutId: String!, destinationId: String!, destinationInput: CrDestinationInput): CrDestination</b>
 *
 * Description : Updates a destination specified by checkout Id and destination Id.
 *
 * Parameters passed to function setCheckoutDestination(params: UseCheckoutDestination) => expects checkoutId, destinationId and destinationInput
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.updateCheckoutDestination' which contains the updated destinationContact details.
 */
export const useUpdateCheckoutDestinationMutations = () => {
  const queryClient = useQueryClient()

  return useMutation(setCheckoutDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
