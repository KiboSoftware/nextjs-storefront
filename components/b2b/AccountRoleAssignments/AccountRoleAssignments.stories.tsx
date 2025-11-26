import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountRoleAssignments from './AccountRoleAssignments'
import type { GetRolesAsyncResponse } from '@/lib/api/operations/get-roles-across-accounts'

// Mock roles data
const mockSystemRoles = [
  { id: 1, name: 'Administrator', isSystemRole: true },
  { id: 2, name: 'Buyer', isSystemRole: true },
  { id: 3, name: 'Purchaser', isSystemRole: true },
  { id: 4, name: 'Account Manager', isSystemRole: true },
  { id: 5, name: 'Approver', isSystemRole: true },
]

const mockCustomRoles = [
  { id: 6, name: 'Custom Role 1', isSystemRole: false },
  { id: 7, name: 'Custom Role 2', isSystemRole: false },
  { id: 8, name: 'Custom Role 3', isSystemRole: false },
  { id: 9, name: 'Very Long Custom Role Name That Should Truncate', isSystemRole: false },
  { id: 10, name: 'Another Custom Role', isSystemRole: false },
]

const mockAccounts = [
  { accountId: 1001, accountName: 'Acme Corporation' },
  { accountId: 1002, accountName: 'Tech Solutions Inc' },
  { accountId: 1003, accountName: 'Global Enterprises Ltd' },
]

const mockAccountRoles: Record<number, GetRolesAsyncResponse> = {
  1001: {
    startIndex: 0,
    pageSize: 20,
    pageCount: 1,
    totalCount: 10,
    items: [...mockSystemRoles, ...mockCustomRoles],
  },
  1002: {
    startIndex: 0,
    pageSize: 20,
    pageCount: 1,
    totalCount: 5,
    items: mockSystemRoles,
  },
  1003: {
    startIndex: 0,
    pageSize: 20,
    pageCount: 1,
    totalCount: 8,
    items: [...mockSystemRoles, ...mockCustomRoles.slice(0, 3)],
  },
}

export default {
  title: 'B2B/AccountRoleAssignments',
  component: AccountRoleAssignments,
  argTypes: {
    onChange: { action: 'role selection changed' },
  },
} as ComponentMeta<typeof AccountRoleAssignments>

const Template: ComponentStory<typeof AccountRoleAssignments> = (args) => (
  <AccountRoleAssignments {...args} />
)

// Default state with no roles selected
export const Default = Template.bind({})
Default.args = {
  accounts: mockAccounts,
  selectedRoles: {},
  accountRoles: mockAccountRoles,
}

// With some roles preselected
export const WithSelectedRoles = Template.bind({})
WithSelectedRoles.args = {
  accounts: mockAccounts,
  selectedRoles: {
    1001: ['1', '2', '6'], // Administrator, Buyer, Custom Role 1
    1002: ['3'], // Purchaser
    1003: ['4', '5', '7', '8'], // Account Manager, Approver, Custom Role 2 & 3
  },
  accountRoles: mockAccountRoles,
}

// Single account
export const SingleAccount = Template.bind({})
SingleAccount.args = {
  accounts: [mockAccounts[0]],
  selectedRoles: {
    1001: ['1', '3'],
  },
  accountRoles: {
    1001: mockAccountRoles[1001],
  },
}

// Account with only system roles
export const SystemRolesOnly = Template.bind({})
SystemRolesOnly.args = {
  accounts: [mockAccounts[1]],
  selectedRoles: {
    1002: ['2'],
  },
  accountRoles: {
    1002: mockAccountRoles[1002],
  },
}

// Account with no roles available
export const NoRolesAvailable = Template.bind({})
NoRolesAvailable.args = {
  accounts: [{ accountId: 1004, accountName: 'Empty Account' }],
  selectedRoles: {},
  accountRoles: {
    1004: {
      startIndex: 0,
      pageSize: 20,
      pageCount: 0,
      totalCount: 0,
      items: [],
    },
  },
}

// Many accounts
export const ManyAccounts = Template.bind({})
ManyAccounts.args = {
  accounts: [
    ...mockAccounts,
    { accountId: 1004, accountName: 'Fourth Account' },
    { accountId: 1005, accountName: 'Fifth Account' },
    { accountId: 1006, accountName: 'Sixth Account' },
  ],
  selectedRoles: {
    1001: ['1', '6'],
    1003: ['2', '3'],
    1005: ['4'],
  },
  accountRoles: {
    ...mockAccountRoles,
    1004: mockAccountRoles[1001],
    1005: mockAccountRoles[1002],
    1006: mockAccountRoles[1003],
  },
}

// All roles selected
export const AllRolesSelected = Template.bind({})
AllRolesSelected.args = {
  accounts: [mockAccounts[0]],
  selectedRoles: {
    1001: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  accountRoles: {
    1001: mockAccountRoles[1001],
  },
}
