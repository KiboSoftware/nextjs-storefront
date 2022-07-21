import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getSpLocationsQuery } from '@/lib/gql/queries'
import { locationKeys } from '@/lib/react-query/queryKeys'

import type { Maybe, Location } from '@/lib/gql/types'

interface LocationType {
  data: { locations?: Maybe<Location>[] }
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

const getStoreLocations = async (param: { filter: string }) => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getSpLocationsQuery,
    variables: param,
  })

  return response.spLocations.items
}

export const useStoreLocations = (searchParams: { filter: string }): LocationType => {
  const {
    data = {},
    isLoading,
    isSuccess,
    isError,
  } = useQuery(locationKeys.locationsParams(searchParams), () => getStoreLocations(searchParams), {
    enabled: !!searchParams.filter,
  })

  return { data, isLoading, isSuccess, isError }
}
