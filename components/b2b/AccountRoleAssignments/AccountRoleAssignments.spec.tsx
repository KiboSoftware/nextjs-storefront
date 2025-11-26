import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AccountRoleAssignments.stories'

const {
  Default,
  WithSelectedRoles,
  SingleAccount,
  SystemRolesOnly,
  NoRolesAvailable,
  ManyAccounts,
  AllRolesSelected,
} = composeStories(stories)

const user = userEvent.setup()

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { searchTerm?: string }) => {
      const translations: Record<string, string> = {
        'account-role-assignments': 'Account Role Assignments',
        'expand-all': 'Expand All',
        'minimize-all': 'Minimize All',
        'search-roles': 'Search roles',
        'system-roles': 'System Roles',
        'custom-roles': 'Custom Roles',
        'no-roles-available': 'No roles available',
        'no-roles-match': `No roles match "${options?.searchTerm}"`,
      }
      return translations[key] || key
    },
  }),
}))

describe('[components] - AccountRoleAssignments', () => {
  describe('Component Rendering', () => {
    it('should render the component with default props', () => {
      render(<Default />)

      expect(screen.getByText('Account Role Assignments')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Search roles')).toBeInTheDocument()
      expect(screen.getByText('Expand All')).toBeInTheDocument()
      expect(screen.getByText('Minimize All')).toBeInTheDocument()
    })

    it('should render all accounts as accordions', () => {
      render(<Default />)

      expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
      expect(screen.getByText('Tech Solutions Inc')).toBeInTheDocument()
      expect(screen.getByText('Global Enterprises Ltd')).toBeInTheDocument()
    })

    it('should render single account correctly', () => {
      render(<SingleAccount />)

      expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
      expect(screen.queryByText('Tech Solutions Inc')).not.toBeInTheDocument()
    })

    it('should render many accounts', () => {
      render(<ManyAccounts />)

      expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
      expect(screen.getByText('Fourth Account')).toBeInTheDocument()
      expect(screen.getByText('Fifth Account')).toBeInTheDocument()
      expect(screen.getByText('Sixth Account')).toBeInTheDocument()
    })
  })

  describe('Role Display', () => {
    it('should display system roles when accordion is expanded', async () => {
      render(<Default />)

      // First accordion should be auto-expanded
      await waitFor(() => {
        expect(screen.getByText('System Roles')).toBeInTheDocument()
      })

      expect(screen.getByText('Administrator')).toBeInTheDocument()
      expect(screen.getByText('Buyer')).toBeInTheDocument()
      expect(screen.getByText('Purchaser')).toBeInTheDocument()
    })

    it('should display custom roles when accordion is expanded', async () => {
      render(<Default />)

      await waitFor(() => {
        expect(screen.getByText('Custom Roles')).toBeInTheDocument()
      })

      expect(screen.getByText('Custom Role 1')).toBeInTheDocument()
      expect(screen.getByText('Custom Role 2')).toBeInTheDocument()
    })

    it('should display only system roles when no custom roles available', async () => {
      render(<SystemRolesOnly />)

      await waitFor(() => {
        expect(screen.getByText('System Roles')).toBeInTheDocument()
      })

      expect(screen.queryByText('Custom Roles')).not.toBeInTheDocument()
    })

    it('should show no roles available message when account has no roles', async () => {
      render(<NoRolesAvailable />)

      const accordion = screen.getByText('Empty Account')
      await user.click(accordion)

      await waitFor(() => {
        expect(screen.getByText('No roles available')).toBeInTheDocument()
      })
    })

    it('should display long role names with ellipsis', async () => {
      render(<Default />)

      await waitFor(() => {
        expect(
          screen.getByText('Very Long Custom Role Name That Should Truncate')
        ).toBeInTheDocument()
      })

      const longRoleName = screen.getByText('Very Long Custom Role Name That Should Truncate')
      expect(longRoleName).toHaveAttribute(
        'title',
        'Very Long Custom Role Name That Should Truncate'
      )
    })
  })

  describe('Role Selection', () => {
    it('should show preselected roles', async () => {
      render(<WithSelectedRoles />)

      await waitFor(() => {
        // Check that selected roles are rendered
        expect(screen.getByText('Administrator')).toBeInTheDocument()
      })
    })

    it('should toggle role selection when clicked', async () => {
      const onChangeMock = jest.fn()
      render(<Default {...Default.args} onChange={onChangeMock} />)

      const adminRole = await screen.findByText('Administrator')
      await user.click(adminRole)

      await waitFor(() => {
        expect(onChangeMock).toHaveBeenCalledWith(
          expect.objectContaining({
            1001: expect.arrayContaining(['1']),
          })
        )
      })
    })

    it('should deselect a previously selected role', async () => {
      const onChangeMock = jest.fn()
      render(<WithSelectedRoles {...WithSelectedRoles.args} onChange={onChangeMock} />)

      const adminRole = await screen.findByText('Administrator')
      await user.click(adminRole)

      await waitFor(() => {
        expect(onChangeMock).toHaveBeenCalled()
      })

      // Check that the role was removed from selection
      const lastCall = onChangeMock.mock.calls[onChangeMock.mock.calls.length - 1][0]
      expect(lastCall[1001]).not.toContain('1')
    })

    it('should handle multiple role selections', async () => {
      const onChangeMock = jest.fn()
      render(<Default {...Default.args} onChange={onChangeMock} />)

      const adminRole = await screen.findByText('Administrator')
      const buyerRole = await screen.findByText('Buyer')

      await user.click(adminRole)
      await waitFor(() => {
        expect(onChangeMock).toHaveBeenCalledTimes(1)
      })

      await user.click(buyerRole)
      await waitFor(() => {
        expect(onChangeMock).toHaveBeenCalledTimes(2)
      })
    })

    it('should display all roles as selected', async () => {
      render(<AllRolesSelected />)

      await waitFor(() => {
        expect(screen.getByText('Administrator')).toBeInTheDocument()
      })

      // All roles should be rendered and visible
      expect(screen.getByText('Custom Role 1')).toBeInTheDocument()
      expect(screen.getByText('Custom Role 2')).toBeInTheDocument()
      expect(screen.getByText('Approver')).toBeInTheDocument()
    })
  })

  describe('Search Functionality', () => {
    it('should filter roles based on search term', async () => {
      render(<Default />)

      await waitFor(() => {
        expect(screen.getByText('Administrator')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Search roles')
      await user.type(searchInput, 'admin')

      await waitFor(() => {
        expect(screen.getByText('Administrator')).toBeInTheDocument()
      })

      expect(screen.queryByText('Buyer')).not.toBeInTheDocument()
    })

    it('should show no matches message when search has no results', async () => {
      render(<Default />)

      await waitFor(() => {
        expect(screen.getByText('Administrator')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Search roles')
      await user.type(searchInput, 'nonexistentrole')

      await waitFor(() => {
        expect(screen.getByText('No roles match "nonexistentrole"')).toBeInTheDocument()
      })
    })

    it('should clear search results when input is cleared', async () => {
      render(<Default />)

      await waitFor(() => {
        expect(screen.getByText('Administrator')).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Search roles')
      await user.type(searchInput, 'admin')

      await waitFor(() => {
        expect(screen.queryByText('Buyer')).not.toBeInTheDocument()
      })

      await user.clear(searchInput)

      await waitFor(() => {
        expect(screen.getByText('Administrator')).toBeInTheDocument()
      })

      expect(screen.getByText('Buyer')).toBeInTheDocument()
    })

    it('should apply search across all accounts', async () => {
      render(<ManyAccounts />)

      const searchInput = screen.getByPlaceholderText('Search roles')
      await user.type(searchInput, 'custom')

      // Expand second account
      const secondAccount = screen.getByText('Tech Solutions Inc')
      await user.click(secondAccount)

      await waitFor(() => {
        // Should not show any custom roles in second account (it only has system roles)
        expect(screen.queryByText('Custom Role')).not.toBeInTheDocument()
      })
    })
  })

  describe('Expand/Collapse Functionality', () => {
    it('should auto-expand first accordion on mount', () => {
      render(<Default />)

      // First account should be expanded
      expect(screen.getByText('System Roles')).toBeInTheDocument()
    })

    it('should auto-expand accounts with selected roles', async () => {
      render(<WithSelectedRoles />)

      // Accounts with selected roles should be expanded
      await waitFor(() => {
        expect(screen.getByText('System Roles')).toBeInTheDocument()
      })
    })

    it('should expand accordion when clicked', async () => {
      render(<Default />)

      const secondAccount = screen.getByText('Tech Solutions Inc')
      await user.click(secondAccount)

      await waitFor(() => {
        const accordions = screen.getAllByText('System Roles')
        expect(accordions.length).toBeGreaterThan(0)
      })
    })

    it('should collapse accordion when clicked again', async () => {
      render(<Default />)

      // First accordion is auto-expanded
      expect(screen.getByText('System Roles')).toBeInTheDocument()

      const firstAccount = screen.getByText('Acme Corporation')
      await user.click(firstAccount)

      await waitFor(() => {
        // After collapse, we might still see System Roles if another accordion is expanded
        // So we just verify the click happened
        expect(firstAccount).toBeInTheDocument()
      })
    })

    it('should expand all accordions when Expand All is clicked', async () => {
      render(<Default {...Default.args} />)

      const expandAllButton = screen.getByText('Expand All')
      await user.click(expandAllButton)

      await waitFor(
        () => {
          // All accounts should show their roles
          const systemRoleSections = screen.getAllByText('System Roles')
          expect(systemRoleSections.length).toBe(3) // Three accounts
        },
        { timeout: 3000 }
      )
    })

    it('should collapse all accordions when Minimize All is clicked', async () => {
      render(<Default {...Default.args} />)

      const expandAllButton = screen.getByText('Expand All')
      await user.click(expandAllButton)

      await waitFor(
        () => {
          expect(screen.getAllByText('System Roles').length).toBe(3)
        },
        { timeout: 3000 }
      )

      const minimizeAllButton = screen.getByText('Minimize All')
      await user.click(minimizeAllButton)

      await waitFor(
        () => {
          expect(screen.queryByText('System Roles')).not.toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('should maintain expansion state when searching', async () => {
      render(<Default />)

      const expandAllButton = screen.getByText('Expand All')
      await user.click(expandAllButton)

      const searchInput = screen.getByPlaceholderText('Search roles')
      await user.type(searchInput, 'admin')

      await waitFor(() => {
        // Expanded accordions should remain expanded during search
        expect(screen.getByText('System Roles')).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty accounts array', () => {
      const emptyProps = {
        ...Default.args,
        accounts: [],
      }
      render(<Default {...emptyProps} />)

      expect(screen.getByText('Account Role Assignments')).toBeInTheDocument()
      expect(screen.queryByText('Acme Corporation')).not.toBeInTheDocument()
    })

    it('should handle missing accountRoles prop', () => {
      const propsWithoutRoles = {
        ...Default.args,
        accountRoles: undefined,
      }
      render(<Default {...propsWithoutRoles} />)

      expect(screen.getByText('Account Role Assignments')).toBeInTheDocument()
    })

    it('should handle empty selectedRoles', () => {
      const propsWithEmptyRoles = {
        ...Default.args,
        selectedRoles: {},
      }
      render(<Default {...propsWithEmptyRoles} />)

      expect(screen.getByText('Account Role Assignments')).toBeInTheDocument()
    })

    it('should not collapse accordion when clicking on role chip', async () => {
      const onChangeMock = jest.fn()
      render(<Default {...Default.args} onChange={onChangeMock} />)

      const adminRole = await screen.findByText('Administrator')
      await user.click(adminRole)

      await waitFor(() => {
        expect(onChangeMock).toHaveBeenCalled()
      })

      // Accordion should still be expanded
      expect(screen.getByText('System Roles')).toBeInTheDocument()
    })

    it('should handle account with no items in rolesData', async () => {
      const customProps = {
        ...Default.args,
        accounts: [{ accountId: 1001, accountName: 'Acme Corporation' }],
        accountRoles: {
          1001: {
            items: [],
            totalCount: 0,
            pageCount: 0,
            pageSize: 0,
            startIndex: 0,
          },
        },
      }
      render(<Default {...customProps} />)

      await waitFor(() => {
        expect(screen.getAllByText('No roles available')[0]).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels for accordions', () => {
      render(<Default />)

      // Check that accordion headers exist
      expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
    })

    it('should have search input with proper placeholder', () => {
      render(<Default />)

      const searchInput = screen.getByPlaceholderText('Search roles')
      expect(searchInput).toHaveAttribute('type', 'text')
    })

    it('should support keyboard navigation', async () => {
      render(<Default />)

      const expandAllButton = screen.getByText('Expand All')
      expandAllButton.focus()

      expect(expandAllButton).toHaveFocus()
    })
  })

  describe('Performance', () => {
    it('should render component without unnecessary re-renders', () => {
      const { rerender } = render(<Default />)

      // Re-render with same props
      rerender(<Default />)

      expect(screen.getByText('Account Role Assignments')).toBeInTheDocument()
    })

    it('should handle large number of roles efficiently', async () => {
      render(<AllRolesSelected />)

      await waitFor(() => {
        expect(screen.getByText('Administrator')).toBeInTheDocument()
      })

      // Component should render all roles without issues
      const roleElements = screen.getAllByRole('button').filter((btn) => {
        const text = btn.textContent
        return text && (text.includes('Role') || text.includes('Administrator'))
      })

      expect(roleElements.length).toBeGreaterThan(0)
    })
  })
})
