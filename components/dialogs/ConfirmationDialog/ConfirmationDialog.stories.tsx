import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ConfirmationDialog from './ConfirmationDialog'

export default {
  title: 'Dialogs/MyAccount/ConfirmationDialog',
  component: ConfirmationDialog,
  argTypes: { onConfirm: { action: 'onConfirm' } },
} as ComponentMeta<typeof ConfirmationDialog>

const Template: ComponentStory<typeof ConfirmationDialog> = ({ ...args }) => (
  <ConfirmationDialog {...args} />
)

// Common
export const Common = Template.bind({})

Common.args = {
  contentText: 'Are you sure you want to delete ?',
  primaryButtonText: 'Delete',
}
