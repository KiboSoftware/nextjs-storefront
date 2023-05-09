/**
 * @module useUserQueries
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'

import type { B2BUser } from '@/lib/gql/types'
import { getCustomerB2BAccountUsers } from '@/lib/gql/queries'

/**
 * @hidden
 */

interface B2bAccountUsersParams {
  b2bAccountId: number | undefined
  filter?: string
  pageSize?: number
  startIndex?: number
  searchTerm?: string
}
export interface B2BUserResultType {
  data?: {
    items: B2BUser[]
    totalCount: number
  }
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: any
}
const client = makeGraphQLClient()

const loadCustomerB2BUsers = async ({
  b2bAccountId,
  filter,
  pageSize,
  startIndex,
  searchTerm,
}: B2bAccountUsersParams) => {
  filter = 'isRemoved eq false'
  const response = await client.request({
    document: getCustomerB2BAccountUsers,
    variables: { b2bAccountId, filter, pageSize, startIndex, q: searchTerm },
  })

  return response?.b2bAccountUsers
}

export const useCustomerB2BUsersQueries = ({
  b2bAccountId,
  filter,
  pageSize,
  startIndex,
  searchTerm,
}: B2bAccountUsersParams): B2BUserResultType => {
  const { data, isLoading, isSuccess, isError, error } = useQuery(
    customerB2BUserKeys.users,
    () => {
      return loadCustomerB2BUsers({ b2bAccountId, filter, pageSize, startIndex, searchTerm })
    },
    {
      enabled: !!b2bAccountId,
      refetchOnReconnect: true,
    }
  )
  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  }
}
