/** @format */

import React from 'react'

import { Button } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import PromoCodeBadge from '../PromoCodeBadge/PromoCodeBadge'
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
  nameLabel: 'Order Summary',
  subTotalLabel: 'Cart Subtotal of (3 items)',
  shippingTotalLabel: 'Standard Shipping',
  taxLabel: 'Tax',
  totalLabel: 'Order Total',
  subTotal: '$219.99',
  shippingTotal: 'Free',
  tax: '$13.73',
  total: '$233.72',
  checkoutLabel: 'Go to Checkout',
  backLabel: 'Go Back',
}

export const Shipping = ShippingTemplate.bind({})
Shipping.args = {
  nameLabel: 'Order Summary',
  subTotalLabel: 'Cart Subtotal of (3 items)',
  shippingTotalLabel: 'Standard Shipping',
  taxLabel: 'Tax',
  totalLabel: 'Order Total',
  subTotal: '$219.99',
  shippingTotal: '$1',
  tax: '$13.73',
  total: '$234.72',
  shippingLabel: 'Go to Shipping',
}

// WithPromo
export const WithPromoCodeCheckout = CheckoutTemplate.bind({})

WithPromoCodeCheckout.args = {
  ...Checkout.args,
  promoComponent: (
    <PromoCodeBadge
      onApplyCouponCode={() => ''}
      onRemoveCouponCode={() => ''}
      promoList={[]}
      promoError={false}
    />
  ),
}
export const WithPromoCodeShipping = ShippingTemplate.bind({})

WithPromoCodeShipping.args = {
  ...Shipping.args,
  promoComponent: (
    <PromoCodeBadge
      onApplyCouponCode={() => ''}
      onRemoveCouponCode={() => ''}
      promoList={[]}
      promoError={false}
    />
  ),
}
