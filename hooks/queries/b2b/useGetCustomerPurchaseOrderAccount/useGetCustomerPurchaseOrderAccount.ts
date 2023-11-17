/**
 * @module useGetCustomerPurchaseOrderAccount
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCustomerPurchaseOrderQuery } from '@/lib/gql/queries'
import { customerPurchaseOrderAccountKeys } from '@/lib/react-query/queryKeys'

import { CustomerPurchaseOrderAccount } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseCustomerPurchaseOrderAccountResponse {
  data?: CustomerPurchaseOrderAccount
  isLoading: boolean
  isSuccess: boolean
}

const loadCustomerCustomerPurchaseOrderAccount = async (
  accountId: number
): Promise<CustomerPurchaseOrderAccount> => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getCustomerPurchaseOrderQuery,
    variables: { accountId },
  })

  return response?.customerPurchaseOrderAccount
}

/**
 * [Query hook] useGetCustomerPurchaseOrderAccount uses the graphQL query
 *
 * <b>customerPurchaseOrderAccount(accountId: Int!): CustomerPurchaseOrderAccount</b>
 *
 * Description : Fetches customer purchase order account details for a particular user
 *
 * Parameters passed to function loadCustomerCustomerPurchaseOrderAccount(accountId: number) => expects accountId
 *
 * On success, returns the purchase order account data of customer's account
 *
 * @param accountId stores the user id of the user whose purchase order account details needed to be fetched
 *
 * @returns 'response?.customerPurchaseOrderAccount' which contains all purchase order account data for the requested user based on accountId
 */

export const useGetCustomerPurchaseOrderAccount = (
  accountId: number,
  isB2BUser: boolean
): UseCustomerPurchaseOrderAccountResponse => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: customerPurchaseOrderAccountKeys?.purchaseOrderAccountById(accountId),
    queryFn: () => loadCustomerCustomerPurchaseOrderAccount(accountId),
    enabled: !!(accountId && isB2BUser),
    refetchOnWindowFocus: false,
  })

  return { data, isLoading, isSuccess }
}
