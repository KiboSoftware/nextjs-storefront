import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

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

const today = dayjs()
const todayYYYYMMDD = dayjs(today).format('YYYY-MM-DD')

const getDeliveryWindow = async (
  storeExternalIds: string[] | undefined | null,
  futureDate?: string
): Promise<DeliveryWindowResponse | null> => {
  if (!storeExternalIds) return null

  const body = {
    storeExternalIds: storeExternalIds,
    types: ['delivery'],
    dspCheck: false,
    ...(futureDate ? { startDate: futureDate } : { startDate: todayYYYYMMDD, numberOfDays: 2 }),
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
/**
 * [hook] useGetDeliveryWindow uses the custom api get-delivery window
 *
 * <b>getDeliveryWindow(storeExtenalIds, futureDate)</b>
 *
 * Description : Get delivery windows based on storeExternalsIds or futureDate
 *
 * Parameters passed to function getDeliveryWindow(storeExtenalIds, futureDate) => expects object of type storeExtenalIds and futureDate
 *
 */

export const useGetDeliveryWindow = (
  storeExternalIds: string[] | undefined | null,
  futureDate?: string
) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: deliverySolutionsKeys.deliveryWindow(storeExternalIds, futureDate),
    queryFn: () => getDeliveryWindow(storeExternalIds, futureDate),
    refetchOnWindowFocus: false,
    enabled: (storeExternalIds && storeExternalIds?.length > 0) || false,
  })

  return { data, isLoading, isSuccess }
}
