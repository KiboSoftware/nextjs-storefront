import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Checkout from './Checkout'

// Common
export default {
  title: 'Checkout/Checkout',
  component: Checkout,
} as ComponentMeta<typeof Checkout>

const Template: ComponentStory<typeof Checkout> = () => <Checkout />

// Default
export const Common = Template.bind({})
