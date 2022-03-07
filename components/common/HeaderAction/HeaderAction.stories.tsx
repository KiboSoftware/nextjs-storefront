import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import HeaderAction from './HeaderAction'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

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
  icon: ShoppingCartIcon,
  badgeContent: 1,
  subtitle: 'Cart',
}

export const MyAccount = Template.bind({})

MyAccount.args = {
  icon: AccountCircleIcon,
  title: 'My Account',
  subtitle: 'Login',
}

export const Location = Template.bind({})

Location.args = {
  icon: LocationOnIcon,
  title: 'Find A Store',
  subtitle: 'View All',
}
