import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getProductLocationInventoryQuery } from '@/lib/gql/queries'
import { inventoryKeys } from '@/lib/react-query/queryKeys'

import type { LocationInventory } from '@/lib/gql/types'

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

export const useProductLocationInventory = (
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
