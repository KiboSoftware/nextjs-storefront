import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyAddFormDialog from './AccountHierarchyAddFormDialog'
import { userResponseMock } from '@/__mocks__/stories'

import { B2BAccount } from '@/lib/gql/types'

export default {
  title: 'Dialogs/B2B/AccountHierarchyAddFormDialog',
  component: AccountHierarchyAddFormDialog,
  argTypes: {
    onClose: { action: 'onClose' },
    onSave: { action: 'onSave' },
  },
} as ComponentMeta<typeof AccountHierarchyAddFormDialog>

const mockUser = userResponseMock as B2BAccount
const Template: ComponentStory<typeof AccountHierarchyAddFormDialog> = ({ ...args }) => (
  <AccountHierarchyAddFormDialog {...args} />
)

// Common
export const Common = Template.bind({})
Common.args = {
  accounts: [mockUser],
  isAddingAccountToChild: false,
}
