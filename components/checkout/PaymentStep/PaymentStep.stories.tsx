import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PaymentStep from './PaymentStep'

// Common
export default {
  title: 'Checkout/PaymentStep',
  component: PaymentStep,
} as ComponentMeta<typeof PaymentStep>

const Template: ComponentStory<typeof PaymentStep> = () => <PaymentStep />

// Default
export const Common = Template.bind({})
