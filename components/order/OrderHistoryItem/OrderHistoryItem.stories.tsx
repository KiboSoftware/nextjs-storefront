import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderHistoryItem from './OrderHistoryItem'

// Common
export default {
  title: 'Order/OrderHistoryItem',
  component: OrderHistoryItem,
} as ComponentMeta<typeof OrderHistoryItem>

const Template: ComponentStory<typeof OrderHistoryItem> = (args) => <OrderHistoryItem {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  id: '1',
  submittedDate: 'March 16, 2022',
  productNames: 'Katahdin 50 Pack',
  orderTotal: 90.0,
  orderStatus: 'Abandoned',
}
