import { useQuery } from '@tanstack/react-query'

import { deliverySolutionsKeys } from '@/lib/react-query/queryKeys'

type Rate = {
  type: string
  provider: string
  serviceType: string
  serviceId: string
  deliveryWindowId: string
  deliveryWindows: null | any[]
  requestedPickupTime: number
  requestedPickupTimeEnds: null | number
  requestedDropoffTime: null | number
  requestedDropoffTimeEnds: number
  estimatedPickupTime: number
  estimatedPickupTimeStarts: number
  estimatedPickupTimeEnds: null | number
  estimatedDeliveryTime: number
  estimatedDeliveryTimeStarts: null | number
  estimatedDeliveryTimeEnds: number
  expires: null | number
  currencyCode: string
  currency: null | any
  amount: number
  fee: number
  chargeDetails: null | any
  ruleApplied: boolean
  noEstimate: boolean
  orderType: null | string
  supportsAlternateLocation: boolean
  code: null | string
  storeExternalId: string
  providerTags: any[]
  locationTags: any[]
}

type Error = {
  message: string
  type: string
  code: number
  provider: string
  storeExternalId: string
}

export type RatesResponse = {
  rates: Rate[]
  errors: Error[]
  rateId: string
}

export type Payload = {
  storeExternalIds: string[]
  type: string
  deliveryAddress: {
    street: string
    city: string
    state: string
    zipcode: string
  }
  itemList: {
    quantity: number
    size: {
      height: number
      width: number
      length: number
    }
    sku: string
    weight: number
    price: string
    image: string
    title: string
    description: string
  }[]
  pickupTime: {
    startsAt: number
  }
  dropoffTime: {
    endsAt: number
  }
}

const computeDeliveryFee = (rate: Rate): number => {
  if (rate.fee > rate.amount) {
    return rate.fee - rate.amount
  } else {
    return rate.fee
  }
}

const getDeliveryRates = async (payload: Payload): Promise<number | null> => {
  if (!payload) return null

  const body = {
    ...payload,
    options: {
      allowOrchestration: true,
      displayWinningRates: true,
    },
  }

  try {
    const res = await fetch(`/api/instant-delivery/get-delivery-rates`, {
      method: 'POST',
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      return null
    }

    const resJson: RatesResponse = await res.json()
    const fees = resJson?.rates.length > 0 ? computeDeliveryFee(resJson?.rates[0]) : null
    return fees
  } catch (err) {
    return null
  }
}

export const useGetDeliveryRates = (payload: Payload) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: deliverySolutionsKeys.deliveryRates(payload),
    queryFn: () => getDeliveryRates(payload),
    refetchOnWindowFocus: false,
    enabled: !!payload,
  })

  return { data, isLoading, isSuccess }
}
