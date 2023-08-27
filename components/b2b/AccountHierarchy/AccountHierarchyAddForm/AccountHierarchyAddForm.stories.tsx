import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyAddForm from './AccountHierarchyAddForm'
import { userResponseMock } from '@/__mocks__/stories'

import { B2BAccount } from '@/lib/gql/types'

export default {
  component: AccountHierarchyAddForm,
  title: 'My Account/B2B/AccountHierarchyAddForm',
  argTypes: {
    onClose: { action: 'onCancel' },
    onSave: { action: 'onSave' },
  },
} as ComponentMeta<typeof AccountHierarchyAddForm>

const mockUser = userResponseMock as B2BAccount

const Template: ComponentStory<typeof AccountHierarchyAddForm> = (args) => (
  <AccountHierarchyAddForm {...args} />
)

// Account Hierarchy
export const Common = Template.bind({})
Common.args = {
  accounts: [mockUser],
  isAddingAccountToChild: false,
}

export const AddAccountToChild = Template.bind({})
AddAccountToChild.args = {
  accounts: [mockUser],
  isAddingAccountToChild: true,
}
