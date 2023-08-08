import type { CrOrder } from '@/lib/gql/types'

export const cardPaymentMock = {
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
        address2: '32',
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
  status: 'New',
  isRecurring: false,
  amountCollected: 0,
  amountCredited: 0,
  amountRequested: 18.97,
}

export const purchaseOrderPaymentMock = {
  id: '8387cc9a10d64b39988eb05300caf550',
  paymentType: 'PurchaseOrder',
  status: 'New',
  paymentWorkflow: 'Mozu',
  amountCollected: 0,
  amountCredited: 0,
  amountRequested: 443.64,
  billingInfo: {
    billingContact: {
      id: 1413,
      firstName: 'Geetanshu',
      middleNameOrInitial: null,
      lastNameOrSurname: ' Chhabra',
      email: 'geetanshu.chhabra+123@kibocommerce.com',
      address: {
        address1: '900 HUTCHINSON PL',
        address2: null,
        address3: null,
        addressType: 'Residential',
        stateOrProvince: 'TN',
        postalOrZipCode: '37091',
        cityOrTown: 'LEBANON',
        countryCode: 'US',
        isValidated: true,
      },
      phoneNumbers: {
        home: '1234567890',
      },
    },
    isSameBillingShippingAddress: true,
    purchaseOrder: {
      purchaseOrderNumber: '12345',
      paymentTerm: {
        description: '60',
        code: '60',
      },
    },
    card: null,
  },
}

const checkoutResponse: CrOrder = {
  returnStatus: 'None', // TODO: may need to remove
  id: '137a94b6402be000013718d80000678b',
  email: 'amolp@dev.com',
  total: 125,
  continuityOrderOrdinal: 1,
  shippingTotal: 0,
  discountTotal: 0,
  subtotal: 125,
  taxTotal: 0,
  orderNumber: 92,
  couponCodes: ['10OFF', 'FREE10'],
  invalidCoupons: [],
  orderDiscounts: [],
  submittedDate: '2021-12-03T14:08:28.838Z',
  billingInfo: {
    billingContact: {
      id: 0,
      email: 'amolp@dev.com',
      firstName: 'jon',
      middleNameOrInitial: null,
      lastNameOrSurname: 'doe',
      companyOrOrganization: null,
      phoneNumbers: {
        home: '3354533453',
        mobile: null,
        work: null,
      },
      address: {
        address1: 'street',
        address2: 'apartment',
        address3: null,
        address4: null,
        cityOrTown: 'city',
        stateOrProvince: 'state',
        postalOrZipCode: '23423',
        countryCode: 'US',
        addressType: null,
        isValidated: false,
      },
    },
  },
  fulfillmentInfo: {
    shippingMethodCode: null,
    shippingMethodName: null,
    fulfillmentContact: {
      email: 'amolp@dev.com',
      firstName: 'jon',
      middleNameOrInitial: null,
      lastNameOrSurname: 'doe',
      companyOrOrganization: null,
      phoneNumbers: {
        home: '3354533453',
        mobile: null,
        work: null,
      },
      address: {
        address1: 'street',
        address2: 'apartment',
        address3: null,
        address4: null,
        cityOrTown: 'city',
        stateOrProvince: 'state',
        postalOrZipCode: '23423',
        countryCode: 'US',
        addressType: null,
        isValidated: false,
      },
      id: null,
    },
  },
  items: [
    {
      fulfillmentMethod: 'Pickup',
      id: 'd0de5048aad24940ba01ae82009b3215',
      total: 49,
      subtotal: 49,
      discountTotal: 0,
      purchaseLocation: 'TriptiShop',
      expectedDeliveryDate: '2020-03-24T10:22:50.723Z',
      quantity: 7,
      product: {
        productCode: 'MS-BTL-004',
        name: 'Vida Small',
        description:
          'Its tapered profile and ergonomic handle make it a joy to hold. Our smooth, threadless spout replicates our Perfect Spout, a first for any steel bottle.',
        imageUrl:
          '//cdn-sb.mozu.com/30294-50525/cms/50525/files/af946329-d91b-4e41-a21e-4825179c4219',
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
      id: '2192185402ab4511b1cdae82009b3215',
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
      id: '690115f14a6c4e79aedaae82009b3215',
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
          '//cdn-sb.mozu.com/30294-50525/cms/50525/files/d2249f22-a56f-42fe-be08-702801c97e4e',
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
  payments: [{ ...cardPaymentMock }],
  amountAvailableForRefund: 0,
  amountRefunded: 0,
  amountRemainingForPayment: 0,
  totalCollected: 0,
}

export const orderMock: { checkout: CrOrder } = {
  checkout: { ...checkoutResponse, status: 'Delivered' },
}
export const orderCouponMock: { updateOrderCoupon: CrOrder } = {
  updateOrderCoupon: checkoutResponse,
}
export const orderReturnItemsMock: { createReturn: CrOrder } = {
  createReturn: { ...checkoutResponse, status: 'Completed' },
}
