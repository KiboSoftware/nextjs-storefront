import { useQuery } from '@tanstack/react-query'

import { deliverySolutionsKeys } from '@/lib/react-query/queryKeys'

export type DeliveryLocation = {
  street: string
  city: string
  country: string
  state: string
  zipcode: string
}

export type StoreBoundary = {
  value: string[]
  distances: Distance[]
  fulfillments: Fulfillment[]
}

type Distance = {
  storeExternalId: string
  distance: number
  unit: string
}

type Fulfillment = {
  storeExternalId: string
  provider: string
  type: string
  serviceType: string
  tags: string[]
}

const getStoreServiceBoundary = async (
  deliveryAddress: DeliveryLocation | undefined
): Promise<StoreBoundary | undefined> => {
  if (!deliveryAddress) return undefined

  const body = {
    services: ['store-boundary-dsp'],
    deliveryAddress: deliveryAddress,
    sortByDistance: true,
    serviceType: 'Delivery',
    showFulfillmentOptions: true,
  }

  const res = await fetch(`/api/instant-delivery/get-service-boundary`, {
    method: 'POST',
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error(`Request failed with status: ${res.status}`)

  return await res.json()
}

export const useGetStoreServiceBoundary = (deliveryAddress: DeliveryLocation | undefined) => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: deliverySolutionsKeys.serviceBoundary(deliveryAddress),
    queryFn: () => getStoreServiceBoundary(deliveryAddress),
    refetchOnWindowFocus: false,
  })

  return { data, isLoading, isSuccess }
}
