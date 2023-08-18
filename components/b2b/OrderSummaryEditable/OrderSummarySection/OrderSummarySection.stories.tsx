import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderSummarySection from './OrderSummarySection'

// Common
export default {
  title: 'B2B/OrderSummarySection',
  component: OrderSummarySection,
  argTypes: { setAdjustmentValue: { action: 'setAdjustmentValue' } },
} as ComponentMeta<typeof OrderSummarySection>

const Template: ComponentStory<typeof OrderSummarySection> = (args) => (
  <OrderSummarySection {...args} />
)

export const Common = Template.bind({})

Common.args = {
  total: 190,
  taxTotal: 10,
  adjustmentValue: -20,
  subTotal: 200,
  adjustment: -20,
  title: 'Item',
  isEdit: false,
}

export const EditMode = Template.bind({})

EditMode.args = {
  ...Common.args,
  isEdit: true,
}
