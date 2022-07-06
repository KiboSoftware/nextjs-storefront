import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getSpLocationsQuery } from '@/lib/gql/queries'
import { storeKeys } from '@/lib/react-query/queryKeys'
import type { GeoCoords } from '@/lib/types/GeoCoords'

import type { Maybe, Location } from '@/lib/gql/types'

interface LocationType {
  data: { locations?: Maybe<Location>[] }
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  refetch: any
}

const getStoreLocations = async (param: { filter: string }) => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getSpLocationsQuery,
    variables: param,
  })

  return response.spLocations.items
}

export const useStoreLocations = (
  zipCode: string,
  currentLocation?: GeoCoords,
  defaultRange?: string
): LocationType => {
  const param = (currentLocation || zipCode) && {
    filter: `geo near(${
      zipCode ? `${zipCode}` : `${currentLocation?.latitude},${currentLocation?.longitude}`
    },${defaultRange})`,
  }
  const {
    data = {},
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery(storeKeys.all, () => (param ? getStoreLocations(param) : {}), {
    enabled: false,
    cacheTime: 0,
    staleTime: 0,
    initialData: undefined,
  })

  return { data, isLoading, isSuccess, isError, refetch }
}
