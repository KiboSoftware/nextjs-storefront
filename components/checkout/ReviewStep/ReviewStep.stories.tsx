import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ReviewStep from './ReviewStep'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'

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
  checkout: orderMock.checkout,
}
