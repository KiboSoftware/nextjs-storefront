import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderPrice from './OrderPrice'
import PromoCodeBadge from '../PromoCodeBadge/PromoCodeBadge'

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
  handlingLabel: 'Additional Handling',
  taxLabel: 'Estimated Tax',
  totalLabel: 'Total',
  orderPriceDetails: {
    subTotal: 299.19,
    shippingTotal: 0,
    taxTotal: 13.79,
    total: 233.72,
    handlingTotal: 10,
  },
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
