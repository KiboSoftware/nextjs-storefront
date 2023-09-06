import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderSummaryEditable from './OrderSummaryEditable'

// Common
export default {
  title: 'B2B/OrderSummaryEditable',
  component: OrderSummaryEditable,
  argTypes: { onSave: { action: 'onSave' } },
} as ComponentMeta<typeof OrderSummaryEditable>

const Template: ComponentStory<typeof OrderSummaryEditable> = (args) => (
  <OrderSummaryEditable {...args} />
)

export const Common = Template.bind({})

Common.args = {
  itemTotal: 190,
  itemTaxTotal: 10,
  subTotal: 200,
  adjustment: -20,

  shippingTotal: 10,
  shippingTaxTotal: 1,
  shippingSubTotal: 5,
  shippingAdjustment: 4,

  handlingTotal: 20,
  handlingTaxTotal: 1,
  handlingSubTotal: 16,
  handlingAdjustment: 3,
  mode: 'edit',
  status: 'Pending',

  dutyTotal: 10,
}
