/**
 * @module useGetB2BUserQuery
 */
import { useQueries, useQuery } from '@tanstack/react-query'

import { makeGraphQLClient, makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { getAccountsByUser, getB2bAccounts } from '@/lib/gql/queries'
import { accountsByUserKeys } from '@/lib/react-query/queryKeys'

import { B2BAccountCollection } from '@/lib/gql/types'

/**
 * @hidden
 */

export interface AccountsByUserResponse {
  activeUsersAccount: any[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}


export interface B2bAccountsResponse {
  data: B2BAccountCollection | undefined
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const client = makeGraphQLClientWithoutUserClaims()

const b2bAccounts = async (id: number): Promise<B2BAccountCollection> => {
  const response = await client.request({
    document: getB2bAccounts,
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
    data: accountsByUserData = [],
  } = useQuery({
    queryKey: accountsByUserKeys.accountsByUser(emailAddress),
    queryFn: () => accountsByUser(emailAddress),
    enabled: !!emailAddress,
  })

  const filter = `emailAddress eq ${emailAddress}`
  const b2bAccountsData = useQueries({
    queries: accountsByUserData.map((id) => {
      return {
        queryKey: accountsByUserKeys.b2bAccounts(id.toString()),
        queryFn: () => b2bAccounts(id),
        enabled: !!emailAddress,
      }
    })
    
  })

  const activeUsersAccount: any[] = []
  b2bAccountsData.map((item) => {
    activeUsersAccount.push(item.data)
  })

  

  console.log("activeUsersAccount", activeUsersAccount)
  console.log("b2bAccountsData", b2bAccountsData)

  // const activeUsersAccount: any[] = []
  // if(accountsByUserData?.length && b2bAccountsData?.items?.length) {
  //   const b2bAccountWithName = b2bAccountsData?.items.filter(item => accountsByUserData.includes(item?.id as number))
  //   if(accountsByUserData.length === 1 && b2bAccountWithName.length === 0) {
  //     activeUsersAccount.push({ id: accountsByUserData[0], name: '' })
  //   } else {
  //     activeUsersAccount.push(...b2bAccountWithName)
  //   }
  // }

  return {
    // activeUsersAccount,
    activeUsersAccount,
    isLoading,
    isError,
    isSuccess,
  }
}
