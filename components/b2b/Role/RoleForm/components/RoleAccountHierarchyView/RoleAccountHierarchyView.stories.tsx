import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import RoleAccountHierarchyView from './RoleAccountHierarchyView'

import { B2BAccount } from '@/lib/gql/types'

export default {
  title: 'B2B/Role/Components/RoleAccountHierarchyView',
  component: RoleAccountHierarchyView,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof RoleAccountHierarchyView>

// Mock B2B Accounts data
const mockAccounts: B2BAccount[] = [
  {
    id: 1001,
    parentAccountId: null,
    taxId: '123456789',
    companyOrOrganization: 'Parent Corporation',
  },
  {
    id: 1002,
    parentAccountId: 1001,
    taxId: '987654321',
    companyOrOrganization: 'Child Company A',
  },
  {
    id: 1003,
    parentAccountId: 1001,
    taxId: '456789123',
    companyOrOrganization: 'Child Company B',
  },
  {
    id: 1004,
    parentAccountId: 1002,
    taxId: '789123456',
    companyOrOrganization: 'Grandchild Company A1',
  },
  {
    id: 1005,
    parentAccountId: 1002,
    taxId: '321654987',
    companyOrOrganization: 'Grandchild Company A2',
  },
]

const Template: ComponentStory<typeof RoleAccountHierarchyView> = (args) => {
  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <RoleAccountHierarchyView {...args} />
    </Box>
  )
}

export const WithSelectedAccounts = Template.bind({})
WithSelectedAccounts.args = {
  accounts: mockAccounts,
  selectedAccountIds: [1001, 1002, 1004],
  parentAccountId: 1001,
}

export const AllAccountsSelected = Template.bind({})
AllAccountsSelected.args = {
  accounts: mockAccounts,
  selectedAccountIds: [1001, 1002, 1003, 1004, 1005],
  parentAccountId: 1001,
}

export const NoAccountsSelected = Template.bind({})
NoAccountsSelected.args = {
  accounts: mockAccounts,
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
  accounts: mockAccounts,
}
