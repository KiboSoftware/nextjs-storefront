import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CartItem from './CartItem'

import type { CartItem as CartItemType } from '@/lib/gql/types'

export default {
  title: 'cart/CartItem',
  component: CartItem,
  argTypes: { onQuantityUpdate: { action: 'clicked' } },
} as ComponentMeta<typeof CartItem>

const cartItem: CartItemType = {
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
      {
        attributeFQN: 'Tenant~size',
        name: 'Size',
        value: 'Large',
      },
    ],
    properties: [],
    sku: null,
    price: {
      price: 15,
      salePrice: null,
    },
  },
  quantity: 6,
}

const actions = ['Edit', 'Save For Later', 'Add to Favorites']

const Template: ComponentStory<typeof CartItem> = (args) => <CartItem {...args} />

export const Common = Template.bind({})

Common.args = {
  cartItem,
  actions,
}
