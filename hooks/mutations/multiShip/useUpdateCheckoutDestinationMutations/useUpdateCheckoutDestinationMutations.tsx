import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCheckoutDestination } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrDestinationInput } from '@/lib/gql/types'

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

export const useUpdateCheckoutDestinationMutations = () => {
  const queryClient = useQueryClient()

  return useMutation(setCheckoutDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
