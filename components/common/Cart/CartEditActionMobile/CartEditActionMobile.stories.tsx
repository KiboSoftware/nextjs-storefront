import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CartEditActionMobile from './CartEditActionMobile'

export default {
  title: 'Common/Cart/Cart Edit Action',
  component: CartEditActionMobile,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof CartEditActionMobile>

const Template: ComponentStory<typeof CartEditActionMobile> = (args) => (
  <Box
    height={'100%'}
    width={'100%'}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
  >
    <CartEditActionMobile {...args} />
  </Box>
)

export const CartAction = Template.bind({})

const options = ['Edit', 'Save For Later', 'Add to Favorites']

CartAction.args = {
  options,
}
