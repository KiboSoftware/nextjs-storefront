import { CrShippingRate } from '@/lib/gql/types'

export const shippingRateMock: CrShippingRate = {
  data: {
    orderShipmentMethods: [
      {
        shippingMethodCode: '9e7f0b9181bf43a8922caea70148720b',
        shippingMethodName: 'International Flat Rate',
        shippingZoneCode: 'Global',
        isValid: true,
        messages: [],
        data: null,
        currencyCode: 'USD',
        price: 25,
      },
    ],
  },
}
