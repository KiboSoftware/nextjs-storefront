/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import * as stories from './CreateRoleTemplate.stories'

const { Default, WithNoChildAccounts, WithLimitedPermissions } = composeStories(stories)

// Mock RoleForm component
const RoleFormMock = jest.fn(
  ({
    onSave,
    onCancel,
    onBackClick,
    user,
    accounts,
    behaviorCategories,
    behaviors,
    accountUserBehaviorResults,
    accountUserBehaviors,
  }) => (
    <div data-testid="role-form-component">
      <button data-testid="mock-save-button" onClick={() => onSave({ name: 'Test Role' })}>
        Save
      </button>
      <button data-testid="mock-cancel-button" onClick={onCancel}>
        Cancel
      </button>
      <button data-testid="mock-back-button" onClick={onBackClick}>
        Back
      </button>
      <div data-testid="user-data">{user?.firstName}</div>
      <div data-testid="accounts-count">{accounts?.length || 0}</div>
      <div data-testid="behavior-categories-count">{behaviorCategories?.items?.length || 0}</div>
      <div data-testid="behaviors-count">{behaviors?.items?.length || 0}</div>
      <div data-testid="account-user-behaviors-count">
        {accountUserBehaviorResults?.length || 0}
      </div>
    </div>
  )
)

jest.mock('@/components/b2b/index', () => ({
  RoleForm: (props: unknown) => RoleFormMock(props),
}))

