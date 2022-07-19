import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CartItemList from './CartItemList'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'

import type { CartItem as CartItemType, Location } from '@/lib/gql/types'

const cartItems: Array<CartItemType> = [
  {
    id: '1beef214158842d7a305ae68009d4d4c1',
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
    quantity: 5,
  },
  {
    id: '1beef214158842d7a305ae68009d4d4c',
    fulfillmentMethod: 'Ship',
    product: {
      productCode: 'MS-BTL-002',
      fulfillmentTypesSupported: ['DirectShip'],
      name: 'Water Bottle 1',
      description:
        'The taste-free Platypus Platy bottle with screw cap is an excellent option for bringing water on your backcountry adventures.<br>',
      imageUrl:
        '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/c186f113-6150-40a2-a210-1684f25f273b',
      options: [
        {
          attributeFQN: 'Tenant~size',
          name: 'Size',
          value: '3',
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
  title: 'cart/CartItemList',
  component: CartItemList,
  argTypes: {
    onCartItemQuantityUpdate: { action: 'onCartItemQuantityUpdate: ' },
    onCartItemDelete: { action: 'onCartItemDelete: ' },
  },
} as ComponentMeta<typeof CartItemList>

const locationList = locationCollectionMock?.spLocations?.items || []

const Template: ComponentStory<typeof CartItemList> = (args) => <CartItemList {...args} />

export const Common = Template.bind({})

Common.args = {
  cartItems,
  fulfillmentLocations: locationList as Location[],
  purchaseLocation: locationList[0] as Location,
}
