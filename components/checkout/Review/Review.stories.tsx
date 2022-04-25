import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Review from './Review'

// Common
export default {
  title: 'Checkout/Review',
  component: Review,
} as ComponentMeta<typeof Review>

const Template: ComponentStory<typeof Review> = () => <Review />

// Default
export const Common = Template.bind({})
Common.args = {
  ref: undefined,
}
