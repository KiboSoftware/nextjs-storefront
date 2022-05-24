import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import RegisterAccountModal from './RegisterAccountModal'

export default {
  title: 'Layout/Register Account/Modal',
  component: RegisterAccountModal,
  argTypes: {
    onLoginModalOpen: { action: 'login modal open' },
  },
} as ComponentMeta<typeof RegisterAccountModal>

const Template: ComponentStory<typeof RegisterAccountModal> = (args) => (
  <RegisterAccountModal {...args} />
)

export const Common = Template.bind({})

Common.args = {
  isOpen: true,
  isCenteredDialog: false,
}
