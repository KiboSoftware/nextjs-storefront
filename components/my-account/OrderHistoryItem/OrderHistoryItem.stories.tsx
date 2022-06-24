import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderHistoryItem from './OrderHistoryItem'
import { orderCollection } from '@/__mocks__/stories/orderCollection'

import type { Order } from '@/lib/gql/types'

// Common
export default {
  title: 'MyAccount/OrderHistoryItem',
  component: OrderHistoryItem,
} as ComponentMeta<typeof OrderHistoryItem>

const Template: ComponentStory<typeof OrderHistoryItem> = (args) => <OrderHistoryItem {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  order: (orderCollection &&
    orderCollection.orders &&
    orderCollection.orders.items &&
    orderCollection.orders.items[0]) as Order,
}
