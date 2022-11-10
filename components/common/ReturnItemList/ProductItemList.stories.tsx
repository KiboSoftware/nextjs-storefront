import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ReturnItemList from './ReturnItemList'
import { orderMock } from '@/__mocks__/stories/orderMock'

import type { CrOrderItem } from '@/lib/gql/types'

export default {
  title: 'Common/ReturnItemList',
  component: ReturnItemList,
  argTypes: {},
} as ComponentMeta<typeof ReturnItemList>

const orderItems = orderMock?.checkout?.items

// Default Line Item
const Template: ComponentStory<typeof ReturnItemList> = (args) => <ReturnItemList {...args} />

export const Common = Template.bind({})
Common.args = {
  items: orderItems as CrOrderItem[],
}

const TemplateWithPickupItem: ComponentStory<typeof ReturnItemList> = (args) => (
  <ReturnItemList {...args} />
)
export const WithPickupItem = TemplateWithPickupItem.bind({})

WithPickupItem.args = {
  items: orderItems as CrOrderItem[],
  isPickupItem: true,
  onClickChangeStore: () => {
    console.log('change store clicked')
  },
}
