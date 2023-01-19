import type { SubscriptionCollection, Subscription } from '@/lib/gql/types'

export const subscriptionCollectionMock: { subscriptions: SubscriptionCollection } = {
  subscriptions: {
    startIndex: 1,
    pageSize: 20,
    pageCount: 1,
    totalCount: 2,
    items: [
      {
        id: '149ceaac15c2eb00016c498e000045a4',
        parentOrderId: '149cea5a64f5110001a46c10000045a4',
        number: 1,
        status: 'Active',
        items: [
          {
            id: '5f9a38df85824d17a2a0af6d00fcbe06',
            quantity: 1,
            product: {
              mfgPartNumber: null,
              upc: null,
              sku: null,
              fulfillmentTypesSupported: ['DirectShip', 'InStorePickup', 'Delivery'],
              imageAlternateText: null,
              imageUrl: null,
              variationProductCode: null,
              options: [],
              properties: [
                {
                  attributeFQN: 'system~subscription-mode',
                  name: 'Subscription Mode',
                  dataType: 'String',
                  isMultiValue: false,
                  values: [
                    {
                      stringValue: 'Subscription and one-time purchase',
                      value: 'SAOT',
                    },
                  ],
                },
                {
                  attributeFQN: 'system~subscription-frequency',
                  name: 'Subscription Frequency',
                  dataType: 'String',
                  isMultiValue: true,
                  values: [
                    {
                      stringValue: '15 Days',
                      value: 'D15',
                    },
                    {
                      stringValue: '45 Days',
                      value: 'D45',
                    },
                    {
                      stringValue: '60 Days',
                      value: 'D60',
                    },
                    {
                      stringValue: '1 month',
                      value: 'M1',
                    },
                    {
                      stringValue: '3 months',
                      value: 'M3',
                    },
                    {
                      stringValue: '4 months',
                      value: 'M4',
                    },
                    {
                      stringValue: '1 week',
                      value: 'W1',
                    },
                  ],
                },
              ],
              categories: [],
            },
          },
        ],
        fulfillmentInfo: {
          fulfillmentContact: {
            firstName: 'Gopal',
            lastNameOrSurname: 'Nichal',
            address: {
              address1: 'MG Road',
              address2: 'Koregoan Park',
              cityOrTown: 'Pune',
              stateOrProvince: 'TX',
              postalOrZipCode: '77025',
              countryCode: 'US',
            },
          },
        },
        frequency: {
          unit: 'Month',
          value: 1,
        },
        nextOrderDate: '2023-02-01T07:44:26.625Z',
        discountedSubtotal: 222,
        dutyTotal: 0,
        feeTotal: 0,
        handlingSubTotal: 0.75,
        handlingTaxTotal: 0,
        handlingTotal: 0.75,
        itemLevelAdjustmentsTotal: 0,
        itemLevelHandlingDiscountTotal: 0,
        itemLevelProductDiscountTotal: 0,
        itemLevelShippingDiscountTotal: 0,
        itemTaxTotal: 0,
        itemTotal: 222,
        orderLevelHandlingDiscountTotal: 0,
        orderLevelProductDiscountTotal: 0,
        orderLevelShippingDiscountTotal: 0,
        ordinal: 1,
        shippingAmount: 15,
        shippingSubTotal: 15,
        shippingTaxTotal: 0,
        shippingTotal: 15,
        siteId: 22116,
        subTotal: 222,
        tenantId: 17828,
        total: 237.75,
      },
      {
        id: '149ceaac15c2eb00016c498e000045v4',
        parentOrderId: '149cea5a64f5110001a46c10000045v4',
        number: 2,
        status: 'Active',
        items: [
          {
            id: '5f9a38df85824d17a2a0af6d00fcbe26',
            quantity: 1,
            product: {
              mfgPartNumber: null,
              upc: null,
              sku: null,
              fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
              imageAlternateText: null,
              imageUrl: null,
              variationProductCode: null,
              options: [],
              properties: [
                {
                  attributeFQN: 'system~subscription-mode',
                  name: 'Subscription Mode',
                  dataType: 'String',
                  isMultiValue: false,
                  values: [
                    {
                      stringValue: 'Subscription and one-time purchase',
                      value: 'SAOT',
                    },
                  ],
                },
              ],
              categories: [],
            },
          },
        ],
        fulfillmentInfo: {
          fulfillmentContact: {
            firstName: 'Rohit',
            lastNameOrSurname: 'Hedda',
            address: {
              address1: 'drivewood',
              address2: 'new york',
              cityOrTown: 'houston',
              stateOrProvince: 'TX',
              postalOrZipCode: '77027',
              countryCode: 'US',
            },
          },
        },
        frequency: {
          unit: 'Month',
          value: 3,
        },
        nextOrderDate: '2023-05-15T07:44:26.625Z',
        discountedSubtotal: 222,
        dutyTotal: 0,
        feeTotal: 0,
        handlingSubTotal: 0.75,
        handlingTaxTotal: 0,
        handlingTotal: 0.75,
        itemLevelAdjustmentsTotal: 0,
        itemLevelHandlingDiscountTotal: 0,
        itemLevelProductDiscountTotal: 0,
        itemLevelShippingDiscountTotal: 0,
        itemTaxTotal: 0,
        itemTotal: 222,
        orderLevelHandlingDiscountTotal: 0,
        orderLevelProductDiscountTotal: 0,
        orderLevelShippingDiscountTotal: 0,
        ordinal: 1,
        shippingAmount: 15,
        shippingSubTotal: 15,
        shippingTaxTotal: 0,
        shippingTotal: 15,
        siteId: 22116,
        subTotal: 222,
        tenantId: 17828,
        total: 237.75,
      },
    ],
  },
}

