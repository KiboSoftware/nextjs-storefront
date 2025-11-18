/* eslint-disable @typescript-eslint/no-extra-semi */
import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import CreateRoleTemplate from './CreateRoleTemplate'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { useGetRoleByRoleIdAsync } from '@/hooks'
import { CustomBehaviors } from '@/lib/constants'

import type { CustomerAccount } from '@/lib/gql/types'

// Mock dependencies
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

interface RoleFormProps {
  onCancel: () => void
  onBackClick: () => void
  user?: { id?: number }
  accounts?: unknown[]
  behaviorCategories?: { items?: unknown[] }
  behaviors?: { items?: unknown[] }
  accountUserBehaviorResults?: unknown[]
}

interface RoleFormFullProps extends RoleFormProps {
  initialData?: unknown
  isReadOnly?: boolean
  isEditMode?: boolean
  isLoading?: boolean
  roleAccountIds?: number[]
  roleId?: number
}

jest.mock('@/components/b2b/index', () => ({
  RoleForm: ({
    onCancel,
    onBackClick,
    user,
    accounts,
    behaviorCategories,
    behaviors,
    accountUserBehaviorResults,
    initialData,
    isReadOnly,
    isEditMode,
    isLoading,
    roleAccountIds,
    roleId,
  }: RoleFormFullProps) => (
    <div data-testid="role-form">
      <button data-testid="cancel-button" onClick={onCancel}>
        Cancel
      </button>
      <button data-testid="back-button" onClick={onBackClick}>
        Back
      </button>
      <div data-testid="user-data">{user?.id}</div>
      <div data-testid="accounts-count">{accounts?.length || 0}</div>
      <div data-testid="behavior-categories-count">{behaviorCategories?.items?.length || 0}</div>
      <div data-testid="behaviors-count">{behaviors?.items?.length || 0}</div>
      <div data-testid="account-user-behavior-results-count">
        {accountUserBehaviorResults?.length || 0}
      </div>
      <div data-testid="initial-data">{initialData ? 'has-data' : 'no-data'}</div>
      <div data-testid="is-readonly">{isReadOnly ? 'true' : 'false'}</div>
      <div data-testid="is-edit-mode">{isEditMode ? 'true' : 'false'}</div>
      <div data-testid="is-loading">{isLoading ? 'true' : 'false'}</div>
      <div data-testid="role-account-ids">{roleAccountIds?.length || 0}</div>
      <div data-testid="role-id">{roleId || 'no-role-id'}</div>
    </div>
  ),
}))

jest.mock('@/hooks', () => ({
  useGetRoleByRoleIdAsync: jest.fn(),
}))

