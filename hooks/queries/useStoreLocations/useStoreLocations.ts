import { useMutation, useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getSpLocationsQuery } from '@/lib/gql/queries'
import { storeKeys } from '@/lib/react-query/queryKeys'

import type { Location } from '@/lib/gql/types'

interface LocationType {
  data: Location
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

export const useStoreLocations = (param?: { filter: string }): LocationType => {
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
