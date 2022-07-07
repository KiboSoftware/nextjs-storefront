import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderHistory from './OrderHistory'
import { orderCollection } from '@/__mocks__/stories/orderCollection'
import { orderMock } from '@/__mocks__/stories/orderMock'

// Common
export default {
  title: 'Order/OrderHistory',
  component: OrderHistory,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
} as ComponentMeta<typeof OrderHistory>

const Template: ComponentStory<typeof OrderHistory> = (args) => <OrderHistory {...args} />

// Default
const filters = [
  {
    label: 'Last 30 days',
    filterValue: 'm-1',
    count: 3,
    isApplied: false,
  },
  {
    label: 'Last 6 months',
    filterValue: 'm-6',
    count: 3,
    isApplied: true,
  },
]

export const Common = Template.bind({})
Common.args = {
  accountTitle: 'My Account',
  filters: filters,
  orders: orderCollection.orders,
  storePickupAddress:
    (orderMock.checkout.payments &&
      orderMock.checkout.payments[0]?.billingInfo?.billingContact?.address) ||
    undefined,
}
