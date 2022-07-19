import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PromoCodeBadge from '../PromoCodeBadge/PromoCodeBadge'
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
  shippingTotal: 'Free',
  tax: '$13.73',
  total: '$233.72',
}
// WithPromo
export const WithPromoCode = Template.bind({})

WithPromoCode.args = {
  ...Common.args,
  promoComponent: (
    <PromoCodeBadge
      onApplyCouponCode={() => ''}
      onRemoveCouponCode={() => ''}
      promoList={[]}
      promoError={false}
    />
  ),
}
