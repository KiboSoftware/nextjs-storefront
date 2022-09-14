import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import MyProfile from './MyProfile'

export default {
  title: 'My Account/My Profile',
  component: MyProfile,
} as ComponentMeta<typeof MyProfile>

const Template: ComponentStory<typeof MyProfile> = (args) => <MyProfile {...args} />

export const Common = Template.bind({})

Common.args = {
  user: {
    id: 1012,
    firstName: 'Kripa',
    lastName: 'Babu',
    emailAddress: 'kripa@gmail.com',
  },
}
