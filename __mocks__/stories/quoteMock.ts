import { quotesMock } from './quotesMock'

export const quoteMock = {
  ...quotesMock.items?.[1],
  items: [
    {
      id: '15d502b13a79220001b6ed1b000045a4',
      name: null,
      siteId: 22116,
      tenantId: 17828,
      feeTotal: 0,
      shippingTotal: 0,
      hasDraft: true,
      number: 3,
      submittedDate: null,
      expirationDate: null,
      total: 200,
      status: 'Pending',
      subTotal: 200,
      shippingSubTotal: 0,
      handlingSubTotal: 0,
      itemTaxTotal: 0,
      shippingTaxTotal: 0,
      handlingTaxTotal: 0,
      dutyTotal: 0,
      couponCodes: ['test'],
      items: [
        {
          id: 'a2dc8f0975294da4bc2cb05a0093fb6c',
          quantity: 2,
          fulfillmentMethod: 'Pickup',
          fulfillmentLocationCode: 'TriptiShop',
          unitPrice: {
            listAmount: 100,
            saleAmount: null,
          },
          discountTotal: 0,
          discountedTotal: 200,
          total: 200,
          shippingTotal: 0,
          dutyAmount: null,
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
              price: 100,
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
      auditInfo: {
        updateDate: 1691690035699,
        createDate: 1691657393546,
        updateBy: 'c43fd8c426a34e5bae5a7445dee2fa86',
        createBy: 'c43fd8c426a34e5bae5a7445dee2fa86',
      },
      auditHistory: [],
      comments: [],
      fulfillmentInfo: null,
      userId: 'c43fd8c426a34e5bae5a7445dee2fa86',
      customerAccountId: 1174,
      itemLevelHandlingDiscountTotal: 0,
      itemLevelShippingDiscountTotal: 0,
      itemLevelProductDiscountTotal: 0,
      handlingTotal: 0,
      itemTotal: 0,
      orderLevelHandlingDiscountTotal: 0,
      orderLevelProductDiscountTotal: 0,
      shippingAmount: 0,
      orderLevelShippingDiscountTotal: 0,
    },
    {
      userId: 'ce2ebc17ecf045539942794bacaa3c03',
      id: '15c430da6a08a7000119f5db0000678b',
      handlingSubTotal: 0,
      dutyTotal: 0,
      feeTotal: 0,
      handlingTotal: 0,
      itemLevelHandlingDiscountTotal: 0,
      itemLevelProductDiscountTotal: 0,
      itemLevelShippingDiscountTotal: 0,
      number: 107,
      items: [
        {
          fulfillmentMethod: 'Ship',
          fulfillmentLocationCode: 'SACRAMENTO',
          id: 'e66bbd4fcf874cf0afcdb05800c10295',
          product: {
            productCode: 'BackP_003',
          },
        },
      ],
      itemTotal: 0,
      orderLevelHandlingDiscountTotal: 0,
      orderLevelProductDiscountTotal: 0,
      shippingAmount: 0,
      orderLevelShippingDiscountTotal: 0,
    },
    {
      id: '162db92d1c70c20001e473b0000085af',
      name: null,
      siteId: 46402,
      tenantId: 34223,
      number: 63,
      hasDraft: true,
      submittedDate: null,
      expirationDate: null,
      email: null,
      itemTotal: 80,
      total: 102,
      shippingTotal: 15,
      couponCodes: ['10%OFF'],
      status: 'Pending',
      subTotal: 80,
      shippingSubTotal: 15,
      handlingTotal: 7,
      handlingSubTotal: 7,
      itemTaxTotal: 0,
      shippingTaxTotal: 0,
      handlingTaxTotal: 0,
      dutyTotal: 0,
      handlingAdjustment: null,
      shippingAdjustment: null,
      adjustment: null,
      orderDiscounts: [],
      itemLevelProductDiscountTotal: 0,
      orderLevelProductDiscountTotal: 0,
      itemLevelShippingDiscountTotal: 0,
      orderLevelShippingDiscountTotal: 0,
      shippingDiscounts: [],
      itemLevelHandlingDiscountTotal: 0,
      orderLevelHandlingDiscountTotal: 0,
      handlingDiscounts: [],
      items: [
        {
          id: '90a721a0e7ef4b6699fab09e00798344',
          quantity: 1,
          fulfillmentMethod: 'Ship',
          fulfillmentLocationCode: 'WH-001',
          unitPrice: {
            listAmount: 100,
            saleAmount: 80,
          },
          discountTotal: 0,
          discountedTotal: 80,
          total: 80,
          shippingTotal: 0,
          subtotal: 80,
          dutyAmount: null,
          product: {
            productCode: 'Shirt001',
            name: 'Shirt',
            description: null,
            imageUrl: null,
            options: [
              {
                attributeFQN: 'tenant~color',
                name: 'color',
                value: 'black',
              },
              {
                attributeFQN: 'tenant~size',
                name: 'size',
                value: 'large',
              },
            ],
            properties: [],
            sku: null,
            price: {
              price: 100,
              salePrice: 80,
            },
            categories: [
              {
                id: 2,
              },
            ],
          },
        },
      ],
      auditInfo: {
        updateDate: 1697545102609,
        createDate: 1697471277963,
        updateBy: '3f0d607c81af4bc28e2d0602b6898b98',
        createBy: '3f0d607c81af4bc28e2d0602b6898b98',
      },
      auditHistory: [],
      comments: [],
      fulfillmentInfo: {
        fulfillmentContact: {
          id: 1016,
          email: null,
          firstName: 'geet',
          lastNameOrSurname: 'chhabra',
          phoneNumbers: {
            home: '1478523698',
            mobile: null,
            work: null,
          },
          address: {
            address1: '900 HUTCHINSON PL',
            address2: null,
            address3: null,
            address4: null,
            cityOrTown: 'LEBANON',
            stateOrProvince: 'TN',
            postalOrZipCode: '37091',
            addressType: 'Residential',
            isValidated: false,
            countryCode: 'US',
          },
        },
        shippingMethodCode: 'b5d6d7b9b7ef487db9d9b07c00623006',
        shippingMethodName: 'Flat Rate - $15.00',
      },
      userId: '3f0d607c81af4bc28e2d0602b6898b98',
      customerAccountId: 1001,
    },
  ],
  comments: [
    {
      id: 'f0089587920a4ba987d3b04a00b14b39',
      text: 'Sent a new Quote Request',
      auditInfo: {
        updateDate: '2023-07-25T10:45:30.427Z',
        createDate: '2023-07-25T10:45:30.427Z',
        updateBy: '0abbfb8811d94deba8e9f13906173a0f',
        createBy: '0abbfb8811d94deba8e9f13906173a0f',
      },
    },
    {
      id: '99e4ecf9f4c742d08ad6b04b00cffeb9',
      text: 'Changed Price',
      auditInfo: {
        updateDate: '2023-07-26T12:37:17.201Z',
        createDate: '2023-07-26T12:37:17.201Z',
        updateBy: '0abbfb8811d94debt6e9f13906173a0f',
        createBy: '0abbfb8811d94debt6e9f13906173a0f',
      },
    },
    {
      id: 'b3a1f0e8e1d648c4a36e7b05c1f2f823',
      text: 'Sent a new Quote Request Again',
      auditInfo: {
        updateDate: '2023-07-26T12:37:17.201Z',
        createDate: '2023-07-26T12:37:17.201Z',
        updateBy: '0abbfb8811d94deba8e9f13906173a0f',
        createBy: '0abbfb8811d94deba8e9f13906173a0f',
      },
    },
    {
      id: 'c52f98a1b7d542f1b9e6c3d6a8f1e4c7',
      text: 'Check again',
      auditInfo: {
        updateDate: '2023-07-26T12:37:17.201Z',
        createDate: '2023-07-26T12:37:17.201Z',
        updateBy: '0abbfb8811d94debt6e9f13906173a0f',
        createBy: '0abbfb8811d94debt6e9f13906173a0f',
      },
    },
  ],
  fulfillmentInfo: {
    fulfillmentContact: {
      id: 2,
      firstName: 'sushant',
      lastNameOrSurname: 'jadhav',
      companyOrOrganization: 'Sushant Account',
      phoneNumbers: {
        home: '+919284428455',
      },
      address: {
        address1: 'pune',
        address2: '',
        cityOrTown: 'pune',
        stateOrProvince: 'MH',
        postalOrZipCode: '411033',
        countryCode: 'IN',
        addressType: 'Residential',
        isValidated: false,
      },
    },
    auditInfo: {
      updateDate: '2023-07-25T10:39:24.626Z',
      createDate: '2023-07-25T10:39:24.626Z',
      updateBy: '0abbfb8811d94deba8e9f13906173a0f',
      createBy: '0abbfb8811d94deba8e9f13906173a0f',
    },
  },
  auditHistory: [
    {
      id: 'de280f88c5e94d5fb3cfb04a00a2e3fe',
      changes: [
        {
          type: 'Update',
          fields: [
            {
              name: 'Name',
              newValue: 'Quote 73 - Draft',
            },
          ],
        },
      ],
      auditInfo: {
        updateDate: '2023-07-25T09:53:03.990Z',
        createDate: '2023-07-25T09:53:03.990Z',
        updateBy: '0abbfb8811d94deba8e9f13906173a0f',
        createBy: '0abbfb8811d94deba8e9f13906173a0f',
      },
    },
    {
      id: 'cd4fb68b491a48ebb530b04a00a2fb03',
      changes: [
        {
          type: 'Add',
          path: 'Items#1',
          fields: [
            {
              name: 'ProductCode',
              newValue: '00011',
            },
            {
              name: 'Name',
              newValue: 'Sneaker',
            },
            {
              name: 'Quantity',
              newValue: '1',
            },
            {
              name: 'FulfillmentMethod',
              newValue: 'Ship',
            },
            {
              name: 'FulfillmentLocationCode',
              newValue: '12346',
            },
            {
              name: 'UnitPrice',
              newValue: '45.99',
            },
          ],
        },

        {
          type: 'Update',
          path: 'Items#1',
          fields: [
            {
              name: 'ProductCode',
              newValue: '00011',
            },
            {
              name: 'Name',
              newValue: 'Sneaker',
            },
            {
              name: 'Quantity',
              newValue: '1',
            },
          ],
        },
      ],
      auditInfo: {
        updateDate: '2023-07-25T09:53:23.635Z',
        createDate: '2023-07-25T09:53:23.635Z',
        updateBy: '0abbfb8811d94deba8e9f13906173a0f',
        createBy: '0abbfb8811d94deba8e9f13906173a0f',
      },
    },
    {
      id: 'c11f56b4c3ce4ba88b87b04a00a6eef4',
      changes: [
        {
          type: 'Update',
          fields: [
            {
              name: 'Name',
              oldValue: 'Quote 73 - Draft',
              newValue: 'Quote 73 - Draft 1',
            },
          ],
        },
      ],
      auditInfo: {
        updateDate: '2023-07-25T10:07:47.157Z',
        createDate: '2023-07-25T10:07:47.157Z',
        updateBy: '0abbfb8811d94deba8e9f13906173a0f',
        createBy: '0abbfb8811d94deba8e9f13906173a0f',
      },
    },
    {
      id: '1574078b65654c17a554b04a00a6f481',
      changes: [
        {
          type: 'Update',
          fields: [
            {
              name: 'Name',
              oldValue: 'Quote 73 - Draft 1',
              newValue: 'Quote 73 - Draft',
            },
          ],
        },
      ],
      auditInfo: {
        updateDate: '2023-07-25T10:07:51.894Z',
        createDate: '2023-07-25T10:07:51.894Z',
        updateBy: '0abbfb8811d94deba8e9f13906173a0f',
        createBy: '0abbfb8811d94deba8e9f13906173a0f',
      },
    },
    {
      id: 'e632d21f8f5b4813b9c3b04a00ae9af6',
      changes: [
        {
          type: 'Update',
          fields: [
            {
              name: 'Name',
              oldValue: 'Quote 73 - Draft',
              newValue: 'Quote 73 - Draft 1',
            },
          ],
        },
      ],
      auditInfo: {
        updateDate: '2023-07-25T10:35:43.112Z',
        createDate: '2023-07-25T10:35:43.112Z',
        updateBy: '0abbfb8811d94deba8e9f13906173a0f',
        createBy: '0abbfb8811d94deba8e9f13906173a0f',
      },
    },
  ],
}

export const singleQuoteMock = {
  quote: quoteMock?.items?.[0],
}

export const singleQuoteItemMock = {
  id: '49a11cf0a42f459ba90fb060009595b8',
  quantity: 1,
  fulfillmentMethod: 'Ship',
  fulfillmentLocationCode: 'aus',
  unitPrice: {
    listAmount: 275,
    saleAmount: null,
  },
  discountTotal: 0,
  discountedTotal: 275,
  total: 275,
  shippingTotal: 0,
  dutyAmount: null,
  product: {
    productCode: 'MS-CAM-003',
    name: 'JVC ADIXXION Cam 2 Action Camera',
    description:
      '<font size="4"><span style="font-family: arial, sans-sarif; line-height: 18px; text-align: left; ">The </span><b style="border: 0px; vertical-align: baseline; margin: 0px; padding: 0px; font: inherit; font-family: arial, sans-sarif; line-height: 18px; text-align: left; ">JVC GC-XA2 ADIXXION Action Camera</b><span style="font-family: arial, sans-sarif; line-height: 18px; text-align: left; "> is a lightweight and rugged action camera that is compatible with a variety of optional mounts for use in a variety of conditions, environments, and activities.</span></font>',
    imageUrl:
      '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/dc5eccf9-a439-4ba9-aa5e-71d24dc876bb',
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
            value: 'JVC',
          },
        ],
      },
    ],
    sku: null,
    price: {
      price: 275,
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
}
