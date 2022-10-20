import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboStepper from './KiboStepper'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'
const steps = ['details', 'shipping', 'payment', 'review']

// Common
export default {
  title: 'Checkout/KiboStepper',
  component: KiboStepper,
  argTypes: { onHandleBack: { action: 'clicked' } },
  decorators: [
    (Story) => (
      <CheckoutStepProvider steps={steps} initialActiveStep={1}>
        <Story />
      </CheckoutStepProvider>
    ),
  ],
} as ComponentMeta<typeof KiboStepper>

const Template: ComponentStory<typeof KiboStepper> = (args) => (
  <KiboStepper {...args} isSticky={false}>
    <p>Details step content goes here...</p>
    <p>Shipping step content goes here...</p>
    <p>Payment step content goes here...</p>
    <p>Review step content goes here...</p>
  </KiboStepper>
)

// Default
export const Details = Template.bind({})
