import type { CrCart } from '@/lib/gql/types'

export const cartResponse: CrCart = {
  id: '13bdd5a61958150001dc971f000074e7',
  invalidCoupons: [],
  couponCodes: ['10OFF', 'FREE10'],
  orderDiscounts: [
    {
      impact: 10,
      discount: {
        id: 10,
        name: '10off',
      },
      couponCode: '10OFF',
    },
  ],
  total: 275,
  subtotal: 275,
  shippingTotal: 0,
  taxTotal: 0,
  items: [
    {
      id: '20feacbdb17e4b65b838aec400a8ec9f',
      fulfillmentMethod: 'Ship',
      purchaseLocation: null,
      fulfillmentLocationCode: 'SACRAMENTO',
      productDiscounts: [],
      subtotal: 175,
      total: 175,
      product: {
        productCode: 'backpack99',
        fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
        name: 'Pink Backpack',
        description: 'This is a very nice and durable pink backpack',
        imageUrl:
          '//cdn-sb.mozu.com/29927-49696/cms/49696/files/5131e412-4378-4347-8ded-62c3892cf8ce',
        options: [
          {
            attributeFQN: 'tenant~size',
            name: 'Size',
            value: 'Medium',
          },
        ],
        properties: [
          {
            attributeFQN: 'tenant~availability',
            name: 'Availability',
            values: [
              {
                value: '24hrs',
              },
            ],
          },
          {
            attributeFQN: 'tenant~popularity',
            name: 'Popularity',
            values: [
              {
                value: 4,
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
            attributeFQN: 'tenant~role',
            name: 'role',
            values: [
              {
                value: 'Mem',
              },
            ],
          },
          {
            attributeFQN: 'tenant~hot-item',
            name: 'Hot Item',
            values: [
              {
                value: true,
              },
            ],
          },
          {
            attributeFQN: 'tenant~top-seller',
            name: 'Top Seller',
            values: [
              {
                value: true,
              },
            ],
          },
          {
            attributeFQN: 'tenant~mystic-tested',
            name: 'Mystic Tested',
            values: [
              {
                value: true,
              },
            ],
          },
          {
            attributeFQN: 'tenant~specifications',
            name: 'Specifications',
            values: [
              {
                value: 'Test specifications \n1\n2\n3\n4\n5\n etc...',
              },
            ],
          },
          {
            attributeFQN: 'tenant~materials',
            name: 'Materials',
            values: [
              {
                value: 'Test materials\n1\n2\n3\n4\n5\n etc...',
              },
            ],
          },
          {
            attributeFQN: 'tenant~other-details',
            name: 'Other Details',
            values: [
              {
                value: 'Test other details\n1\n2\n3\n4\n5\n etc...',
              },
            ],
          },
          {
            attributeFQN: 'tenant~hydration-compatible',
            name: 'Hydration Compatible',
            values: [
              {
                value: false,
              },
            ],
          },
          {
            attributeFQN: 'tenant~material',
            name: 'Material',
            values: [
              {
                value: 'Nylon/closed-cell-foam',
              },
            ],
          },
          {
            attributeFQN: 'tenant~number-of-exterior-pockets',
            name: 'Number of Exterior Pockets',
            values: [
              {
                value: '2',
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
            attributeFQN: 'tenant~features',
            name: 'Features',
            values: [
              {
                value: 'Avalanche-Airbag',
              },
            ],
          },
        ],
        sku: null,
        price: {
          price: 175,
          salePrice: null,
        },
        categories: [
          {
            id: 1,
          },
          {
            id: 19,
          },
        ],
      },
      quantity: 2,
    },
    {
      id: '645802e13dc04e1b803baec400a9ce80',
      fulfillmentMethod: 'Pickup',
      purchaseLocation: null,
      fulfillmentLocationCode: 'SACRAMENTO',
      productDiscounts: [],
      subtotal: 100,
      total: 100,
      product: {
        productCode: 'BackP_024',
        fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
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
                value: '• 50% nylon\n• 25% cotton\n• 25% spandex ',
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
      quantity: 1,
    },
  ],
}

export const cartMock: { currentCart: CrCart } = {
  currentCart: cartResponse,
}
export const cartCouponMock: { updateCartCoupon: CrCart } = {
  updateCartCoupon: cartResponse,
}
