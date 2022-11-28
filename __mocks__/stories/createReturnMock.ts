import type { ReturnObj } from '@/lib/gql/types'

export const createReturnMock: { createReturn: ReturnObj } = {
  createReturn: {
    customerAccountId: 1262,
    returnNumber: 177,
    returnOrderId: null,
    status: 'Created',
    items: [
      {
        orderItemId: null,
        reasons: [
          {
            reason: 'Damaged',
            quantity: 1,
          },
        ],
        returnType: 'Refund',
        product: {
          productCode: 'BackP_024',
          name: 'Katahdin 50 Pack',
          description:
            'The JanSport Katahdin 50 pack for weekend trips has adjustable torso, vented back panel, great organization and plenty of straps, so you can wrangle your load while keeping the gear accessible.',
          imageUrl:
            '//cdn-sb.mozu.com/29927-49696/cms/49696/files/1b6b9ecd-912a-412f-8d11-c2660d265aff',
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
              attributeFQN: 'tenant~product-crosssell',
              name: 'Product Cross-Sells',
              values: [
                {
                  value: '30055',
                },
                {
                  value: '464648',
                },
                {
                  value: '171129',
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
                  value: 4,
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
              attributeFQN: 'tenant~role',
              name: 'role',
              values: [
                {
                  value: 'Unapproved',
                },
              ],
            },
            {
              attributeFQN: 'tenant~hot-item',
              name: 'Hot Item',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~top-seller',
              name: 'Top Seller',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~mystic-tested',
              name: 'Mystic Tested',
              values: [
                {
                  value: false,
                },
              ],
            },
            {
              attributeFQN: 'tenant~specifications',
              name: 'Specifications',
              values: [
                {
                  value: '• 4-point side compression straps \n• Hydration sle',
                },
              ],
            },
            {
              attributeFQN: 'tenant~materials',
              name: 'Materials',
              values: [
                {
                  value: '• 50% nylon\n• 25% cotton\n• 25% spandex',
                },
              ],
            },
            {
              attributeFQN: 'tenant~other-details',
              name: 'Other Details',
              values: [
                {
                  value: 'This is a great use backpack',
                },
              ],
            },
            {
              attributeFQN: 'tenant~loyalty-point-value',
              name: 'LoyaltyPointValue',
              values: [
                {
                  value: 100,
                },
              ],
            },
            {
              attributeFQN: 'system~subscription-mode',
              name: 'Subscription Mode',
              values: [
                {
                  value: 'SAOT',
                },
              ],
            },
            {
              attributeFQN: 'system~subscription-frequency',
              name: 'Subscription Frequency',
              values: [
                {
                  value: 'M2',
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
          ],
        },
        quantityReceived: 0,
        quantityRefunded: 0,
        quantityRestockable: 0,
        quantityRestocked: 0,
        quantityShipped: 0,
      },
    ],
  },
}
