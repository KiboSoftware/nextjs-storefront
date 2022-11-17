import type { Checkout } from '@/lib/gql/types'

const multiShipCheckoutResponse: Checkout = {
  id: '147542c811037d000104fe140000678b',
  originalCartId: '1475090c07e0230001d986680000678b',
  submittedDate: null,
  items: [
    {
      destinationId: null,
      fulfillmentLocationCode: 'SACRAMENTO',
      fulfillmentMethod: 'Ship',
      id: 'b22965e4f1aa46229038af4f00dd3a2c',
      total: 90,
      subtotal: 100,
      discountTotal: 10,
      quantity: 1,
      product: {
        productCode: 'BackP_024',
        name: 'Katahdin 50 Pack',
        description:
          'The JanSport Katahdin 50 pack for weekend trips has adjustable torso, vented back panel, great organization and plenty of straps, so you can wrangle your load while keeping the gear accessible.',
        imageUrl:
          '//cdn-sb.mozu.com/26507-41315/cms/41315/files/1b6b9ecd-912a-412f-8d11-c2660d265aff',
        options: [],
        properties: [
          {
            attributeFQN: 'tenant~availability',
            name: 'Availability',
            values: [
              {
                value: '24-48hrs',
              },
            ],
          },
          {
            attributeFQN: 'tenant~popularity',
            name: 'Popularity',
            values: [
              {
                value: 3,
              },
            ],
          },
          {
            attributeFQN: 'tenant~brand',
            name: 'Brand',
            values: [
              {
                value: 'JanSport',
              },
            ],
          },
          {
            attributeFQN: 'tenant~rating',
            name: 'Rating',
            values: [
              {
                value: 3,
              },
            ],
          },
          {
            attributeFQN: 'tenant~best-use',
            name: 'Best Use',
            values: [
              {
                value: 'Backpacking',
              },
            ],
          },
          {
            attributeFQN: 'tenant~season',
            name: 'Season',
            values: [
              {
                value: 'Winter',
              },
            ],
          },
          {
            attributeFQN: 'tenant~role',
            name: 'role',
            values: [
              {
                value: 'Unapproved',
              },
            ],
          },
          {
            attributeFQN: 'tenant~bag-style',
            name: 'Bag Style',
            values: [
              {
                value: 'Backpack',
              },
            ],
          },
          {
            attributeFQN: 'tenant~brand-colors',
            name: 'Color',
            values: [
              {
                value: 'Grey-Tar/Forge-Grey',
              },
            ],
          },
          {
            attributeFQN: 'tenant~faset-color',
            name: 'Color',
            values: [
              {
                value: 'Grey',
              },
            ],
          },
          {
            attributeFQN: 'tenant~frame-type',
            name: 'Frame Type',
            values: [
              {
                value: 'Internal-Frame',
              },
            ],
          },
          {
            attributeFQN: 'tenant~gender',
            name: 'Gender',
            values: [
              {
                value: 'Unisex',
              },
            ],
          },
          {
            attributeFQN: 'tenant~hydration-compatible',
            name: 'Hydration Compatible',
            values: [
              {
                value: true,
              },
            ],
          },
          {
            attributeFQN: 'tenant~material',
            name: 'Material',
            values: [
              {
                value: '600-denier-polyester',
              },
            ],
          },
          {
            attributeFQN: 'tenant~number-of-exterior-pockets',
            name: 'Number of Exterior Pockets',
            values: [
              {
                value: '5---main-compartment',
              },
            ],
          },
          {
            attributeFQN: 'tenant~pack-loading',
            name: 'Pack Loading',
            values: [
              {
                value: 'Top',
              },
            ],
          },
          {
            attributeFQN: 'tenant~size',
            name: 'Size',
            values: [
              {
                value: 'One-Size',
              },
            ],
          },
          {
            attributeFQN: 'tenant~sleeping-bag-compartment',
            name: 'Sleeping Bag Compartment',
            values: [
              {
                value: false,
              },
            ],
          },
          {
            attributeFQN: 'tenant~trip-length-capacity',
            name: 'Trip Length / Capacity',
            values: [
              {
                value: 'Wekend--35-50L-',
              },
            ],
          },
          {
            attributeFQN: 'tenant~backorder-days',
            name: 'BackOrderDays',
            values: [
              {
                value: 7,
              },
            ],
          },
        ],
        sku: null,
        price: {
          price: 100,
          salePrice: null,
        },
        categories: [
          {
            id: 19,
          },
          {
            id: 36,
          },
          {
            id: 333,
          },
          {
            id: 359,
          },
        ],
      },
    },
  ],
  groupings: [
    {
      id: '40e116b8adcb469d87d6462c21b54e2b',
      destinationId: null,
      fulfillmentMethod: 'Ship',
      orderItemIds: ['b22965e4f1aa46229038af4f00dd3a2c'],
      shippingMethodCode: null,
      shippingMethodName: null,
      standaloneGroup: false,
      shippingDiscounts: [],
      handlingDiscounts: [],
      dutyAmount: null,
      dutyTotal: 0,
      shippingAmount: 0,
      shippingSubTotal: 0,
      itemLevelShippingDiscountTotal: 0,
      orderLevelShippingDiscountTotal: 0,
      shippingTax: null,
      shippingTaxTotal: 0,
      shippingTotal: 0,
      handlingAmount: null,
      handlingSubTotal: 0,
      itemLevelHandlingDiscountTotal: 0,
      orderLevelHandlingDiscountTotal: 0,
      handlingTax: null,
      handlingTaxTotal: 0,
      handlingTotal: 0,
      taxData: null,
    },
  ],
  destinations: [],
  payments: [],
  amountRemainingForPayment: 90,
  acceptsMarketing: false,
  customerAccountId: null,
  email: null,
  customerTaxId: null,
  isTaxExempt: false,
  currencyCode: 'USD',
  priceListCode: '',
  attributes: null,
  shopperNotes: null,
  availableActions: ['SubmitCheckout'],
  data: null,
  taxData: null,
  channelCode: 'RETAIL',
  locationCode: null,
  ipAddress: '103.172.72.167',
  sourceDevice: null,
  visitId: null,
  webSessionId: null,
  customerInteractionType: 'Unknown',
  orderDiscounts: [],
  couponCodes: [],
  invalidCoupons: [],
  suggestedDiscounts: [],
  discountThresholdMessages: [],
  dutyTotal: 0,
  feeTotal: 0,
  subTotal: 100,
  itemLevelProductDiscountTotal: 10,
  orderLevelProductDiscountTotal: 0,
  itemTaxTotal: 0,
  itemTotal: 90,
  shippingSubTotal: 0,
  itemLevelShippingDiscountTotal: 0,
  orderLevelShippingDiscountTotal: 0,
  shippingTaxTotal: 0,
  shippingTotal: 0,
  handlingSubTotal: 0,
  itemLevelHandlingDiscountTotal: 0,
  orderLevelHandlingDiscountTotal: 0,
  handlingTaxTotal: 0,
  handlingTotal: 0,
  total: 90,
  siteId: 0,
  tenantId: 0,
}

export const multiShipCheckoutMock: { checkout: Checkout } = {
  checkout: multiShipCheckoutResponse,
}
