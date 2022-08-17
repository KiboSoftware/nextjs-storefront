import { Order } from '@/lib/gql/types'

export const orderCouponResponse: Order = {
  id: '13fb801515bfe900017d0d17000074e7',
  email: 'geetanshu1211@gmail.com',
  totalCollected: 0,
  amountAvailableForRefund: 0,
  amountRemainingForPayment: 215,
  amountRefunded: 0,
  total: 215,
  shippingTotal: 25,
  discountTotal: 10,
  discountedSubtotal: 190,
  subtotal: 200,
  taxTotal: 0,
  orderNumber: 1272,
  couponCodes: ['10OFF'],
  invalidCoupons: [],
  orderDiscounts: [],
  billingInfo: null,
  fulfillmentInfo: {
    shippingMethodCode: '290ec0ab460b4a83acdbae3200fd4f9b',
    shippingMethodName: 'Next Day AIr',
    fulfillmentContact: {
      id: 1497,
      email: 'geetanshu1211@gmail.com',
      firstName: 'Subha',
      middleNameOrInitial: '',
      lastNameOrSurname: 'Chaudhari',
      companyOrOrganization: null,
      phoneNumbers: {
        home: '7654323456',
        mobile: null,
        work: null,
      },
      address: {
        address1: 'Niainital',
        address2: '',
        address3: null,
        address4: null,
        cityOrTown: 'WC',
        stateOrProvince: 'NY',
        postalOrZipCode: '465456',
        countryCode: 'US',
        addressType: 'Residential',
        isValidated: true,
      },
    },
  },
  items: [
    {
      fulfillmentLocationCode: 'SACRAMENTO',
      fulfillmentMethod: 'Ship',
      id: 'b76e7da696ad427b998eaef4009a6994',
      total: 100,
      subtotal: 100,
      discountTotal: 0,
      quantity: 1,
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
    },
  ],
  payments: [],
}

export const orderCouponMock: { updateOrderCoupon: Order } = {
  updateOrderCoupon: orderCouponResponse,
}
