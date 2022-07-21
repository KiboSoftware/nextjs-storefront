import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CartItemList from './CartItemList'
import { cartResponse } from '@/__mocks__/stories/cartMock'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'

import type { Location } from '@/lib/gql/types'

const cartItems = cartResponse?.items || []

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
