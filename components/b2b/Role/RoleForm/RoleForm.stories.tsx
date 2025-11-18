import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import RoleForm from './RoleForm'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories/b2BAccountHierarchyResult'
import { AccountScope, CustomBehaviors } from '@/lib/constants'

export default {
  component: RoleForm,
  title: 'B2B/Role/RoleForm',
  argTypes: {
    onCancel: { action: 'onCancel' },
    onBackClick: { action: 'onBackClick' },
  },
} as ComponentMeta<typeof RoleForm>

const Template: ComponentStory<typeof RoleForm> = (args) => <RoleForm {...args} />

// Mock data
const mockAccounts = b2BAccountHierarchyResult.accounts?.map((account) => ({
  id: account.id,
  parentAccountId: account.parentAccountId,
  companyOrOrganization: account.companyOrOrganization,
  users: account.users,
}))

const mockBehaviorCategories = {
  items: [
    { id: 1, name: 'Account Management' },
    { id: 2, name: 'User Management' },
    { id: 3, name: 'Order Management' },
    { id: 4, name: 'Role Management' },
  ],
}

const mockBehaviors = {
  items: [
    { id: 1, name: 'View Accounts', categoryId: 1 },
    { id: 2, name: 'Create Accounts', categoryId: 1 },
    { id: 3, name: 'Edit Accounts', categoryId: 1 },
    { id: 4, name: 'Delete Accounts', categoryId: 1 },
    { id: 5, name: 'View Users', categoryId: 2 },
    { id: 6, name: 'Create Users', categoryId: 2 },
    { id: 7, name: 'Edit Users', categoryId: 2 },
    { id: 8, name: 'Delete Users', categoryId: 2 },
    { id: 9, name: 'View Orders', categoryId: 3 },
    { id: 10, name: 'Create Orders', categoryId: 3 },
    { id: 11, name: 'Edit Orders', categoryId: 3 },
    { id: 12, name: 'Cancel Orders', categoryId: 3 },
    { id: 13, name: 'View Roles', categoryId: 4 },
    { id: CustomBehaviors.CreateRole, name: 'Create Roles', categoryId: 4 },
    { id: 15, name: 'Edit Roles', categoryId: 4 },
    { id: 16, name: 'Delete Roles', categoryId: 4 },
  ],
}

const mockAccountUserBehaviorResults = mockAccounts?.map((account) => ({
  accountId: account.id,
  behaviors: [CustomBehaviors.CreateRole, 1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15],
  isLoading: false,
  isError: false,
  isSuccess: true,
  error: null,
}))

// Default story
export const Default = Template.bind({})
Default.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}

// Story with no child accounts
export const WithNoChildAccounts = Template.bind({})
WithNoChildAccounts.args = {
  accounts: mockAccounts?.filter((account) => !account.parentAccountId),
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults?.filter(
    (result) => !mockAccounts?.find((acc) => acc.id === result.accountId && acc.parentAccountId)
  ),
}

// Story with limited permissions
export const WithLimitedPermissions = Template.bind({})
WithLimitedPermissions.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccounts?.map((account) => ({
    accountId: account.id,
    behaviors: [CustomBehaviors.CreateRole, 1, 5, 9, 13],
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  })),
}

// Story with single account hierarchy
export const WithSingleAccountHierarchy = Template.bind({})
WithSingleAccountHierarchy.args = {
  accounts: mockAccounts?.slice(0, 5),
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults?.slice(0, 5),
}

// Story with no permissions
export const WithNoCreateRolePermission = Template.bind({})
WithNoCreateRolePermission.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccounts?.map((account) => ({
    accountId: account.id,
    behaviors: [1, 5, 9, 13], // No CreateRole permission
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  })),
}

// Story with loading state
export const WithLoadingBehaviors = Template.bind({})
WithLoadingBehaviors.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccounts?.map((account) => ({
    accountId: account.id,
    behaviors: [],
    isLoading: true,
    isError: false,
    isSuccess: false,
    error: null,
  })),
}

// Story with minimal behavior categories
export const WithMinimalBehaviorCategories = Template.bind({})
WithMinimalBehaviorCategories.args = {
  accounts: mockAccounts,
  behaviorCategories: {
    items: [
      { id: 1, name: 'Account Management' },
      { id: 4, name: 'Role Management' },
    ],
  },
  behaviors: {
    items: mockBehaviors.items?.filter(
      (behavior) => behavior.categoryId === 1 || behavior.categoryId === 4
    ),
  },
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}

