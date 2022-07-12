import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import LoginDialog from './LoginDialog'
export default {
  component: LoginDialog,
  argTypes: { action: { onclick: 'toggleLoginDialog' } },
  title: 'Layout/Login/LoginDialog',
} as ComponentMeta<typeof LoginDialog>

const Template: ComponentStory<typeof LoginDialog> = () => <LoginDialog />

export const Common = Template.bind({})

// Common

Common.args = {
  isOpen: true,
}
