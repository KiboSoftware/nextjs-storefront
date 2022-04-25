import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboStepper from './KiboStepper'
import {
  UserEnteredDetails,
  UserEnteredShipping,
  UserEnteredPayment,
} from '@/components/checkout/Context/Context'

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
export const Common = Template.bind({})
Common.args = {
  steps: ['details', 'shipping', 'payment', 'review'],
  activeStep: 0,
  setUserEnteredDetails: (userEnteredDetails: UserEnteredDetails) =>
    console.log(userEnteredDetails),
  setUserEnteredShipping: (userEnteredShipping: UserEnteredShipping) =>
    console.log(userEnteredShipping),
  setUserEnteredPayment: (userEnteredPayment: UserEnteredPayment) =>
    console.log(userEnteredPayment),
}
