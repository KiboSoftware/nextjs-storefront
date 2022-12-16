import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ReviewStep from './ReviewStep'
import { orderMock } from '@/__mocks__/stories/orderMock'
import type { CommonCheckout } from '@/components/page-templates/CheckoutUITemplate/CheckoutUITemplate'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'

import type { Checkout, CrOrder } from '@/lib/gql/types'

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

// Default
export const Common = Template.bind({})
Common.args = {
  checkout: orderMock.checkout as CommonCheckout<CrOrder, Checkout>,
  isMultiShipEnabled: false,
}

// With isMultiShipEnabled = true
export const WithMultiShippingAddresses = Template.bind({})
WithMultiShippingAddresses.args = {
  checkout: orderMock.checkout as CommonCheckout<CrOrder, Checkout>,
  isMultiShipEnabled: true,
}
