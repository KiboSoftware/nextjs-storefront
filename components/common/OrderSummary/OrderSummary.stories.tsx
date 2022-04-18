/** @format */

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderSummary from './OrderSummary'

export default {
  title: 'Common/OrderSummary',
  component: OrderSummary,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof OrderSummary>
const Template: ComponentStory<typeof OrderSummary> = (args) => <OrderSummary {...args} />

export const Checkout = Template.bind({})
Checkout.args = {
  standardShippingAmount: 'Free',
  estimatedTaxAmout: '$13.73',
  orderTotal: '$233.72',
  subTotal: '$219.99',
  numberOfItems: '3 items',
}
export const Shipping = Template.bind({})
Shipping.args = {
  type: 'orderShipping',
  standardShippingAmount: 'Free',
  estimatedTaxAmout: '$13.73',
  orderTotal: '$233.72',
  subTotal: '$219.99',
  numberOfItems: '3 items',
}
