import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderHistory from './OrderHistory'
import { orderCollection } from '@/__mocks__/stories/orderCollection'

// Common
export default {
  title: 'MyAccount/OrderHistory',
  component: OrderHistory,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
} as ComponentMeta<typeof OrderHistory>

const Template: ComponentStory<typeof OrderHistory> = (args) => <OrderHistory {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  orders: orderCollection.orders,
  accountTitle: 'My Account',
}
