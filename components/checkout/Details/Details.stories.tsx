import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Details from './Details'

// Common
export default {
  title: 'Checkout/Details',
  component: Details,
} as ComponentMeta<typeof Details>

const Template: ComponentStory<typeof Details> = (args) => <Details {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  ref: undefined,
  personalDetails: {
    email: '',
    showAccountFields: false,
    firstName: '',
    lastName: '',
    password: '',
  },
}
