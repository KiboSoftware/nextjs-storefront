import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCustomerAccountCards } from '@/lib/gql/queries'
import { customerAccountCardsKeys } from '@/lib/react-query/queryKeys'

import type { CardCollection } from '@/lib/gql/types'

export interface UseCustomerCardsResponse {
  data: CardCollection
  isLoading: boolean
  isSuccess: boolean
}

const loadCustomerAccountCards = async (accountId: number) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getCustomerAccountCards,
    variables: { accountId },
  })

  return response?.customerAccountCards
}

export const useCustomerCards = (accountId: number): UseCustomerCardsResponse => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(
    customerAccountCardsKeys?.cardById(accountId),
    () => loadCustomerAccountCards(accountId),
    {
      enabled: !!accountId,
    }
  )

  return { data, isLoading, isSuccess }
}
