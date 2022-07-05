import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import StoreLocatorDialog from './StoreLocatorDialog'

export default {
  title: 'Store/StoreLocatorDialog',
  component: StoreLocatorDialog,
  argTypes: { onClose: { action: 'onClose' } },
} as ComponentMeta<typeof StoreLocatorDialog>

const Template: ComponentStory<typeof StoreLocatorDialog> = ({ ...args }) => (
  <StoreLocatorDialog {...args} />
)

// Common
export const Common = Template.bind({})

Common.args = {
  isOpen: true,
  isDialogCentered: false,
}
