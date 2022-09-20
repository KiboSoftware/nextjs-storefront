import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProfileDetailsForm from './ProfileDetailsForm'

export default {
  component: ProfileDetailsForm,
  title: 'My Profile/ProfileDetailsForm',
  argTypes: {
    onCancel: { action: 'onCancel' },
    onSaveProfileData: { action: 'onSaveProfileData' },
  },
} as ComponentMeta<typeof ProfileDetailsForm>

const Template: ComponentStory<typeof ProfileDetailsForm> = (args) => (
  <ProfileDetailsForm {...args} />
)

// Common
export const NameForm = Template.bind({})

NameForm.args = {
  firstName: '',
  lastName: '',
}

export const EmailForm = Template.bind({})

EmailForm.args = {
  isEmailForm: true,
}

export const PasswordForm = Template.bind({})

PasswordForm.args = {
  isPasswordForm: true,
}
