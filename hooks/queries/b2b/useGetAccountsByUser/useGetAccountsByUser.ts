/**
 * @module useGetB2BUserQuery
 */
import { useQueries, useQuery } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { getAccountsByUser, getCustomerAccount } from '@/lib/gql/queries'
import { accountsByUserKeys } from '@/lib/react-query/queryKeys'

import type { CustomerAccount } from '@/lib/gql/types'

/**
 * @hidden
 */

export interface AccountsByUserResponse {
  activeUsersAccount: CustomerAccount[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const client = makeGraphQLClientWithoutUserClaims()

const customerAccount = async (id: number): Promise<CustomerAccount> => {
  const response = await client.request({
    document: getCustomerAccount,
    variables: { accountId: id },
  })

  return response?.customerAccount
}

const accountsByUser = async (emailAddress: string): Promise<[number]> => {
  const response = await client.request({
    document: getAccountsByUser,
    variables: { emailAddress },
  })

  return response?.accountsByUser
}

/**
 * [Query hook] getCustomerAccount uses the graphQL query
 *
 * <b>customerAccount(accountId: Int!, userId: String): CustomerAccount</b>
 *
 * Description : Fetches the account's details based on account id.
 *
 * Parameters passed to function customerAccount(accountId: string) => expects accountId of type integer.
 *
 * @returns 'response?.customerAccount', which contains details of account.
 */

/**
 * [Query hook] getAccountsByUser uses the graphQL query
 *
 * <b>getAccountsByUser(emailAddress: String, userName: String, getAllAccounts: Boolean): [Int]</b>
 *
 * Description : Fetches the B2B and B2C accounts list based on emailAddress.
 *
 * Parameters passed to function getAccountsByUser(emailAddress: string) => expects emailAddress of type string.
 *
 * @returns 'response?.accountsByUser', which contains list of account ids.
 */

export const useGetAccountsByUser = (emailAddress: string): AccountsByUserResponse => {
  const {
    isLoading,
    isSuccess,
    isError,
    data: accountsByUserData = [],
  } = useQuery({
    queryKey: accountsByUserKeys.accountsByUser(emailAddress),
    queryFn: () => accountsByUser(emailAddress),
    enabled: !!emailAddress,
  })

  const customerAccountData = useQueries({
    queries: accountsByUserData.map((id) => {
      return {
        queryKey: accountsByUserKeys.customerAccount(id.toString()),
        queryFn: () => customerAccount(id),
        enabled: !!emailAddress,
      }
    }),
  })

  const activeUsersAccount: CustomerAccount[] = []
  customerAccountData.map((item) => {
    if (item?.data) {
      activeUsersAccount.push(item.data)
    }
  })

  return {
    activeUsersAccount,
    isLoading,
    isError,
    isSuccess,
  }
}
