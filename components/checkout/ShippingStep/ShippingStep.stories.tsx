import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ShippingStep from './ShippingStep'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'

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
Common.args = {
  setAutoFocus: false,
  checkout: orderMock.checkout,
}
