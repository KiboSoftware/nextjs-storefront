import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ShippingStep from './ShippingStep'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { userAddressResponse } from '@/__mocks__/stories/userAddressMock'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'
import { userAddressGetters } from '@/lib/getters/userAddressGetters'
const steps = ['details', 'shipping', 'payment', 'review']

// Common
export default {
  title: 'Checkout/ShippingStep',
  component: ShippingStep,
  decorators: [
    (Story) => (
      <CheckoutStepProvider steps={steps}>
        <Story />
      </CheckoutStepProvider>
    ),
  ],
} as ComponentMeta<typeof ShippingStep>

const Template: ComponentStory<typeof ShippingStep> = (args) => <ShippingStep {...args} />

// Default
export const Common = Template.bind({})

const userShippingAddress = userAddressGetters.getUserShippingAddress(userAddressResponse?.items)
Common.args = {
  userShippingAddress,
  setAutoFocus: false,
  checkout: orderMock.checkout,
}
