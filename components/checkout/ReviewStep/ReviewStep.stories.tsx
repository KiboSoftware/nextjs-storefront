import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ReviewStep from './ReviewStep'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'
import { orderGetters } from '@/lib/getters'

// Common
export default {
  title: 'Checkout/ReviewStep',
  component: ReviewStep,
  argTypes: { onConfirmAndPay: { action: 'clicked' }, onGoBackButton: { action: 'clicked' } },
} as ComponentMeta<typeof ReviewStep>

const Template: ComponentStory<typeof ReviewStep> = (args) => (
  <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
    <ReviewStep {...args} />
  </CheckoutStepProvider>
)

const { shipItems, pickupItems } = orderGetters.getCheckoutDetails(orderMock.checkout)

// Default
export const Common = Template.bind({})
Common.args = {
  checkout: orderMock.checkout,
  isMultiShipEnabled: false,
  personalDetails: {
    showAccountFields: false,
    firstName: 'John',
    lastNameOrSurname: 'Doe',
  },
  shipItems,
  pickupItems,
  orderSummaryProps: {
    subTotal: '219.99',
    shippingTotal: '0',
    taxTotal: '13.73',
    total: '233.72',
  },
}

// With isMultiShipEnabled = true
export const WithMultiShippingAddresses = Template.bind({})
WithMultiShippingAddresses.args = {
  ...Common.args,
  checkout: orderMock.checkout,
  isMultiShipEnabled: true,
}
