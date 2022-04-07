import React from 'react'

import { useArgs } from '@storybook/client-api'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddToCart from './AddToCart'

export default {
  title: 'AddToCart/Common',
  component: AddToCart,
} as ComponentMeta<typeof AddToCart>

const Template: ComponentStory<typeof AddToCart> = ({ ...args }) => {
  const [{ open }, updateArgs] = useArgs()
  const handleClose = () => updateArgs({ open: !open })

  return <AddToCart {...args} onClose={handleClose} />
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
