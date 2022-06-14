import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import LoginContent from './LoginContent'

export default {
  component: LoginContent,
  title: 'Layout/Login/LoginContent',
  argTypes: {
    onClose: { action: 'onClose' },
    onLogin: { action: 'login' },
    onForgotPasswordClick: { action: 'clickForgotPassword' },
  },
} as ComponentMeta<typeof LoginContent>

const Template: ComponentStory<typeof LoginContent> = (args) => <LoginContent {...args} />

// Common
export const Common = Template.bind({})
