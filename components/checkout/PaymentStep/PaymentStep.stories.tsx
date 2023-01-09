import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PaymentStep from './PaymentStep'
import { orderMock } from '@/__mocks__/stories'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'

const steps = ['details', 'shipping', 'payment', 'review']

export default {
  title: 'checkout/PaymentStep',
  component: PaymentStep,
  decorators: [
    (Story) => (
      <CheckoutStepProvider steps={steps}>
        <Story />
      </CheckoutStepProvider>
    ),
  ],
} as ComponentMeta<typeof PaymentStep>

const Template: ComponentStory<typeof PaymentStep> = (args) => <PaymentStep {...args} />

// Common
export const Common = Template.bind({})

const handleVoidPayment = () => 'onVoidPayment'
const handleAddPayment = () => 'onAddPayment'

Common.args = {
  checkout: orderMock.checkout,
  onVoidPayment: handleVoidPayment,
  onAddPayment: handleAddPayment,
}
