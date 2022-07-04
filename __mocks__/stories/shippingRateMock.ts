import type { ShippingRate } from '@/lib/gql/types'

export const shippingRateMock: { orderShipmentMethods: ShippingRate[] } = {
  orderShipmentMethods: [
    {
      shippingMethodCode: '691f94b2b57e47239456ada600cdcc9e',
      shippingMethodName: 'Flat Rate',
      shippingZoneCode: 'Americas',
      isValid: true,
      messages: [],
      data: null,
      currencyCode: 'USD',
      price: 15,
    },
  ],
}
