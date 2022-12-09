import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductItemWithAddressList from './ProductItemWithAddressList'
import { checkoutMock } from '@/__mocks__/stories'

import { Checkout } from '@/lib/gql/types'

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
Common.args = {
  checkout: checkoutMock,
}