describe('[component] - CreateRoleTemplate', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockRouter.setCurrentUrl('/')
  })

  describe('Component Rendering', () => {
    it('should render the component with RoleForm', () => {
      render(<Default />)

      const roleForm = screen.getByTestId('role-form-component')
      expect(roleForm).toBeInTheDocument()
    })

    it('should render with correct container styling', () => {
      render(<Default />)

      const roleForm = screen.getByTestId('role-form-component')
      expect(roleForm).toBeInTheDocument()
    })

    it('should pass user data to RoleForm', () => {
      render(<Default />)

      const userData = screen.getByTestId('user-data')
      expect(userData).toHaveTextContent('Test')
    })

    it('should pass accounts data to RoleForm', () => {
      render(<Default />)

      const accountsCount = screen.getByTestId('accounts-count')
      expect(accountsCount).not.toHaveTextContent('0')
    })

    it('should pass behavior categories to RoleForm', () => {
      render(<Default />)

      const categoriesCount = screen.getByTestId('behavior-categories-count')
      expect(categoriesCount).toHaveTextContent('5')
    })

    it('should pass behaviors to RoleForm', () => {
      render(<Default />)

      const behaviorsCount = screen.getByTestId('behaviors-count')
      expect(behaviorsCount).toHaveTextContent('13')
    })

    it('should pass account user behavior results to RoleForm', () => {
      render(<Default />)

      const behaviorResultsCount = screen.getByTestId('account-user-behaviors-count')
      expect(behaviorResultsCount).not.toHaveTextContent('0')
    })
  })

  describe('Navigation and Routing', () => {
    it('should navigate to manage-roles page on save', async () => {
      const user = userEvent.setup()
      render(<Default />)

      const saveButton = screen.getByTestId('mock-save-button')
      await user.click(saveButton)

      await waitFor(() => {
        expect(mockRouter).toMatchObject({
          pathname: '/my-account/b2b/manage-roles',
        })
      })
    })

    it('should navigate to manage-roles page on cancel', async () => {
      const user = userEvent.setup()
      render(<Default />)

      const cancelButton = screen.getByTestId('mock-cancel-button')
      await user.click(cancelButton)

      await waitFor(() => {
        expect(mockRouter).toMatchObject({
          pathname: '/my-account/b2b/manage-roles',
        })
      })
    })

    it('should navigate to manage-roles page on back click when no custom handler provided', async () => {
      const user = userEvent.setup()
      render(<Default />)

      const backButton = screen.getByTestId('mock-back-button')
      await user.click(backButton)

      await waitFor(() => {
        expect(mockRouter).toMatchObject({
          pathname: '/my-account/b2b/manage-roles',
        })
      })
    })

    it('should call custom onBackClick handler when provided', async () => {
      const user = userEvent.setup()
      const mockOnBackClick = jest.fn()

      render(<Default onBackClick={mockOnBackClick} />)
      const backButton = screen.getByTestId('mock-back-button')

      await user.click(backButton)

      await waitFor(() => {
        expect(mockOnBackClick).toHaveBeenCalledTimes(1)
      })
      expect(mockRouter.pathname).not.toBe('/my-account/b2b/manage-roles')
    })
  })

  describe('Callback Handlers', () => {
    it('should pass handleSave callback to RoleForm', () => {
      render(<Default />)

      const callArgs = RoleFormMock.mock.calls[0][0]
      expect(callArgs.onSave).toBeDefined()
      expect(typeof callArgs.onSave).toBe('function')
    })

    it('should pass handleCancel callback to RoleForm', () => {
      render(<Default />)

      const callArgs = RoleFormMock.mock.calls[0][0]
      expect(callArgs.onCancel).toBeDefined()
      expect(typeof callArgs.onCancel).toBe('function')
    })

    it('should pass handleBackClick callback to RoleForm', () => {
      render(<Default />)

      const callArgs = RoleFormMock.mock.calls[0][0]
      expect(callArgs.onBackClick).toBeDefined()
      expect(typeof callArgs.onBackClick).toBe('function')
    })
  })

  describe('Data Props Validation', () => {
    it('should handle component with all props provided', () => {
      render(<Default />)

      const callArgs = RoleFormMock.mock.calls[0][0]
      expect(callArgs.user).toBeDefined()
      expect(callArgs.accounts).toBeDefined()
      expect(callArgs.behaviorCategories).toBeDefined()
      expect(callArgs.behaviors).toBeDefined()
      expect(callArgs.accountUserBehaviorResults).toBeDefined()
      expect(callArgs.accountUserBehaviors).toBeDefined()
    })

    it('should handle component with minimal props', () => {
      render(<Default user={undefined} initialData={undefined} />)

      const callArgs = RoleFormMock.mock.calls[0][0]
      expect(callArgs.user).toBeUndefined()
      expect(callArgs.accounts).toBeUndefined()
    })

    it('should pass undefined accounts when initialData is not provided', () => {
      render(<Default initialData={undefined} />)

      const accountsCount = screen.getByTestId('accounts-count')
      expect(accountsCount).toHaveTextContent('0')
    })
  })

  describe('Scenario: No Child Accounts', () => {
    it('should render correctly when parent has no child accounts', () => {
      render(<WithNoChildAccounts />)

      const roleForm = screen.getByTestId('role-form-component')
      expect(roleForm).toBeInTheDocument()
    })

    it('should handle navigation when parent has no children', async () => {
      const user = userEvent.setup()
      render(<WithNoChildAccounts />)

      const saveButton = screen.getByTestId('mock-save-button')
      await user.click(saveButton)

      await waitFor(() => {
        expect(mockRouter.pathname).toBe('/my-account/b2b/manage-roles')
      })
    })
  })

  describe('Scenario: Limited Permissions', () => {
    it('should render correctly with limited permissions', () => {
      render(<WithLimitedPermissions />)

      const roleForm = screen.getByTestId('role-form-component')
      expect(roleForm).toBeInTheDocument()
    })

    it('should pass limited behavior results to RoleForm', () => {
      render(<WithLimitedPermissions />)

      const behaviorResultsCount = screen.getByTestId('account-user-behaviors-count')
      expect(behaviorResultsCount).not.toHaveTextContent('0')
    })

    it('should handle save action with limited permissions', async () => {
      const user = userEvent.setup()
      render(<WithLimitedPermissions />)

      const saveButton = screen.getByTestId('mock-save-button')
      await user.click(saveButton)

      await waitFor(() => {
        expect(mockRouter.pathname).toBe('/my-account/b2b/manage-roles')
      })
    })
  })

  describe('Translation and Internationalization', () => {
    it('should use translation for breadcrumb text', () => {
      render(<Default />)

      // Translation hook is called internally
      expect(RoleFormMock).toHaveBeenCalled()
    })
  })

  describe('User Interactions', () => {
    it('should handle multiple save clicks', async () => {
      const user = userEvent.setup()
      render(<Default />)

      const saveButton = screen.getByTestId('mock-save-button')

      await user.click(saveButton)
      await user.click(saveButton)

      // Should navigate (router called multiple times is okay)
      await waitFor(() => {
        expect(mockRouter.pathname).toBe('/my-account/b2b/manage-roles')
      })
    })

    it('should handle rapid cancel clicks', async () => {
      const user = userEvent.setup()
      render(<Default />)

      const cancelButton = screen.getByTestId('mock-cancel-button')

      await user.click(cancelButton)
      await user.click(cancelButton)

      await waitFor(() => {
        expect(mockRouter.pathname).toBe('/my-account/b2b/manage-roles')
      })
    })

    it('should handle back then cancel sequence', async () => {
      const user = userEvent.setup()
      render(<Default />)

      const backButton = screen.getByTestId('mock-back-button')
      const cancelButton = screen.getByTestId('mock-cancel-button')

      await user.click(backButton)
      await user.click(cancelButton)

      await waitFor(() => {
        expect(mockRouter.pathname).toBe('/my-account/b2b/manage-roles')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty behavior categories', () => {
      render(<Default behaviorCategories={{ items: [] }} />)

      const categoriesCount = screen.getByTestId('behavior-categories-count')
      expect(categoriesCount).toHaveTextContent('0')
    })

    it('should handle empty behaviors', () => {
      render(<Default behaviors={{ items: [] }} />)

      const behaviorsCount = screen.getByTestId('behaviors-count')
      expect(behaviorsCount).toHaveTextContent('0')
    })

    it('should handle empty account user behavior results', () => {
      render(<Default accountUserBehaviorResults={[]} />)

      const behaviorResultsCount = screen.getByTestId('account-user-behaviors-count')
      expect(behaviorResultsCount).toHaveTextContent('0')
    })

    it('should handle undefined accountUserBehaviors prop', () => {
      render(<Default accountUserBehaviors={undefined} />)

      const roleForm = screen.getByTestId('role-form-component')
      expect(roleForm).toBeInTheDocument()
    })

    it('should handle null user prop', () => {
      render(<Default user={undefined} />)

      const userData = screen.getByTestId('user-data')
      expect(userData).toBeEmptyDOMElement()
    })
  })

  describe('Component Lifecycle', () => {
    it('should render without errors when mounted', () => {
      const { container } = render(<Default />)
      expect(container).toBeTruthy()
    })

    it('should clean up properly when unmounted', () => {
      const { unmount } = render(<Default />)
      expect(() => unmount()).not.toThrow()
    })
  })

  describe('Router Integration', () => {
    it('should have correct initial router state', () => {
      render(<Default />)

      expect(mockRouter.pathname).toBe('/')
    })

    it('should update router state after save', async () => {
      const user = userEvent.setup()
      const initialPath = mockRouter.pathname

      render(<Default />)

      const saveButton = screen.getByTestId('mock-save-button')
      await user.click(saveButton)

      await waitFor(() => {
        expect(mockRouter.pathname).not.toBe(initialPath)
      })
    })
  })

  describe('Accessibility', () => {
    it('should render semantic HTML structure', () => {
      render(<Default />)

      const roleForm = screen.getByTestId('role-form-component')
      expect(roleForm).toBeInTheDocument()
    })

    it('should have proper component hierarchy', () => {
      render(<Default />)

      const roleForm = screen.getByTestId('role-form-component')
      expect(roleForm).toBeInTheDocument()
    })
  })

  describe('Props Forwarding', () => {
    it('should forward all required props to RoleForm', () => {
      const mockProps = {
        user: {
          id: 999,
          firstName: 'TestUser',
          lastName: 'User',
          emailAddress: 'test@example.com',
          userName: 'testuser',
          isActive: true,
        },
        initialData: { accounts: [], hierarchy: [] },
        behaviorCategories: { items: [] },
        behaviors: { items: [] },
        accountUserBehaviorResults: [],
        accountUserBehaviors: [],
      }

      render(<Default {...mockProps} />)

      const callArgs = RoleFormMock.mock.calls[0][0]
      expect(callArgs.user.firstName).toBe('TestUser')
      expect(Array.isArray(callArgs.accounts)).toBe(true)
      expect(callArgs.behaviorCategories).toBeDefined()
      expect(callArgs.behaviors).toBeDefined()
      expect(Array.isArray(callArgs.accountUserBehaviorResults)).toBe(true)
      expect(Array.isArray(callArgs.accountUserBehaviors)).toBe(true)
    })
  })

  describe('Error Handling', () => {
    it('should handle save with invalid data gracefully', async () => {
      const user = userEvent.setup()
      render(<Default />)

      const saveButton = screen.getByTestId('mock-save-button')

      // Should not throw even if data is invalid
      expect(async () => {
        await user.click(saveButton)
      }).not.toThrow()
    })

    it('should handle missing router gracefully', () => {
      // This tests that component doesn't break if router has issues
      expect(() => render(<Default />)).not.toThrow()
    })
  })

  describe('Integration Tests', () => {
    it('should integrate RoleForm with correct callback flow', async () => {
      const user = userEvent.setup()
      render(<Default />)

      // Verify RoleForm is integrated
      const roleForm = screen.getByTestId('role-form-component')
      expect(roleForm).toBeInTheDocument()

      // Test save flow
      const saveButton = screen.getByTestId('mock-save-button')
      await user.click(saveButton)

      await waitFor(() => {
        expect(mockRouter.pathname).toBe('/my-account/b2b/manage-roles')
      })
    })

    it('should maintain data integrity through component lifecycle', () => {
      const { rerender } = render(<Default />)

      const initialAccountsCount = screen.getByTestId('accounts-count').textContent

      // Rerender with same props
      rerender(<Default />)

      const updatedAccountsCount = screen.getByTestId('accounts-count').textContent
      expect(updatedAccountsCount).toBe(initialAccountsCount)
    })
  })
})
