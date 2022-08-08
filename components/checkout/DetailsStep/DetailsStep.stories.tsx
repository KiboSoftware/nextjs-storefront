import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import DetailsStep from './DetailsStep'
import { CheckoutStepProvider } from '@/context'

// Common
export default {
  title: 'Checkout/DetailsStep',
  component: DetailsStep,
  argTypes: { onPersonalDetailsSave: { action: 'clicked' } },
} as ComponentMeta<typeof DetailsStep>

const Template: ComponentStory<typeof DetailsStep> = (args) => (
  <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
    <DetailsStep {...args} />
  </CheckoutStepProvider>
)

// Default
export const Common = Template.bind({})
Common.args = {
  setAutoFocus: false,
  checkout: undefined,
}

// With account fields
export const withAccountCreation = Template.bind({})
withAccountCreation.args = {
  setAutoFocus: false,
  checkout: undefined,
}
