import getConfig from 'next/config'
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getSpLocationsQuery } from '@/lib/gql/queries'
import {
  decodeParseCookieValue,
  removeClientCookie,
  storeClientCookie,
} from '@/lib/helpers/cookieHelper'
import { storeKeys } from '@/lib/react-query/queryKeys'

import type { Location } from '@/lib/gql/types'

interface LocationType {
  data: Location
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  refetch: any
}

const { publicRuntimeConfig } = getConfig()
const purchaseLocationCookieName = publicRuntimeConfig.storeLocationCookie

export const set = (locationCode: string | null) => {
  if (locationCode === null) {
    removeClientCookie(purchaseLocationCookieName)
  }
  storeClientCookie(purchaseLocationCookieName, locationCode as string)
}

const getStoreLocations = async (param: { filter: string }) => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getSpLocationsQuery,
    variables: param,
  })

  return response.data.spLocations.items[0]
}

export const usePurchaseLocation = (locationCode: string): LocationType => {
  // const locationCookieValue = publicRuntimeConfig.$cookies.get(purchaseLocationCookieName)

  const param = locationCode && {
    filter: `code eq ${decodeParseCookieValue(locationCode)}`,
  }

  const {
    data = {},
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery(storeKeys.all, () => (param ? getStoreLocations(param) : {}), {
    enabled: false,
  })

  return { data, isLoading, isSuccess, isError, refetch }
}
