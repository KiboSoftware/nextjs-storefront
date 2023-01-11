import type { Checkout } from '@/lib/gql/types'
const checkoutResponse: Checkout = {
  id: '148a06a207b12d0001492285000045a4',
  email: 'test1@gmail.com',
  siteId: 22116,
  tenantId: 17828,
  number: 161,
  originalCartId: '148a050707b12d0001492283000045a4',
  submittedDate: null,
  type: 'Online',
  feeTotal: 0,
  subTotal: 1650,
  itemTaxTotal: 0,
  itemTotal: 1640,
  shippingSubTotal: 0,
  shippingTaxTotal: 0,
  itemLevelShippingDiscountTotal: 0,
  orderLevelShippingDiscountTotal: 0,
  shippingTotal: 0,
  handlingSubTotal: 0,
  itemLevelHandlingDiscountTotal: 0,
  orderLevelHandlingDiscountTotal: 0,
  handlingTaxTotal: 0,
  handlingTotal: 0,
  total: 1640,
  amountRemainingForPayment: 1640,
  itemLevelProductDiscountTotal: 0,
  orderLevelProductDiscountTotal: 10,
  couponCodes: ['10OFF'],
  items: [
    {
      destinationId: 'bf92ade4f3514c08bbeeaf6400833d00',
      fulfillmentLocationCode: 'aus',
      fulfillmentMethod: 'Ship',
      id: '4749fd29a0f143e58dd7af5f007a9db1',
      total: 1600,
      subtotal: 1600,
      discountTotal: 0,
      quantity: 4,
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
    {
      destinationId: '7d8042ab48634f50b3ecaf5f007e92ab',
      fulfillmentLocationCode: 'aus',
      fulfillmentMethod: 'Ship',
      id: '4f332366617d4ba58de1af5f007a9db1',
      total: 50,
      subtotal: 50,
      discountTotal: 0,
      quantity: 5,
      product: {
        productCode: 'MS-BTL-005',
        name: 'Wide-Mouth Loop-Top Watter Bottle',
        description:
          'Guaranteed leakproof, this Mystic Nalgene wide-mouth loop-top water bottle is a must-have for camping or campus.',
        imageUrl:
          '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/4bc1243b-4b46-4672-8276-cb3d03204c83',
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
                value: 2,
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
  ],
  destinations: [
    {
      id: 'bf92ade4f3514c08bbeeaf6400833d00',
      destinationContact: {
        id: 1053,
        email: 'amol23@kibo.com',
        firstName: 'Shriya',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Pawar',
        phoneNumbers: {
          home: '2343242323222',
        },
        address: {
          address1: 'Dream Villa',
          address2: 'street',
          address3: null,
          address4: null,
          cityOrTown: 'CT-CAL',
          stateOrProvince: 'CA',
          postalOrZipCode: '33433',
          countryCode: 'US',
          isValidated: false,
          addressType: 'Residential',
        },
      },
    },
    {
      id: 'f9ae47f1e94d40b6bb7faf6400d034f4',
      destinationContact: {
        id: 1056,
        email: 'amol23@kibo.com',
        firstName: 'Test Name',
        middleNameOrInitial: null,
        lastNameOrSurname: 'test',
        phoneNumbers: {
          home: '2345654345',
        },
        address: {
          address1: 'test Addr',
          address2: 'test',
          address3: null,
          address4: null,
          cityOrTown: 'Pune',
          stateOrProvince: 'AK',
          postalOrZipCode: '23423',
          countryCode: 'US',
          isValidated: false,
          addressType: 'Residential',
        },
      },
    },
    {
      id: '7d8042ab48634f50b3ecaf5f007e92ab',
      destinationContact: {
        id: null,
        email: null,
        firstName: 'Amol',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Jadav',
        phoneNumbers: {
          home: '2342342342',
        },
        address: {
          address1: 'street1',
          address2: 'apart',
          address3: null,
          address4: null,
          cityOrTown: 'citi',
          stateOrProvince: 'state',
          postalOrZipCode: '23422',
          countryCode: 'US',
          isValidated: false,
          addressType: null,
        },
      },
    },
    {
      id: '3ed85464a30a4486ba3caf64010559bc',
      destinationContact: {
        id: null,
        email: null,
        firstName: 'Sushant',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Jadav',
        phoneNumbers: {
          home: '345434543',
        },
        address: {
          address1: 'test',
          address2: 'test',
          address3: null,
          address4: null,
          cityOrTown: 'test',
          stateOrProvince: 'test',
          postalOrZipCode: '45434',
          countryCode: 'US',
          isValidated: false,
          addressType: null,
        },
      },
    },
    {
      id: 'ab9e8a30e82e43c4a55aaf65005dfaae',
      destinationContact: {
        id: null,
        email: null,
        firstName: 'fname',
        middleNameOrInitial: null,
        lastNameOrSurname: 'lname',
        phoneNumbers: {
          home: '34354345345',
        },
        address: {
          address1: 'street',
          address2: 'apt',
          address3: null,
          address4: null,
          cityOrTown: 'citi',
          stateOrProvince: 'state',
          postalOrZipCode: '23423',
          countryCode: 'US',
          isValidated: false,
          addressType: null,
        },
      },
    },
    {
      id: 'dcf50e97615349259e5daf65007348ba',
      destinationContact: {
        id: 1052,
        email: 'amol23@kibo.com',
        firstName: 'Amol',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Pawar',
        phoneNumbers: {
          home: '24523423423',
        },
        address: {
          address1: 'address1',
          address2: 'address4',
          address3: null,
          address4: null,
          cityOrTown: 'al-ct',
          stateOrProvince: 'AK',
          postalOrZipCode: '23423',
          countryCode: 'US',
          isValidated: false,
          addressType: 'Residential',
        },
      },
    },
    {
      id: '44097622e9e44e048879af6400cfe38e',
      destinationContact: {
        id: 1052,
        email: 'amol23@kibo.com',
        firstName: 'Susanta',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Samanta',
        phoneNumbers: {
          home: '24523423423',
        },
        address: {
          address1: 'address22',
          address2: 'address44',
          address3: null,
          address4: null,
          cityOrTown: 'al-ct',
          stateOrProvince: 'AK',
          postalOrZipCode: '23423',
          countryCode: 'US',
          isValidated: false,
          addressType: 'Residential',
        },
      },
    },
    {
      id: '65fabfe1f89e4b60a555af650073f47f',
      destinationContact: {
        id: null,
        email: null,
        firstName: 'sus',
        middleNameOrInitial: null,
        lastNameOrSurname: 'das',
        phoneNumbers: {
          home: '23423423422',
        },
        address: {
          address1: 'strt',
          address2: 'apt',
          address3: null,
          address4: null,
          cityOrTown: 'citi',
          stateOrProvince: 'stat',
          postalOrZipCode: '23423',
          countryCode: 'US',
          isValidated: false,
          addressType: null,
        },
      },
    },
    {
      id: '3e62104eb47a4f5187b1af6500748cbe',
      destinationContact: {
        id: null,
        email: null,
        firstName: 'Praj',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Pawar',
        phoneNumbers: {
          home: '234234234232',
        },
        address: {
          address1: 'streest',
          address2: 'apt',
          address3: null,
          address4: null,
          cityOrTown: 'citi',
          stateOrProvince: 'state',
          postalOrZipCode: '23423',
          countryCode: 'US',
          isValidated: false,
          addressType: null,
        },
      },
    },
  ],
  groupings: [
    {
      id: '6c8d2679e69a429db72ca1fcd2e56e77',
      destinationId: 'bf92ade4f3514c08bbeeaf6400833d00',
      orderItemIds: ['4749fd29a0f143e58dd7af5f007a9db1'],
      fulfillmentMethod: 'Ship',
      shippingMethodCode: null,
      shippingMethodName: null,
      dutyTotal: 0,
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
    },
    {
      id: '4c74f3cd4b6e4ca98bd4e94c991ebe0a',
      destinationId: '7d8042ab48634f50b3ecaf5f007e92ab',
      orderItemIds: ['4f332366617d4ba58de1af5f007a9db1'],
      fulfillmentMethod: 'Ship',
      shippingMethodCode: null,
      shippingMethodName: null,
      dutyTotal: 0,
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
    },
  ],
}
export const checkoutMock: { checkout: Checkout } = {
  checkout: checkoutResponse,
}

export const checkoutCouponMock: { updateCheckoutCoupon: Checkout } = {
  updateCheckoutCoupon: checkoutResponse,
}
