import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import getConfig from 'next/config'
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getSpLocationsQuery } from '@/lib/gql/queries'
import { decodeParseCookieValue, prepareSetCookieValue } from '@/lib/helpers/cookieHelper'
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

export const setPurchaseLocation = (locationCode: string | null) => {
  if (locationCode === null) {
    deleteCookie(purchaseLocationCookieName)
  } else {
    setCookie(purchaseLocationCookieName, prepareSetCookieValue(locationCode))
  }
}

const getPurchaseLocation = async (param: { filter: string }) => {
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
  } = useQuery([...locationKeys.purchaseLocation, param], () =>
    param ? getPurchaseLocation(param) : {}
  )

  return { data, isLoading, isSuccess, isError }
}
