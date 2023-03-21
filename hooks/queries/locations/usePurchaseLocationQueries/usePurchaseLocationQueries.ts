/**
 * @module usePurchaseLocationQueries
 */
import { getCookie } from 'cookies-next'
import getConfig from 'next/config'
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getSpLocationsQuery } from '@/lib/gql/queries'
import { decodeParseCookieValue } from '@/lib/helpers'
import { locationKeys } from '@/lib/react-query/queryKeys'

import type { Location } from '@/lib/gql/types'

interface LocationType {
  data: Location
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

const { publicRuntimeConfig } = getConfig()
const purchaseLocationCookieName = publicRuntimeConfig.storeLocationCookie

const getPurchaseLocation = async (param: { filter: string } | undefined) => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getSpLocationsQuery,
    variables: param,
  })
  return response?.spLocations?.items[0]
}

/**
 * [Query hook] usePurchaseLocationQueries uses the graphQL query
 *
 * <b>spLocations(startIndex: Int, pageSize: Int, sortBy: String, filter: String, includeAttributeDefinition: Boolean): LocationCollection</b>
 *
 * Description : Fetches the locations based on filter value, here filter contains location code stored in cookie.
 * Store locator icon on header, select the location code by zipcode and set it to cookie.
 * Then retrieving the location code from cookie to get the location name etc using this hook.
 *
 * Parameters passed to function getPurchaseLocation(param: { filter: string } | undefined) => expects filter containing location code from the cookies.
 *
 * On success, returns the first location detail from location list.
 *
 * @returns 'response?.spLocations?.items[0]', which contains first location from list as it will always return single item based on location code.
 */

export const usePurchaseLocationQueries = (): LocationType => {
  const locationCookieValue = decodeParseCookieValue(
    getCookie(purchaseLocationCookieName) as string
  )
  const param = locationCookieValue
    ? {
        filter: `code eq ${locationCookieValue}`,
      }
    : undefined

  const {
    data = {},
    isLoading,
    isSuccess,
    isError,
  } = useQuery(locationKeys.purchaseLocationParams(param), () => getPurchaseLocation(param), {
    enabled: !!param,
  })

  return { data, isLoading, isSuccess, isError }
}
