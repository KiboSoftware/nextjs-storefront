import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import RoleFormAccountHierarchyTree from './RoleFormAccountHierarchyTree'
import { CustomBehaviors } from '@/lib/constants'

import { B2BAccount } from '@/lib/gql/types'

// Mock data
const mockAccountsHierarchy: B2BAccount[] = [
  {
    id: 1,
    parentAccountId: null,
    companyOrOrganization: 'Parent Company',
    taxId: 'TAX001',
    isActive: true,
  } as B2BAccount,
  {
    id: 2,
    parentAccountId: 1,
    companyOrOrganization: 'Child Account 1',
    taxId: 'TAX002',
    isActive: true,
  } as B2BAccount,
  {
    id: 3,
    parentAccountId: 1,
    companyOrOrganization: 'Child Account 2',
    taxId: 'TAX003',
    isActive: true,
  } as B2BAccount,
  {
    id: 4,
    parentAccountId: 2,
    companyOrOrganization: 'Grandchild 1-1',
    taxId: 'TAX004',
    isActive: true,
  } as B2BAccount,
  {
    id: 5,
    parentAccountId: 2,
    companyOrOrganization: 'Grandchild 1-2',
    taxId: 'TAX005',
    isActive: true,
  } as B2BAccount,
  {
    id: 6,
    parentAccountId: 3,
    companyOrOrganization: 'Grandchild 2-1',
    taxId: 'TAX006',
    isActive: true,
  } as B2BAccount,
]

