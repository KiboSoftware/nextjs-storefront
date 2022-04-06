import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CartEditAction from './CartEditAction'

export default {
  title: 'Common/Cart/Cart Edit Action',
  component: CartEditAction,
  argTypes: { onMenuItemSelection: { action: 'clicked' } },
} as ComponentMeta<typeof CartEditAction>

const Template: ComponentStory<typeof CartEditAction> = (args) => (
  <Box
    height={'100%'}
    width={'100%'}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
  >
    <CartEditAction {...args} />
  </Box>
)

export const CartAction = Template.bind({})

const options = ['Edit', 'Save For Later', 'Add to Favorites']

CartAction.args = {
  options,
}
