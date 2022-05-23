import type { Order } from '@/lib/gql/types'
export const orderMock: { checkout: Order } = {
  checkout: {
    id: '1366c6ef4decfa00013b9b2b000045a4',
    amountAvailableForRefund: 0,
    amountRefunded: 0,
    amountRemainingForPayment: 3764.75,
    totalCollected: 0,
    email: 'chandra@email.com',
    total: 3764.75,
    shippingTotal: 15,
    discountTotal: 0,
    subtotal: 3749,
    taxTotal: 0,
    orderNumber: 81,
    orderDiscounts: [],
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
          postalOrZipCode: '423455',
          countryCode: 'US',
          addressType: 'Residential',
          isValidated: false,
        },
      },
    },
    items: [
      {
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
    payments: [],
  },
}
