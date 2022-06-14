import React from 'react'

import { AccountCircle, LocationOn, ShoppingCart } from '@mui/icons-material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import HeaderAction from './HeaderAction'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/Header Action',
  component: HeaderAction,
  //   decorators: [(story) => <div style={{ backgroundColor: 'gray' }}>{story()}</div>],
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof HeaderAction>

const Template: ComponentStory<typeof HeaderAction> = (args) => <HeaderAction {...args} />

export const Cart = Template.bind({})

Cart.args = {
  icon: ShoppingCart,
  badgeContent: 1,
  subtitle: 'Cart',
}

export const MyAccount = Template.bind({})

MyAccount.args = {
  icon: AccountCircle,
  title: 'My Account',
  subtitle: 'Login',
}

export const Location = Template.bind({})

Location.args = {
  icon: LocationOn,
  title: 'Find A Store',
  subtitle: 'View All',
}
