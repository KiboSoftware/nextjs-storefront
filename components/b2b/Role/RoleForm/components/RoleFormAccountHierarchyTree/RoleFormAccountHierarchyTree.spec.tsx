import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import RoleFormAccountHierarchyTree from './RoleFormAccountHierarchyTree'
import { CustomBehaviors } from '@/lib/constants'

import type { B2BAccount } from '@/lib/gql/types'

// Mock translations
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      if (key === 'role-applied-to-multiple') {
        return `${params?.totalAccounts} ${params?.accountText} (${params?.includingParentText})`
      }
      if (key === 'role-applied-to-single') {
        return `${params?.totalAccounts} ${params?.accountText}`
      }
      return key
    },
  }),
}))

interface AccountUserBehaviorResult {
  accountId: number
  behaviors: number[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error: unknown
}

const createMockAccount = (id: number, name: string, parentAccountId?: number): B2BAccount =>
  ({
    id,
    companyOrOrganization: name,
    parentAccountId,
    users: [],
  } as unknown as B2BAccount)

const mockAccountsHierarchy: B2BAccount[] = [
  createMockAccount(1, 'Parent Company'),
  createMockAccount(2, 'Child Account 1', 1),
  createMockAccount(3, 'Child Account 2', 1),
  createMockAccount(4, 'Grandchild 1-1', 2),
  createMockAccount(5, 'Grandchild 1-2', 2),
  createMockAccount(6, 'Grandchild 2-1', 3),
]

const mockAccountBehaviorResults: AccountUserBehaviorResult[] = [
  {
    accountId: 1,
    behaviors: [CustomBehaviors.CreateRole],
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  },
  {
    accountId: 2,
    behaviors: [CustomBehaviors.CreateRole],
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  },
  {
    accountId: 3,
    behaviors: [CustomBehaviors.CreateRole],
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  },
  {
    accountId: 4,
    behaviors: [CustomBehaviors.CreateRole],
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  },
  {
    accountId: 5,
    behaviors: [CustomBehaviors.CreateRole],
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  },
  {
    accountId: 6,
    behaviors: [CustomBehaviors.CreateRole],
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
  },
]

const defaultProps = {
  parentAccount: '1',
  accountScope: 'specific-child',
  accounts: mockAccountsHierarchy,
  onAccountsChange: jest.fn(),
  accountUserBehaviorResults: mockAccountBehaviorResults,
}

describe('RoleFormAccountHierarchyTree Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Helper function to expand tree nodes
  const expandNode = async (user: ReturnType<typeof userEvent.setup>, expandButtonIndex = 0) => {
    const expandButtons = screen.getAllByRole('button', { name: '' })
    const expandButton = expandButtons[expandButtonIndex]
    await user.click(expandButton)
  }

  // Helper function to get checkbox by account name
  // Note: MUI hides checkboxes from accessibility tree, so we must use querySelector
  // as an escape hatch when no accessible alternative exists.
  /* eslint-disable testing-library/no-node-access */
  const getCheckboxByAccountName = (accountName: string): HTMLInputElement => {
    const labels = document.querySelectorAll('label.MuiFormControlLabel-root')
    for (const label of Array.from(labels)) {
      const text = label.textContent
      if (text?.includes(accountName) && !text.includes('child)')) {
        // Avoid matching counter text
        const checkbox = label.querySelector('input[type="checkbox"]')
        if (checkbox) return checkbox as HTMLInputElement
      }
    }
    throw new Error(`Cannot find checkbox for ${accountName}`)
  }
  /* eslint-enable testing-library/no-node-access */

  describe('Component Rendering', () => {
    it('should render the component with search input', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByPlaceholderText('search-accounts')).toBeInTheDocument()
    })

    it('should render select and deselect buttons', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByText('select-all-accounts')).toBeInTheDocument()
      expect(screen.getByText('deselect-all-accounts')).toBeInTheDocument()
    })

    it('should render parent account in hierarchy', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByText(/Parent Company/)).toBeInTheDocument()
    })

    it('should display title based on account scope', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="specific-child" />)

      expect(screen.getByText('select-child-accounts')).toBeInTheDocument()
    })

    it('should display exclusion title when accountScope is all-except', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="all-except" />)

      expect(screen.getByText('select-accounts-to-exclude')).toBeInTheDocument()
    })

    it('should render search icon', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByTestId('SearchIcon')).toBeInTheDocument()
    })

    it('should show account counter with default text', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByText(/1 account/)).toBeInTheDocument()
    })
  })

  describe('AC4: Apply to Specific Child Accounts', () => {
    it('should show child accounts when tree is expanded', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      // Initially child accounts are not visible
      expect(screen.queryByText('Child Account 1')).not.toBeInTheDocument()

      // Expand tree
      await expandNode(user, 0)

      // Child accounts should now be visible
      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })
      expect(screen.getByText('Child Account 2')).toBeInTheDocument()
    })

    it('should call onAccountsChange when child account is selected', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()

      render(<RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />)

      // Expand tree
      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      // Get all checkboxes including hidden ones
      const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')
      expect(firstChildCheckbox).toBeInTheDocument()

      // Select child account
      await user.click(firstChildCheckbox)

      await waitFor(() => {
        expect(onAccountsChange).toHaveBeenCalledWith([2])
      })
    })

    it('should allow selecting multiple child accounts', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()

      render(<RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />)

      // Expand tree
      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')
      const secondChildCheckbox = getCheckboxByAccountName('Child Account 2')

      // Select first child
      await user.click(firstChildCheckbox)

      await waitFor(() => {
        expect(onAccountsChange).toHaveBeenCalledWith([2])
      })

      // Select second child
      await user.click(secondChildCheckbox)

      await waitFor(() => {
        expect(onAccountsChange).toHaveBeenCalledWith([2, 3])
      })
    })

    it('should allow deselecting accounts', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()

      render(<RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />)

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')

      // Select and deselect
      await user.click(firstChildCheckbox)
      await waitFor(() => {
        expect(onAccountsChange).toHaveBeenCalledWith([2])
      })

      await user.click(firstChildCheckbox)
      await waitFor(() => {
        expect(onAccountsChange).toHaveBeenCalledWith([])
      })
    })

    it('should update counter when accounts are selected', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const checkboxInputs = screen.getAllByRole('checkbox')
      await user.click(checkboxInputs[1])

      await waitFor(() => {
        expect(screen.getByText(/2 accounts/)).toBeInTheDocument()
      })
    })
  })

  describe('Search Functionality', () => {
    it('should filter accounts based on search query', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, 'Child Account 1')

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })
      expect(screen.queryByText('Child Account 2')).not.toBeInTheDocument()
    })

    it('should clear search when clear button is clicked', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, 'Test')

      // Find and click clear button
      const clearButton = screen.getByTitle('Clear search')
      await user.click(clearButton)

      await waitFor(() => {
        expect(searchInput).toHaveValue('')
      })
    })

    it('should auto-expand tree nodes when searching', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, 'Grandchild 1-1')

      await waitFor(() => {
        expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
      })
    })

    it('should show all accounts when search is empty', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, 'Test')
      await user.clear(searchInput)

      await waitFor(() => {
        expect(searchInput).toHaveValue('')
      })
    })

    it('should show no results when search does not match', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, 'NonexistentAccount')

      await waitFor(() => {
        expect(screen.queryByText('Child Account 1')).not.toBeInTheDocument()
      })
      expect(screen.queryByText('Child Account 2')).not.toBeInTheDocument()
    })
  })

  describe('AC5: Apply to All Child Accounts Except', () => {
    it('should display exclusion message when in all-except mode', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="all-except" />)

      expect(screen.getByText('select-accounts-to-exclude')).toBeInTheDocument()
    })

    it('should show higher counter in all-except mode initially', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="all-except" />)

      expect(screen.getByText(/6 accounts/)).toBeInTheDocument()
    })

    it('should decrease counter when accounts are excluded', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="all-except" />)

      // Initially shows all accounts
      expect(screen.getByText(/6 accounts/)).toBeInTheDocument()

      // Expand and exclude account
      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const checkboxInputs = screen.getAllByRole('checkbox')
      await user.click(checkboxInputs[1])

      await waitFor(() => {
        expect(screen.getByText(/5 accounts/)).toBeInTheDocument()
      })
    })

    it('should allow excluding multiple accounts', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()

      render(
        <RoleFormAccountHierarchyTree
          {...defaultProps}
          accountScope="all-except"
          onAccountsChange={onAccountsChange}
        />
      )

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')
      const secondChildCheckbox = getCheckboxByAccountName('Child Account 2')

      // Exclude first child
      await user.click(firstChildCheckbox)

      await waitFor(() => {
        expect(onAccountsChange).toHaveBeenCalledWith([2])
      })

      // Exclude second child
      await user.click(secondChildCheckbox)

      await waitFor(() => {
        expect(onAccountsChange).toHaveBeenCalledWith([2, 3])
      })
    })
  })

  describe('Select/Deselect All Functionality', () => {
    it('should select all child accounts when select all button is clicked', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()

      render(<RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />)

      const selectAllButton = screen.getByText('select-all-accounts')
      await user.click(selectAllButton)

      await waitFor(() => {
        expect(onAccountsChange).toHaveBeenCalled()
      })

      // Should include all child accounts with permission
      const lastCall = onAccountsChange.mock.calls[onAccountsChange.mock.calls.length - 1][0]
      expect(lastCall).toEqual(expect.arrayContaining([2, 3, 4, 5, 6]))
    })

    it('should expand all nodes when select all is clicked', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const selectAllButton = screen.getByText('select-all-accounts')
      await user.click(selectAllButton)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })
      expect(screen.getByText('Child Account 2')).toBeInTheDocument()
      expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
    })

    it('should deselect all accounts when deselect all button is clicked', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()

      render(<RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />)

      // First select some accounts
      const selectAllButton = screen.getByText('select-all-accounts')
      await user.click(selectAllButton)

      await waitFor(() => {
        expect(onAccountsChange).toHaveBeenCalled()
      })

      // Then deselect all
      const deselectAllButton = screen.getByText('deselect-all-accounts')
      await user.click(deselectAllButton)

      await waitFor(() => {
        expect(onAccountsChange).toHaveBeenCalledWith([])
      })
    })

    it('should collapse all nodes when deselect all is clicked', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      // Expand first
      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      // Deselect all
      const deselectAllButton = screen.getByText('deselect-all-accounts')
      await user.click(deselectAllButton)

      await waitFor(() => {
        expect(screen.queryByText('Child Account 1')).not.toBeInTheDocument()
      })
    })
  })

  describe('Account Hierarchy Expansion', () => {
    it('should expand child accounts when expand button is clicked', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.queryByText('Child Account 1')).not.toBeInTheDocument()

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })
      expect(screen.getByText('Child Account 2')).toBeInTheDocument()
    })

    it('should collapse child accounts when collapse button is clicked', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      // Expand first
      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      // Collapse
      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.queryByText('Child Account 1')).not.toBeInTheDocument()
      })
    })

    it('should show child count next to parent accounts with children', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByText(/2 children/)).toBeInTheDocument()
    })

    it('should expand nested hierarchy multiple levels', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      // Expand parent
      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      // Expand first child to see grandchildren
      const expandButtons = screen.getAllByRole('button', { name: '' })
      await user.click(expandButtons[1])

      await waitFor(() => {
        expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
      })
      expect(screen.getByText('Grandchild 1-2')).toBeInTheDocument()
    })
  })

  describe('Permission Handling', () => {
    it('should disable parent account checkbox', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const parentCheckbox = getCheckboxByAccountName('Parent Company')
      expect(parentCheckbox).toBeDisabled()
    })

    it('should disable checkbox for accounts without create role permission', async () => {
      const user = userEvent.setup()
      const accountsWithoutPermission = [
        {
          accountId: 1,
          behaviors: [CustomBehaviors.CreateRole],
          isLoading: false,
          isError: false,
          isSuccess: true,
          error: null,
        },
        {
          accountId: 2,
          behaviors: [], // No CreateRole permission
          isLoading: false,
          isError: false,
          isSuccess: true,
          error: null,
        },
        {
          accountId: 3,
          behaviors: [CustomBehaviors.CreateRole],
          isLoading: false,
          isError: false,
          isSuccess: true,
          error: null,
        },
      ]

      render(
        <RoleFormAccountHierarchyTree
          {...defaultProps}
          accountUserBehaviorResults={accountsWithoutPermission}
        />
      )

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')
      const secondChildCheckbox = getCheckboxByAccountName('Child Account 2')
      // First child without permission should be disabled
      expect(firstChildCheckbox).toBeDisabled()
      // Second child with permission should be enabled
      expect(secondChildCheckbox).toBeEnabled()
    })

    it('should only include accounts with permission in select all', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()

      const mixedPermissions = [
        {
          accountId: 1,
          behaviors: [CustomBehaviors.CreateRole],
          isLoading: false,
          isError: false,
          isSuccess: true,
          error: null,
        },
        {
          accountId: 2,
          behaviors: [CustomBehaviors.CreateRole],
          isLoading: false,
          isError: false,
          isSuccess: true,
          error: null,
        },
        {
          accountId: 3,
          behaviors: [], // No permission
          isLoading: false,
          isError: false,
          isSuccess: true,
          error: null,
        },
        {
          accountId: 4,
          behaviors: [CustomBehaviors.CreateRole],
          isLoading: false,
          isError: false,
          isSuccess: true,
          error: null,
        },
      ]

      render(
        <RoleFormAccountHierarchyTree
          {...defaultProps}
          accountUserBehaviorResults={mixedPermissions}
          onAccountsChange={onAccountsChange}
        />
      )

      const selectAllButton = screen.getByText('select-all-accounts')
      await user.click(selectAllButton)

      await waitFor(() => {
        expect(onAccountsChange).toHaveBeenCalled()
      })

      const lastCall = onAccountsChange.mock.calls[onAccountsChange.mock.calls.length - 1][0]
      expect(lastCall).toEqual(expect.arrayContaining([2, 4]))
      expect(lastCall).not.toEqual(expect.arrayContaining([3]))
    })
  })

  describe('Account Counter Display', () => {
    it('should show singular form when one account', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="specific-child" />)

      expect(screen.getByText(/1 account/)).toBeInTheDocument()
    })

    it('should show plural form when multiple accounts selected', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="specific-child" />)

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const checkboxInputs = screen.getAllByRole('checkbox')
      await user.click(checkboxInputs[1])

      await waitFor(() => {
        expect(screen.getByText(/2 accounts/)).toBeInTheDocument()
      })
    })

    it('should include parent text in multiple accounts message', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="specific-child" />)

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const checkboxInputs = screen.getAllByRole('checkbox')
      await user.click(checkboxInputs[1])

      await waitFor(() => {
        expect(screen.getByText(/including-parent/)).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty accounts array', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} accounts={[]} />)

      expect(screen.getByPlaceholderText('search-accounts')).toBeInTheDocument()
      expect(screen.getByText('select-all-accounts')).toBeInTheDocument()
    })

    it('should handle undefined accounts', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} accounts={undefined} />)

      expect(screen.getByPlaceholderText('search-accounts')).toBeInTheDocument()
    })

    it('should handle parent account with no children', () => {
      const singleAccount = [createMockAccount(1, 'Parent Only')]

      render(<RoleFormAccountHierarchyTree {...defaultProps} accounts={singleAccount} />)

      expect(screen.getByText(/Parent Only/)).toBeInTheDocument()
      expect(screen.queryByText(/children/)).not.toBeInTheDocument()
    })

    it('should handle undefined accountUserBehaviorResults', async () => {
      const user = userEvent.setup()
      render(
        <RoleFormAccountHierarchyTree {...defaultProps} accountUserBehaviorResults={undefined} />
      )

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })
      const checkboxInputs = screen.getAllByRole('checkbox')
      // All child checkboxes should be disabled without behavior results
      expect(checkboxInputs[1]).toBeDisabled()
    })

    it('should handle accounts with empty names', () => {
      const accountsWithEmptyName = [createMockAccount(1, ''), createMockAccount(2, '', 1)]

      render(<RoleFormAccountHierarchyTree {...defaultProps} accounts={accountsWithEmptyName} />)

      expect(screen.getByPlaceholderText('search-accounts')).toBeInTheDocument()
    })

    it('should handle very long account names', () => {
      const longName = 'A'.repeat(200)
      const accountsWithLongName = [
        createMockAccount(1, longName),
        createMockAccount(2, 'Child', 1),
      ]

      render(<RoleFormAccountHierarchyTree {...defaultProps} accounts={accountsWithLongName} />)

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes(longName) ?? false
      })
      expect(elements.length).toBeGreaterThan(0)
    })

    it('should handle deep hierarchy with many levels', async () => {
      const user = userEvent.setup()
      const deepHierarchy = [
        createMockAccount(1, 'Level 1'),
        createMockAccount(2, 'Level 2', 1),
        createMockAccount(3, 'Level 3', 2),
        createMockAccount(4, 'Level 4', 3),
      ]

      const deepBehaviors = deepHierarchy.map((acc) => ({
        accountId: acc.id,
        behaviors: [CustomBehaviors.CreateRole],
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: null,
      }))

      render(
        <RoleFormAccountHierarchyTree
          {...defaultProps}
          accounts={deepHierarchy}
          accountUserBehaviorResults={deepBehaviors}
        />
      )

      const selectAllButton = screen.getByText('select-all-accounts')
      await user.click(selectAllButton)

      await waitFor(() => {
        expect(screen.getByText('Level 4')).toBeInTheDocument()
      })
    })
  })

  describe('Scenario-Based Tests', () => {
    describe('Scenario 1: User selects specific child accounts only', () => {
      it('should allow selecting individual child accounts without parent', async () => {
        const user = userEvent.setup()
        const onAccountsChange = jest.fn()

        render(
          <RoleFormAccountHierarchyTree
            {...defaultProps}
            accountScope="specific-child"
            onAccountsChange={onAccountsChange}
          />
        )

        await expandNode(user, 0)

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')
        await user.click(firstChildCheckbox)

        await waitFor(() => {
          expect(onAccountsChange).toHaveBeenCalledWith([2])
        })

        // Counter should reflect selection
        expect(screen.getByText(/2 accounts/)).toBeInTheDocument()
      })

      it('should show parent account as disabled', () => {
        render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="specific-child" />)

        const parentCheckbox = getCheckboxByAccountName('Parent Company')
        expect(parentCheckbox).toBeDisabled()
      })
    })

    describe('Scenario 2: User selects multiple child accounts', () => {
      it('should allow selecting and deselecting multiple accounts', async () => {
        const user = userEvent.setup()
        const onAccountsChange = jest.fn()

        render(
          <RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />
        )

        await expandNode(user, 0)

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')
        const secondChildCheckbox = getCheckboxByAccountName('Child Account 2')

        // Select child account
        await user.click(firstChildCheckbox)

        await waitFor(() => {
          expect(onAccountsChange).toHaveBeenCalled()
        })
        expect(onAccountsChange).toHaveBeenCalledWith([2])

        // Select another child account
        await user.click(secondChildCheckbox)

        await waitFor(() => {
          expect(onAccountsChange).toHaveBeenCalled()
        })
        expect(onAccountsChange).toHaveBeenCalledWith([2, 3])
      })

      it('should update counter for multiple selections', async () => {
        const user = userEvent.setup()
        render(<RoleFormAccountHierarchyTree {...defaultProps} />)

        await expandNode(user, 0)

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')
        const secondChildCheckbox = getCheckboxByAccountName('Child Account 2')

        await user.click(firstChildCheckbox)
        await user.click(secondChildCheckbox)

        await waitFor(() => {
          expect(screen.getByText(/3 accounts/)).toBeInTheDocument()
        })
      })
    })

    describe('Scenario 3: User excludes accounts in all-except mode', () => {
      it('should allow excluding accounts and see counter decrease', async () => {
        const user = userEvent.setup()
        render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="all-except" />)

        expect(screen.getByText(/6 accounts/)).toBeInTheDocument()

        await expandNode(user, 0)

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')
        const secondChildCheckbox = getCheckboxByAccountName('Child Account 2')

        // Select first child account (to exclude it)
        await user.click(firstChildCheckbox)

        await waitFor(() => {
          expect(screen.getByText(/5 accounts/)).toBeInTheDocument()
        })

        // Add second child account (to exclude)
        await user.click(secondChildCheckbox)

        await waitFor(() => {
          expect(screen.getByText(/4 accounts/)).toBeInTheDocument()
        })
      })

      it('should show correct exclusion message', () => {
        render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="all-except" />)

        expect(screen.getByText('select-accounts-to-exclude')).toBeInTheDocument()
      })
    })

    describe('Scenario 4: User selects all accounts quickly', () => {
      it('should select all child accounts with one click', async () => {
        const user = userEvent.setup()
        const onAccountsChange = jest.fn()

        render(
          <RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />
        )

        const selectAllButton = screen.getByText('select-all-accounts')
        await user.click(selectAllButton)

        await waitFor(() => {
          expect(onAccountsChange).toHaveBeenCalled()
        })

        const lastCall = onAccountsChange.mock.calls[onAccountsChange.mock.calls.length - 1][0]
        expect(lastCall.length).toBe(5) // All child accounts
        expect(lastCall).toEqual(expect.arrayContaining([2, 3, 4, 5, 6]))
      })

      it('should auto-expand all nodes after select all', async () => {
        const user = userEvent.setup()
        render(<RoleFormAccountHierarchyTree {...defaultProps} />)

        const selectAllButton = screen.getByText('select-all-accounts')
        await user.click(selectAllButton)

        await waitFor(() => {
          expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
        })
        expect(screen.getByText('Grandchild 1-2')).toBeInTheDocument()
        expect(screen.getByText('Grandchild 2-1')).toBeInTheDocument()
      })
    })

    describe('Scenario 5: User explores deep hierarchy', () => {
      it('should allow expanding multiple levels of hierarchy', async () => {
        const user = userEvent.setup()
        render(<RoleFormAccountHierarchyTree {...defaultProps} />)

        // Expand parent
        await expandNode(user, 0)

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        // Expand first child
        const expandButtons = screen.getAllByRole('button', { name: '' })
        await user.click(expandButtons[1])

        await waitFor(() => {
          expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
        })
        expect(screen.getByText('Grandchild 1-2')).toBeInTheDocument()
      })

      it('should show correct child counts at each level', async () => {
        const user = userEvent.setup()
        render(<RoleFormAccountHierarchyTree {...defaultProps} />)

        await expandNode(user, 0)

        await waitFor(() => {
          const childCountElements = screen.getAllByText(/2 children/)
          expect(childCountElements.length).toBeGreaterThan(0)
        })
      })
    })

    describe('Scenario 6: User searches for specific account', () => {
      it('should filter and auto-expand to show matching account', async () => {
        const user = userEvent.setup()
        render(<RoleFormAccountHierarchyTree {...defaultProps} />)

        const searchInput = screen.getByPlaceholderText('search-accounts')
        await user.type(searchInput, 'Grandchild 1-1')

        await waitFor(() => {
          expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
        })

        // Parent and child should also be visible
        expect(screen.getByText(/Parent Company/)).toBeInTheDocument()
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      it('should clear search and show all accounts', async () => {
        const user = userEvent.setup()
        render(<RoleFormAccountHierarchyTree {...defaultProps} />)

        const searchInput = screen.getByPlaceholderText('search-accounts')
        await user.type(searchInput, 'Grandchild')

        await waitFor(() => {
          expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
        })

        const clearButton = screen.getByTitle('Clear search')
        await user.click(clearButton)

        await waitFor(() => {
          expect(searchInput).toHaveValue('')
        })
      })
    })

    describe('Scenario 7: User handles accounts without permissions', () => {
      it('should disable accounts without create role permission', async () => {
        const user = userEvent.setup()
        const mixedPermissions = [
          {
            accountId: 1,
            behaviors: [CustomBehaviors.CreateRole],
            isLoading: false,
            isError: false,
            isSuccess: true,
            error: null,
          },
          {
            accountId: 2,
            behaviors: [CustomBehaviors.CreateRole],
            isLoading: false,
            isError: false,
            isSuccess: true,
            error: null,
          },
          {
            accountId: 3,
            behaviors: [], // No permission
            isLoading: false,
            isError: false,
            isSuccess: true,
            error: null,
          },
        ]

        render(
          <RoleFormAccountHierarchyTree
            {...defaultProps}
            accountUserBehaviorResults={mixedPermissions}
          />
        )

        await expandNode(user, 0)

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')
        const secondChildCheckbox = getCheckboxByAccountName('Child Account 2')
        expect(firstChildCheckbox).toBeEnabled() // Child Account 1 has permission
        expect(secondChildCheckbox).toBeDisabled() // Child Account 2 no permission
      })
    })

    describe('Scenario 8: Complete workflow with search, expand, and select', () => {
      it('should support full user workflow', async () => {
        const user = userEvent.setup()
        const onAccountsChange = jest.fn()

        render(
          <RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />
        )

        // Search for specific account
        const searchInput = screen.getByPlaceholderText('search-accounts')
        await user.type(searchInput, 'Child Account 1')

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        // Select the filtered account
        const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')
        await user.click(firstChildCheckbox)

        await waitFor(() => {
          expect(onAccountsChange).toHaveBeenCalled()
        })

        // Clear search
        const clearButton = screen.getByTitle('Clear search')
        await user.click(clearButton)

        await waitFor(() => {
          expect(searchInput).toHaveValue('')
        })

        // Verify selection persisted
        await waitFor(() => {
          expect(screen.getByText(/2 accounts/)).toBeInTheDocument()
        })
      })
    })
  })

  describe('Component Integration', () => {
    it('should maintain state across re-renders', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()

      const { rerender } = render(
        <RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />
      )

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')
      await user.click(firstChildCheckbox)

      await waitFor(() => {
        expect(onAccountsChange).toHaveBeenCalledWith([2])
      })

      // Rerender with same props
      rerender(
        <RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />
      )

      // Selection should persist
      expect(screen.getByText(/2 accounts/)).toBeInTheDocument()
    })

    it('should respond to prop changes', () => {
      const { rerender } = render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByText('select-child-accounts')).toBeInTheDocument()

      rerender(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="all-except" />)

      expect(screen.getByText('select-accounts-to-exclude')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper role attributes', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const parentCheckbox = getCheckboxByAccountName('Parent Company')
      expect(parentCheckbox).toBeInTheDocument()
      expect(parentCheckbox).toHaveAttribute('type', 'checkbox')
    })

    it('should have searchable text input', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      expect(searchInput).toHaveAttribute('type', 'text')
    })

    it('should have clickable buttons', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const selectAllButton = screen.getByText('select-all-accounts')
      const deselectAllButton = screen.getByText('deselect-all-accounts')

      expect(selectAllButton).toBeInTheDocument()
      expect(deselectAllButton).toBeInTheDocument()
    })

    it('should indicate disabled state for checkboxes', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const parentCheckbox = getCheckboxByAccountName('Parent Company')
      // Parent checkbox should be disabled
      expect(parentCheckbox).toBeDisabled()
    })
  })
})
