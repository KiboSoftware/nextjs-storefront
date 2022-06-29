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
export const Common = Template.bind({})
Common.args = {
  accountTitle: 'My Account',
  orders: orderCollection.orders,
  storePickupAddress:
    (orderMock.checkout.payments &&
      orderMock.checkout.payments[0]?.billingInfo?.billingContact?.address) ||
    undefined,
}
