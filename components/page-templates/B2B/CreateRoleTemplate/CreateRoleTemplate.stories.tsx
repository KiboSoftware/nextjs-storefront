import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import CreateRoleTemplate from './CreateRoleTemplate'
import {
  b2BAccountHierarchyResult,
  hierarchyTreeMock,
} from '@/__mocks__/stories/b2BAccountHierarchyResult'
import {
  mockUser,
  mockBehaviorCategories,
  mockBehaviors,
  mockAccountUserBehaviorResults,
  mockAccountUserBehaviors,
} from '@/__mocks__/stories/createRoleTemplateMock'
import { CustomBehaviors } from '@/lib/constants'

export default {
  component: CreateRoleTemplate,
  title: 'Page Templates/B2B/CreateRoleTemplate',
  argTypes: {
    onBackClick: { action: 'onBackClick' },
  },
} as ComponentMeta<typeof CreateRoleTemplate>

const Template: ComponentStory<typeof CreateRoleTemplate> = (args) => (
  <CreateRoleTemplate {...args} />
)

// Default story - Full page with all data
export const Default = Template.bind({})
Default.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
  accountUserBehaviors: mockAccountUserBehaviors,
}

// With no child accounts
export const WithNoChildAccounts = Template.bind({})
WithNoChildAccounts.args = {
  user: mockUser,
  initialData: {
    ...b2BAccountHierarchyResult,
    accounts: b2BAccountHierarchyResult.accounts?.slice(0, 1),
    hierarchy: hierarchyTreeMock.slice(0, 1),
  },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults?.slice(0, 1),
  accountUserBehaviors: mockAccountUserBehaviors?.slice(0, 1),
}

// With limited permissions
export const WithLimitedPermissions = Template.bind({})
WithLimitedPermissions.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: b2BAccountHierarchyResult.accounts?.map((account) => ({
    accountId: account.id,
    behaviors: [1, 5, 9, 13], // No CreateRole permission
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  })),
  accountUserBehaviors: b2BAccountHierarchyResult.accounts?.map((account) => ({
    accountId: account.id,
    behaviors: [1, 5, 9, 13],
  })),
}

// With small account hierarchy
export const WithSmallAccountHierarchy = Template.bind({})
WithSmallAccountHierarchy.args = {
  user: mockUser,
  initialData: {
    ...b2BAccountHierarchyResult,
    accounts: b2BAccountHierarchyResult.accounts?.slice(0, 10),
    hierarchy: hierarchyTreeMock,
  },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults?.slice(0, 10),
  accountUserBehaviors: mockAccountUserBehaviors?.slice(0, 10),
}

// With minimal behavior categories
export const WithMinimalBehaviorCategories = Template.bind({})
WithMinimalBehaviorCategories.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: {
    items: [
      { id: 1, name: 'Account Management' },
      { id: 3, name: 'User Management' },
    ],
  },
  behaviors: {
    items: [
      { id: 1, name: 'View Account', categoryId: 1 },
      { id: 2, name: 'Edit Account', categoryId: 1 },
      { id: 9, name: 'View Users', categoryId: 3 },
      { id: 10, name: 'Add Users', categoryId: 3 },
      { id: CustomBehaviors.CreateRole, name: 'Create Roles', categoryId: 3 },
    ],
  },
  accountUserBehaviorResults: b2BAccountHierarchyResult.accounts?.map((account) => ({
    accountId: account.id,
    behaviors: [CustomBehaviors.CreateRole, 1, 2, 9, 10],
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  })),
  accountUserBehaviors: b2BAccountHierarchyResult.accounts?.map((account) => ({
    accountId: account.id,
    behaviors: [CustomBehaviors.CreateRole, 1, 2, 9, 10],
  })),
}

// Loading state
export const WithLoadingBehaviors = Template.bind({})
WithLoadingBehaviors.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: b2BAccountHierarchyResult.accounts?.map((account) => ({
    accountId: account.id,
    behaviors: [],
    isLoading: true,
    isError: false,
    isSuccess: false,
    error: null,
  })),
  accountUserBehaviors: [],
}

// With error state
export const WithErrorLoadingBehaviors = Template.bind({})
WithErrorLoadingBehaviors.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: b2BAccountHierarchyResult.accounts?.map((account) => ({
    accountId: account.id,
    behaviors: [],
    isLoading: false,
    isError: true,
    isSuccess: false,
    error: new Error('Failed to load behaviors'),
  })),
  accountUserBehaviors: [],
}

// With no behavior categories
export const WithNoBehaviorCategories = Template.bind({})
WithNoBehaviorCategories.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: { items: [] },
  behaviors: { items: [] },
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
  accountUserBehaviors: mockAccountUserBehaviors,
}

// With custom back handler
export const WithCustomBackHandler = Template.bind({})
WithCustomBackHandler.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
  accountUserBehaviors: mockAccountUserBehaviors,
}
