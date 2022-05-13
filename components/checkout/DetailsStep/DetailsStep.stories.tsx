import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import DetailsStep from './DetailsStep'

// Common
export default {
  title: 'Checkout/DetailsStep',
  component: DetailsStep,
  argTypes: { onPersonalDetailsSave: { action: 'clicked' } },
} as ComponentMeta<typeof DetailsStep>

const Template: ComponentStory<typeof DetailsStep> = (args) => <DetailsStep {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
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
