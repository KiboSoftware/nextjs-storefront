import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import MultiShippingStep from './MultiShippingStep'
import { checkoutMock, checkoutGroupRatesMock } from '@/__mocks__/stories'
import { userAddressResponse } from '@/__mocks__/stories/userAddressMock'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'

const steps = ['details', 'shipping', 'payment', 'review']

// Common
export default {
  title: 'Checkout/MultiShippingStep',
  component: MultiShippingStep,
  decorators: [
    (Story) => (
      <CheckoutStepProvider steps={steps}>
        <Story />
      </CheckoutStepProvider>
    ),
  ],
} as ComponentMeta<typeof MultiShippingStep>

const Template: ComponentStory<typeof MultiShippingStep> = (args) => <MultiShippingStep {...args} />

// Default
export const Common = Template.bind({})

Common.args = {
  checkout: checkoutMock.checkout,
  isAuthenticated: true,
  savedUserAddressData: userAddressResponse,
  shippingMethods: checkoutGroupRatesMock?.checkoutShippingMethods,
}
