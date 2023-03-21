/**
 * @module useProductLocationInventoryQueries
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getProductLocationInventoryQuery } from '@/lib/gql/queries'
import { inventoryKeys } from '@/lib/react-query/queryKeys'

import type { LocationInventory } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseProductLocationInventoryType {
  data: LocationInventory[]
  isLoading: boolean
  isSuccess: boolean
}

const loadProductLocationInventory = async (productCode: string, locationCodes: string) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getProductLocationInventoryQuery,
    variables: { productCode, locationCodes },
  })

  return response?.productLocationInventory?.items
}

/**
 * [Query hook] useProductLocationInventoryQueries uses the graphQL query
 *
 * <b>productLocationInventory(productCode: String!, locationCodes: String): LocationInventoryCollection</b>
 *
 * Description : Fetches details about inventory available on specified locations by providing productCode and locationCodes.
 *
 * Parameters passed to function loadProductLocationInventory(productCode: string, locationCodes: string) => expects productCode and locationCodes.
 *
 * On success, returns the inventory details with 'refetchOnWindowFocus' set to false for this react query
 *
 * @param productCode unique product code for which inventory needed to be fetched
 * @param locationCodes location codes could be single string value or comma separated string value
 *
 * @returns 'response?.productLocationInventory?.items', which contains list of available inventories.
 */

export const useProductLocationInventoryQueries = (
  productCode: string,
  locationCodes: string
): UseProductLocationInventoryType => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(
    inventoryKeys.inventoryParams(productCode, locationCodes),
    () => loadProductLocationInventory(productCode, locationCodes),
    {
      refetchOnWindowFocus: false,
      enabled: !!(productCode && locationCodes),
    }
  )

  return { data, isLoading, isSuccess }
}
