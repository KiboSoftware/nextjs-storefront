import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ReviewStep from './ReviewStep'
import { orderMock } from '@/__mocks__/stories/orderMock'

// Common
export default {
  title: 'Checkout/ReviewStep',
  component: ReviewStep,
  argTypes: { onConfirmAndPay: { action: 'clicked' }, onGoBackButton: { action: 'clicked' } },
} as ComponentMeta<typeof ReviewStep>

const Template: ComponentStory<typeof ReviewStep> = (args) => <ReviewStep {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  checkout: orderMock.checkout,
  stepperStatus: 'VALIDATE',
}
