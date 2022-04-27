import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { cartItemMock } from '../../../__mocks__/cartItemMock'
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
  cartItem: cartItemMock,
  isOpen: true,
  isCenteredDialog: false,
}
