/**
 * @module useStoreLocationsQueries
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getSpLocationsQuery } from '@/lib/gql/queries'
import { locationKeys } from '@/lib/react-query/queryKeys'

import type { Maybe, Location } from '@/lib/gql/types'

interface LocationType {
  data: Maybe<Location>[]
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

/**
 * [Query hook] useStoreLocationsQueries uses the graphQL query
 *
 * <b>spLocations(startIndex: Int, pageSize: Int, sortBy: String, filter: String, includeAttributeDefinition: Boolean): LocationCollection</b>
 *
 * Description : Fetches the locations based on filter value, here filter value location code or 'geo near(${latitude}, ${longitude}, ${defaultRange})'.
 * 'geo near' filter could be used to search by current location latitude and longitude.
 *
 * Parameters passed to function getStoreLocations(param: { filter: string } | undefined) => expects filter containing location code or geo location
 *
 * On success, returns the list of location
 *
 * @param searchParams Expect 'location code' or 'geo near(${latitude}, ${longitude}, ${defaultRange})' inside the filter value
 *
 * @returns 'response?.spLocations?.items', which contains location list based on filter value request.
 */

export const useStoreLocationsQueries = (searchParams: { filter: string }): LocationType => {
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
