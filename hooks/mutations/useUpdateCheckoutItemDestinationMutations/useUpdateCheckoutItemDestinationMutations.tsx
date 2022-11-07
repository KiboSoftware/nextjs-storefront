import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCheckoutItemDestination } from '@/lib/gql/mutations'
import { checkoutDestinationKeys } from '@/lib/react-query/queryKeys'

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

export const useUpdateCheckoutItemDestinationMutations = () => {
  const queryClient = useQueryClient()

  return useMutation(setCheckoutItemDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutDestinationKeys.all)
    },
  })
}
