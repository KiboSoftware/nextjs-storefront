import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyForm from './AccountHierarchyForm'
import { b2BAccountHierarchyResult, userResponseMock } from '@/__mocks__/stories'

import { B2BAccount } from '@/lib/gql/types'

export default {
  component: AccountHierarchyForm,
  title: 'My Account/B2B/AccountHierarchyForm',
  argTypes: {
    onClose: { action: 'onCancel' },
    onSave: { action: 'onSave' },
  },
} as ComponentMeta<typeof AccountHierarchyForm>

const mockUser = userResponseMock as B2BAccount

const Template: ComponentStory<typeof AccountHierarchyForm> = (args) => (
  <AccountHierarchyForm {...args} />
)

// Account Hierarchy
export const Common = Template.bind({})
Common.args = {
  accounts: [mockUser],
  primaryButtonText: 'Create Account',
  isAddingAccountToChild: false,
}

export const AddAccountToChild = Template.bind({})
AddAccountToChild.args = {
  accounts: [mockUser],
  primaryButtonText: 'Create Account',
  isAddingAccountToChild: true,
}

export const EditAccount = Template.bind({})
EditAccount.args = {
  accounts: [mockUser],
  primaryButtonText: 'Update Account',
  b2BAccount: b2BAccountHierarchyResult?.accounts?.[0],
}