export const subscriptionItemMock: { items: Subscription } = {
  items: {
    id: '149ceaac15c2eb00016c498e000045a4',
    parentOrderId: '149cea5a64f5110001a46c10000045a4',
    number: 1,
    status: 'Active',
    items: [
      {
        id: '5f9a38df85824d17a2a0af6d00fcbe06',
        quantity: 1,
        product: {
          mfgPartNumber: null,
          upc: null,
          sku: null,
          fulfillmentTypesSupported: ['DirectShip', 'InStorePickup', 'Delivery'],
          imageAlternateText: null,
          imageUrl: null,
          variationProductCode: null,
          options: [],
          properties: [
            {
              attributeFQN: 'system~subscription-mode',
              name: 'Subscription Mode',
              dataType: 'String',
              isMultiValue: false,
              values: [
                {
                  stringValue: 'Subscription and one-time purchase',
                  value: 'SAOT',
                },
              ],
            },
            {
              attributeFQN: 'system~subscription-frequency',
              name: 'Subscription Frequency',
              dataType: 'String',
              isMultiValue: true,
              values: [
                {
                  stringValue: '15 Days',
                  value: 'D15',
                },
                {
                  stringValue: '45 Days',
                  value: 'D45',
                },
                {
                  stringValue: '60 Days',
                  value: 'D60',
                },
                {
                  stringValue: '1 month',
                  value: 'M1',
                },
                {
                  stringValue: '3 months',
                  value: 'M3',
                },
                {
                  stringValue: '4 months',
                  value: 'M4',
                },
                {
                  stringValue: '1 week',
                  value: 'W1',
                },
              ],
            },
          ],
          categories: [],
        },
      },
    ],
    fulfillmentInfo: {
      fulfillmentContact: {
        firstName: 'test',
        lastNameOrSurname: 'tests',
        address: {
          address1: 'drivewood',
          address2: null,
          cityOrTown: 'houston',
          stateOrProvince: 'TX',
          postalOrZipCode: '77025',
          countryCode: 'US',
        },
      },
    },
    frequency: {
      unit: 'Month',
      value: 1,
    },
    nextOrderDate: '2023-02-01T07:44:26.625Z',
    discountedSubtotal: 222,
    dutyTotal: 0,
    feeTotal: 0,
    handlingSubTotal: 0.75,
    handlingTaxTotal: 0,
    handlingTotal: 0.75,
    itemLevelAdjustmentsTotal: 0,
    itemLevelHandlingDiscountTotal: 0,
    itemLevelProductDiscountTotal: 0,
    itemLevelShippingDiscountTotal: 0,
    itemTaxTotal: 0,
    itemTotal: 222,
    orderLevelHandlingDiscountTotal: 0,
    orderLevelProductDiscountTotal: 0,
    orderLevelShippingDiscountTotal: 0,
    ordinal: 1,
    shippingAmount: 15,
    shippingSubTotal: 15,
    shippingTaxTotal: 0,
    shippingTotal: 15,
    siteId: 22116,
    subTotal: 222,
    tenantId: 17828,
    total: 237.75,
  },
}

export const noSubscriptionMock: { subscriptions: SubscriptionCollection } = {
  subscriptions: {
    startIndex: 1,
    pageSize: 20,
    pageCount: 1,
    totalCount: 0,
    items: [],
  },
}
