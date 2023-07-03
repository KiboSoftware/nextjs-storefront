/**
 * @module useGetB2BUserQuery
 */
import { QueryClient, useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'

import type { B2BUser } from '@/lib/gql/types'
import { getCustomerB2BAccountUsersQuery } from '@/lib/gql/queries'
import React from 'react'

/**
 * @hidden
 */

interface B2bAccountUsersParams {
  b2bAccountId: number | undefined
  filter?: string
  pageSize: number
  startIndex: number
  searchTerm?: string
}

export interface B2BUserResultType {
  data?: {
    items: B2BUser[]
    totalCount: number
    startIndex: number
    pageSize: number
    pageCount: number
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
    document: getCustomerB2BAccountUsersQuery,
    variables: { b2bAccountId, filter, pageSize, startIndex, q: searchTerm },
  })

  return response?.b2bAccountUsers
}

const prefetchB2bUsers = async ({
  b2bAccountId,
  filter,
  pageSize,
  startIndex,
  searchTerm,
}: B2bAccountUsersParams) => {
  const queryClient = new QueryClient()
  // The results of this query will be cached like a normal query
  await queryClient.prefetchQuery({
    queryKey: customerB2BUserKeys.search(startIndex + 5, pageSize, searchTerm),
    queryFn: () =>
      loadCustomerB2BUsers({
        b2bAccountId,
        filter,
        pageSize,
        startIndex: startIndex + 5,
        searchTerm,
      }),
  })
}

export const useGetB2BUserQueries = ({
  b2bAccountId,
  filter,
  pageSize,
  startIndex,
  searchTerm,
}: B2bAccountUsersParams): B2BUserResultType => {
  const { isLoading, isSuccess, isError, error, data, ...result } = useQuery({
    queryKey: customerB2BUserKeys.search(startIndex, pageSize, searchTerm),
    queryFn: () => loadCustomerB2BUsers({ b2bAccountId, filter, pageSize, startIndex, searchTerm }),
    enabled: !!b2bAccountId,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData || undefined,
  })

  // WIP -> Prefetch users
  // if (result.isFetched) prefetchB2bUsers({ b2bAccountId, filter, pageSize, startIndex, searchTerm })
  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  }
}
