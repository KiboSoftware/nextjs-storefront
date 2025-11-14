import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import RoleForm from './RoleForm'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories/b2BAccountHierarchyResult'
import { CustomBehaviors } from '@/lib/constants'

export default {
  component: RoleForm,
  title: 'B2B/Role/RoleForm',
  argTypes: {
    onSave: { action: 'onSave' },
    onCancel: { action: 'onCancel' },
    onBackClick: { action: 'onBackClick' },
  },
} as ComponentMeta<typeof RoleForm>

const Template: ComponentStory<typeof RoleForm> = (args) => <RoleForm {...args} />

// Mock data
const mockUser = {
  id: 1001,
  firstName: 'John',
  lastName: 'Doe',
  emailAddress: 'john.doe@example.com',
}

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
  user: mockUser,
  accounts: mockAccounts,
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}

// Story with no child accounts
export const WithNoChildAccounts = Template.bind({})
WithNoChildAccounts.args = {
  user: mockUser,
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
  user: mockUser,
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
  user: mockUser,
  accounts: mockAccounts?.slice(0, 5),
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults?.slice(0, 5),
}

// Story with no permissions
export const WithNoCreateRolePermission = Template.bind({})
WithNoCreateRolePermission.args = {
  user: mockUser,
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
  user: mockUser,
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
  user: mockUser,
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
