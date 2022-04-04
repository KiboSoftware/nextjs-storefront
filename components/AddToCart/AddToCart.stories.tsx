import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddToCart from './AddToCart'

export default {
  title: 'AddToCart/Common',
  component: AddToCart,
} as ComponentMeta<typeof AddToCart>

const Template: ComponentStory<typeof AddToCart> = (args) => <AddToCart {...args} />

// Common
export const Common = Template.bind({})
Common.args = {
  fullfillmentOption: 'free',
  subtotal: '219.99',
  tax: '13.73',
  total: '233.72',
}
