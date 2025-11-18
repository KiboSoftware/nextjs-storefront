import { b2BAccountHierarchyResult } from './b2BAccountHierarchyResult'
import { CustomBehaviors } from '@/lib/constants'

export const mockUser = {
  id: 1001,
  userId: 'user123',
  customerAccountId: 1001,
  userName: 'testuser@example.com',
  firstName: 'Test',
  lastName: 'User',
  emailAddress: 'testuser@example.com',
  isActive: true,
  acceptsMarketing: false,
  roles: [{ roleId: 1, roleName: 'Admin' }],
}

export const mockBehaviorCategories = {
  items: [
    { id: 1, name: 'Account Management' },
    { id: 2, name: 'Order Management' },
    { id: 3, name: 'User Management' },
    { id: 4, name: 'Product Management' },
    { id: 5, name: 'Payment Management' },
  ],
}

export const mockBehaviors = {
  items: [
    { id: 1, name: 'View Account', categoryId: 1 },
    { id: 2, name: 'Edit Account', categoryId: 1 },
    { id: 3, name: 'Delete Account', categoryId: 1 },
    { id: 5, name: 'View Orders', categoryId: 2 },
    { id: 6, name: 'Create Orders', categoryId: 2 },
    { id: 7, name: 'Cancel Orders', categoryId: 2 },
    { id: 9, name: 'View Users', categoryId: 3 },
    { id: 10, name: 'Add Users', categoryId: 3 },
    { id: 11, name: 'Remove Users', categoryId: 3 },
    { id: 13, name: 'View Products', categoryId: 4 },
    { id: 14, name: 'Add Products', categoryId: 4 },
    { id: 15, name: 'Edit Products', categoryId: 4 },
    { id: CustomBehaviors.CreateRole, name: 'Create Roles', categoryId: 3 },
  ],
}

export const mockAccountUserBehaviorResults = b2BAccountHierarchyResult.accounts?.map(
  (account) => ({
    accountId: account.id,
    behaviors: [CustomBehaviors.CreateRole, 1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15],
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  })
)

export const mockAccountUserBehaviors = b2BAccountHierarchyResult.accounts?.map((account) => ({
  accountId: account.id,
  behaviors: [CustomBehaviors.CreateRole, 1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15],
}))
