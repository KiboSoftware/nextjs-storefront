import type { OrderCollection } from '@/lib/gql/types'
export const orderCollection: { orders: OrderCollection } = {
  orders: {
    pageCount: 1,
    pageSize: 20,
    startIndex: 0,
    totalCount: 1,
    items: [
      {
        id: '1366c6ef4decfa00013b9b2b000045a4',
        amountAvailableForRefund: 0,
        amountRefunded: 0,
        amountRemainingForPayment: 3764.75,
        totalCollected: 0,
        email: 'chandra@email.com',
        continuityOrderOrdinal: 1,
        total: 3764.75,
        shippingTotal: 15,
        discountTotal: 0,
        subtotal: 3749,
        taxTotal: 0,
        orderNumber: 81,
        orderDiscounts: [],
        submittedDate: '2021-12-03T14:08:28.838Z',
        status: 'Accepted',
        billingInfo: null,
        fulfillmentInfo: {
          shippingMethodCode: '691f94b2b57e47239456ada600cdcc9e',
          shippingMethodName: 'Flat Rate',
          fulfillmentContact: {
            email: 'chandra@email.com',
            firstName: 'Susanta',
            middleNameOrInitial: null,
            lastNameOrSurname: 'Shinghal',
            companyOrOrganization: null,
            phoneNumbers: {
              home: '6745756788',
              mobile: null,
              work: null,
            },
            address: {
              address1: 'Siliguri',
              address2: '35',
              address3: null,
              address4: null,
              cityOrTown: 'Pune',
              stateOrProvince: 'Austin',
              postalOrZipCode: '42345',
              countryCode: 'US',
              addressType: 'Residential',
              isValidated: false,
            },
          },
        },
        items: [
          {
            expectedDeliveryDate: '2020-03-24T10:22:50.723Z',
            fulfillmentMethod: 'Pickup',
            id: '133ce85f2eb24894bd5eae830106646d',
            total: 49,
            subtotal: 49,
            discountTotal: 0,
            quantity: 7,
            product: {
              productCode: 'MS-BTL-004',
              name: 'Vida Small',
              description:
                'Its tapered profile and ergonomic handle make it a joy to hold. Our smooth, threadless spout replicates our Perfect Spout, a first for any steel bottle.',
              imageUrl:
                '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/3e90a2f3-01af-4280-93f5-6d35f84f78e5',
              options: [
                {
                  attributeFQN: 'Tenant~color',
                  name: 'Color',
                  value: 'Blue',
                },
                {
                  attributeFQN: 'Tenant~size',
                  name: 'Size',
                  value: 'Large',
                },
              ],
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
                  attributeFQN: 'tenant~rating',
                  name: 'Rating',
                  values: [
                    {
                      value: 4,
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
                  attributeFQN: 'Tenant~color',
                  name: 'Color',
                  values: [
                    {
                      value: 'Black',
                    },
                  ],
                },
              ],
              sku: null,
              price: {
                price: 7,
                salePrice: null,
              },
              categories: [
                {
                  id: 3,
                },
                {
                  id: 9,
                },
              ],
            },
          },
          {
            fulfillmentMethod: 'Ship',
            id: '93ad1e0c86cf4950a5f5ae830106646d',
            total: 100,
            subtotal: 100,
            discountTotal: 0,
            quantity: 10,
            product: {
              productCode: 'MS-BTL-001',
              name: 'Delta',
              description:
                'Delta representss the art of high style, high performance hydration with its striking, yet simple design and ergonomics',
              imageUrl: null,
              options: [
                {
                  attributeFQN: 'Tenant~color',
                  name: 'Color',
                  value: 'Red',
                },
                {
                  attributeFQN: 'Tenant~size',
                  name: 'Size',
                  value: 'Small',
                },
              ],
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
                  attributeFQN: 'tenant~rating',
                  name: 'Rating',
                  values: [
                    {
                      value: 5,
                    },
                  ],
                },
                {
                  attributeFQN: 'tenant~popularity',
                  name: 'Popularity',
                  values: [
                    {
                      value: 1,
                    },
                  ],
                },
                {
                  attributeFQN: 'Tenant~color',
                  name: 'Color',
                  values: [],
                },
              ],
              sku: null,
              price: {
                price: 10,
                salePrice: 10,
              },
              categories: [
                {
                  id: 3,
                },
                {
                  id: 9,
                },
              ],
            },
          },
          {
            fulfillmentMethod: 'Ship',
            id: 'ef6f302734ce4993a9dcae830106646d',
            total: 3600,
            subtotal: 3600,
            discountTotal: 0,
            quantity: 9,
            product: {
              productCode: 'MS-CAM-001',
              name: 'Garmin VIRB Elite Action Camera',
              description:
                '<span style="color: rgb(51, 51, 51); font-family: verdana, sans-serif; line-height: 17px; text-align: left; "><font size="3"><i>The Wi-Fi-enabled Garmin VIRB Elite action camera harnesses the power of GPS allowing video recordings that automatically start and stop with GPS-enabled triggers you set, such as speed or altitude.</i></font></span>',
              imageUrl:
                '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/6e0389db-5b78-490d-88b0-28af87528c5b',
              options: [
                {
                  attributeFQN: 'Tenant~size',
                  name: 'Size',
                  value: 'XS',
                },
                {
                  attributeFQN: 'Tenant~color',
                  name: 'Color',
                  value: 'Blue',
                },
              ],
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
                  attributeFQN: 'tenant~rating',
                  name: 'Rating',
                  values: [
                    {
                      value: 2,
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
                  attributeFQN: 'Tenant~brand',
                  name: 'Brand',
                  values: [
                    {
                      value: 'Garmin',
                    },
                  ],
                },
                {
                  attributeFQN: 'Tenant~Best-Use',
                  name: 'Best Use',
                  values: [],
                },
              ],
              sku: null,
              price: {
                price: 400,
                salePrice: null,
              },
              categories: [
                {
                  id: 2,
                },
                {
                  id: 4,
                },
                {
                  id: 19,
                },
              ],
            },
          },
        ],
        payments: [
          {
            id: '44c7b0bd1ed24c97bf23adf301176865',
            paymentServiceTransactionId: '4ab45201c58541f9ad45e2ba42a3858b',
            orderId: '1366c6ef4decfa00013b9b2b000045a4',
            paymentType: 'CreditCard',
            paymentWorkflow: 'Mozu',
            billingInfo: {
              paymentType: 'CreditCard',
              billingContact: {
                email: 'marcus.fenix@cog.com',
                firstName: 'Marcus',
                middleNameOrInitial: '',
                lastNameOrSurname: 'Fenix',
                phoneNumbers: {
                  home: '1-949-307-5762',
                  mobile: '1-949-307-5762',
                  work: '',
                },
                address: {
                  address1: '4861 Sunny Day Drive',
                  address2: '',
                  address3: '',
                  address4: '',
                  cityOrTown: 'Irvine',
                  stateOrProvince: 'CA',
                  postalOrZipCode: '92697',
                  countryCode: 'US',
                  addressType: 'Residential',
                  isValidated: false,
                },
              },
              isSameBillingShippingAddress: false,
              card: {
                paymentServiceCardId: '952076ca59454ccb97cf05ee5e9c97c8',
                isUsedRecurring: false,
                nameOnCard: 'Marcus Fenix',
                isCardInfoSaved: false,
                isTokenized: true,
                paymentOrCardType: 'VISA',
                cardNumberPartOrMask: '************1111',
                expireMonth: 1,
                expireYear: 2024,
              },
            },
            status: 'Authorized',
            isRecurring: false,
            amountCollected: 0,
            amountCredited: 0,
            amountRequested: 18.97,
          },
        ],
      },
      {
        id: '138bc29d057d2700016f0f460000678b',
        amountAvailableForRefund: 0,
        amountRefunded: 0,
        amountRemainingForPayment: 90,
        totalCollected: 0,
        email: null,
        total: 100,
        continuityOrderOrdinal: 1,
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
        id: '138bc29d057d2700016f0f460000678c',
        amountAvailableForRefund: 0,
        amountRefunded: 0,
        amountRemainingForPayment: 90,
        totalCollected: 0,
        email: null,
        total: 110,
        continuityOrderOrdinal: 1,
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
        id: '138bc29d057d2700016f0f460000678d',
        amountAvailableForRefund: 0,
        amountRefunded: 0,
        amountRemainingForPayment: 90,
        totalCollected: 0,
        continuityOrderOrdinal: 1,
        email: null,
        total: 120,
        shippingTotal: 0,
        discountTotal: 10,
        subtotal: 100,
        taxTotal: 0,
        orderNumber: 2475,
        submittedDate: 1647411417956,
        status: 'Completed',
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
