import type { CrShippingRate } from '@/lib/gql/types'

export const shippingRateMock: { orderShipmentMethods: CrShippingRate[] } = {
  orderShipmentMethods: [
    {
      shippingMethodCode: 'f863f9f5d4cf4f088105ae3200fd4f9b',
      shippingMethodName: 'Second Day Air',
      shippingZoneCode: 'United States',
      isValid: true,
      messages: [],
      data: null,
      currencyCode: 'USD',
      price: 15,
    },
    {
      shippingMethodCode: '290ec0ab460b4a83acdbae3200fd4f9b',
      shippingMethodName: 'Next Day AIr',
      shippingZoneCode: 'United States',
      isValid: true,
      messages: [],
      data: null,
      currencyCode: 'USD',
      price: 25,
    },
    {
      shippingMethodCode: '46be3c2a4f17412ca1daacb801232b0c',
      shippingMethodName: 'Flat Rate',
      shippingZoneCode: 'United States',
      isValid: true,
      messages: [],
      data: null,
      currencyCode: 'USD',
      price: 0,
    },
  ],
}
