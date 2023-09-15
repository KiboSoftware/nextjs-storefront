import React from 'react'

import AccountCircle from '@mui/icons-material/AccountCircle'
import LocationOn from '@mui/icons-material/LocationOn'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
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
  isElementVisible: true,
}

export const MyAccount = Template.bind({})

MyAccount.args = {
  icon: AccountCircle,
  title: 'My Account',
  subtitle: 'Login',
  isElementVisible: true,
}

export const Location = Template.bind({})

Location.args = {
  icon: LocationOn,
  title: 'Find A Store',
  subtitle: 'View All',
  isElementVisible: true,
}
