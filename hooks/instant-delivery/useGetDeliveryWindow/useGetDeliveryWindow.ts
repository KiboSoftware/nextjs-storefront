import { useQuery } from '@tanstack/react-query'
import { NextMiddlewareResult } from 'next/dist/server/web/types'

import { deliverySolutionsKeys } from '@/lib/react-query/queryKeys'

type DeliveryWindowResponse = {
  storeExternalId: string
  timeZone: string
  tags: string[]
  delivery: Delivery[]
}[]

type Delivery = {
  category: string
  pickAndPack: number
  date: string
  windows: DeliveryWindow[]
}

type DeliveryWindow = {
  pickupTime: {
    startsAt: number
  }
  dropoffTime: {
    startsAt: number
    endsAt: number
  }
  tz: string
  windowId: null | string
  provider: null | string
}

const getDeliveryWindow = async (
  storeExternalIds: string[] | undefined | null,
  futureDate?: string
): Promise<DeliveryWindowResponse | null> => {
  if (!storeExternalIds) return null

  const body = {
    storeExternalIds: storeExternalIds,
    types: ['delivery'],
    dspCheck: false,
    ...(futureDate ? { startDate: futureDate } : { numberOfDays: 2 }),
  }

  try {
    const res = await fetch(`/api/instant-delivery/get-delivery-window`, {
      method: 'POST',
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      return null
    }

    const resJson = await res.json()
    return resJson
  } catch (err) {
    return null
  }
}

export const useGetDeliveryWindow = (
  storeExternalIds: string[] | undefined | null,
  futureDate?: string
) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: deliverySolutionsKeys.deliveryWindow(storeExternalIds, futureDate),
    queryFn: () => getDeliveryWindow(storeExternalIds, futureDate),
    refetchOnWindowFocus: false,
    enabled: !!storeExternalIds,
  })

  return { data, isLoading, isSuccess }
}
