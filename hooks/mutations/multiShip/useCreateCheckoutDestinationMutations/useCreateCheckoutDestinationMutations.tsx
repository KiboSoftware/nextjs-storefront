import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCheckoutDestination } from '@/lib/gql/mutations'
import { checkoutDestinationKeys, checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrDestinationInput } from '@/lib/gql/types'

export interface CreateCheckoutDestination {
  checkoutId: string
  destinationInput: CrDestinationInput
}

const addCheckoutDestination = async (params: CreateCheckoutDestination) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: createCheckoutDestination,
    variables: params,
  })

  return response?.createCheckoutDestination
}

export const useCreateCheckoutDestinationMutations = () => {
  const queryClient = useQueryClient()

  return useMutation(addCheckoutDestination, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutDestinationKeys.all)
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
