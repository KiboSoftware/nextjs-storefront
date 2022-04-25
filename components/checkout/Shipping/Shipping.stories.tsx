import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Shipping from './Shipping'

// Common
export default {
  title: 'Checkout/Shipping',
  component: Shipping,
} as ComponentMeta<typeof Shipping>

const Template: ComponentStory<typeof Shipping> = () => <Shipping />

// Default
export const Common = Template.bind({})
Common.args = {
  ref: undefined,
}
