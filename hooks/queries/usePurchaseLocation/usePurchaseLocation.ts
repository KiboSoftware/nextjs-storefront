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

export const usePurchaseLocation = (): LocationType => {
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
