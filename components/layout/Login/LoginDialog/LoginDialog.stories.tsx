import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import LoginDialog from './LoginDialog'
import { UIStateContext } from '@/context'
const dialogdata = {
  isLoginDialogOpen: true,
  isRegisterDialogOpen: false,
  toggleLoginDialog: () => null,
  toggleRegisterDialog: () => null,
}
export default {
  component: LoginDialog,
  argTypes: { action: { onclick: 'toggleLoginDialog' } },
  title: 'Layout/Login/LoginDialog',
} as ComponentMeta<typeof LoginDialog>

const Template: ComponentStory<typeof LoginDialog> = () => (
  <UIStateContext.Provider value={dialogdata}>
    <LoginDialog />
  </UIStateContext.Provider>
)

export const Common = Template.bind({})

// Common

Common.args = {
  isOpen: true,
}
