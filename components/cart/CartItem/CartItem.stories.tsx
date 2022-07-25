import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CartItem from './CartItem'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'
import { fulfillmentOptionsMock } from '@/__mocks__/stories/fulfillmentOptionsMock'

export default {
  title: 'cart/CartItem',
  component: CartItem,
  argTypes: { onQuantityUpdate: { action: 'clicked' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CartItem>

const cartItem = cartItemMock

const actions = ['Edit', 'Save For Later', 'Add to Favorites']

const Template: ComponentStory<typeof CartItem> = (args) => <CartItem {...args} />

export const Common = Template.bind({})

Common.args = {
  cartItem,
  actions,
  fulfillmentOptions: fulfillmentOptionsMock,
  onQuantityUpdate: (cartItemId: string, quantity: number) => {
    return { cartItemId, quantity }
  },
  onCartItemDelete: (cartItemId: string) => cartItemId,
  onFulfillmentOptionChange: (fulfillmentMethod: string, cartItemId: string) => {
    return { cartItemId, fulfillmentMethod }
  },
  onProductPickupLocation: (cartItemId: string) => cartItemId,
}
