import type { CheckoutGroupRates } from '@/lib/gql/types'

export const checkoutGroupRatesMock: { checkoutShippingMethods: CheckoutGroupRates[] } = {
  checkoutShippingMethods: [
    {
      groupingId: '6c8d2679e69a429db72ca1fcd2e56e77',
      shippingRates: [
        {
          shippingMethodCode: '691f94b2b57e47239456ada600cdcc9e',
          shippingMethodName: 'Flat Rate',
          shippingZoneCode: 'Americas',
          isValid: true,
          messages: [],
          data: null,
          currencyCode: null,
          price: 15,
        },
      ],
    },
    {
      groupingId: '4c74f3cd4b6e4ca98bd4e94c991ebe0a',
      shippingRates: [
        {
          shippingMethodCode: '691f94b2b57e47239456ada600cdcc9e',
          shippingMethodName: 'Flat Rate',
          shippingZoneCode: 'Americas',
          isValid: true,
          messages: [],
          data: null,
          currencyCode: null,
          price: 15,
        },
      ],
    },
  ],
}
