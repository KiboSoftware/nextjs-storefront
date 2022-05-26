import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboLoginDialog from './KiboLoginDialog'
import { loginInputs } from '@/components/layout/KiboLoginContent/KiboLoginContent'

const login = (data: loginInputs) => {
  console.log('KiboLoginDialog login called...', data)
}
const clickForgotpassword = () => {
  console.log('KiboLoginDialog clickForgotpassword called...')
}
const clickRegisterAccount = () => {
  console.log('KiboLoginDialog clickRegisterAccount called...')
}

export default {
  component: KiboLoginDialog,
  title: 'Layout/KiboLoginDialog',
  argTypes: {
    onClose: { action: 'onClose' },
    handleLogin: { action: login },
    handleForgotPassword: { action: clickForgotpassword },
    handleRegisterAccount: { action: clickRegisterAccount },
  },
} as ComponentMeta<typeof KiboLoginDialog>

const Template: ComponentStory<typeof KiboLoginDialog> = (args) => <KiboLoginDialog {...args} />

// Common
export const Common = Template.bind({})
const isDialogOpen = { value: true }
Common.args = {
  isOpen: isDialogOpen.value,
  isCenteredDialog: true,
  customMaxWidth: '32.375rem',
  onClose: () => {
    console.log('onClose called..')
    isDialogOpen.value = false
  },
}
