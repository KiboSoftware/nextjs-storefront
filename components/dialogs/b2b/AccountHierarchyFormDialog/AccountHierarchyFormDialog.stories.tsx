import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyFormDialog from './AccountHierarchyFormDialog'
import { userResponseMock } from '@/__mocks__/stories'

import { B2BAccount } from '@/lib/gql/types'

export default {
  title: 'Dialogs/B2B/AccountHierarchyFormDialog',
  component: AccountHierarchyFormDialog,
  argTypes: {
    onClose: { action: 'onClose' },
    onSave: { action: 'onSave' },
  },
} as ComponentMeta<typeof AccountHierarchyFormDialog>

const mockUser = userResponseMock as B2BAccount
const Template: ComponentStory<typeof AccountHierarchyFormDialog> = ({ ...args }) => (
  <AccountHierarchyFormDialog {...args} />
)

// Common
export const Common = Template.bind({})
Common.args = {
  accounts: [mockUser],
  isAddingAccountToChild: false,
}
