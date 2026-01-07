import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import RoleAccountHierarchyView from './RoleAccountHierarchyView'
import { mockB2BAccountsHierarchy } from '@/__mocks__/stories/b2bAccountMock'
import { StoryContainer } from '@/__mocks__/stories/storyHelpers'

import { B2BAccount } from '@/lib/gql/types'

export default {
  title: 'B2B/Role/Components/RoleAccountHierarchyView',
  component: RoleAccountHierarchyView,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof RoleAccountHierarchyView>

const Template: ComponentStory<typeof RoleAccountHierarchyView> = (args) => {
  return (
    <StoryContainer maxWidth={800}>
      <RoleAccountHierarchyView {...args} />
    </StoryContainer>
  )
}

export const WithSelectedAccounts = Template.bind({})
WithSelectedAccounts.args = {
  accounts: mockB2BAccountsHierarchy,
  selectedAccountIds: [1001, 1002, 1004],
  parentAccountId: 1001,
}

export const AllAccountsSelected = Template.bind({})
AllAccountsSelected.args = {
  accounts: mockB2BAccountsHierarchy,
  selectedAccountIds: [1001, 1002, 1003, 1004, 1005],
  parentAccountId: 1001,
}

export const NoAccountsSelected = Template.bind({})
NoAccountsSelected.args = {
  accounts: mockB2BAccountsHierarchy,
  selectedAccountIds: [],
  parentAccountId: 1001,
}

export const EmptyState = Template.bind({})
EmptyState.args = {
  accounts: [],
  selectedAccountIds: [],
  parentAccountId: undefined,
}

export const Accounts = Template.bind({})
Accounts.args = {
  accounts: mockB2BAccountsHierarchy,
}
