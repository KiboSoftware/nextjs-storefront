import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getUserAddressesQuery } from '@/lib/gql/queries'
import { userAddressKeys } from '@/lib/react-query/queryKeys'

import type { CustomerContactCollection } from '@/lib/gql/types'

export interface UserAddressType {
  data?: CustomerContactCollection
  isLoading: boolean
  isSuccess: boolean
}
export interface UseUserAddresses {
  accountId: number
}

const getUserAddresses = async (accountId: number) => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getUserAddressesQuery,
    variables: { accountId },
  })
  return response?.customerAccountContacts
}

export const useUserAddressesQueries = ({ accountId }: UseUserAddresses): UserAddressType => {
  const {
    data = {},
    isLoading,
    isSuccess,
  } = useQuery(userAddressKeys.all, () => getUserAddresses(accountId), {
    refetchOnWindowFocus: false,
    enabled: !!accountId,
  })

  return { data, isLoading, isSuccess }
}
