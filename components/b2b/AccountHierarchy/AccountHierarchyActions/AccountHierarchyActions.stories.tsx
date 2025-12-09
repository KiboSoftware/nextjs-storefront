import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyActions from './AccountHierarchyActions'

// Common
export default {
  title: 'B2B/AccountHierarchy/AccountHierarchyActions',
  argTypes: {
    onAdd: { action: 'onAdd' },
    onEdit: { action: 'onEdit' },
    onAccess: { action: 'onAccess' },
  },
  component: AccountHierarchyActions,
} as ComponentMeta<typeof AccountHierarchyActions>

const Template: ComponentStory<typeof AccountHierarchyActions> = (args) => (
  <AccountHierarchyActions {...args} />
)

export const Common = Template.bind({})
Common.args = {
  mdScreen: true,
  currentAccount: { id: 1174 },
  user: {
    emailAddress: 'test@example.com',
    userId: 'testUser',
    firstName: 'Test',
    lastName: 'User',
    id: 1,
  },
  selectedAccountId: 1174,
}
