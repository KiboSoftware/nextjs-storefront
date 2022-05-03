import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Details from './Details'

// Common
export default {
  title: 'Checkout/Details',
  component: Details,
  argTypes: { onPersonalDetailsSave: { action: 'clicked' } },
} as ComponentMeta<typeof Details>

const Template: ComponentStory<typeof Details> = (args) => <Details {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  ref: undefined,
  setAutoFocus: false,
  personalDetails: {
    email: '',
    showAccountFields: false,
    firstName: '',
    lastNameOrSurname: '',
    password: '',
  },
  onPersonalDetailsSave: () => {
    /*parent will handle onPersonalDetailsSave*/
  },
}

// With account fields
export const withAccountCreation = Template.bind({})
withAccountCreation.args = {
  ref: undefined,
  setAutoFocus: false,
  personalDetails: {
    email: '',
    showAccountFields: true,
    firstName: '',
    lastNameOrSurname: '',
    password: '',
  },
  onPersonalDetailsSave: () => {
    /*parent will handle onPersonalDetailsSave*/
  },
}
