import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import RegisterAccountDialog from './RegisterAccountDialog'

export default {
  title: 'Layout/Register Account/Dialog',
  component: RegisterAccountDialog,
  argTypes: {
    onLoginToYourAccount: { action: 'Login Dialog Open' },
  },
} as ComponentMeta<typeof RegisterAccountDialog>

const Template: ComponentStory<typeof RegisterAccountDialog> = (args) => (
  <RegisterAccountDialog {...args} />
)

export const Common = Template.bind({})

Common.args = {
  isOpen: true,
  isCenteredDialog: false,
}
