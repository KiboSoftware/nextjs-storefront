import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderPrice from './OrderPrice'

export default {
  title: 'Common/OrderPrice',
  component: OrderPrice,
} as ComponentMeta<typeof OrderPrice>

const Template: ComponentStory<typeof OrderPrice> = ({ ...args }) => <OrderPrice {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  subTotalLabel: 'Cart Subtotal (6 items)',
  shippingTotalLabel: 'Standard Shipping',
  taxLabel: 'Estimated Tax',
  totalLabel: 'Total',
  subTotal: '$219.99',
  shippingTotal: '$0',
  tax: '$13.73',
  total: '$233.72',
}
