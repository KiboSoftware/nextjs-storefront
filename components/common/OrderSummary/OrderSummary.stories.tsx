/** @format */

import React from 'react'

import { Button } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderSummary from './OrderSummary'

const styles = {
  checkOutButtonStyle: {
    borderradius: '0.25rem',
    height: '42px',
  },
  shippingButtonStyle: {
    borderradius: '0.25rem',
    marginBottom: '10px',
    height: '42px',
  },
  backButtonStyle: {
    color: 'black',
    backgroundColor: 'white',
    borderradius: '0.25rem',
    height: '42px',
  },
}

export default {
  title: 'Common/OrderSummary',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof OrderSummary>
const CheckoutTemplate: ComponentStory<typeof OrderSummary> = (args) => (
  <OrderSummary {...args}>
    <Button variant="contained" sx={styles.checkOutButtonStyle} fullWidth>
      Go To Checkout
    </Button>
  </OrderSummary>
)

const ShippingTemplate: ComponentStory<typeof OrderSummary> = (args) => (
  <OrderSummary {...args}>
    <Button variant="contained" sx={styles.shippingButtonStyle} fullWidth>
      Go To Shipping
    </Button>
    <Button variant="contained" sx={styles.backButtonStyle} fullWidth>
      Go back
    </Button>
  </OrderSummary>
)

export const Checkout = CheckoutTemplate.bind({})
Checkout.args = {
  standardShippingAmount: 'Free',
  estimatedTaxAmout: '$13.73',
  orderTotal: '$233.72',
  subTotal: '$219.99',
  numberOfItems: '3 items',
  backLabel: 'Go Back',
  checkoutLabel: 'Go to Checkout',
  nameLabel: 'Order Summary',
  cartTotalLabel: 'Cart Subtotal',
  standardShippingLabel: 'Standard Shipping',
  estimatedTaxLabel: 'Tax',
  orderTotalLabel: 'Order Total',
}
export const Shipping = ShippingTemplate.bind({})
Shipping.args = {
  standardShippingAmount: 'Free',
  estimatedTaxAmout: '$13.73',
  orderTotal: '$233.72',
  subTotal: '$219.99',
  numberOfItems: '3 items',
  shippingLabel: 'Go to Shipping',
  nameLabel: 'Order Summary',
  cartTotalLabel: 'Cart Subtotal',
  standardShippingLabel: 'Standard Shipping',
  estimatedTaxLabel: 'Tax',
  orderTotalLabel: 'Order Total',
}
