import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductItemList from './ProductItemList'
import { orderMock } from '@/__mocks__/stories/orderMock'

import type { CrOrderItem } from '@/lib/gql/types'

export default {
  title: 'Common/ProductItemList',
  component: ProductItemList,
  argTypes: {},
} as ComponentMeta<typeof ProductItemList>

const orderItems = orderMock?.checkout?.items

// Default Line Item
const Template: ComponentStory<typeof ProductItemList> = (args) => <ProductItemList {...args} />

export const Common = Template.bind({})
Common.args = {
  items: orderItems as CrOrderItem[],
}

const TemplateWithPickupItem: ComponentStory<typeof ProductItemList> = (args) => (
  <ProductItemList {...args} />
)
export const WithPickupItem = TemplateWithPickupItem.bind({})

WithPickupItem.args = {
  items: orderItems as CrOrderItem[],
  expectedDeliveryDate: orderItems && orderItems[0]?.expectedDeliveryDate,
  isPickupItem: true,
  onClickChangeStore: () => {
    console.log('change store clicked')
  },
}
