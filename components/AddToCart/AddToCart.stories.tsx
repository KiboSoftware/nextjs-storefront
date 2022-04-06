import React from 'react'

import { useArgs } from '@storybook/client-api'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddToCart from './AddToCart'

export default {
  title: 'AddToCart/Common',
  component: AddToCart,
} as ComponentMeta<typeof AddToCart>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: ComponentStory<typeof AddToCart> = ({ onClose, ...args }) => {
  const [{ open }, updateArgs] = useArgs()
  const handleClose = () => updateArgs({ open: !open })

  return <AddToCart onClose={handleClose} {...args} />
}

// Common
export const Common = Template.bind({})
Common.args = {
  fullfillmentOption: 'free',
  subtotal: '219.99',
  tax: '13.73',
  total: '233.72',
  open: true,
  isCenteredModal: false,
}
