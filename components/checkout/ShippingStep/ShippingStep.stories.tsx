import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ShippingStep from './ShippingStep'

// Common
export default {
  title: 'Checkout/ShippingStep',
  component: ShippingStep,
} as ComponentMeta<typeof ShippingStep>

const Template: ComponentStory<typeof ShippingStep> = () => <ShippingStep />

// Default
export const Common = Template.bind({})
