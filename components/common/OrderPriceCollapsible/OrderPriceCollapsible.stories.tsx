import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderPrice from './OrderPriceCollapsible'

export default {
  title: 'Common/OrderPrice',
  component: OrderPrice,
} as ComponentMeta<typeof OrderPrice>

const Template: ComponentStory<typeof OrderPrice> = ({ ...args }) => <OrderPrice {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  title: 'Cart Subtotal (6 items)',
  subTotal: 299.19,
  total: 312.98,
  taxTotal: 13.79,
}
export const withShippingDiscounts = Template.bind({})

withShippingDiscounts.args = {
  ...Common.args,
  discounts: [
    {
      impact: 30,
      discount: {
        name: 'Test Discount',
        id: 1234,
      },
    },
  ],
}
