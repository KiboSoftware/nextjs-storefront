import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductItemWithAddressList from './ProductItemWithAddressList'
import { orderMock } from '@/__mocks__/stories/orderMock'

import type { CrOrderItem } from '@/lib/gql/types'

export default {
  title: 'Common/ProductItemWithAddressList',
  component: ProductItemWithAddressList,
  argTypes: {},
} as ComponentMeta<typeof ProductItemWithAddressList>

const orderItems = orderMock?.checkout?.items

// Default Line Item
const Template: ComponentStory<typeof ProductItemWithAddressList> = (args) => (
  <ProductItemWithAddressList {...args} />
)

export const Common = Template.bind({})
Common.args = {
  items: orderItems as CrOrderItem[],
}
