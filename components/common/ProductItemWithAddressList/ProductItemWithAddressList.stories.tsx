import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductItemWithAddressList from './ProductItemWithAddressList'
import { checkoutMock } from '@/__mocks__/stories'
import { checkoutGetters } from '@/lib/getters'
import type { MultiShipAddress } from '@/lib/types/Checkout'

export default {
  title: 'Common/ProductItemWithAddressList',
  component: ProductItemWithAddressList,
  argTypes: {},
} as ComponentMeta<typeof ProductItemWithAddressList>

// Default Line Item
const Template: ComponentStory<typeof ProductItemWithAddressList> = (args) => (
  <ProductItemWithAddressList {...args} />
)

export const Common = Template.bind({})
const multiShipAddresses = checkoutGetters.getMultiShipAddresses({
  checkout: checkoutMock.checkout,
  savedShippingAddresses: [],
})

Common.args = {
  checkout: checkoutMock.checkout,
  multiShipAddresses: multiShipAddresses as MultiShipAddress[],
}
