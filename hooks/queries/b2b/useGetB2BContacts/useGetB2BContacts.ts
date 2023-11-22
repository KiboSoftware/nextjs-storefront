/**
 * @module useGetB2BContacts
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getB2BContactsQuery } from '@/lib/gql/queries'
import { b2bContactsKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

const client = makeGraphQLClient()

const fetchB2BContacts = async (param: any): Promise<any> => {
  const response = await client.request({
    document: getB2BContactsQuery,
    variables: { ...param },
  })

  return response?.getB2BContacts
}

/**
 * [Query hook] useGetB2BContacts uses the graphQL query
 *
 * <b>getB2BContacts(startIndex: Int, pageSize: Int, sortBy: String, filter: String, q: String, qLimit: Int): ExtendedCustomerContactCollection</b>
 *
 * Description : Fetches the B2B contacts list based on startIndex, pageSize, sortBy, filter, q and qLimit.
 *
 * Parameters passed to function fetchB2BContacts({startIndex, pageSize, sortBy, filter, q , qLimit}) => expects object containing startIndex, pageSize, sortBy, filter, fields, q and qLimit.
 *
 * @returns 'response?.getB2BContacts', which contains list of b2b contacts.
 */

export const useGetB2BContacts = (param: any, initialData?: any) => {
  const { isLoading, isSuccess, isError, error, data } = useQuery({
    queryKey: b2bContactsKeys.quotesParams(param),
    queryFn: () => fetchB2BContacts(param),
    placeholderData: (previousData) => previousData ?? undefined,
    initialData,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  }
}
