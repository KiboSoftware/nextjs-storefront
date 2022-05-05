import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ReviewStep from './ReviewStep'

// Common
export default {
  title: 'Checkout/ReviewStep',
  component: ReviewStep,
} as ComponentMeta<typeof ReviewStep>

const Template: ComponentStory<typeof ReviewStep> = () => <ReviewStep />

// Default
export const Common = Template.bind({})
Common.args = {
  ref: undefined,
}
