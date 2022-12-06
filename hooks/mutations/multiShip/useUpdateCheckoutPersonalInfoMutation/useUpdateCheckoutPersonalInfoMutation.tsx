import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { setMultiShipPersonalInfo } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { Checkout } from '@/lib/gql/types'

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

const useUpdateCheckoutPersonalInfoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePersonalInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}

export const useUpdateMultiShipCheckoutPersonalInfoMutation = useUpdateCheckoutPersonalInfoMutation
