import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CartItemActions from './CartItemActions'

export default {
  title: 'cart/CartItemActions',
  component: CartItemActions,

  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CartItemActions>

const Template: ComponentStory<typeof CartItemActions> = () => <CartItemActions />

export const Common = Template.bind({})
