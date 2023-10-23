import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderPrice from './OrderPrice'
import PromoCodeBadge from '../PromoCodeBadge/PromoCodeBadge'

import { CrOrder } from '@/lib/gql/types'

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
  totalLabel: 'Total',
  orderDetails: {
    subTotal: 299.19,
    shippingTotal: 0,
    taxTotal: 13.79,
    total: 233.72,
    handlingTotal: 10,
  },
}

export const cartPrice = Template.bind({})

cartPrice.args = {
  ...Common.args,
  isShippingTaxIncluded: false,
}

export const withShippingDiscounts = Template.bind({})

withShippingDiscounts.args = {
  ...Common.args,
  orderDetails: {
    ...Common.args.orderDetails,
    amountRefunded: 0,
    amountRemainingForPayment: 0,
    continuityOrderOrdinal: 0,
    totalCollected: 0,
    shippingDiscounts: [
      {
        discount: {
          impact: 30,
          discount: {
            name: 'Test Discount',
            id: 1234,
          },
        },
      },
    ],
  } as CrOrder,
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
