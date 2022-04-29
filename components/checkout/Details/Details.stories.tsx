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
    lastNameOrSurname: '',
    password: '',
  },
}

// With account fields
export const withAccountCreation = Template.bind({})
withAccountCreation.args = {
  ref: undefined,
  personalDetails: {
    email: '',
    showAccountFields: true,
    firstName: '',
    lastNameOrSurname: '',
    password: '',
  },
}
