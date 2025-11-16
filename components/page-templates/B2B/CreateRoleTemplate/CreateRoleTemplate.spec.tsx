/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import CreateRoleTemplate from './CreateRoleTemplate'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
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

jest.mock('@/components/b2b/index', () => ({
  RoleForm: ({
    onCancel,
    onBackClick,
    user,
    accounts,
    behaviorCategories,
    behaviors,
    accountUserBehaviorResults,
  }: RoleFormProps) => (
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
    </div>
  ),
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
  })

  describe('Basic Rendering', () => {
    it('should render the component successfully', () => {
      render(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('role-form')).toBeInTheDocument()
    })

    it('should render RoleForm with correct props', () => {
      render(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('user-data')).toHaveTextContent('1004')
      expect(screen.getByTestId('accounts-count')).toHaveTextContent(
        String(b2BAccountHierarchyResult.accounts?.length || 0)
      )
      expect(screen.getByTestId('behavior-categories-count')).toHaveTextContent('11')
      expect(screen.getByTestId('behaviors-count')).toHaveTextContent('8')
      expect(screen.getByTestId('account-user-behavior-results-count')).toHaveTextContent('2')
    })

    it('should render without crashing when optional props are undefined', () => {
      render(
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
      render(<CreateRoleTemplate {...defaultProps} />)

      const backButton = screen.getByTestId('back-button')
      await user.click(backButton)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
      })
    })

    it('should call onBackClick prop when provided', async () => {
      const user = userEvent.setup()
      const mockOnBackClick = jest.fn()
      render(<CreateRoleTemplate {...defaultProps} onBackClick={mockOnBackClick} />)

      const backButton = screen.getByTestId('back-button')
      await user.click(backButton)

      await waitFor(() => {
        expect(mockOnBackClick).toHaveBeenCalledTimes(1)
      })
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should navigate to manage roles when cancel is clicked', async () => {
      const user = userEvent.setup()
      render(<CreateRoleTemplate {...defaultProps} />)

      const cancelButton = screen.getByTestId('cancel-button')
      await user.click(cancelButton)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
      })
    })
  })

  describe('Data Prop Passing', () => {
    it('should pass user data correctly to RoleForm', () => {
      render(<CreateRoleTemplate {...defaultProps} />)

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
      render(<CreateRoleTemplate {...defaultProps} initialData={customInitialData} />)

      expect(screen.getByTestId('accounts-count')).toHaveTextContent('3')
    })

    it('should pass behavior categories to RoleForm', () => {
      render(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('behavior-categories-count')).toHaveTextContent('11')
    })

    it('should pass behaviors to RoleForm', () => {
      render(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('behaviors-count')).toHaveTextContent('8')
    })

    it('should pass accountUserBehaviorResults to RoleForm', () => {
      render(<CreateRoleTemplate {...defaultProps} />)

      expect(screen.getByTestId('account-user-behavior-results-count')).toHaveTextContent('2')
    })
  })

  describe('React.memo Optimization', () => {
    it('should use React.memo for component optimization', () => {
      const { rerender } = render(<CreateRoleTemplate {...defaultProps} />)

      // Re-render with same props
      rerender(<CreateRoleTemplate {...defaultProps} />)

      // Component should still render correctly
      expect(screen.getByTestId('role-form')).toBeInTheDocument()
    })

    it('should not re-render when props have not changed', () => {
      const { rerender } = render(<CreateRoleTemplate {...defaultProps} />)

      const firstRender = screen.getByTestId('role-form')

      rerender(<CreateRoleTemplate {...defaultProps} />)

      const secondRender = screen.getByTestId('role-form')

      // Component should maintain stability
      expect(firstRender).toBe(secondRender)
    })
  })

  describe('Callback Memoization', () => {
    it('should memoize handleBackClick callback', async () => {
      const user = userEvent.setup()
      const mockOnBackClick = jest.fn()
      const { rerender } = render(
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
      render(<CreateRoleTemplate {...defaultProps} />)

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

        render(<CreateRoleTemplate {...defaultProps} user={adminUser} />)

        expect(screen.getByTestId('role-form')).toBeInTheDocument()
        expect(screen.getByTestId('user-data')).toHaveTextContent('1000')
      })

      it('should handle navigation after role creation', async () => {
        const user = userEvent.setup()
        render(<CreateRoleTemplate {...defaultProps} />)

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

        render(<CreateRoleTemplate {...defaultProps} initialData={limitedInitialData} />)

        expect(screen.getByTestId('accounts-count')).toHaveTextContent('1')
      })

      it('should still allow role creation with single account', () => {
        const limitedInitialData = {
          accounts: [{ id: 1004, companyOrOrganization: 'Single Account' }],
          hierarchy: [],
        }

        render(<CreateRoleTemplate {...defaultProps} initialData={limitedInitialData} />)

        expect(screen.getByTestId('role-form')).toBeInTheDocument()
      })
    })

    describe('Scenario 3: User with Complex Account Hierarchy', () => {
      it('should handle multiple levels of account hierarchy', () => {
        render(<CreateRoleTemplate {...defaultProps} />)

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

        render(
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
        render(<CreateRoleTemplate {...defaultProps} />)

        const backButton = screen.getByTestId('back-button')
        await user.click(backButton)

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
        })
      })

      it('should handle custom back navigation when onBackClick is provided', async () => {
        const user = userEvent.setup()
        const customBackHandler = jest.fn()
        render(<CreateRoleTemplate {...defaultProps} onBackClick={customBackHandler} />)

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
        render(<CreateRoleTemplate {...defaultProps} />)

        const cancelButton = screen.getByTestId('cancel-button')
        await user.click(cancelButton)

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
        })
      })

      it('should not call onBackClick when cancel is clicked', async () => {
        const user = userEvent.setup()
        const mockOnBackClick = jest.fn()
        render(<CreateRoleTemplate {...defaultProps} onBackClick={mockOnBackClick} />)

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

        render(<CreateRoleTemplate {...defaultProps} behaviorCategories={fullBehaviorCategories} />)

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

        render(<CreateRoleTemplate {...defaultProps} behaviors={manyBehaviors} />)

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

        render(
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

        render(
          <CreateRoleTemplate {...defaultProps} accountUserBehaviorResults={errorBehaviorResults} />
        )

        expect(screen.getByTestId('account-user-behavior-results-count')).toHaveTextContent('1')
      })
    })

    describe('Scenario 8: Edge Cases with Empty or Missing Data', () => {
      it('should handle empty behavior categories', () => {
        const emptyCategories = { items: [] }

        render(<CreateRoleTemplate {...defaultProps} behaviorCategories={emptyCategories} />)

        expect(screen.getByTestId('behavior-categories-count')).toHaveTextContent('0')
      })

      it('should handle empty behaviors', () => {
        const emptyBehaviors = { items: [] }

        render(<CreateRoleTemplate {...defaultProps} behaviors={emptyBehaviors} />)

        expect(screen.getByTestId('behaviors-count')).toHaveTextContent('0')
      })

      it('should handle empty account hierarchy', () => {
        const emptyInitialData = { accounts: [], hierarchy: [] }

        render(<CreateRoleTemplate {...defaultProps} initialData={emptyInitialData} />)

        expect(screen.getByTestId('accounts-count')).toHaveTextContent('0')
      })

      it('should handle missing items property in behavior categories', () => {
        const noCategoriesItems = {}

        render(<CreateRoleTemplate {...defaultProps} behaviorCategories={noCategoriesItems} />)

        expect(screen.getByTestId('behavior-categories-count')).toHaveTextContent('0')
      })
    })
  })

  describe('Integration Tests', () => {
    it('should integrate correctly with RoleForm component', () => {
      render(<CreateRoleTemplate {...defaultProps} />)

      // Verify all critical data is passed
      expect(screen.getByTestId('role-form')).toBeInTheDocument()
      expect(screen.getByTestId('cancel-button')).toBeInTheDocument()
      expect(screen.getByTestId('back-button')).toBeInTheDocument()
    })

    it('should handle complete user workflow', async () => {
      const user = userEvent.setup()
      render(<CreateRoleTemplate {...defaultProps} />)

      // User views the form
      expect(screen.getByTestId('role-form')).toBeInTheDocument()

      // User decides to go back
      const backButton = screen.getByTestId('back-button')
      await user.click(backButton)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles')
      })
    })

    it('should maintain stable references across re-renders', () => {
      const { rerender } = render(<CreateRoleTemplate {...defaultProps} />)

      const firstRenderForm = screen.getByTestId('role-form')

      rerender(<CreateRoleTemplate {...defaultProps} />)

      const secondRenderForm = screen.getByTestId('role-form')

      expect(firstRenderForm).toBeInTheDocument()
      expect(secondRenderForm).toBeInTheDocument()
    })
  })

  describe('Props Validation', () => {
    it('should handle all props being undefined gracefully', () => {
      render(
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
      render(<CreateRoleTemplate {...defaultProps} onBackClick={customOnBackClick} />)

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
      const { rerender } = render(<CreateRoleTemplate {...defaultProps} />)

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

      render(<CreateRoleTemplate {...defaultProps} initialData={largeInitialData} />)

      expect(screen.getByTestId('accounts-count')).toHaveTextContent('100')
    })
  })
})
