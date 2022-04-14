import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddToCartDialog from './AddToCartDialog'

export default {
  title: 'Add-To-Cart-Dialog/AddToCartDialog',
  component: AddToCartDialog,
  argTypes: { onClose: { action: 'onClose' } },
} as ComponentMeta<typeof AddToCartDialog>

const Template: ComponentStory<typeof AddToCartDialog> = ({ ...args }) => (
  <AddToCartDialog {...args} />
)

// Common
export const Common = Template.bind({})
Common.args = {
  fullfillmentOption: 'free',
  quantity: 2,
  subtotal: 219.99,
  tax: 13.73,
  total: 233.72,
  isOpen: true,
  isCenteredDialog: false,
}
