/**
 * @module useGetB2BUserQuery
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { getB2bAccounts } from '@/lib/gql/queries'
import { accountsByUserKeys } from '@/lib/react-query/queryKeys'

import type { B2BAccountCollection } from '@/lib/gql/types'

/**
 * @hidden
 */

export interface B2bAccountsResponse {
  data: B2BAccountCollection | undefined
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const client = makeGraphQLClientWithoutUserClaims()

const b2bAccounts = async (filter: string): Promise<B2BAccountCollection> => {
  const response = await client.request({
    document: getB2bAccounts,
    variables: { filter },
  })

  return response?.b2bAccounts
}

/**
 * [Query hook] getB2bAccounts uses the graphQL query
 *
 * <b>b2bAccounts(startIndex: Int, pageSize: Int, sortBy: String, filter: String, fields: String, q: String, qLimit: Int): B2BAccountCollection</b>
 *
 * Description : Fetches the B2B accounts list based on emailAddress.
 *
 * Parameters passed to function b2bAccounts(filter: string) => expects emailAddress as filter.
 *
 * @returns 'response?.b2bAccounts', which contains list of b2b account with their name which are associated with email address.
 */

export const useGetB2BAccounts = (emailAddress: string): B2bAccountsResponse => {
  const filter = `emailAddress eq ${emailAddress}`
  const {
    isLoading,
    isSuccess,
    isError,
    data,
  } = useQuery({
    queryKey: accountsByUserKeys.b2bAccounts(filter),
    queryFn: () => b2bAccounts(filter),
    enabled: !!emailAddress,
  })

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  }
}
