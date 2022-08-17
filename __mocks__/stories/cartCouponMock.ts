import { Cart } from '@/lib/gql/types'

export const cartCouponResponse: Cart = {
  id: '13fcff2f2fc19a00013ffb2d000045a4',
  invalidCoupons: [],
  couponCodes: ['10OFF'],
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
  total: 265,
  subtotal: 275,
  shippingTotal: 0,
  taxTotal: 0,
  items: [
    {
      id: 'e9de9000d1a34b439a8faef4008538fd',
      fulfillmentMethod: 'Ship',
      purchaseLocation: null,
      fulfillmentLocationCode: 'aus',
      productDiscounts: [],
      subtotal: 275,
      total: 275,
      product: {
        productCode: 'MS-CAM-003',
        fulfillmentTypesSupported: [],
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
          {
            attributeFQN: 'Tenant~Best-Use',
            name: 'Best Use',
            values: [],
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
      quantity: 1,
    },
  ],
}

export const cartCouponMock: { updateCartCoupon: Cart } = {
  updateCartCoupon: cartCouponResponse,
}
