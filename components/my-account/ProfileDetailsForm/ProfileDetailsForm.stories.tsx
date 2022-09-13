import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProfileDetailsForm from './ProfileDetailsForm'

export default {
  component: ProfileDetailsForm,
  title: 'My Profile/ProfileDetailsForm',
} as ComponentMeta<typeof ProfileDetailsForm>

const Template: ComponentStory<typeof ProfileDetailsForm> = (args) => (
  <ProfileDetailsForm {...args} />
)

// Common
export const Common = Template.bind({})

Common.args = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  isEmailForm: false,
}
