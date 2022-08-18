import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getUserAddressesQuery } from '@/lib/gql/queries'
import { customerAccountContactsKeys } from '@/lib/react-query/queryKeys'

import type { CustomerContactCollection } from '@/lib/gql/types'

export interface UseCustomerContactsResponse {
  data: CustomerContactCollection
  isLoading: boolean
  isSuccess: boolean
}

const loadCustomerAccountContacts = async (accountId: number) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getUserAddressesQuery,
    variables: { accountId },
  })

  return response?.customerAccountContacts
}

export const useCustomerContacts = (accountId: number): UseCustomerContactsResponse => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(
    customerAccountContactsKeys.addressById(accountId),
    () => loadCustomerAccountContacts(accountId),
    {
      refetchOnWindowFocus: false,
      enabled: !!accountId,
    }
  )

  return { data, isLoading, isSuccess }
}
