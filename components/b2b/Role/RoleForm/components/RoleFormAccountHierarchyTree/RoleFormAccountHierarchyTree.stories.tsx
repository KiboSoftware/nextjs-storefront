import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import RoleFormAccountHierarchyTree from './RoleFormAccountHierarchyTree'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories/b2BAccountHierarchyResult'
import { AccountScope, CustomBehaviors } from '@/lib/constants'

export default {
  component: RoleFormAccountHierarchyTree,
  title: 'B2B/Role/RoleFormAccountHierarchyTree',
  argTypes: {
    onAccountsChange: { action: 'onAccountsChange' },
  },
} as ComponentMeta<typeof RoleFormAccountHierarchyTree>

const Template: ComponentStory<typeof RoleFormAccountHierarchyTree> = (args) => (
  <RoleFormAccountHierarchyTree {...args} />
)

// Mock data
const mockAccounts = b2BAccountHierarchyResult.accounts?.map((account) => ({
  id: account.id,
  parentAccountId: account.parentAccountId,
  companyOrOrganization: account.companyOrOrganization,
  users: account.users,
}))

const parentAccountId = mockAccounts?.[0]?.id?.toString() || '1001'

const mockAccountUserBehaviorResults = mockAccounts?.map((account) => ({
  accountId: account.id,
  behaviors: [CustomBehaviors.CreateRole, 1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15],
  isLoading: false,
  isError: false,
  isSuccess: true,
  error: null,
}))

// Default story - Specific Child selection
export const SpecificChildSelection = Template.bind({})
SpecificChildSelection.args = {
  parentAccount: parentAccountId,
  accountScope: AccountScope.SpecificChild,
  accounts: mockAccounts,
  selectedAccounts: [],
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}

// All Except selection
export const AllExceptSelection = Template.bind({})
AllExceptSelection.args = {
  parentAccount: parentAccountId,
  accountScope: AccountScope.AllExcept,
  accounts: mockAccounts,
  selectedAccounts: [],
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}

// With limited accounts (small hierarchy)
export const SmallHierarchy = Template.bind({})
SmallHierarchy.args = {
  parentAccount: parentAccountId,
  accountScope: AccountScope.SpecificChild,
  accounts: mockAccounts?.slice(0, 10),
  selectedAccounts: [],
  accountUserBehaviorResults: mockAccountUserBehaviorResults?.slice(0, 10),
}

// With mixed permissions (some accounts without create role permission)
export const MixedPermissions = Template.bind({})
MixedPermissions.args = {
  parentAccount: parentAccountId,
  accountScope: AccountScope.SpecificChild,
  accounts: mockAccounts,
  selectedAccounts: [],
  accountUserBehaviorResults: mockAccounts?.map((account, index) => ({
    accountId: account.id,
    behaviors: index % 2 === 0 ? [CustomBehaviors.CreateRole, 1, 5, 9] : [1, 5, 9], // Every other account has no create role permission
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  })),
}

// Deep nested hierarchy
export const DeepNestedHierarchy = Template.bind({})
DeepNestedHierarchy.args = {
  parentAccount: parentAccountId,
  accountScope: AccountScope.SpecificChild,
  accounts: mockAccounts?.slice(0, 30),
  selectedAccounts: [],
  accountUserBehaviorResults: mockAccountUserBehaviorResults?.slice(0, 30),
}

// Single parent with direct children only
export const DirectChildrenOnly = Template.bind({})
DirectChildrenOnly.args = {
  parentAccount: parentAccountId,
  accountScope: AccountScope.SpecificChild,
  accounts: mockAccounts?.filter(
    (account) =>
      account.id.toString() === parentAccountId ||
      account.parentAccountId?.toString() === parentAccountId
  ),
  selectedAccounts: [],
  accountUserBehaviorResults: mockAccountUserBehaviorResults?.filter((result) =>
    mockAccounts
      ?.filter(
        (account) =>
          account.id.toString() === parentAccountId ||
          account.parentAccountId?.toString() === parentAccountId
      )
      .some((acc) => acc.id === result.accountId)
  ),
}

// With no child accounts (edge case)
export const NoChildAccounts = Template.bind({})
NoChildAccounts.args = {
  parentAccount: parentAccountId,
  accountScope: AccountScope.SpecificChild,
  accounts: mockAccounts?.filter((account) => account.id.toString() === parentAccountId),
  selectedAccounts: [],
  accountUserBehaviorResults: mockAccountUserBehaviorResults?.filter(
    (result) => result.accountId.toString() === parentAccountId
  ),
}

// With all accounts having no permissions
export const NoPermissions = Template.bind({})
NoPermissions.args = {
  parentAccount: parentAccountId,
  accountScope: AccountScope.SpecificChild,
  accounts: mockAccounts,
  selectedAccounts: [],
  accountUserBehaviorResults: mockAccounts?.map((account) => ({
    accountId: account.id,
    behaviors: [1, 5, 9], // No CreateRole permission
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  })),
}

// Loading state
export const LoadingBehaviors = Template.bind({})
LoadingBehaviors.args = {
  parentAccount: parentAccountId,
  accountScope: AccountScope.SpecificChild,
  accounts: mockAccounts,
  selectedAccounts: [],
  accountUserBehaviorResults: mockAccounts?.map((account) => ({
    accountId: account.id,
    behaviors: [],
    isLoading: true,
    isError: false,
    isSuccess: false,
    error: null,
  })),
}

// With long account names (test overflow)
export const LongAccountNames = Template.bind({})
LongAccountNames.args = {
  parentAccount: parentAccountId,
  accountScope: AccountScope.SpecificChild,
  accounts: mockAccounts?.map((account, index) => ({
    ...account,
    companyOrOrganization:
      index % 3 === 0
        ? `${account.companyOrOrganization} - Very Long Company Name With Multiple Words That Should Wrap Or Truncate`
        : account.companyOrOrganization,
  })),
  selectedAccounts: [],
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}

// Empty accounts array
export const EmptyAccounts = Template.bind({})
EmptyAccounts.args = {
  parentAccount: parentAccountId,
  accountScope: AccountScope.SpecificChild,
  accounts: [],
  selectedAccounts: [],
  accountUserBehaviorResults: [],
}