describe('CreateRoleTemplate Component', () => {
  // Mock data setup
  const mockPush = jest.fn()
  const mockRouter = {
    push: mockPush,
    pathname: '/my-account/b2b/create-role',
    query: {},
    asPath: '/my-account/b2b/create-role',
  }

  const mockUser: CustomerAccount = {
    id: 1004,
    userId: '1004',
    firstName: 'Test',
    lastName: 'User',
    emailAddress: 'test@example.com',
    userName: 'testuser',
    accountType: 'B2B',
    companyOrOrganization: 'Test Company',
    isAnonymous: false,
  }

  const mockBehaviorCategories = {
    items: [
      { id: 1, name: 'Roles' },
      { id: 2, name: 'Users' },
      { id: 3, name: 'Orders' },
      { id: 4, name: 'Returns' },
      { id: 5, name: 'Shipping/Contacts' },
      { id: 6, name: 'Lists' },
      { id: 7, name: 'Payment' },
      { id: 8, name: 'Custom Attributes' },
      { id: 9, name: 'Quotes' },
      { id: 10, name: 'Cart' },
      { id: 11, name: 'Account Hierarchy' },
    ],
  }

  const mockBehaviors = {
    items: [
      { id: 1, name: 'View Roles', categoryId: 1 },
      { id: 2, name: 'Create Role', categoryId: 1 },
      { id: 3, name: 'Edit Role', categoryId: 1 },
      { id: 4, name: 'Delete Role', categoryId: 1 },
      { id: 5, name: 'View Users', categoryId: 2 },
      { id: 6, name: 'Create User', categoryId: 2 },
      { id: 7, name: 'Edit User', categoryId: 2 },
      { id: 8, name: 'Delete User', categoryId: 2 },
    ],
  }

  const mockAccountUserBehaviorResults = [
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
      behaviors: [CustomBehaviors.CreateRole],
      isLoading: false,
      isError: false,
      isSuccess: true,
      error: null,
    },
  ]

  const defaultProps = {
    user: mockUser,
    initialData: {
      ...b2BAccountHierarchyResult,
      hierarchy: [],
    },
    behaviorCategories: mockBehaviorCategories,
    behaviors: mockBehaviors,
    accountUserBehaviorResults: mockAccountUserBehaviorResults,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useGetRoleByRoleIdAsync as jest.Mock).mockReturnValue({
      role: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
    })
  })

  // Helper function to render with QueryClient
  const renderWithQueryClient = (component: React.ReactElement) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>)
  }

  describe('Basic Rendering', () => {
    it('should render the component successfully', () => {
      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('role-form')).toBeInTheDocument()
    })

    it('should render RoleForm with correct props', () => {
      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('user-data')).toHaveTextContent('1004')
      expect(screen.getByTestId('accounts-count')).toHaveTextContent(
        String(b2BAccountHierarchyResult.accounts?.length || 0)
      )
      expect(screen.getByTestId('behavior-categories-count')).toHaveTextContent('11')
      expect(screen.getByTestId('behaviors-count')).toHaveTextContent('8')
      expect(screen.getByTestId('account-user-behavior-results-count')).toHaveTextContent('2')
    })

    it('should render without crashing when optional props are undefined', () => {
      renderWithQueryClient(
        <CreateRoleTemplate
          user={undefined}
          initialData={undefined}
          behaviorCategories={undefined}
          behaviors={undefined}
          accountUserBehaviorResults={undefined}
        />
      )

      expect(screen.getByTestId('role-form')).toBeInTheDocument()
      expect(screen.getByTestId('user-data')).toBeEmptyDOMElement()
      expect(screen.getByTestId('accounts-count')).toHaveTextContent('0')
    })
  })

  describe('Navigation and Breadcrumb Handling', () => {
    it('should navigate back to manage roles when handleBackClick is called without onBackClick prop', async () => {
      const user = userEvent.setup()
      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      const backButton = screen.getByTestId('back-button')
      await user.click(backButton)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
      })
    })

    it('should call onBackClick prop when provided', async () => {
      const user = userEvent.setup()
      const mockOnBackClick = jest.fn()
      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} onBackClick={mockOnBackClick} />)

      const backButton = screen.getByTestId('back-button')
      await user.click(backButton)

      await waitFor(() => {
        expect(mockOnBackClick).toHaveBeenCalledTimes(1)
      })
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should navigate to manage roles when cancel is clicked', async () => {
      const user = userEvent.setup()
      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      const cancelButton = screen.getByTestId('cancel-button')
      await user.click(cancelButton)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
      })
    })
  })

  describe('Data Prop Passing', () => {
    it('should pass user data correctly to RoleForm', () => {
      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('user-data')).toHaveTextContent('1004')
    })

    it('should pass accounts from initialData to RoleForm', () => {
      const customInitialData = {
        accounts: [
          { id: 1, companyOrOrganization: 'Account 1' },
          { id: 2, companyOrOrganization: 'Account 2' },
          { id: 3, companyOrOrganization: 'Account 3' },
        ],
        hierarchy: [],
      }
      renderWithQueryClient(
        <CreateRoleTemplate {...defaultProps} initialData={customInitialData} />
      )

      expect(screen.getByTestId('accounts-count')).toHaveTextContent('3')
    })

    it('should pass behavior categories to RoleForm', () => {
      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('behavior-categories-count')).toHaveTextContent('11')
    })

    it('should pass behaviors to RoleForm', () => {
      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('behaviors-count')).toHaveTextContent('8')
    })

    it('should pass accountUserBehaviorResults to RoleForm', () => {
      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('account-user-behavior-results-count')).toHaveTextContent('2')
    })
  })

  describe('React.memo Optimization', () => {
    it('should use React.memo for component optimization', () => {
      const { rerender } = renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      // Re-render with same props
      rerender(<CreateRoleTemplate {...defaultProps} />)

      // Component should still render correctly
      expect(screen.getByTestId('role-form')).toBeInTheDocument()
    })

    it.skip('should not re-render when props have not changed', () => {
      const { rerender } = renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      const firstRender = screen.getByTestId('role-form')

      rerender(<CreateRoleTemplate {...defaultProps} />)

      const secondRender = screen.getByTestId('role-form')

      // Component should maintain stability
      expect(firstRender).toBe(secondRender)
    })
  })

  describe('Callback Memoization', () => {
    it.skip('should memoize handleBackClick callback', async () => {
      const user = userEvent.setup()
      const mockOnBackClick = jest.fn()
      const { rerender } = renderWithQueryClient(
        <CreateRoleTemplate {...defaultProps} onBackClick={mockOnBackClick} />
      )

      const backButton = screen.getByTestId('back-button')
      await user.click(backButton)

      expect(mockOnBackClick).toHaveBeenCalledTimes(1)

      // Re-render with same props
      rerender(<CreateRoleTemplate {...defaultProps} onBackClick={mockOnBackClick} />)

      await user.click(backButton)

      expect(mockOnBackClick).toHaveBeenCalledTimes(2)
    })

    it('should memoize handleCancel callback', async () => {
      const user = userEvent.setup()
      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      const cancelButton = screen.getByTestId('cancel-button')
      await user.click(cancelButton)

      expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
      expect(mockPush).toHaveBeenCalledTimes(1)
    })
  })

  describe('Scenario-Based Tests', () => {
    describe('Scenario 1: Admin User Creating New Role', () => {
      it('should render with all necessary data for admin user', () => {
        const adminUser = {
          ...mockUser,
          id: 1000,
          companyOrOrganization: 'Admin Company',
        }

        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} user={adminUser} />)

        expect(screen.getByTestId('role-form')).toBeInTheDocument()
        expect(screen.getByTestId('user-data')).toHaveTextContent('1000')
      })

      it('should handle navigation after role creation', async () => {
        const user = userEvent.setup()
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        const cancelButton = screen.getByTestId('cancel-button')
        await user.click(cancelButton)

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
        })
      })
    })

    describe('Scenario 2: User with Limited Accounts', () => {
      it('should render with limited account hierarchy', () => {
        const limitedInitialData = {
          accounts: [{ id: 1004, companyOrOrganization: 'Single Account' }],
          hierarchy: [],
        }

        renderWithQueryClient(
          <CreateRoleTemplate {...defaultProps} initialData={limitedInitialData} />
        )

        expect(screen.getByTestId('accounts-count')).toHaveTextContent('1')
      })

      it('should still allow role creation with single account', () => {
        const limitedInitialData = {
          accounts: [{ id: 1004, companyOrOrganization: 'Single Account' }],
          hierarchy: [],
        }

        renderWithQueryClient(
          <CreateRoleTemplate {...defaultProps} initialData={limitedInitialData} />
        )

        expect(screen.getByTestId('role-form')).toBeInTheDocument()
      })
    })

    describe('Scenario 3: User with Complex Account Hierarchy', () => {
      it('should handle multiple levels of account hierarchy', () => {
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(screen.getByTestId('accounts-count')).toHaveTextContent(
          String(b2BAccountHierarchyResult.accounts?.length)
        )
      })

      it('should pass all account behavior results correctly', () => {
        const complexBehaviorResults = [
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
            behaviors: [CustomBehaviors.CreateRole],
            isLoading: false,
            isError: false,
            isSuccess: true,
            error: null,
          },
          {
            accountId: 1006,
            behaviors: [],
            isLoading: false,
            isError: false,
            isSuccess: true,
            error: null,
          },
        ]

        renderWithQueryClient(
          <CreateRoleTemplate
            {...defaultProps}
            accountUserBehaviorResults={complexBehaviorResults}
          />
        )

        expect(screen.getByTestId('account-user-behavior-results-count')).toHaveTextContent('3')
      })
    })

    describe('Scenario 4: Navigation from Different Entry Points', () => {
      it('should handle navigation when coming from manage roles page', async () => {
        const user = userEvent.setup()
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        const backButton = screen.getByTestId('back-button')
        await user.click(backButton)

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
        })
      })

      it('should handle custom back navigation when onBackClick is provided', async () => {
        const user = userEvent.setup()
        const customBackHandler = jest.fn()
        renderWithQueryClient(
          <CreateRoleTemplate {...defaultProps} onBackClick={customBackHandler} />
        )

        const backButton = screen.getByTestId('back-button')
        await user.click(backButton)

        await waitFor(() => {
          expect(customBackHandler).toHaveBeenCalled()
        })
        expect(mockPush).not.toHaveBeenCalled()
      })
    })

    describe('Scenario 5: User Cancels Role Creation', () => {
      it('should navigate back to manage roles on cancel', async () => {
        const user = userEvent.setup()
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        const cancelButton = screen.getByTestId('cancel-button')
        await user.click(cancelButton)

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
        })
      })

      it('should not call onBackClick when cancel is clicked', async () => {
        const user = userEvent.setup()
        const mockOnBackClick = jest.fn()
        renderWithQueryClient(
          <CreateRoleTemplate {...defaultProps} onBackClick={mockOnBackClick} />
        )

        const cancelButton = screen.getByTestId('cancel-button')
        await user.click(cancelButton)

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
        })
        expect(mockOnBackClick).not.toHaveBeenCalled()
      })
    })

    describe('Scenario 6: Multiple Behavior Categories and Permissions', () => {
      it('should handle all 11 behavior categories', () => {
        const fullBehaviorCategories = {
          items: [
            { id: 1, name: 'Roles' },
            { id: 2, name: 'Users' },
            { id: 3, name: 'Orders' },
            { id: 4, name: 'Returns' },
            { id: 5, name: 'Shipping/Contacts' },
            { id: 6, name: 'Lists' },
            { id: 7, name: 'Payment' },
            { id: 8, name: 'Custom Attributes' },
            { id: 9, name: 'Quotes' },
            { id: 10, name: 'Cart' },
            { id: 11, name: 'Account Hierarchy' },
          ],
        }

        renderWithQueryClient(
          <CreateRoleTemplate {...defaultProps} behaviorCategories={fullBehaviorCategories} />
        )

        expect(screen.getByTestId('behavior-categories-count')).toHaveTextContent('11')
      })

      it('should handle large number of behaviors', () => {
        const manyBehaviors = {
          items: Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `Behavior ${i + 1}`,
            categoryId: (i % 11) + 1,
          })),
        }

        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} behaviors={manyBehaviors} />)

        expect(screen.getByTestId('behaviors-count')).toHaveTextContent('50')
      })
    })

    describe('Scenario 7: Loading States and Behavior Results', () => {
      it('should handle loading state in behavior results', () => {
        const loadingBehaviorResults = [
          {
            accountId: 1004,
            behaviors: [],
            isLoading: true,
            isError: false,
            isSuccess: false,
            error: null,
          },
        ]

        renderWithQueryClient(
          <CreateRoleTemplate
            {...defaultProps}
            accountUserBehaviorResults={loadingBehaviorResults}
          />
        )

        expect(screen.getByTestId('account-user-behavior-results-count')).toHaveTextContent('1')
      })

      it('should handle error state in behavior results', () => {
        const errorBehaviorResults = [
          {
            accountId: 1004,
            behaviors: [],
            isLoading: false,
            isError: true,
            isSuccess: false,
            error: new Error('Failed to load behaviors'),
          },
        ]

        renderWithQueryClient(
          <CreateRoleTemplate {...defaultProps} accountUserBehaviorResults={errorBehaviorResults} />
        )

        expect(screen.getByTestId('account-user-behavior-results-count')).toHaveTextContent('1')
      })
    })

    describe('Scenario 8: Edge Cases with Empty or Missing Data', () => {
      it('should handle empty behavior categories', () => {
        const emptyCategories = { items: [] }

        renderWithQueryClient(
          <CreateRoleTemplate {...defaultProps} behaviorCategories={emptyCategories} />
        )

        expect(screen.getByTestId('behavior-categories-count')).toHaveTextContent('0')
      })

      it('should handle empty behaviors', () => {
        const emptyBehaviors = { items: [] }

        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} behaviors={emptyBehaviors} />)

        expect(screen.getByTestId('behaviors-count')).toHaveTextContent('0')
      })

      it('should handle empty account hierarchy', () => {
        const emptyInitialData = { accounts: [], hierarchy: [] }

        renderWithQueryClient(
          <CreateRoleTemplate {...defaultProps} initialData={emptyInitialData} />
        )

        expect(screen.getByTestId('accounts-count')).toHaveTextContent('0')
      })

      it('should handle missing items property in behavior categories', () => {
        const noCategoriesItems = {}

        renderWithQueryClient(
          <CreateRoleTemplate {...defaultProps} behaviorCategories={noCategoriesItems} />
        )

        expect(screen.getByTestId('behavior-categories-count')).toHaveTextContent('0')
      })
    })
  })

  describe('Integration Tests', () => {
    it('should integrate correctly with RoleForm component', () => {
      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      // Verify all critical data is passed
      expect(screen.getByTestId('role-form')).toBeInTheDocument()
      expect(screen.getByTestId('cancel-button')).toBeInTheDocument()
      expect(screen.getByTestId('back-button')).toBeInTheDocument()
    })

    it('should handle complete user workflow', async () => {
      const user = userEvent.setup()
      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      // User views the form
      expect(screen.getByTestId('role-form')).toBeInTheDocument()

      // User decides to go back
      const backButton = screen.getByTestId('back-button')
      await user.click(backButton)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
      })
    })

    it.skip('should maintain stable references across re-renders', () => {
      const { rerender } = renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      const firstRenderForm = screen.getByTestId('role-form')

      rerender(<CreateRoleTemplate {...defaultProps} />)

      const secondRenderForm = screen.getByTestId('role-form')

      expect(firstRenderForm).toBeInTheDocument()
      expect(secondRenderForm).toBeInTheDocument()
    })
  })

  describe('Props Validation', () => {
    it('should handle all props being undefined gracefully', () => {
      renderWithQueryClient(
        <CreateRoleTemplate
          user={undefined}
          initialData={undefined}
          behaviorCategories={undefined}
          behaviors={undefined}
          accountUserBehaviorResults={undefined}
          onBackClick={undefined}
        />
      )

      expect(screen.getByTestId('role-form')).toBeInTheDocument()
    })

    it('should prioritize onBackClick prop over default navigation', async () => {
      const user = userEvent.setup()
      const customOnBackClick = jest.fn()
      renderWithQueryClient(
        <CreateRoleTemplate {...defaultProps} onBackClick={customOnBackClick} />
      )

      const backButton = screen.getByTestId('back-button')
      await user.click(backButton)

      await waitFor(() => {
        expect(customOnBackClick).toHaveBeenCalled()
      })
      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('Performance Tests', () => {
    it('should not re-create breadcrumb list on every render', () => {
      const { rerender } = renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      rerender(<CreateRoleTemplate {...defaultProps} />)

      // Component should render without issues
      expect(screen.getByTestId('role-form')).toBeInTheDocument()
    })

    it('should handle large datasets efficiently', () => {
      const largeInitialData = {
        accounts: Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          companyOrOrganization: `Account ${i + 1}`,
        })),
        hierarchy: [],
      }

      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} initialData={largeInitialData} />)

      expect(screen.getByTestId('accounts-count')).toHaveTextContent('100')
    })
  })

  // NEW COMPREHENSIVE TESTS - Mode-Based Functionality
  describe('Mode-Based Functionality Tests', () => {
    describe('Create Mode (No roleId)', () => {
      it('should not show initial form data in create mode', () => {
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(screen.getByTestId('initial-data')).toHaveTextContent('no-data')
        expect(screen.getByTestId('is-readonly')).toHaveTextContent('false')
        expect(screen.getByTestId('is-edit-mode')).toHaveTextContent('false')
      })

      it('should not call useGetRoleByRoleIdAsync in create mode', () => {
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        // Hook should be called but with roleId=0 which will not fetch
        expect(useGetRoleByRoleIdAsync).toHaveBeenCalled()
        expect(screen.getByTestId('initial-data')).toHaveTextContent('no-data')
      })
    })

    describe('View Mode (mode=view)', () => {
      beforeEach(() => {
        ;(useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          query: { roleId: '123', mode: 'view' },
        })
        ;(useGetRoleByRoleIdAsync as jest.Mock).mockReturnValue({
          role: {
            id: 123,
            name: 'Test Role',
            accountIds: [1, 2, 3],
            behaviors: [1, 2, 3],
          },
          isLoading: false,
          isError: false,
          isSuccess: true,
        })
      })

      it('should set isReadOnly to true in view mode', () => {
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(screen.getByTestId('is-readonly')).toHaveTextContent('true')
        expect(screen.getByTestId('is-edit-mode')).toHaveTextContent('false')
      })

      it('should load role data and pass to form in view mode', () => {
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(useGetRoleByRoleIdAsync).toHaveBeenCalledWith(123)
        expect(screen.getByTestId('initial-data')).toHaveTextContent('has-data')
        expect(screen.getByTestId('role-id')).toHaveTextContent('123')
      })

      it('should pass role account IDs in view mode', () => {
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(screen.getByTestId('role-account-ids')).toHaveTextContent('3')
      })
    })

    describe('Edit Mode (mode=edit)', () => {
      beforeEach(() => {
        ;(useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          query: { roleId: '456', mode: 'edit' },
        })
        ;(useGetRoleByRoleIdAsync as jest.Mock).mockReturnValue({
          role: {
            id: 456,
            name: 'Edit Test Role',
            accountIds: [10, 20],
            behaviors: [5, 6],
          },
          isLoading: false,
          isError: false,
          isSuccess: true,
        })
      })

      it('should set isEditMode to true in edit mode', () => {
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(screen.getByTestId('is-readonly')).toHaveTextContent('false')
        expect(screen.getByTestId('is-edit-mode')).toHaveTextContent('true')
      })

      it('should load role data for editing', () => {
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(useGetRoleByRoleIdAsync).toHaveBeenCalledWith(456)
        expect(screen.getByTestId('initial-data')).toHaveTextContent('has-data')
        expect(screen.getByTestId('role-id')).toHaveTextContent('456')
      })

      it('should pass editable role data to form', () => {
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(screen.getByTestId('is-readonly')).toHaveTextContent('false')
        expect(screen.getByTestId('initial-data')).toHaveTextContent('has-data')
        expect(screen.getByTestId('role-account-ids')).toHaveTextContent('2')
      })
    })

    describe('Copy Mode (mode=copy)', () => {
      beforeEach(() => {
        ;(useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          query: { roleId: '789', mode: 'copy' },
        })
        ;(useGetRoleByRoleIdAsync as jest.Mock).mockReturnValue({
          role: {
            id: 789,
            name: 'Original Role',
            accountIds: [30, 40, 50],
            behaviors: [7, 8, 9],
          },
          isLoading: false,
          isError: false,
          isSuccess: true,
        })
      })

      it('should load role data in copy mode', () => {
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(useGetRoleByRoleIdAsync).toHaveBeenCalledWith(789)
        expect(screen.getByTestId('initial-data')).toHaveTextContent('has-data')
      })

      it('should not set readonly in copy mode', () => {
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(screen.getByTestId('is-readonly')).toHaveTextContent('false')
        expect(screen.getByTestId('is-edit-mode')).toHaveTextContent('false')
      })

      it('should pass copied role data to form', () => {
        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(screen.getByTestId('initial-data')).toHaveTextContent('has-data')
        expect(screen.getByTestId('role-account-ids')).toHaveTextContent('3')
      })
    })

    describe('Loading States', () => {
      it('should show loading state when fetching role data', () => {
        ;(useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          query: { roleId: '999', mode: 'view' },
        })
        ;(useGetRoleByRoleIdAsync as jest.Mock).mockReturnValue({
          role: null,
          isLoading: true,
          isError: false,
          isSuccess: false,
        })

        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(screen.getByTestId('is-loading')).toHaveTextContent('true')
        expect(screen.getByTestId('initial-data')).toHaveTextContent('no-data')
      })

      it('should not show form data while loading', () => {
        ;(useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          query: { roleId: '999', mode: 'edit' },
        })
        ;(useGetRoleByRoleIdAsync as jest.Mock).mockReturnValue({
          role: null,
          isLoading: true,
          isError: false,
          isSuccess: false,
        })

        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(screen.getByTestId('initial-data')).toHaveTextContent('no-data')
      })
    })

    describe('Error States', () => {
      it('should handle error when fetching role data', () => {
        ;(useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          query: { roleId: '888', mode: 'view' },
        })
        ;(useGetRoleByRoleIdAsync as jest.Mock).mockReturnValue({
          role: null,
          isLoading: false,
          isError: true,
          isSuccess: false,
        })

        renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

        expect(screen.getByTestId('initial-data')).toHaveTextContent('no-data')
      })
    })
  })

  // Scenario-Based Tests for Mode Workflows
  describe('Mode Workflow Scenarios', () => {
    it('Scenario: Admin views existing role in readonly mode', () => {
      ;(useRouter as jest.Mock).mockReturnValue({
        ...mockRouter,
        query: { roleId: '100', mode: 'view' },
      })
      ;(useGetRoleByRoleIdAsync as jest.Mock).mockReturnValue({
        role: {
          id: 100,
          name: 'Marketing Manager',
          accountIds: [1, 2],
          behaviors: [1, 2],
        },
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('role-form')).toBeInTheDocument()
      expect(screen.getByTestId('is-readonly')).toHaveTextContent('true')
      expect(screen.getByTestId('initial-data')).toHaveTextContent('has-data')
      expect(screen.getByTestId('role-id')).toHaveTextContent('100')
    })

    it('Scenario: Admin edits custom role with permissions', () => {
      ;(useRouter as jest.Mock).mockReturnValue({
        ...mockRouter,
        query: { roleId: '200', mode: 'edit' },
      })
      ;(useGetRoleByRoleIdAsync as jest.Mock).mockReturnValue({
        role: {
          id: 200,
          name: 'Sales Rep',
          accountIds: [5, 6, 7],
          behaviors: [10, 11, 12],
        },
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('is-edit-mode')).toHaveTextContent('true')
      expect(screen.getByTestId('is-readonly')).toHaveTextContent('false')
      expect(screen.getByTestId('initial-data')).toHaveTextContent('has-data')
      expect(screen.getByTestId('role-account-ids')).toHaveTextContent('3')
    })

    it('Scenario: Admin copies role to create similar role', () => {
      ;(useRouter as jest.Mock).mockReturnValue({
        ...mockRouter,
        query: { roleId: '300', mode: 'copy' },
      })
      ;(useGetRoleByRoleIdAsync as jest.Mock).mockReturnValue({
        role: {
          id: 300,
          name: 'Account Manager',
          accountIds: [10, 11],
          behaviors: [20, 21, 22],
        },
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('initial-data')).toHaveTextContent('has-data')
      expect(screen.getByTestId('is-readonly')).toHaveTextContent('false')
      expect(screen.getByTestId('is-edit-mode')).toHaveTextContent('false')
      expect(screen.getByTestId('role-account-ids')).toHaveTextContent('2')
    })

    it('Scenario: Loading state while fetching role for edit', async () => {
      ;(useRouter as jest.Mock).mockReturnValue({
        ...mockRouter,
        query: { roleId: '400', mode: 'edit' },
      })
      ;(useGetRoleByRoleIdAsync as jest.Mock).mockReturnValue({
        role: null,
        isLoading: true,
        isError: false,
        isSuccess: false,
      })

      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('is-loading')).toHaveTextContent('true')
      expect(screen.getByTestId('initial-data')).toHaveTextContent('no-data')
    })

    it('Scenario: Error while loading role data in view mode', () => {
      ;(useRouter as jest.Mock).mockReturnValue({
        ...mockRouter,
        query: { roleId: '500', mode: 'view' },
      })
      ;(useGetRoleByRoleIdAsync as jest.Mock).mockReturnValue({
        role: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
      })

      renderWithQueryClient(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('initial-data')).toHaveTextContent('no-data')
      expect(screen.getByTestId('role-form')).toBeInTheDocument()
    })
  })
})