const mockAccountBehaviorResults = [
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

interface AccountBehaviorResult {
  accountId: number
  behaviors: number[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error: unknown
}

interface RoleFormAccountHierarchyTreeProps {
  parentAccount: string
  accountScope: string
  accounts?: B2BAccount[]
  selectedAccounts: number[]
  onAccountsChange: (accountIds: number[]) => void
  accountUserBehaviorResults?: AccountBehaviorResult[]
}

const defaultProps = {
  parentAccount: '1',
  accountScope: 'specific-child',
  accounts: mockAccountsHierarchy,
  selectedAccounts: [],
  onAccountsChange: jest.fn(),
  accountUserBehaviorResults: mockAccountBehaviorResults,
}

describe('RoleFormAccountHierarchyTree Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Stateful wrapper component for tests that need selection state management
  const StatefulWrapper: React.FC<Partial<RoleFormAccountHierarchyTreeProps>> = (props) => {
    const [selectedAccounts, setSelectedAccounts] = React.useState<number[]>(
      props.selectedAccounts || []
    )

    return (
      <RoleFormAccountHierarchyTree
        {...defaultProps}
        {...props}
        selectedAccounts={selectedAccounts}
        onAccountsChange={(ids) => {
          setSelectedAccounts(ids)
          props.onAccountsChange?.(ids)
        }}
      />
    )
  }

  // Helper function to expand tree nodes
  const expandNode = async (user: ReturnType<typeof userEvent.setup>, expandButtonIndex = 0) => {
    const expandButtons = screen.getAllByRole('button', { name: '' })
    const expandButton = expandButtons[expandButtonIndex]
    await user.click(expandButton)
  }

  // Helper function to get checkbox by account name
  // eslint-disable-next-line testing-library/no-node-access
  const getCheckboxByAccountName = (accountName: string): HTMLInputElement => {
    // Try to find checkbox by accessible name first (preferred Testing Library approach)
    try {
      return screen.getByRole('checkbox', {
        name: new RegExp(accountName),
        hidden: true,
      }) as HTMLInputElement
    } catch {
      // Fallback: get all checkboxes and match by associated text
      const allCheckboxes = screen.getAllByRole('checkbox', { hidden: true })

      // Get the paragraph element containing the account name
      const accountTexts = screen.getAllByText((content, element) => {
        return (element?.tagName === 'P' && element?.textContent?.includes(accountName)) || false
      })

      // Return the checkbox at the same index as the text (they're rendered in same order)
      // eslint-disable-next-line testing-library/no-node-access
      const allParagraphs = document.querySelectorAll('p')
      const index =
        accountTexts.length > 0
          ? Array.from(allParagraphs).indexOf(accountTexts[0] as HTMLParagraphElement)
          : -1

      if (index >= 0 && index < allCheckboxes.length) {
        return allCheckboxes[index] as HTMLInputElement
      }

      throw new Error(`Could not find checkbox for account: ${accountName}`)
    }
  }

  describe('Basic Rendering', () => {
    it('should render the component with parent account', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByText(/Parent Company/)).toBeInTheDocument()
      expect(screen.getByText(/\(parent\)/i)).toBeInTheDocument()
    })

    it('should render search input field', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByPlaceholderText('search-accounts')).toBeInTheDocument()
    })

    it('should render select and deselect all buttons', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByText('select-all-accounts')).toBeInTheDocument()
      expect(screen.getByText('deselect-all-accounts')).toBeInTheDocument()
    })

    it('should render account counter showing initial state', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByText('Role will be applied to 1 account')).toBeInTheDocument()
    })

    it('should render correct title based on accountScope', () => {
      const { rerender } = render(<RoleFormAccountHierarchyTree {...defaultProps} />)
      expect(screen.getByText('select-child-accounts')).toBeInTheDocument()

      rerender(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="all-except" />)
      expect(screen.getByText('select-accounts-to-exclude')).toBeInTheDocument()
    })
  })

  describe('Tree Expansion and Collapse', () => {
    it('should expand child accounts when clicking expand button', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      // Initially, child accounts should not be visible
      expect(screen.queryByText('Child Account 1')).not.toBeInTheDocument()

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })
      expect(screen.getByText('Child Account 2')).toBeInTheDocument()
    })

    it('should collapse child accounts when clicking collapse button', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      // Click again to collapse
      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.queryByText('Child Account 1')).not.toBeInTheDocument()
      })
    })

    it('should expand nested child accounts', async () => {
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

    it('should show child count for accounts with children', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      await expandNode(user, 0)

      await waitFor(() => {
        const childCountElements = screen.getAllByText(/2 children/)
        expect(childCountElements.length).toBeGreaterThan(0)
      })
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
      ]

      render(
        <RoleFormAccountHierarchyTree
          {...defaultProps}
          accountUserBehaviorResults={accountsWithoutPermission}
        />
      )

      await expandNode(user, 0)

      await waitFor(() => {
        const checkbox = getCheckboxByAccountName('Child Account 1')
        expect(checkbox).toBeDisabled()
      })
    })

    it('should enable checkbox for accounts with create role permission', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      await expandNode(user, 0)

      await waitFor(() => {
        const checkbox = getCheckboxByAccountName('Child Account 1')
        expect(checkbox).toBeEnabled()
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
    })

    it('should auto-expand parent nodes when searching', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, 'Grandchild 1-1')

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })
      expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
    })

    it('should show clear button when search has text', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, 'test')

      await waitFor(() => {
        expect(screen.getByTitle('Clear search')).toBeInTheDocument()
      })
    })

    it('should clear search when clicking clear button', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, 'Child Account 1')

      await waitFor(() => {
        expect(searchInput).toHaveValue('Child Account 1')
      })

      const clearButton = screen.getByTitle('Clear search')
      await user.click(clearButton)

      await waitFor(() => {
        expect(searchInput).toHaveValue('')
      })
    })

    it('should filter out accounts that do not match search query', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, 'Child Account 1')

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })
      expect(screen.queryByText('Child Account 2')).not.toBeInTheDocument()
    })

    it('should search case-insensitively', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, 'CHILD ACCOUNT')

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })
      expect(screen.getByText('Child Account 2')).toBeInTheDocument()
    })

    it('should show parent if child matches search', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, 'Grandchild 1-1')

      await waitFor(() => {
        expect(screen.getByText(/Parent Company/)).toBeInTheDocument()
      })
      expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
    })
  })

  describe('Account Selection', () => {
    it('should call onAccountsChange when selecting an account', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()
      render(<RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />)

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const checkbox = getCheckboxByAccountName('Child Account 1')
      await user.click(checkbox)

      expect(onAccountsChange).toHaveBeenCalledWith([2])
    })

    it('should call onAccountsChange when deselecting an account', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()
      render(
        <RoleFormAccountHierarchyTree
          {...defaultProps}
          selectedAccounts={[2]}
          onAccountsChange={onAccountsChange}
        />
      )

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const checkbox = getCheckboxByAccountName('Child Account 1')
      await user.click(checkbox)

      expect(onAccountsChange).toHaveBeenCalledWith([])
    })

    it('should show selected state for pre-selected accounts', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} selectedAccounts={[2, 3]} />)

      await expandNode(user, 0)

      await waitFor(() => {
        const checkbox1 = getCheckboxByAccountName('Child Account 1')
        expect(checkbox1).toBeChecked()
      })
      const checkbox2 = getCheckboxByAccountName('Child Account 2')
      expect(checkbox2).toBeChecked()
    })

    it('should allow multiple account selections', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()
      render(<RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />)

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const checkbox1 = getCheckboxByAccountName('Child Account 1')
      await user.click(checkbox1)

      expect(onAccountsChange).toHaveBeenCalledWith([2])

      // Simulate selecting second account
      const checkbox2 = getCheckboxByAccountName('Child Account 2')
      await user.click(checkbox2)

      expect(onAccountsChange).toHaveBeenCalledWith([3])
    })
  })

  describe('Select All / Deselect All Functionality', () => {
    it('should select all accounts when clicking select all button', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()
      render(<RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />)

      const selectAllButton = screen.getByText('select-all-accounts')
      await user.click(selectAllButton)

      const calledWith = onAccountsChange.mock.calls[0][0]
      expect(calledWith).toHaveLength(5)
      expect(calledWith.sort()).toEqual([2, 3, 4, 5, 6])
    })

    it('should deselect all accounts when clicking deselect all button', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()
      render(
        <RoleFormAccountHierarchyTree
          {...defaultProps}
          selectedAccounts={[2, 3, 4]}
          onAccountsChange={onAccountsChange}
        />
      )

      const deselectAllButton = screen.getByText('deselect-all-accounts')
      await user.click(deselectAllButton)

      expect(onAccountsChange).toHaveBeenCalledWith([])
    })

    it('should expand all nodes when selecting all accounts', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const selectAllButton = screen.getByText('select-all-accounts')
      await user.click(selectAllButton)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })
      expect(screen.getByText('Child Account 2')).toBeInTheDocument()
      expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
      expect(screen.getByText('Grandchild 1-2')).toBeInTheDocument()
      expect(screen.getByText('Grandchild 2-1')).toBeInTheDocument()
    })

    it('should collapse all nodes when deselecting all accounts', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} selectedAccounts={[2, 3]} />)

      // First expand to show some accounts
      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const deselectAllButton = screen.getByText('deselect-all-accounts')
      await user.click(deselectAllButton)

      await waitFor(() => {
        expect(screen.queryByText('Child Account 1')).not.toBeInTheDocument()
      })
    })

    it('should only select accounts with create role permission when selecting all', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()
      const mixedPermissionsBehaviors = [
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
        {
          accountId: 5,
          behaviors: [],
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

      render(
        <RoleFormAccountHierarchyTree
          {...defaultProps}
          accountUserBehaviorResults={mixedPermissionsBehaviors}
          onAccountsChange={onAccountsChange}
        />
      )

      const selectAllButton = screen.getByText('select-all-accounts')
      await user.click(selectAllButton)

      // Should only select accounts 2, 4, 6 (those with permission)
      expect(onAccountsChange).toHaveBeenCalledWith([2, 4, 6])
    })
  })

  describe('Account Counter Display', () => {
    it('should show singular form when one account', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByText(/Role will be applied to 1 account/)).toBeInTheDocument()
    })

    it('should show plural form when multiple accounts selected', async () => {
      const user = userEvent.setup()
      render(<StatefulWrapper accountScope="specific-child" />)

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
      render(<StatefulWrapper accountScope="specific-child" />)

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const checkboxInputs = screen.getAllByRole('checkbox')
      await user.click(checkboxInputs[1])

      await waitFor(() => {
        expect(screen.getByText(/including parent/)).toBeInTheDocument()
      })
    })

    it('should not include parent text when single account', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.queryByText(/including parent/)).not.toBeInTheDocument()
    })
  })

  describe('Account Scope: specific-child', () => {
    it('should display correct initial count (parent only)', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="specific-child" />)

      expect(screen.getByText(/Role will be applied to 1 account/)).toBeInTheDocument()
    })

    it('should update count when selecting child accounts', async () => {
      const user = userEvent.setup()
      render(<StatefulWrapper accountScope="specific-child" />)

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const checkbox = getCheckboxByAccountName('Child Account 1')
      await user.click(checkbox)

      await waitFor(() => {
        expect(screen.getByText(/2 accounts/)).toBeInTheDocument()
      })
    })

    it('should count parent + selected children with permission', async () => {
      const user = userEvent.setup()
      render(<StatefulWrapper accountScope="specific-child" />)

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const checkbox1 = getCheckboxByAccountName('Child Account 1')
      const checkbox2 = getCheckboxByAccountName('Child Account 2')

      await user.click(checkbox1)
      await user.click(checkbox2)

      await waitFor(() => {
        expect(screen.getByText(/Role will be applied to 3 accounts/)).toBeInTheDocument()
      })
    })
  })

  describe('Account Scope: all-except', () => {
    it('should display correct initial count (all accounts)', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="all-except" />)

      // Should show parent (1) + all children with permission (5) = 6 total
      expect(screen.getByText(/Role will be applied to 6 accounts/)).toBeInTheDocument()
    })

    it('should decrease count when selecting accounts to exclude', async () => {
      const user = userEvent.setup()
      render(<StatefulWrapper accountScope="all-except" />)

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      const checkbox = getCheckboxByAccountName('Child Account 1')
      await user.click(checkbox)

      await waitFor(() => {
        expect(screen.getByText(/Role will be applied to 5 accounts/)).toBeInTheDocument()
      })
    })

    it('should only count accounts with permission', async () => {
      const mixedPermissionsBehaviors = [
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
          accountScope="all-except"
          accountUserBehaviorResults={mixedPermissionsBehaviors}
        />
      )

      // Should count parent (1) + accounts with permission (2, 4) = 3 total
      expect(screen.getByText(/Role will be applied to 3 accounts/)).toBeInTheDocument()
    })
  })

  describe('Scenario-Based Tests', () => {
    describe('Scenario 1: User selects specific child accounts only', () => {
      it('should allow selecting individual child accounts without parent', async () => {
        const user = userEvent.setup()
        const onAccountsChange = jest.fn()

        render(
          <StatefulWrapper accountScope="specific-child" onAccountsChange={onAccountsChange} />
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
        expect(screen.getByText(/Role will be applied to 2 accounts/)).toBeInTheDocument()
      })

      it('should show parent is always included in count', async () => {
        const user = userEvent.setup()
        render(<StatefulWrapper accountScope="specific-child" />)

        // Even with no selections, parent is counted
        expect(screen.getByText(/Role will be applied to 1 account/)).toBeInTheDocument()

        await expandNode(user, 0)

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        const checkbox = getCheckboxByAccountName('Child Account 1')
        await user.click(checkbox)

        await waitFor(() => {
          expect(screen.getByText(/Role will be applied to 2 accounts/)).toBeInTheDocument()
        })
        expect(screen.getByText(/including parent/)).toBeInTheDocument()
      })
    })

    describe('Scenario 2: User selects multiple child accounts', () => {
      it('should allow selecting and deselecting multiple accounts', async () => {
        const user = userEvent.setup()
        const onAccountsChange = jest.fn()

        render(<StatefulWrapper onAccountsChange={onAccountsChange} />)

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

        // Select another child account
        await user.click(secondChildCheckbox)

        await waitFor(() => {
          expect(onAccountsChange).toHaveBeenCalledWith([2, 3])
        })
      })

      it('should update counter for multiple selections', async () => {
        const user = userEvent.setup()
        render(<StatefulWrapper />)

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

    describe('Scenario 3: User excludes specific accounts (all-except mode)', () => {
      it('should allow excluding accounts and see counter decrease', async () => {
        const user = userEvent.setup()
        render(<StatefulWrapper accountScope="all-except" />)

        expect(screen.getByText(/6 accounts/)).toBeInTheDocument()

        await expandNode(user, 0)

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        const firstChildCheckbox = getCheckboxByAccountName('Child Account 1')

        // Select first child account (to exclude it)
        await user.click(firstChildCheckbox)

        await waitFor(() => {
          expect(screen.getByText(/5 accounts/)).toBeInTheDocument()
        })
      })

      it('should show correct title for exclude mode', () => {
        render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="all-except" />)

        expect(screen.getByText('select-accounts-to-exclude')).toBeInTheDocument()
      })

      it('should start with all accounts selected in exclude mode', () => {
        render(<RoleFormAccountHierarchyTree {...defaultProps} accountScope="all-except" />)

        // Should show 6 accounts (parent + 5 children with permission)
        expect(screen.getByText(/6 accounts/)).toBeInTheDocument()
      })
    })

    describe('Scenario 4: User searches for specific accounts', () => {
      it('should filter and show only matching accounts', async () => {
        const user = userEvent.setup()
        render(<RoleFormAccountHierarchyTree {...defaultProps} />)

        const searchInput = screen.getByPlaceholderText('search-accounts')
        await user.type(searchInput, 'Grandchild 1-1')

        await waitFor(() => {
          expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
        })
        expect(screen.queryByText('Grandchild 1-2')).not.toBeInTheDocument()
      })

      it('should maintain selection when filtering', async () => {
        const user = userEvent.setup()
        render(<StatefulWrapper />)

        await expandNode(user, 0)

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        const checkbox = getCheckboxByAccountName('Child Account 1')
        await user.click(checkbox)

        const searchInput = screen.getByPlaceholderText('search-accounts')
        await user.type(searchInput, 'Child Account 1')

        await waitFor(() => {
          const filteredCheckbox = getCheckboxByAccountName('Child Account 1')
          expect(filteredCheckbox).toBeChecked()
        })
      })

      it('should clear filter and show all accounts', async () => {
        const user = userEvent.setup()
        render(<RoleFormAccountHierarchyTree {...defaultProps} />)

        const searchInput = screen.getByPlaceholderText('search-accounts')
        await user.type(searchInput, 'Child Account 1')

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        const clearButton = screen.getByTitle('Clear search')
        await user.click(clearButton)

        await waitFor(() => {
          expect(searchInput).toHaveValue('')
        })

        // Parent should still be visible after clearing
        expect(screen.getByText(/Parent Company/)).toBeInTheDocument()
      })
    })

    describe('Scenario 5: User works with nested hierarchies', () => {
      it('should show grandchild accounts when expanding nested levels', async () => {
        const user = userEvent.setup()
        render(<RoleFormAccountHierarchyTree {...defaultProps} />)

        // Expand parent level
        await expandNode(user, 0)

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        // Expand child level to show grandchildren
        const expandButtons = screen.getAllByRole('button', { name: '' })
        await user.click(expandButtons[1])

        await waitFor(() => {
          expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
        })
        expect(screen.getByText('Grandchild 1-2')).toBeInTheDocument()
      })

      it('should allow selecting grandchild accounts', async () => {
        const user = userEvent.setup()
        const onAccountsChange = jest.fn()
        render(
          <RoleFormAccountHierarchyTree {...defaultProps} onAccountsChange={onAccountsChange} />
        )

        await expandNode(user, 0)

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        const expandButtons = screen.getAllByRole('button', { name: '' })
        await user.click(expandButtons[1])

        await waitFor(() => {
          expect(screen.getByText('Grandchild 1-1')).toBeInTheDocument()
        })

        const grandchildCheckbox = getCheckboxByAccountName('Grandchild 1-1')
        await user.click(grandchildCheckbox)

        expect(onAccountsChange).toHaveBeenCalledWith([4])
      })

      it('should show correct child count indicators', async () => {
        const user = userEvent.setup()
        render(<RoleFormAccountHierarchyTree {...defaultProps} />)

        await expandNode(user, 0)

        await waitFor(() => {
          const childCountElements = screen.getAllByText(/children/)
          expect(childCountElements.length).toBeGreaterThan(0)
        })
      })
    })

    describe('Scenario 6: User with mixed permissions', () => {
      it('should disable accounts without permission but enable others', async () => {
        const user = userEvent.setup()
        const mixedPermissionsBehaviors = [
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
            accountUserBehaviorResults={mixedPermissionsBehaviors}
          />
        )

        await expandNode(user, 0)

        await waitFor(() => {
          const enabledCheckbox = getCheckboxByAccountName('Child Account 1')
          expect(enabledCheckbox).toBeEnabled()
        })
        const disabledCheckbox = getCheckboxByAccountName('Child Account 2')
        expect(disabledCheckbox).toBeDisabled()
      })

      it('should only select accounts with permission during select all', async () => {
        const user = userEvent.setup()
        const onAccountsChange = jest.fn()
        const mixedPermissionsBehaviors = [
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
            behaviors: [],
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
            accountUserBehaviorResults={mixedPermissionsBehaviors}
            onAccountsChange={onAccountsChange}
          />
        )

        const selectAllButton = screen.getByText('select-all-accounts')
        await user.click(selectAllButton)

        // Should only include accounts 2 and 4 (those with permission)
        expect(onAccountsChange).toHaveBeenCalledWith([2, 4])
      })
    })

    describe('Scenario 7: User navigates complex tree structure', () => {
      it('should maintain expansion state when selecting accounts', async () => {
        const user = userEvent.setup()
        render(<StatefulWrapper />)

        // Expand parent
        await expandNode(user, 0)

        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        // Select an account
        const checkbox = getCheckboxByAccountName('Child Account 1')
        await user.click(checkbox)

        // Child should still be visible
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      it('should handle rapid expansion and collapse', async () => {
        const user = userEvent.setup()
        render(<RoleFormAccountHierarchyTree {...defaultProps} />)

        // Expand
        await expandNode(user, 0)
        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })

        // Collapse
        await expandNode(user, 0)
        await waitFor(() => {
          expect(screen.queryByText('Child Account 1')).not.toBeInTheDocument()
        })

        // Expand again
        await expandNode(user, 0)
        await waitFor(() => {
          expect(screen.getByText('Child Account 1')).toBeInTheDocument()
        })
      })
    })

    describe('Scenario 8: User workflow with search and selection', () => {
      it('should support full user workflow', async () => {
        const user = userEvent.setup()
        const onAccountsChange = jest.fn()

        render(<StatefulWrapper onAccountsChange={onAccountsChange} />)

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
          expect(screen.getByText(/Role will be applied to 2 accounts/)).toBeInTheDocument()
        })
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty accounts array', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} accounts={[]} />)

      expect(screen.getByPlaceholderText('search-accounts')).toBeInTheDocument()
    })

    it('should handle undefined accounts', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} accounts={undefined} />)

      expect(screen.getByPlaceholderText('search-accounts')).toBeInTheDocument()
    })

    it('should handle accounts without behavior results', async () => {
      const user = userEvent.setup()
      render(
        <RoleFormAccountHierarchyTree {...defaultProps} accountUserBehaviorResults={undefined} />
      )

      await expandNode(user, 0)

      await waitFor(() => {
        const checkbox = getCheckboxByAccountName('Child Account 1')
        expect(checkbox).toBeDisabled()
      })
    })

    it('should handle account without companyOrOrganization', async () => {
      const user = userEvent.setup()
      const accountsWithoutName = [
        {
          id: 1,
          parentAccountId: null,
          companyOrOrganization: 'Parent Company',
        } as B2BAccount,
        {
          id: 2,
          parentAccountId: 1,
          companyOrOrganization: '',
        } as B2BAccount,
      ]

      render(<RoleFormAccountHierarchyTree {...defaultProps} accounts={accountsWithoutName} />)

      await expandNode(user, 0)

      // Should render without crashing
      expect(screen.getByText(/Parent Company/)).toBeInTheDocument()
    })

    it('should handle search with special characters', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, '!@#$%')

      // Should not crash
      expect(searchInput).toHaveValue('!@#$%')
    })

    it('should handle search with only whitespace', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      await user.type(searchInput, '   ')

      // Should show all accounts
      expect(screen.getByText(/Parent Company/)).toBeInTheDocument()
    })
  })

  describe('Component Integration', () => {
    it('should maintain state across re-renders', async () => {
      const user = userEvent.setup()
      const onAccountsChange = jest.fn()

      const { rerender } = render(<StatefulWrapper onAccountsChange={onAccountsChange} />)

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
      rerender(<StatefulWrapper onAccountsChange={onAccountsChange} />)

      // Selection should persist
      expect(screen.getByText(/Role will be applied to 2 accounts/)).toBeInTheDocument()
    })

    it('should respond to external selectedAccounts changes', async () => {
      const user = userEvent.setup()
      const { rerender } = render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      await expandNode(user, 0)

      await waitFor(() => {
        expect(screen.getByText('Child Account 1')).toBeInTheDocument()
      })

      // Update with new selectedAccounts from parent
      rerender(<RoleFormAccountHierarchyTree {...defaultProps} selectedAccounts={[2, 3]} />)

      await waitFor(() => {
        const checkbox1 = getCheckboxByAccountName('Child Account 1')
        expect(checkbox1).toBeChecked()
      })
      const checkbox2 = getCheckboxByAccountName('Child Account 2')
      expect(checkbox2).toBeChecked()
    })

    it('should update counter when selectedAccounts prop changes', () => {
      const { rerender } = render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      expect(screen.getByText(/Role will be applied to 1 account/)).toBeInTheDocument()

      rerender(<RoleFormAccountHierarchyTree {...defaultProps} selectedAccounts={[2, 3, 4]} />)

      expect(screen.getByText(/Role will be applied to 4 accounts/)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible checkbox labels', async () => {
      const user = userEvent.setup()
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      await expandNode(user, 0)

      await waitFor(() => {
        const checkbox = getCheckboxByAccountName('Child Account 1')
        expect(checkbox).toHaveAccessibleName(/Child Account 1/)
      })
    })

    it('should have accessible search input', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const searchInput = screen.getByPlaceholderText('search-accounts')
      expect(searchInput).toHaveAttribute('type', 'text')
    })

    it('should have accessible buttons', () => {
      render(<RoleFormAccountHierarchyTree {...defaultProps} />)

      const selectAllButton = screen.getByText('select-all-accounts')
      const deselectAllButton = screen.getByText('deselect-all-accounts')

      expect(selectAllButton).toHaveAttribute('type', 'button')
      expect(deselectAllButton).toHaveAttribute('type', 'button')
    })
  })
})
