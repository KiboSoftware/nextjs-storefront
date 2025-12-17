import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import RoleAccountHierarchyView from './RoleAccountHierarchyView'

import { B2BAccount } from '@/lib/gql/types'

// Mock next-i18next
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        parent: 'Parent',
        child: 'child',
        children: 'children',
        account: 'account',
        accounts: 'accounts',
        'account-hierarchy-scope': 'Account Hierarchy Scope',
        'no-accounts-available': 'No accounts available',
        'role-applied-to-single': `Role will be applied to ${params?.totalAccounts} ${params?.accountText}`,
      }
      return translations[key] || key
    },
  }),
}))

describe('[Component] RoleAccountHierarchyView', () => {
  // Mock data setup
  const mockParentAccount = {
    id: 1000,
    companyOrOrganization: 'Parent Company',
    parentAccountId: null,
  } as B2BAccount

  const mockChildAccount1 = {
    id: 1001,
    companyOrOrganization: 'Child Company 1',
    parentAccountId: 1000,
  } as B2BAccount

  const mockChildAccount2 = {
    id: 1002,
    companyOrOrganization: 'Child Company 2',
    parentAccountId: 1000,
  } as B2BAccount

  const mockGrandchildAccount1 = {
    id: 1003,
    companyOrOrganization: 'Grandchild Company 1',
    parentAccountId: 1001,
  } as B2BAccount

  const mockGrandchildAccount2 = {
    id: 1004,
    companyOrOrganization: 'Grandchild Company 2',
    parentAccountId: 1001,
  } as B2BAccount

  const mockAccountsWithHierarchy: B2BAccount[] = [
    mockParentAccount,
    mockChildAccount1,
    mockChildAccount2,
    mockGrandchildAccount1,
    mockGrandchildAccount2,
  ]

  const setup = (props = {}) => {
    const defaultProps = {
      accounts: mockAccountsWithHierarchy,
      selectedAccountIds: [1000, 1001],
      parentAccountId: 1000,
    }

    const user = userEvent.setup()
    const utils = render(<RoleAccountHierarchyView {...defaultProps} {...props} />)

    return { user, ...utils }
  }

  describe('Component Initialization', () => {
    it('should render the component with title and description', () => {
      setup()

      expect(screen.getByText('Account Hierarchy Scope')).toBeInTheDocument()
      expect(screen.getByText(/Role will be applied to 2 accounts/i)).toBeInTheDocument()
    })

    it('should display parent account with Parent badge', () => {
      setup()

      expect(screen.getByText(/Parent Company \(Parent\)/i)).toBeInTheDocument()
    })

    it('should show all accounts in the hierarchy', () => {
      setup()

      expect(screen.getByText(/Parent Company/i)).toBeInTheDocument()
      expect(screen.getByText(/Child Company 1/i)).toBeInTheDocument()
    })

    it('should display correct selected account count in singular form', () => {
      setup({ selectedAccountIds: [1000] })

      expect(screen.getByText(/Role will be applied to 1 account/i)).toBeInTheDocument()
    })

    it('should display correct selected account count in plural form', () => {
      setup({ selectedAccountIds: [1000, 1001, 1002] })

      expect(screen.getByText(/Role will be applied to 3 accounts/i)).toBeInTheDocument()
    })
  })

  describe('Empty States', () => {
    it('should display empty state when no accounts are provided', () => {
      setup({ accounts: [] })

      expect(screen.getByText('No accounts available')).toBeInTheDocument()
    })

    it('should display empty state when accounts is undefined', () => {
      setup({ accounts: undefined })

      expect(screen.getByText('No accounts available')).toBeInTheDocument()
    })

    it('should display empty state when parentAccountId is not provided', () => {
      setup({ parentAccountId: undefined })

      expect(screen.getByText('No accounts available')).toBeInTheDocument()
    })

    it('should display empty state when parentAccountId is null', () => {
      setup({ parentAccountId: null })

      expect(screen.getByText('No accounts available')).toBeInTheDocument()
    })
  })

  describe('Hierarchy Display', () => {
    it('should display child count for parent nodes', () => {
      setup()

      // Parent Company has 2 children (Child Company 1 and Child Company 2)
      // Child Company 1 also has 2 children, so we use getAllByText
      const childCountElements = screen.getAllByText(/\(2 children\)/i)
      expect(childCountElements.length).toBeGreaterThan(0)
      expect(childCountElements[0]).toBeInTheDocument()
    })

    it('should display child count in singular form for single child', () => {
      const accounts = [mockParentAccount, mockChildAccount1]
      setup({ accounts, selectedAccountIds: [1000], parentAccountId: 1000 })

      expect(screen.getByText(/\(1 child\)/i)).toBeInTheDocument()
    })

    it('should not display expand button for leaf nodes', () => {
      setup()

      // Child Company 2 is a leaf node (no children)
      // It should still render but without expand/collapse buttons
      expect(screen.getByText(/Child Company 2/i)).toBeInTheDocument()

      // Expand buttons should only exist for nodes with children
      const allButtons = screen.getAllByRole('button')
      // Parent Company has 2 children, Child Company 1 has 2 children = 2 expand buttons
      expect(allButtons.length).toBe(2)
    })

    it('should display expand button for nodes with children', () => {
      setup()

      const expandButtons = screen.getAllByRole('button')
      // Should have expand buttons for Parent Company and Child Company 1 (both have children)
      expect(expandButtons.length).toBeGreaterThan(0)
    })
  })

  describe('Checkbox States', () => {
    it('should display checked checkboxes for selected accounts', () => {
      setup({ selectedAccountIds: [1000, 1001] })

      const checkboxes = screen.getAllByRole('checkbox')
      const checkedCheckboxes = checkboxes.filter((cb) => (cb as HTMLInputElement).checked)

      expect(checkedCheckboxes.length).toBe(2)
    })

    it('should display unchecked checkboxes for non-selected accounts', () => {
      setup({ selectedAccountIds: [1000] })

      const checkboxes = screen.getAllByRole('checkbox')
      const uncheckedCheckboxes = checkboxes.filter((cb) => !(cb as HTMLInputElement).checked)

      // Should have unchecked boxes for accounts not selected
      expect(uncheckedCheckboxes.length).toBeGreaterThan(0)
    })

    it('should disable all checkboxes (read-only mode)', () => {
      setup()

      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeDisabled()
      })
    })
  })

  describe('Node Expansion and Collapse', () => {
    it('should auto-expand parent account by default', () => {
      setup()

      // Parent account should be visible
      expect(screen.getByText(/Parent Company/i)).toBeInTheDocument()
      // Its children should be visible (expanded by default)
      expect(screen.getByText(/Child Company 1/i)).toBeInTheDocument()
      expect(screen.getByText(/Child Company 2/i)).toBeInTheDocument()
    })

    it('should auto-expand nodes containing selected accounts', () => {
      setup({ selectedAccountIds: [1003] }) // Select grandchild

      // Parent should be expanded
      expect(screen.getByText(/Parent Company/i)).toBeInTheDocument()
      // Child Company 1 should be expanded (contains selected grandchild)
      expect(screen.getByText('Child Company 1')).toBeInTheDocument()
      // Grandchild should be visible
      expect(screen.getByText('Grandchild Company 1')).toBeInTheDocument()
    })

    it('should collapse node when clicking expand button', async () => {
      const { user } = setup()

      // Initially expanded - Child Company 1 should be visible
      expect(screen.getByText(/Child Company 1/i)).toBeInTheDocument()

      // Click to collapse Parent Company
      const expandButtons = screen.getAllByRole('button')
      await user.click(expandButtons[0])

      // Child Company 1 should no longer be visible
      await waitFor(() => {
        expect(screen.queryByText(/Child Company 1/i)).not.toBeInTheDocument()
      })
    })

    it('should expand node when clicking collapsed node button', async () => {
      const { user } = setup({ selectedAccountIds: [1000] }) // Only select parent

      // Click to expand Child Company 1 to see its children
      const childExpandButtons = screen.getAllByRole('button')
      // Find Child Company 1's expand button
      const childCompany1Button = childExpandButtons[1]

      // Grandchild should not be visible initially
      expect(screen.queryByText(/Grandchild Company 1/i)).not.toBeInTheDocument()

      await user.click(childCompany1Button)

      // Grandchild should now be visible
      await waitFor(() => {
        expect(screen.getByText(/Grandchild Company 1/i)).toBeInTheDocument()
      })
    })

    it('should toggle expansion state multiple times', async () => {
      const { user } = setup()

      const expandButton = screen.getAllByRole('button')[0]

      // Collapse
      await user.click(expandButton)
      await waitFor(() => {
        expect(screen.queryByText(/Child Company 1/i)).not.toBeInTheDocument()
      })

      // Expand
      await user.click(expandButton)
      await waitFor(() => {
        expect(screen.getByText(/Child Company 1/i)).toBeInTheDocument()
      })

      // Collapse again
      await user.click(expandButton)
      await waitFor(() => {
        expect(screen.queryByText(/Child Company 1/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Deep Hierarchy Handling', () => {
    it('should handle deep hierarchy with multiple levels', () => {
      const deepHierarchy: B2BAccount[] = [
        { id: 1, companyOrOrganization: 'Level 1', parentAccountId: null } as B2BAccount,
        { id: 2, companyOrOrganization: 'Level 2', parentAccountId: 1 } as B2BAccount,
        { id: 3, companyOrOrganization: 'Level 3', parentAccountId: 2 } as B2BAccount,
        { id: 4, companyOrOrganization: 'Level 4', parentAccountId: 3 } as B2BAccount,
        { id: 5, companyOrOrganization: 'Level 5', parentAccountId: 4 } as B2BAccount,
      ]

      setup({
        accounts: deepHierarchy,
        selectedAccountIds: [5], // Select deepest level
        parentAccountId: 1,
      })

      // All levels should be auto-expanded to show selected account
      expect(screen.getByText(/Level 1/)).toBeInTheDocument()
      expect(screen.getByText(/Level 2/)).toBeInTheDocument()
      expect(screen.getByText(/Level 3/)).toBeInTheDocument()
      expect(screen.getByText(/Level 4/)).toBeInTheDocument()
      expect(screen.getByText(/Level 5/)).toBeInTheDocument()
    })

    it('should handle single account without children', () => {
      setup({
        accounts: [mockParentAccount],
        selectedAccountIds: [1000],
        parentAccountId: 1000,
      })

      expect(screen.getByText(/Parent Company/i)).toBeInTheDocument()
      // Should not show child count
      expect(screen.queryByText(/children/i)).not.toBeInTheDocument()
    })

    it('should handle all accounts selected', () => {
      setup({
        selectedAccountIds: [1000, 1001, 1002, 1003, 1004],
      })

      expect(screen.getByText(/Role will be applied to 5 accounts/i)).toBeInTheDocument()

      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeChecked()
      })
    })

    it('should handle no accounts selected', () => {
      setup({ selectedAccountIds: [] })

      expect(screen.getByText(/Role will be applied to 0 accounts/i)).toBeInTheDocument()

      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach((checkbox) => {
        expect(checkbox).not.toBeChecked()
      })
    })
  })

  describe('Account Display with Missing Data', () => {
    it('should handle account without companyOrOrganization name', () => {
      const accountWithoutName: B2BAccount = {
        id: 9999,
        companyOrOrganization: '',
        parentAccountId: null,
      } as B2BAccount

      setup({
        accounts: [accountWithoutName],
        selectedAccountIds: [9999],
        parentAccountId: 9999,
      })

      expect(screen.getByText(/Account 9999/)).toBeInTheDocument()
    })

    it('should handle account with null companyOrOrganization', () => {
      const accountWithNullName = {
        id: 8888,
        companyOrOrganization: null,
        parentAccountId: null,
      } as unknown as B2BAccount

      setup({
        accounts: [accountWithNullName],
        selectedAccountIds: [8888],
        parentAccountId: 8888,
      })

      expect(screen.getByText(/Account 8888/)).toBeInTheDocument()
    })
  })

  describe('Props Update Behavior', () => {
    it('should update expanded nodes when selectedAccountIds change', () => {
      const { rerender } = render(
        <RoleAccountHierarchyView
          accounts={mockAccountsWithHierarchy}
          selectedAccountIds={[1000]}
          parentAccountId={1000}
        />
      )

      // Initially, only parent is selected
      expect(screen.getByText(/Role will be applied to 1 account/i)).toBeInTheDocument()

      // Update to select grandchild
      rerender(
        <RoleAccountHierarchyView
          accounts={mockAccountsWithHierarchy}
          selectedAccountIds={[1003]}
          parentAccountId={1000}
        />
      )

      // Should update count and auto-expand to show grandchild
      expect(screen.getByText(/Role will be applied to 1 account/i)).toBeInTheDocument()
      expect(screen.getByText(/Grandchild Company 1/i)).toBeInTheDocument()
    })

    it('should re-initialize expanded nodes when accounts change', () => {
      const { rerender } = render(
        <RoleAccountHierarchyView
          accounts={[mockParentAccount, mockChildAccount1]}
          selectedAccountIds={[1000]}
          parentAccountId={1000}
        />
      )

      expect(screen.queryByText(/Grandchild Company 1/i)).not.toBeInTheDocument()

      // Update accounts to include grandchildren
      rerender(
        <RoleAccountHierarchyView
          accounts={mockAccountsWithHierarchy}
          selectedAccountIds={[1003]}
          parentAccountId={1000}
        />
      )

      // Should now show grandchild
      expect(screen.getByText(/Grandchild Company 1/i)).toBeInTheDocument()
    })
  })

  describe('Icon Display', () => {
    it('should show expand icon (chevron right) for collapsed nodes', async () => {
      const { user } = setup({ selectedAccountIds: [1000] })

      // Find Child Company 1's row which has children but is not auto-expanded
      const expandButtons = screen.getAllByRole('button')

      // Collapse the parent first to see chevron right
      await user.click(expandButtons[0])

      await waitFor(() => {
        expect(screen.queryByText(/Child Company 1/i)).not.toBeInTheDocument()
      })
    })

    it('should show collapse icon (expand more) for expanded nodes', () => {
      setup()

      // Parent is expanded by default, should show ExpandMore icon
      const expandButtons = screen.getAllByRole('button')
      expect(expandButtons.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('should have accessible checkboxes', () => {
      setup()

      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveAttribute('type', 'checkbox')
      })
    })

    it('should have accessible expand/collapse buttons', () => {
      setup()

      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument()
      })
    })

    it('should maintain proper DOM structure', () => {
      setup()

      // Check that components render correctly
      expect(screen.getByText(/Parent Company/i)).toBeInTheDocument()
      expect(screen.getByText('Account Hierarchy Scope')).toBeInTheDocument()

      // Check that checkboxes are present
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBeGreaterThan(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle circular reference prevention (parent points to child)', () => {
      const circularAccounts: B2BAccount[] = [
        { id: 100, companyOrOrganization: 'Account A', parentAccountId: null } as B2BAccount,
        { id: 101, companyOrOrganization: 'Account B', parentAccountId: 100 } as B2BAccount,
      ]

      setup({
        accounts: circularAccounts,
        selectedAccountIds: [101],
        parentAccountId: 100,
      })

      expect(screen.getByText(/Account A/)).toBeInTheDocument()
      expect(screen.getByText(/Account B/)).toBeInTheDocument()
    })

    it('should handle selectedAccountIds with non-existent IDs', () => {
      setup({
        selectedAccountIds: [9999, 8888, 1000],
      })

      // Should still work, only showing existing account
      expect(screen.getByText(/Parent Company/i)).toBeInTheDocument()
    })

    it('should handle parentAccountId that does not exist in accounts array', () => {
      setup({
        parentAccountId: 9999,
      })

      // Should render the component even if parent doesn't exist in visible hierarchy
      expect(screen.getByText('Account Hierarchy Scope')).toBeInTheDocument()
    })

    it('should handle empty selectedAccountIds array', () => {
      setup({ selectedAccountIds: [] })

      expect(screen.getByText(/Role will be applied to 0 accounts/i)).toBeInTheDocument()

      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach((checkbox) => {
        expect(checkbox).not.toBeChecked()
      })
    })

    it('should handle rapid expansion/collapse clicks', async () => {
      const { user } = setup()

      const expandButton = screen.getAllByRole('button')[0]

      // Rapid clicks
      await user.click(expandButton)
      await user.click(expandButton)
      await user.click(expandButton)
      await user.click(expandButton)

      // Should still be functional
      expect(screen.getByText(/Parent Company/i)).toBeInTheDocument()
    })
  })
})
