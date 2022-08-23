import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import DeleteAddressConfirmationDialog from './DeleteAddressConfirmationDialog'

export default {
  title: 'Dialogs/MyAccount/DeleteAddressConfirmationDialog',
  component: DeleteAddressConfirmationDialog,
  argTypes: { onClose: { action: 'onClose' } },
} as ComponentMeta<typeof DeleteAddressConfirmationDialog>

const Template: ComponentStory<typeof DeleteAddressConfirmationDialog> = ({ ...args }) => (
  <DeleteAddressConfirmationDialog {...args} />
)

// Common
export const Common = Template.bind({})

Common.args = {
  isOpen: true,
  isDialogCentered: false,
  onClose: () => console.log('close delete address confirmation dialog'),
  onDeleteAddress: () => console.log('delete address'),
}
