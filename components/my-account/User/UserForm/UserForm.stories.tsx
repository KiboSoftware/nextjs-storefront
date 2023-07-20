import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserForm from './UserForm'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'
import { userGetters } from '@/lib/getters'

import { B2BUser } from '@/lib/gql/types'

export default {
  component: UserForm,
  title: 'My Account/B2B/UserForm',
  argTypes: {
    onClose: { action: 'onCancel' },
    onSave: { action: 'onSave' },
  },
} as ComponentMeta<typeof UserForm>

const customerB2BUsers: B2BUser[] = userGetters.getCustomerB2BUsers(
  customerB2BUserForPage0Mock?.items as B2BUser[]
)

const Template: ComponentStory<typeof UserForm> = (args) => <UserForm {...args} />

// My Account
export const Common = Template.bind({})
Common.args = {
  isEditMode: false,
  b2BUser: undefined,
}

export const WithProps = Template.bind({})
WithProps.args = {
  ...Common.args,
  isEditMode: true,
  b2BUser: customerB2BUsers[0],
}
