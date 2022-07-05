import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddToCartDialog from './AddToCartDialog'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'

export default {
  title: 'Dialogs/AddToCartDialog/Dialog',
  component: AddToCartDialog,
  argTypes: { closeModal: { action: 'closeModal' } },
} as ComponentMeta<typeof AddToCartDialog>

const Template: ComponentStory<typeof AddToCartDialog> = ({ ...args }) => (
  <AddToCartDialog {...args} />
)

// Common
export const Common = Template.bind({})

Common.args = {
  cartItem: cartItemMock,
  isDialogCentered: false,
}
