import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ShippingGroupsWithMethod from './ShippingGroupsWithMethod'
import { orderMock } from '@/__mocks__/stories/orderMock'

import type { CrOrderItem } from '@/lib/gql/types'

export default {
  title: 'Common/ShippingGroupsWithMethod',
  component: ShippingGroupsWithMethod,
  argTypes: {},
} as ComponentMeta<typeof ShippingGroupsWithMethod>

const orderItems = orderMock?.checkout?.items

// Default Line Item
const Template: ComponentStory<typeof ShippingGroupsWithMethod> = (args) => (
  <ShippingGroupsWithMethod {...args} />
)

export const Common = Template.bind({})
Common.args = {
  items: orderItems as CrOrderItem[],
}
