import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CartItemActionsMobile from './CartItemActionsMobile'

export default {
  title: 'cart/CartItemActionsMobile',
  component: CartItemActionsMobile,
  argTypes: { onMenuItemSelection: { action: 'clicked' } },
} as ComponentMeta<typeof CartItemActionsMobile>

const Template: ComponentStory<typeof CartItemActionsMobile> = (args) => (
  <Box
    height={'100%'}
    width={'100%'}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
  >
    <CartItemActionsMobile {...args} />
  </Box>
)

export const CartAction = Template.bind({})

const actions = ['Edit', 'Save For Later', 'Add to Favorites']

CartAction.args = {
  actions,
}
