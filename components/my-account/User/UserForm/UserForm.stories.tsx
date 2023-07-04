import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserForm from './UserForm'

export default {
  component: UserForm,
  title: 'My Account/UserForm',
} as ComponentMeta<typeof UserForm>

// const customerB2BUsers: B2BUser[] = userGetters.getCustomerB2BUsers(
//     customerB2BUserForPage0Mock?.items as B2BUser[]
// )

const Template: ComponentStory<typeof UserForm> = (args) => <UserForm {...args} />

// My Account
export const AddUserForm = Template.bind({})
AddUserForm.args = {
  isEditMode: false,
  b2BUser: undefined,
}
