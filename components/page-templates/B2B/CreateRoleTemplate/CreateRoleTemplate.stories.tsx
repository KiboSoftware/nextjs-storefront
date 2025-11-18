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
}

// With no behavior categories
export const WithNoBehaviorCategories = Template.bind({})
WithNoBehaviorCategories.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: { items: [] },
  behaviors: { items: [] },
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}

// With custom back handler
export const WithCustomBackHandler = Template.bind({})
WithCustomBackHandler.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}

// View Mode (Read-only) - Simulated with query params
export const ViewMode = Template.bind({})
ViewMode.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}
ViewMode.parameters = {
  nextRouter: {
    query: { roleId: '1', mode: 'view' },
  },
}

// Edit Mode - Simulated with query params
export const EditMode = Template.bind({})
EditMode.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}
EditMode.parameters = {
  nextRouter: {
    query: { roleId: '1', mode: 'edit' },
  },
}

// Copy Mode - Simulated with query params
export const CopyMode = Template.bind({})
CopyMode.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}
CopyMode.parameters = {
  nextRouter: {
    query: { roleId: '1', mode: 'copy' },
  },
}

// With Deep Account Hierarchy (Many Levels)
export const WithDeepAccountHierarchy = Template.bind({})
WithDeepAccountHierarchy.args = {
  user: mockUser,
  initialData: {
    accounts: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1000,
      companyOrOrganization: `Account Level ${Math.floor(i / 10)} - ${i + 1}`,
      parentAccountId: i > 0 ? Math.floor((i - 1) / 10) + 1000 : undefined,
    })),
    hierarchy: hierarchyTreeMock,
  },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: Array.from({ length: 50 }, (_, i) => ({
    accountId: i + 1000,
    behaviors: [CustomBehaviors.CreateRole, 1, 2, 3],
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  })),
}

// With No User (Edge Case)
export const WithNoUser = Template.bind({})
WithNoUser.args = {
  user: undefined,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}

// With Mixed Behavior Loading States
export const WithMixedBehaviorStates = Template.bind({})
WithMixedBehaviorStates.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  accountUserBehaviorResults: [
    {
      accountId: 1004,
      behaviors: [CustomBehaviors.CreateRole],
      isLoading: false,
      isError: false,
      isSuccess: true,
      error: null,
    },
    {
      accountId: 1005,
      behaviors: [],
      isLoading: true,
      isError: false,
      isSuccess: false,
      error: null,
    },
    {
      accountId: 1006,
      behaviors: [],
      isLoading: false,
      isError: true,
      isSuccess: false,
      error: new Error('Failed to load'),
    },
  ],
}

// With Single Behavior Category
export const WithSingleBehaviorCategory = Template.bind({})
WithSingleBehaviorCategory.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: {
    items: [{ id: 1, name: 'Roles' }],
  },
  behaviors: {
    items: [
      { id: 1, name: 'View Roles', categoryId: 1 },
      { id: 2, name: 'Create Role', categoryId: 1 },
      { id: CustomBehaviors.CreateRole, name: 'Create Roles', categoryId: 1 },
    ],
  },
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}

// With Complex Permissions Structure
export const WithComplexPermissions = Template.bind({})
WithComplexPermissions.args = {
  user: mockUser,
  initialData: { ...b2BAccountHierarchyResult, hierarchy: hierarchyTreeMock },
  behaviorCategories: mockBehaviorCategories,
  behaviors: {
    items: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `Permission ${i + 1}`,
      categoryId: (i % 11) + 1,
    })),
  },
  accountUserBehaviorResults: mockAccountUserBehaviorResults,
}
