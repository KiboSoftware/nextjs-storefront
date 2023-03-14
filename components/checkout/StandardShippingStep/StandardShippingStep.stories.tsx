import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import StandardShippingStep from './StandardShippingStep'
import { orderMock } from '@/__mocks__/stories'
import { userAddressResponse } from '@/__mocks__/stories/userAddressMock'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'

const steps = ['details', 'shipping', 'payment', 'review']

// Common
export default {
  title: 'Checkout/StandardShippingStep',
  component: StandardShippingStep,
  decorators: [
    (Story) => (
      <CheckoutStepProvider steps={steps}>
        <Story />
      </CheckoutStepProvider>
    ),
  ],
} as ComponentMeta<typeof StandardShippingStep>

const Template: ComponentStory<typeof StandardShippingStep> = (args) => (
  <StandardShippingStep {...args} />
)

// Default
export const Common = Template.bind({})

Common.args = {
  savedUserAddressData: userAddressResponse,
  setAutoFocus: false,
  checkout: orderMock.checkout,
  isAuthenticated: true,
}
