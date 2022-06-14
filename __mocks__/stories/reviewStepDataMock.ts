import { Order } from '@/lib/gql/types'
export const reviewStepData: Order = {
  id: '1396500c3d83130001c72593000045a4',
  email: 'amolp@dev.com',
  total: 125,
  shippingTotal: 0,
  discountTotal: 0,
  subtotal: 125,
  taxTotal: 0,
  orderNumber: 92,
  orderDiscounts: [],
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
        postalOrZipCode: '234234',
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
        postalOrZipCode: '234234',
        countryCode: 'US',
        addressType: null,
        isValidated: false,
      },
      id: null,
    },
  },
  items: [
    {
      fulfillmentMethod: 'Ship',
      id: 'c361a24903c24718a2beaea600b1989a',
      total: 125,
      subtotal: 125,
      discountTotal: 0,
      quantity: 1,
      expectedDeliveryDate: null,
      product: {
        productCode: 'MS-CAM-004',
        name: 'GoPro Hero3 Mount',
        description:
          '<font face="arial, sans-sarif" size="4"><span style="line-height: 18px;">Mount your GoPro Camera to capture the action during all sports.</span></font>',
        imageUrl:
          '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/0920dfa6-8e42-4e31-8b07-322c331bf5a4',
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
            attributeFQN: 'Tenant~brand',
            name: 'Brand',
            values: [
              {
                value: 'GoPro',
              },
            ],
          },
        ],
        sku: null,
        price: {
          price: 125,
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
      id: '4fce91b10c2a4cc2a49faea600b2b6b3',
      paymentType: 'CreditCard',
      paymentWorkflow: 'Mozu',
      billingInfo: {
        billingContact: {
          id: null,
          firstName: 'jon',
          middleNameOrInitial: null,
          lastNameOrSurname: 'doe',
          email: null,
          address: {
            address1: 'street',
            address2: 'apartment',
            address3: null,
            addressType: null,
            stateOrProvince: 'state',
            postalOrZipCode: '234234',
            cityOrTown: 'city',
            countryCode: 'US',
            isValidated: false,
          },
          phoneNumbers: {
            home: '3354533453',
          },
        },
        isSameBillingShippingAddress: true,
        card: {
          paymentServiceCardId: '5725b4e35e454118bbccb1c43de939c8',
          isTokenized: true,
          paymentOrCardType: 'VISA',
          cardNumberPartOrMask: '***********1111',
          expireMonth: 2,
          expireYear: 2023,
        },
      },
      amountCollected: 0,
      amountCredited: 0,
      amountRequested: 0,
    },
  ],
  amountAvailableForRefund: 0,
  amountRefunded: 0,
  amountRemainingForPayment: 0,
  totalCollected: 0,
}
