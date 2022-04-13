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
  name: 'Order Summary',
  type: 'orderSummary',
  cartTotal: 'Cart Subtotal (3 items)',
  standardShipping: 'Standard Shipping',
  standardShippingAmount: 'Free',
  estTax: 'Tax',
  estTaxamt: '$13.73',
  orderTotal: '$233.72',
  subTotal: '$219.99',
  estOrderTotal: 'Order Total',
}
export const Shipping = Template.bind({})
Shipping.args = {
  name: 'Order Summary',
  type: 'orderShipping',
  cartTotal: 'Cart Subtotal (3 items)',
  standardShipping: 'Standard Shipping',
  standardShippingAmount: 'Free',
  estTax: 'Tax',
  estTaxamt: '$13.73',
  orderTotal: '$233.72',
  subTotal: '$219.99',
  estOrderTotal: 'Order Total',
}
