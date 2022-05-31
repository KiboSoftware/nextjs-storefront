import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import LoginDialog from './LoginDialog'

export default {
  component: LoginDialog,
  title: 'Layout/Login/LoginDialog',
  argTypes: {
    onClose: { action: 'onClose' },
    handleLogin: { action: 'login' },
    handleForgotPassword: { action: 'clickForgotpassword' },
    onRegisterNow: { action: 'onRegisterNow' },
  },
} as ComponentMeta<typeof LoginDialog>

const Template: ComponentStory<typeof LoginDialog> = (args) => <LoginDialog {...args} />

export const Common = Template.bind({})

// Common

Common.args = {
  isOpen: true,
  customMaxWidth: '32.375rem',
}
