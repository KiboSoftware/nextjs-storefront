import type { OrderCollection } from '@/lib/gql/types'
export const orderCollection: { orders: OrderCollection } = {
  orders: {
    pageCount: 1,
    pageSize: 20,
    startIndex: 0,
    totalCount: 1,
    items: [
      {
        id: '138bc29d057d2700016f0f460000678b',
        amountAvailableForRefund: 0,
        amountRefunded: 0,
        amountRemainingForPayment: 90,
        totalCollected: 0,
        email: null,
        total: 90,
        shippingTotal: 0,
        discountTotal: 10,
        subtotal: 100,
        taxTotal: 0,
        orderNumber: 2475,
        submittedDate: 1647411417956,
        status: 'Abandoned',
        orderDiscounts: [],
        invalidCoupons: [],
        couponCodes: [],
        billingInfo: null,
        fulfillmentInfo: {
          shippingMethodCode: null,
          shippingMethodName: null,
          fulfillmentContact: null,
        },
        items: [
          {
            fulfillmentMethod: 'Ship',
            id: 'ddd8ba643d6542099398ae9e00fe6894',
            total: 90,
            subtotal: 100,
            discountTotal: 10,
            quantity: 1,
            fulfillmentLocationCode: 'SACRAMENTO',
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
                  attributeFQN: 'tenant~best-use',
                  name: 'Best Use',
                  values: [
                    {
                      value: 'Backpacking',
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
                  attributeFQN: 'tenant~popularity',
                  name: 'Popularity',
                  values: [
                    {
                      value: 3,
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
                  attributeFQN: 'tenant~role',
                  name: 'role',
                  values: [
                    {
                      value: 'Unapproved',
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
        payments: [],
      },
      {
        id: '138bc29d057d2700016f0f460000678b',
        amountAvailableForRefund: 0,
        amountRefunded: 0,
        amountRemainingForPayment: 90,
        totalCollected: 0,
        email: null,
        total: 100,
        shippingTotal: 0,
        discountTotal: 10,
        subtotal: 100,
        taxTotal: 0,
        orderNumber: 2475,
        submittedDate: 1647411417956,
        status: 'Processing',
        orderDiscounts: [],
        invalidCoupons: [],
        couponCodes: [],
        billingInfo: null,
        fulfillmentInfo: {
          shippingMethodCode: null,
          shippingMethodName: null,
          fulfillmentContact: null,
        },
        items: [
          {
            fulfillmentMethod: 'Ship',
            id: 'ddd8ba643d6542099398ae9e00fe6894',
            total: 90,
            subtotal: 100,
            discountTotal: 10,
            quantity: 1,
            fulfillmentLocationCode: 'SACRAMENTO',
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
                  attributeFQN: 'tenant~best-use',
                  name: 'Best Use',
                  values: [
                    {
                      value: 'Backpacking',
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
                  attributeFQN: 'tenant~popularity',
                  name: 'Popularity',
                  values: [
                    {
                      value: 3,
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
                  attributeFQN: 'tenant~role',
                  name: 'role',
                  values: [
                    {
                      value: 'Unapproved',
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
        payments: [],
      },
      {
        id: '138bc29d057d2700016f0f460000678b',
        amountAvailableForRefund: 0,
        amountRefunded: 0,
        amountRemainingForPayment: 90,
        totalCollected: 0,
        email: null,
        total: 110,
        shippingTotal: 0,
        discountTotal: 10,
        subtotal: 100,
        taxTotal: 0,
        orderNumber: 2475,
        submittedDate: 1647411417956,
        status: 'Delivered',
        orderDiscounts: [],
        invalidCoupons: [],
        couponCodes: [],
        billingInfo: null,
        fulfillmentInfo: {
          shippingMethodCode: null,
          shippingMethodName: null,
          fulfillmentContact: null,
        },
        items: [
          {
            fulfillmentMethod: 'Ship',
            id: 'ddd8ba643d6542099398ae9e00fe6894',
            total: 90,
            subtotal: 100,
            discountTotal: 10,
            quantity: 1,
            fulfillmentLocationCode: 'SACRAMENTO',
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
                  attributeFQN: 'tenant~best-use',
                  name: 'Best Use',
                  values: [
                    {
                      value: 'Backpacking',
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
                  attributeFQN: 'tenant~popularity',
                  name: 'Popularity',
                  values: [
                    {
                      value: 3,
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
                  attributeFQN: 'tenant~role',
                  name: 'role',
                  values: [
                    {
                      value: 'Unapproved',
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
        payments: [],
      },
      {
        id: '138bc29d057d2700016f0f460000678b',
        amountAvailableForRefund: 0,
        amountRefunded: 0,
        amountRemainingForPayment: 90,
        totalCollected: 0,
        email: null,
        total: 120,
        shippingTotal: 0,
        discountTotal: 10,
        subtotal: 100,
        taxTotal: 0,
        orderNumber: 2475,
        submittedDate: 1647411417956,
        status: 'Delivered',
        orderDiscounts: [],
        invalidCoupons: [],
        couponCodes: [],
        billingInfo: null,
        fulfillmentInfo: {
          shippingMethodCode: null,
          shippingMethodName: null,
          fulfillmentContact: null,
        },
        items: [
          {
            fulfillmentMethod: 'Ship',
            id: 'ddd8ba643d6542099398ae9e00fe6894',
            total: 90,
            subtotal: 100,
            discountTotal: 10,
            quantity: 1,
            fulfillmentLocationCode: 'SACRAMENTO',
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
                  attributeFQN: 'tenant~best-use',
                  name: 'Best Use',
                  values: [
                    {
                      value: 'Backpacking',
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
                  attributeFQN: 'tenant~popularity',
                  name: 'Popularity',
                  values: [
                    {
                      value: 3,
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
                  attributeFQN: 'tenant~role',
                  name: 'role',
                  values: [
                    {
                      value: 'Unapproved',
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
        payments: [],
      },
    ],
  },
}
