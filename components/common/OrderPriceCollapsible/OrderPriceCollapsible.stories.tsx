import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderPriceCollapsible from './OrderPriceCollapsible'

export default {
  title: 'Common/OrderPriceCollapsible',
  component: OrderPriceCollapsible,
} as ComponentMeta<typeof OrderPriceCollapsible>

const Template: ComponentStory<typeof OrderPriceCollapsible> = ({ ...args }) => (
  <OrderPriceCollapsible {...args} />
)

// Common
export const Common = Template.bind({})

Common.args = {
  title: 'Cart Subtotal (2 items)',
  total: 240,
  subTotal: 400,
  taxTotal: 20.46,
}
export const WithDiscounts = Template.bind({})

WithDiscounts.args = {
  ...Common.args,
  discountedSubtotal: 340,
  discounts: [
    {
      id: 8,
      name: '30% OFF order level',
      impact: -100,
    },
  ],
}
