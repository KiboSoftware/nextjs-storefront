/**
 * @module useCustomerContactsQueries
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getUserAddressesQuery } from '@/lib/gql/queries'
import { customerAccountContactsKeys } from '@/lib/react-query/queryKeys'

import type { CustomerContactCollection } from '@/lib/gql/types'

/**
 * @hidden
 */
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

/**
 * [Query hook] useCustomerContactsQueries uses the graphQL query
 *
 * <b>customerAccountContacts(accountId: Int!,startIndex: Int,pageSize: Int): CustomerContactCollection</b>
 *
 * Description : Fetches saved addresses for a particular user
 *
 * Parameters passed to function loadCustomerAccountContacts(accountId: number) => expects accountId.
 *
 * On success, returns the saved addresses with 'refetchOnWindowFocus' set to false for this react query
 *
 * @param accountId stores the user id of the user whose saved address details needed to be fetched
 *
 * @returns 'response?.customerAccountContacts' which contains all the saved addresses details for the requested user based on accountId
 */

export const useCustomerContactsQueries = (accountId: number): UseCustomerContactsResponse => {
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
