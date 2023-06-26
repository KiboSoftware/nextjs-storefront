/**
 * @module useUpdateItemDestination
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCheckoutItemDestination } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */
export interface UseCheckoutItemDestination {
  checkoutId: string
  itemId: string
  destinationId: string
}

const setCheckoutItemDestination = async (params: UseCheckoutItemDestination) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateCheckoutItemDestination,
    variables: params,
  })

  return response?.updateCheckoutItemDestination
}

/**
 * [Mutation hook] useUpdateItemDestination uses the graphQL mutation
 *
 * <b>updateCheckoutItemDestination(checkoutId: String!, itemId: String!, destinationId: String!): Checkout</b>
 *
 * Description : Associate an item in multiship to a destination.
 *
 * Parameters passed to function setCheckoutItemDestination(params: UseCheckoutItemDestination) => expects checkoutId, destinationId and itemId
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.updateCheckoutItemDestination' which contains the groupings of each item associated with a destination in multiship.
 */
export const useUpdateItemDestination = () => {
  const queryClient = useQueryClient()

  return {
    updateCheckoutItemDestination: useMutation({
      mutationFn: setCheckoutItemDestination,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
