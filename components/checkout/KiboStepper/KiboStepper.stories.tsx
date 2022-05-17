import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboStepper from './KiboStepper'

// Common
export default {
  title: 'Checkout/KiboStepper',
  component: KiboStepper,
} as ComponentMeta<typeof KiboStepper>

const Template: ComponentStory<typeof KiboStepper> = (args) => (
  <KiboStepper {...args}>
    <p>Details step content goes here...</p>
    <p>Shipping step content goes here...</p>
    <p>Payment step content goes here...</p>
    <p>Review step content goes here...</p>
  </KiboStepper>
)

// Default
export const Details = Template.bind({})
Details.args = {
  steps: ['details', 'shipping', 'payment', 'review'],
  activeStep: 0,
}

export const Shipping = Template.bind({})
Shipping.args = {
  steps: ['details', 'shipping', 'payment', 'review'],
  activeStep: 1,
}

export const Payment = Template.bind({})
Payment.args = {
  steps: ['details', 'shipping', 'payment', 'review'],
  activeStep: 2,
}

export const Review = Template.bind({})
Review.args = {
  steps: ['details', 'shipping', 'payment', 'review'],
  activeStep: 3,
}
