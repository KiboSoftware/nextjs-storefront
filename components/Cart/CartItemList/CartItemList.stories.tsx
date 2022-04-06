import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CartItemList from './CartItemList'

import type { CartItem as CartItemType } from '@/lib/gql/types'

const cartItems: Array<CartItemType> = [
  {
    id: '1beef214158842d7a305ae68009d4d4c',
    fulfillmentMethod: 'Ship',
    product: {
      productCode: 'MS-BTL-002',
      fulfillmentTypesSupported: ['DirectShip'],
      name: 'SoftBottle Water Bottle',
      description:
        'The taste-free Platypus Platy bottle with screw cap is an excellent option for bringing water on your backcountry adventures.<br>',
      imageUrl:
        '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/c186f113-6150-40a2-a210-1684f25f273b',
      options: [
        {
          attributeFQN: 'Tenant~color',
          name: 'Color',
          value: 'Blue',
        },
      ],
      properties: [],
      sku: null,
      price: {
        price: 15,
        salePrice: null,
      },
    },
    quantity: 1,
  },
  {
    id: '1beef214158842d7a305ae68009d4d4c',
    fulfillmentMethod: 'Ship',
    product: {
      productCode: 'MS-BTL-002',
      fulfillmentTypesSupported: ['DirectShip'],
      name: 'SoftBottle Water Bottle 2',
      description:
        'The taste-free Platypus Platy bottle with screw cap is an excellent option for bringing water on your backcountry adventures.<br>',
      imageUrl:
        '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/c186f113-6150-40a2-a210-1684f25f273b',
      options: [
        {
          attributeFQN: 'Tenant~size',
          name: 'Size',
          value: '12',
        },
      ],
      properties: [],
      sku: null,
      price: {
        price: 45,
        salePrice: null,
      },
    },
    quantity: 3,
  },
]

export default {
  title: 'Cart/CartItemList',
  component: CartItemList,

  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CartItemList>

const Template: ComponentStory<typeof CartItemList> = (args) => <CartItemList {...args} />

export const Common = Template.bind({})

Common.args = {
  cartItems,
}
