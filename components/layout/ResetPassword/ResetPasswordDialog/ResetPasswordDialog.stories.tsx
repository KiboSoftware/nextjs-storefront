import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ResetPasswordDialog from './ResetPasswordDialog'

export default {
  title: 'Layout/Reset Password/Dialog',
  component: ResetPasswordDialog,
  argTypes: {
    gotoLogin: { action: 'Login Dialog Open' },
    onResetPassword: { action: 'reset password' },
  },
} as ComponentMeta<typeof ResetPasswordDialog>

const Template: ComponentStory<typeof ResetPasswordDialog> = () => <ResetPasswordDialog />

export const Common = Template.bind({})
