import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Payment from './Payment'

// Common
export default {
  title: 'Checkout/Payment',
  component: Payment,
} as ComponentMeta<typeof Payment>

const Template: ComponentStory<typeof Payment> = () => <Payment />

// Default
export const Common = Template.bind({})
Common.args = {
  ref: undefined,
}