// Story for Read-Only/View Mode
export const ReadOnlyMode = Template.bind({})
ReadOnlyMode.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
  isReadOnly: true,
  roleAccountIds: [1, 2, 3, 4, 5],
  initialData: {
    roleName: 'Marketing Manager',
    parentAccount: '1004',
    accountScope: AccountScope.AllChild,
    selectedAccounts: [1, 2, 3],
    applyToFutureChildren: false,
    selectedPermissions: {
      1: [1, 2, 3],
      2: [5, 6, 7],
      3: [9, 10, 11],
    },
  },
}

// Story for Edit Mode
export const EditMode = Template.bind({})
EditMode.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
  isEditMode: true,
  roleId: 123,
  roleAccountIds: [1, 2, 3],
  initialData: {
    roleName: 'Sales Representative',
    parentAccount: '1004',
    accountScope: AccountScope.SpecificChild,
    selectedAccounts: [1, 2],
    applyToFutureChildren: false,
    selectedPermissions: {
      1: [1, 3],
      3: [9, 10],
    },
  },
}

// Story for Copy Mode
export const CopyMode = Template.bind({})
CopyMode.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
  isEditMode: false,
  isReadOnly: false,
  initialData: {
    roleName: 'Account Manager_Copy',
    parentAccount: '1004',
    accountScope: AccountScope.AllChild,
    selectedAccounts: [],
    applyToFutureChildren: false,
    selectedPermissions: {
      1: [1, 2, 3, 4],
      2: [5, 6, 7, 8],
      4: [13, CustomBehaviors.CreateRole, 15, 16],
    },
  },
}

// Story with error states for behavior results
export const WithErrorBehaviors = Template.bind({})
WithErrorBehaviors.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccounts?.map((account) => ({
    accountId: account.id,
    behaviors: [],
    isLoading: false,
    isError: true,
    isSuccess: false,
    error: new Error('Failed to fetch behaviors'),
  })),
}

// Story with empty accounts list
export const WithEmptyAccounts = Template.bind({})
WithEmptyAccounts.args = {
  accounts: [],
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: [],
}

// Story with complex account hierarchy
export const WithComplexAccountHierarchy = Template.bind({})
WithComplexAccountHierarchy.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
  initialData: {
    roleName: '',
    parentAccount: '1004',
    accountScope: AccountScope.SpecificChild,
    selectedAccounts: [],
    applyToFutureChildren: false,
    selectedPermissions: {},
  },
}

// Story with "All Except" account scope
export const WithAllExceptAccountScope = Template.bind({})
WithAllExceptAccountScope.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
  initialData: {
    roleName: 'Regional Manager',
    parentAccount: '1004',
    accountScope: AccountScope.AllExcept,
    selectedAccounts: [1, 2],
    applyToFutureChildren: false,
    selectedPermissions: {
      1: [1, 2, 3],
      2: [5, 6],
      3: [9, 10, 11],
    },
  },
}

// Story with Apply to Future Children enabled
export const WithApplyToFutureChildren = Template.bind({})
WithApplyToFutureChildren.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
  initialData: {
    roleName: 'Department Head',
    parentAccount: '1004',
    accountScope: AccountScope.AllChild,
    selectedAccounts: [],
    applyToFutureChildren: true,
    selectedPermissions: {
      1: [1, 2, 3, 4],
      2: [5, 6, 7],
      3: [9, 10, 11, 12],
      4: [13, CustomBehaviors.CreateRole, 15, 16],
    },
  },
}

// Story with pre-filled data (existing role)
export const WithPrefilledData = Template.bind({})
WithPrefilledData.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
  roleId: 456,
  roleAccountIds: [1, 2, 3, 4, 5, 6],
  initialData: {
    roleName: 'Customer Service Rep',
    parentAccount: '1004',
    accountScope: AccountScope.AllChild,
    selectedAccounts: [],
    applyToFutureChildren: false,
    selectedPermissions: {
      2: [5, 6, 7],
      3: [9, 10, 11, 12],
    },
  },
}

// Story with mixed loading and success states
export const WithMixedLoadingStates = Template.bind({})
WithMixedLoadingStates.args = {
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccounts?.map((account, index) => ({
    accountId: account.id,
    behaviors: index % 2 === 0 ? [CustomBehaviors.CreateRole, 1, 2, 3] : [],
    isLoading: index % 3 === 0,
    isError: false,
    isSuccess: index % 2 === 0,
    error: null,
  })),
}
