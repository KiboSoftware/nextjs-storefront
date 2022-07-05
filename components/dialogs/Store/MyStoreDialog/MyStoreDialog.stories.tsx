import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import MyStoreDialog from './MyStoreDialog'

export default {
  title: 'Store/MyStoreDialog',
  component: MyStoreDialog,
  argTypes: { onClose: { action: 'onClose' } },
} as ComponentMeta<typeof MyStoreDialog>

const Template: ComponentStory<typeof MyStoreDialog> = ({ ...args }) => <MyStoreDialog {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  isOpen: true,
  isDialogCentered: false,
}
