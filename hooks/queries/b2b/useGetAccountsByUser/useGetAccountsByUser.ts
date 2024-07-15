/**
 * @module useGetB2BUserQuery
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient, makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { getAccountsByUser } from '@/lib/gql/queries'
import { accountsByUserKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

export interface AccountsByUserResponse {
  data: number[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const client = makeGraphQLClientWithoutUserClaims()

const accountsByUser = async (emailAddress: string): Promise<[number]> => {
  const response = await client.request({
    document: getAccountsByUser,
    variables: { emailAddress },
  })

  return response?.accountsByUser
}

/**
 * [Query hook] getAccountsByUser uses the graphQL query
 *
 * <b>getAccountsByUser(emailAddress: String, userName: String, getAllAccounts: Boolean): [Int]</b>
 *
 * Description : Fetches the B2B accounts list based on emailAddress.
 *
 * Parameters passed to function getB2BAccountHierarchy(emailAddress: string) => expects emailAddress of type string.
 *
 * @returns 'response?.getB2BAccountHierarchy', which contains list of account ids.
 */

export const useGetAccountsByUser = (emailAddress: string): AccountsByUserResponse => {
  const {
    isLoading,
    isSuccess,
    isError,
    data = [],
  } = useQuery({
    queryKey: accountsByUserKeys.accountsByUser(emailAddress),
    queryFn: () => accountsByUser(emailAddress),
    enabled: !!emailAddress,
  })

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  }
}
