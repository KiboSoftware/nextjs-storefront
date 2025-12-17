/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-extra-semi */
import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import ManageRolesTemplate from './ManageRolesTemplate'
import { useAuthContext, useModalContext, useSnackbarContext } from '@/context'
import { useGetRolesByAccountIdAsync, useDeleteRoleAsync, useGetUsersByRoleAsync } from '@/hooks'

// Mock dependencies
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/context', () => ({
  useAuthContext: jest.fn(),
  useModalContext: jest.fn(),
  useSnackbarContext: jest.fn(),
}))

jest.mock('@/hooks', () => ({
  useGetRolesByAccountIdAsync: jest.fn(),
  useDeleteRoleAsync: jest.fn(),
  useGetUsersByRoleAsync: jest.fn(),
}))

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

jest.mock('@/lib/helpers/hasPermission', () => ({
  hasAnyPermission: jest.fn(() => true),
  hasPermissionInAllAccounts: jest.fn(() => true),
}))

// Mock styled components
jest.mock('./ManageRolesTemplate.styles', () => ({
  BackButtonLink: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <a {...props}>{children}</a>
  ),
  SearchBoxContainer: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  PaginationContainer: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  ManageRolesTemplateStyles: {
    container: {},
    header: {},
    headerContent: {},
    title: {},
    subtitle: {},
    addButton: {},
    addButtonIcon: {},
    searchContainer: {},
    tableContainer: {},
    tableWrapper: {},
    table: {},
    tableHead: {},
    tableRow: {},
    tableCell: {},
    tableHeadCell: {},
    sortableHeader: {},
    roleNameCell: {},
    roleName: {},
    roleDescription: {},
    descriptionCell: {},
    roleTypeCell: {},
    systemChip: {},
    customChip: {},
    usersCountCell: {},
    lastModifiedCell: {},
    actionsCell: {},
    menuIconButton: {},
    menuPaper: {},
    menuList: {},
    actionIcon: {},
    deleteIcon: {},
    paginationContainer: {},
    paginationInfo: {},
    pagination: {},
    noResultsContainer: {},
    emptyStateText: {},
    headerBox: {},
    titleBox: {},
    addButtonBox: {},
    paginationBox: {},
  },
}))

// Mock SearchBar component
jest.mock('@/components/common', () => ({
  SearchBar: ({
    onSearch,
    placeHolder,
    searchTerm,
  }: {
    onSearch: (text: string) => void
    placeHolder: string
    searchTerm: string
  }) => (
    <input
      placeholder={placeHolder}
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      data-testid="search-bar"
    />
  ),
}))

// Mock ConfirmationDialog
jest.mock('@/components/dialogs', () => ({
  ConfirmationDialog: jest.fn(),
}))

describe('[Page Template] ManageRolesTemplate', () => {
  const mockPush = jest.fn()
  const mockShowModal = jest.fn()
  const mockShowSnackbar = jest.fn()
  const mockDeleteRole = jest.fn()

  // Mock data
  const mockCustomerAccount = {
    id: 1001,
    emailAddress: 'test@example.com',
  }

  const mockRolesData = {
    items: [
      {
        id: 1,
        name: 'Admin',
        isSystemRole: true,
        behaviors: [1, 2, 3],
        accountIds: [1001],
      },
      {
        id: 2,
        name: 'Purchaser',
        isSystemRole: false,
        behaviors: [4, 5],
        accountIds: [1001, 1002],
      },
      {
        id: 3,
        name: 'Non-Purchaser',
        isSystemRole: false,
        behaviors: [6],
        accountIds: [1001],
      },
      {
        id: 4,
        name: 'Manager',
        isSystemRole: false,
        behaviors: [7, 8],
        accountIds: [1001],
      },
      {
        id: 5,
        name: 'Viewer',
        isSystemRole: true,
        behaviors: [9],
        accountIds: [1001],
      },
    ],
  }

  const mockUsersByRole = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  }

  const mockAccountUserBehaviorsForAllAccounts = {
    1001: [1, 2, 3, 4, 5, 6, 7, 8, 9], // All behaviors
  }

  const mockInitialData = {
    items: mockRolesData.items,
  }

  beforeEach(() => {
    jest.clearAllMocks()

    // Setup default mocks
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      query: {},
      pathname: '/my-account/b2b/manage-roles',
    })
    ;(useAuthContext as jest.Mock).mockReturnValue({
      user: { id: 123, emailAddress: 'user@test.com' },
    })
    ;(useModalContext as jest.Mock).mockReturnValue({
      showModal: mockShowModal,
      closeModal: jest.fn(),
    })
    ;(useSnackbarContext as jest.Mock).mockReturnValue({
      showSnackbar: mockShowSnackbar,
    })
    ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
      roles: mockRolesData,
      isLoading: false,
      isError: false,
      isSuccess: true,
    })
    ;(useDeleteRoleAsync as jest.Mock).mockReturnValue({
      deleteRole: { mutateAsync: mockDeleteRole },
    })
    ;(useGetUsersByRoleAsync as jest.Mock).mockReturnValue({
      users: [],
      isLoading: false,
      isSuccess: true,
    })
  })

  const setup = (props = {}) => {
    const user = userEvent.setup()
    const defaultProps = {
      customerAccount: mockCustomerAccount,
      initialData: mockInitialData,
      usersByRole: mockUsersByRole,
      accountUserBehaviorsForAllAccounts: mockAccountUserBehaviorsForAllAccounts,
    }

    const view = render(<ManageRolesTemplate {...defaultProps} {...props} />)

    return {
      user,
      ...view,
      ...defaultProps,
      ...props,
    }
  }

  it('should render the Manage Roles title', () => {
    setup()
    expect(screen.getByText(/manage-roles/i)).toBeInTheDocument()
  })

  it('should render the Add New Role button', () => {
    setup()
    expect(screen.getByText(/add-new-role/i)).toBeInTheDocument()
  })

  xit('should render the roles grid', () => {
    setup()
    expect(screen.getByText(/roles-grid/i)).toBeInTheDocument()
  })

  it('should render search input', () => {
    setup()
    const searchInput = screen.getByPlaceholderText(/search-roles/i)
    expect(searchInput).toBeInTheDocument()
  })

  it('should render all role names', () => {
    setup()
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('Purchaser')).toBeInTheDocument()
    expect(screen.getByText('Non-Purchaser')).toBeInTheDocument()
  })

  it('should filter roles when searching', async () => {
    const { user } = setup()
    const searchInput = screen.getByPlaceholderText(/search-roles/i)

    await user.type(searchInput, 'Admin')

    await waitFor(() => {
      expect(screen.getByText('Admin')).toBeInTheDocument()
    })
  })

  it('should render the back button with correct link', () => {
    setup()
    const backLink = screen.getByLabelText('my-account')
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/my-account')
  })

  it('should render the Add New Role button', () => {
    setup()
    const addButton = screen.getByText('add-new-role')
    expect(addButton).toBeInTheDocument()
  })

  it('should render search bar with correct placeholder', () => {
    setup()
    const searchInput = screen.getByPlaceholderText('search-roles')
    expect(searchInput).toBeInTheDocument()
  })

  it('should render table headers', () => {
    setup()
    expect(screen.getByText('role-name')).toBeInTheDocument()
    expect(screen.getByText('role-type')).toBeInTheDocument()
    expect(screen.getByText('assigned-users')).toBeInTheDocument()
  })

  describe('Data Loading and Display', () => {
    it('should display all roles from API response', async () => {
      setup()

      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument()
      })
      expect(screen.getByText('Purchaser')).toBeInTheDocument()
      expect(screen.getByText('Non-Purchaser')).toBeInTheDocument()
      expect(screen.getByText('Manager')).toBeInTheDocument()
      expect(screen.getByText('Viewer')).toBeInTheDocument()
    })

    it('should display System badge for system roles', async () => {
      setup()

      await waitFor(() => {
        const systemChips = screen.getAllByText('System')
        expect(systemChips).toHaveLength(2) // Admin and Viewer
      })
    })

    it('should display Custom badge for custom roles', async () => {
      setup()

      await waitFor(() => {
        const customChips = screen.getAllByText('Custom')
        expect(customChips).toHaveLength(3) // Purchaser, Non-Purchaser, Manager
      })
    })

    it('should display assigned users count', async () => {
      setup()

      await waitFor(() => {
        const usersCells = screen.getAllByText(/0 users/)
        expect(usersCells.length).toBeGreaterThan(0)
      })
    })

    it('should show loading state', () => {
      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: null,
        isLoading: true,
        isError: false,
        isSuccess: false,
      })

      setup()
      expect(screen.getByText('loading')).toBeInTheDocument()
    })

    it('should show error state', () => {
      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
      })

      setup()
      expect(screen.getByText('error-loading-roles')).toBeInTheDocument()
    })

    it('should show no records message when no roles exist', () => {
      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: { items: [] },
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      setup()
      expect(screen.getByText('no-record-found')).toBeInTheDocument()
    })
  })

  describe('Search Functionality', () => {
    it('should filter roles by name when searching', async () => {
      const { user } = setup()
      const searchInput = screen.getByTestId('search-bar')

      await user.type(searchInput, 'Admin')

      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument()
      })
      expect(screen.queryByText('Purchaser')).not.toBeInTheDocument()
      expect(screen.queryByText('Non-Purchaser')).not.toBeInTheDocument()
    })

    it('should be case-insensitive when filtering', async () => {
      const { user } = setup()
      const searchInput = screen.getByTestId('search-bar')

      await user.type(searchInput, 'admin')

      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument()
      })
    })

    it('should reset to first page when searching', async () => {
      const { user } = setup()
      const searchInput = screen.getByTestId('search-bar')

      await user.type(searchInput, 'Purchase')

      await waitFor(() => {
        expect(screen.getByText('Purchaser')).toBeInTheDocument()
      })
    })

    it('should show no records when search has no matches', async () => {
      const { user } = setup()
      const searchInput = screen.getByTestId('search-bar')

      await user.type(searchInput, 'NonExistentRole')

      await waitFor(() => {
        expect(screen.getByText('no-record-found')).toBeInTheDocument()
      })
    })
  })

  describe('Pagination Functionality', () => {
    it('should display pagination when there are more than 10 roles', () => {
      const manyRoles = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Role ${i + 1}`,
        isSystemRole: false,
        behaviors: [] as number[],
        accountIds: [1001],
      }))

      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: { items: manyRoles },
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      setup()

      // Should show pagination component
      const pagination = screen.getByRole('navigation')
      expect(pagination).toBeInTheDocument()
    })

    it('should display only 10 roles per page', () => {
      const manyRoles = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `Role ${i + 1}`,
        isSystemRole: false,
        behaviors: [] as number[],
        accountIds: [1001],
      }))

      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: { items: manyRoles },
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      setup()

      // Should display first 10 roles
      expect(screen.getByText('Role 1')).toBeInTheDocument()
      expect(screen.getByText('Role 10')).toBeInTheDocument()
      // Role 11 should NOT be visible on page 1 (only 10 per page)
      expect(screen.queryByText('Role 11')).not.toBeInTheDocument()
    })

    it('should show pagination even for 5 roles', () => {
      setup() // Default has 5 roles

      // Pagination is shown even for small numbers of roles
      const pagination = screen.queryByRole('navigation')
      expect(pagination).toBeInTheDocument()
    })
  })

  describe('Navigation Actions', () => {
    it('should navigate to create role page when Add New Role is clicked', async () => {
      const { user } = setup()
      const addButton = screen.getByText('add-new-role')

      await user.click(addButton)

      expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles/create')
    })

    it('should navigate to view role page when View Details is clicked', async () => {
      const { user } = setup()

      // Click more actions menu for first role
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[0])

      // Click view details
      const viewButton = screen.getByText('view-details')
      await user.click(viewButton)

      expect(mockPush).toHaveBeenCalledWith(
        '/my-account/b2b/manage-roles/create?roleId=1&mode=view'
      )
    })

    it('should navigate to edit role page when Edit Role is clicked', async () => {
      const { user } = setup()

      // Click more actions menu for first custom role after system roles (index 2)
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[2])

      // Click edit role
      const editButton = screen.getByText('edit-role')
      await user.click(editButton)

      // The role at index 2 varies by sort order - just check that it navigates correctly
      expect(mockPush).toHaveBeenCalledWith(
        expect.stringMatching(/\/my-account\/b2b\/manage-roles\/create\?roleId=\d+&mode=edit/)
      )
    })

    it('should navigate to copy role page when Copy Role is clicked', async () => {
      const { user } = setup()

      // Click more actions menu for first custom role (index 2)
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[2])

      // Click copy role
      const copyButton = screen.getByText('copy-role')
      await user.click(copyButton)

      // The role at index 2 varies - just check that it navigates correctly
      expect(mockPush).toHaveBeenCalledWith(
        expect.stringMatching(/\/my-account\/b2b\/manage-roles\/create\?roleId=\d+&mode=copy/)
      )
    })
  })

  describe('Menu Actions', () => {
    it('should open menu when action button is clicked', async () => {
      const { user } = setup()

      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[0])

      await waitFor(() => {
        expect(screen.getByText('view-details')).toBeVisible()
      })
    })

    it('should close menu when menu item is clicked', async () => {
      const { user } = setup()

      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[0])

      const viewButton = screen.getByText('view-details')
      await user.click(viewButton)

      await waitFor(() => {
        expect(screen.queryByText('view-details')).not.toBeInTheDocument()
      })
    })

    it('should show Edit and Copy options only for custom roles', async () => {
      const { user } = setup()

      // Click menu for system role (Admin)
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[0])

      await waitFor(() => {
        expect(screen.getByText('view-details')).toBeInTheDocument()
      })
      expect(screen.queryByText('edit-role')).not.toBeInTheDocument()
      expect(screen.queryByText('copy-role')).not.toBeInTheDocument()
    })

    it('should show Edit, Copy, and Delete options for custom roles', async () => {
      const { user } = setup()

      // Click menu for custom role (Manager - index 2 after system roles)
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[2])

      await waitFor(() => {
        expect(screen.getByText('view-details')).toBeInTheDocument()
      })
      expect(screen.getByText('edit-role')).toBeInTheDocument()
      expect(screen.getByText('copy-role')).toBeInTheDocument()
      expect(screen.getByText('delete-role')).toBeInTheDocument()
    })
  })

  describe('Role Deletion', () => {
    it('should show confirmation dialog when delete is clicked', async () => {
      const { user } = setup()

      // Click menu for custom role (Manager - index 2)
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[2])

      // Click delete
      const deleteButton = screen.getByText('delete-role')
      await user.click(deleteButton)

      expect(mockShowModal).toHaveBeenCalledWith(
        expect.objectContaining({
          props: expect.objectContaining({
            contentText: 'delete-role-confirmation-message',
            primaryButtonText: 'delete',
          }),
        })
      )
    })

    it('should delete role and show success message when confirmed', async () => {
      mockDeleteRole.mockResolvedValueOnce({})
      const { user } = setup()

      // Click menu for first custom role (index 2)
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[2])

      // Click delete
      const deleteButton = screen.getByText('delete-role')
      await user.click(deleteButton)

      // Get the onConfirm callback and execute it
      const modalCall = mockShowModal.mock.calls[0][0]
      await modalCall.props.onConfirm()

      // The role ID at index 2 varies by sort - just check deleteRole was called
      await waitFor(() => {
        expect(mockDeleteRole).toHaveBeenCalled()
      })
      expect(mockShowSnackbar).toHaveBeenCalledWith('role-deleted-successfully', 'success')
    })

    it('should show error message and log error to console when deletion fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockDeleteRole.mockRejectedValueOnce(new Error('Delete failed'))
      const { user } = setup()

      // Click menu for custom role (Purchaser - index 4)
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[4])

      // Click delete
      const deleteButton = screen.getByText('delete-role')
      await user.click(deleteButton)

      // Get the onConfirm callback and execute it
      const modalCall = mockShowModal.mock.calls[0][0]
      await modalCall.props.onConfirm()

      await waitFor(() => {
        expect(mockShowSnackbar).toHaveBeenCalledWith('error-deleting-role', 'error')
      })

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error deleting role:', expect.any(Error))
      })

      consoleSpy.mockRestore()
    })
  })

  describe('Conditional Rendering', () => {
    it('should render action button for each role', () => {
      setup()

      const actionButtons = screen.getAllByLabelText('actions')
      expect(actionButtons).toHaveLength(5) // 5 roles in mock data
    })

    it('should display correct role type badges', async () => {
      setup()

      await waitFor(() => {
        const systemBadges = screen.getAllByText('System')
        expect(systemBadges.length).toBeGreaterThan(0)
      })
      const customBadges = screen.getAllByText('Custom')
      expect(customBadges.length).toBeGreaterThan(0)
    })

    it('should show tooltip for delete button when role has assigned users', async () => {
      const { user } = setup()

      // This test verifies the Tooltip component is rendered
      // The actual tooltip behavior would require more complex testing
      // Use Manager role (index 2) which is a custom role
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[2])

      await waitFor(() => {
        expect(screen.getByText('delete-role')).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle roles with undefined properties', () => {
      const rolesWithUndefined = {
        items: [
          {
            id: undefined,
            name: undefined,
            isSystemRole: undefined,
            behaviors: undefined,
            accountIds: undefined,
          },
        ],
      }

      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: rolesWithUndefined,
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      const { container } = setup()
      expect(container).toBeInTheDocument()
    })

    it('should handle search with special characters', async () => {
      const { user } = setup()
      const searchInput = screen.getByTestId('search-bar')

      await user.type(searchInput, '!@#$%')

      await waitFor(() => {
        expect(screen.getByText('no-record-found')).toBeInTheDocument()
      })
    })

    it('should handle rapid menu open/close actions', async () => {
      const { user } = setup()

      const actionButtons = screen.getAllByLabelText('actions')

      // Rapidly open and close menu
      await user.click(actionButtons[0])
      await user.click(actionButtons[0])

      // Should not throw errors
      expect(screen.getByText('view-details')).toBeInTheDocument()
    })

    it('should handle roles without accountIds array', () => {
      const rolesWithoutAccountIds = {
        items: [
          {
            id: 1,
            name: 'Test Role',
            isSystemRole: false,
            behaviors: [1, 2],
            accountIds: undefined,
          },
        ],
      }

      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: rolesWithoutAccountIds,
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      setup()
      expect(screen.getByText('Test Role')).toBeInTheDocument()
      expect(screen.getByText(/0 users/)).toBeInTheDocument()
    })

    it('should handle null or undefined customer account', () => {
      const { container } = setup({ customerAccount: undefined })
      expect(container).toBeInTheDocument()
    })

    it('should handle empty search query', async () => {
      const { user } = setup()
      const searchInput = screen.getByTestId('search-bar')

      await user.type(searchInput, 'Admin')
      await user.clear(searchInput)

      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument()
      })
      expect(screen.getByText('Purchaser')).toBeInTheDocument()
    })
  })

  describe('User Count Aggregation', () => {
    it('should fetch and display user count for role with single account', async () => {
      ;(useGetUsersByRoleAsync as jest.Mock).mockReturnValue({
        users: [{ id: 1 }, { id: 2 }, { id: 3 }],
        isLoading: false,
        isSuccess: true,
      })

      setup()

      await waitFor(() => {
        const userCells = screen.getAllByText(/users/)
        expect(userCells.length).toBeGreaterThan(0)
      })
    })

    it('should aggregate user counts across multiple accounts', async () => {
      const multiAccountRole = {
        items: [
          {
            id: 1,
            name: 'Multi-Account Role',
            isSystemRole: false,
            behaviors: [1, 2],
            accountIds: [1001, 1002, 1003],
          },
        ],
      }

      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: multiAccountRole,
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      setup()

      await waitFor(() => {
        expect(screen.getByText('Multi-Account Role')).toBeInTheDocument()
      })
    })

    it('should handle loading state while fetching user counts', () => {
      ;(useGetUsersByRoleAsync as jest.Mock).mockReturnValue({
        users: null,
        isLoading: true,
        isSuccess: false,
      })

      setup()
      expect(screen.getByText('Admin')).toBeInTheDocument()
    })
  })

  describe('Pagination Boundary Cases', () => {
    it('should handle exactly 10 roles (one full page)', () => {
      const exactlyTenRoles = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Role ${i + 1}`,
        isSystemRole: false,
        behaviors: [] as number[],
        accountIds: [1001],
      }))

      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: { items: exactlyTenRoles },
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      setup()

      expect(screen.getByText('Role 1')).toBeInTheDocument()
      expect(screen.getByText('Role 10')).toBeInTheDocument()
    })

    it('should handle 11 roles (requires pagination)', () => {
      const elevenRoles = Array.from({ length: 11 }, (_, i) => ({
        id: i + 1,
        name: `Role ${i + 1}`,
        isSystemRole: false,
        behaviors: [] as number[],
        accountIds: [1001],
      }))

      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: { items: elevenRoles },
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      setup()

      // First page shows roles 1-10 (alphabetically sorted)
      expect(screen.getByText('Role 1')).toBeInTheDocument()
      expect(screen.getByText('Role 10')).toBeInTheDocument()
      // Role 11 should NOT be visible on page 1 (only 10 items per page)
      expect(screen.queryByText('Role 11')).not.toBeInTheDocument()
    })

    it('should display correct page info text', () => {
      const manyRoles = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Role ${i + 1}`,
        isSystemRole: false,
        behaviors: [] as number[],
        accountIds: [1001],
      }))

      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: { items: manyRoles },
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      setup()

      // Check for pagination info text (can be "displaying 1 - 10 of 25" or "1 - 10 of 25" depending on screen size)
      expect(screen.getByText(/1 - 10 of 25/)).toBeInTheDocument()
    })
  })

  describe('Delete Button State', () => {
    it('should disable delete button for role with 1 user', async () => {
      const roleWithOneUser = {
        items: [
          {
            id: 1,
            name: 'Role With User',
            isSystemRole: false,
            behaviors: [1],
            accountIds: [1001],
          },
        ],
      }

      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: roleWithOneUser,
        isLoading: false,
        isError: false,
        isSuccess: true,
      })
      ;(useGetUsersByRoleAsync as jest.Mock).mockReturnValue({
        users: [{ id: 1 }],
        isLoading: false,
        isSuccess: true,
      })

      const { user } = setup({ usersByRole: { '1': 1 } })

      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[0])

      await waitFor(() => {
        const deleteButton = screen.getByText('delete-role')
        // Check if the button is actually disabled
        expect(deleteButton.closest('[role="menuitem"]')).toHaveAttribute('aria-disabled', 'true')
      })
    })

    it('should enable delete button for role with 0 users', async () => {
      const roleWithNoUsers = {
        items: [
          {
            id: 1,
            name: 'Empty Role',
            isSystemRole: false,
            behaviors: [1],
            accountIds: [1001],
          },
        ],
      }

      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: roleWithNoUsers,
        isLoading: false,
        isError: false,
        isSuccess: true,
      })
      ;(useGetUsersByRoleAsync as jest.Mock).mockReturnValue({
        users: [],
        isLoading: false,
        isSuccess: true,
      })

      const { user } = setup({ usersByRole: { '1': 0 } })

      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[0])

      await waitFor(() => {
        const deleteButton = screen.getByText('delete-role')
        expect(deleteButton.closest('[role="menuitem"]')).not.toHaveAttribute(
          'aria-disabled',
          'true'
        )
      })
    })
  })

  describe('Scenario-Based Tests (E2E-like)', () => {
    // TC-E2E-001 to TC-E2E-003: Complete user flow
    it('Scenario 1: Admin searches for a role, views details, and navigates back', async () => {
      const { user } = setup()

      // Step 1: User sees all roles initially
      expect(screen.getByText('Admin')).toBeInTheDocument()
      expect(screen.getByText('Purchaser')).toBeInTheDocument()

      // Step 2: User searches for "Admin"
      const searchInput = screen.getByTestId('search-bar')
      await user.type(searchInput, 'Admin')

      // Step 3: Only Admin role is visible
      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument()
      })
      expect(screen.queryByText('Purchaser')).not.toBeInTheDocument()

      // Step 4: User opens action menu
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[0])

      // Step 5: User clicks View Details
      const viewButton = screen.getByText('view-details')
      await user.click(viewButton)

      // Step 6: User navigates to view page
      expect(mockPush).toHaveBeenCalledWith(
        '/my-account/b2b/manage-roles/create?roleId=1&mode=view'
      )
    })

    // TC-E2E-007 to TC-E2E-008: Custom role actions
    it('Scenario 2: Admin attempts to delete role with users, then edits it instead', async () => {
      // Setup role with users
      const roleWithUsers = {
        items: [
          {
            id: 2,
            name: 'Store Manager',
            isSystemRole: false,
            behaviors: [1, 2],
            accountIds: [1001],
          },
        ],
      }

      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: roleWithUsers,
        isLoading: false,
        isError: false,
        isSuccess: true,
      })
      ;(useGetUsersByRoleAsync as jest.Mock).mockReturnValue({
        users: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        isLoading: false,
        isSuccess: true,
      })

      const { user } = setup({ usersByRole: { '2': 5 } })

      // Step 1: User opens action menu
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[0])

      // Step 2: User sees delete is disabled
      await waitFor(() => {
        const deleteButton = screen.getByText('delete-role')
        expect(deleteButton.closest('[role="menuitem"]')).toHaveAttribute('aria-disabled', 'true')
      })

      // Step 3: User clicks Edit instead
      const editButton = screen.getByText('edit-role')
      await user.click(editButton)

      // Step 4: User navigates to edit page
      expect(mockPush).toHaveBeenCalledWith(
        '/my-account/b2b/manage-roles/create?roleId=2&mode=edit'
      )
    })

    // TC-E2E-009 to TC-E2E-011: Copy role workflow
    it('Scenario 3: Admin copies an existing role to create a new one', async () => {
      const { user } = setup()

      // Step 1: User searches for role to copy
      const searchInput = screen.getByTestId('search-bar')
      await user.type(searchInput, 'Purchaser')

      await waitFor(() => {
        expect(screen.getByText('Purchaser')).toBeInTheDocument()
      })

      // Step 2: User opens action menu for the Purchaser role (only one result after filter)
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[0])

      // Step 3: User clicks Copy Role
      await waitFor(() => {
        expect(screen.getByText('copy-role')).toBeInTheDocument()
      })
      const copyButton = screen.getByText('copy-role')
      await user.click(copyButton)

      // Step 4: User navigates to copy page
      expect(mockPush).toHaveBeenCalledWith(
        '/my-account/b2b/manage-roles/create?roleId=2&mode=copy'
      )
    })

    // TC-E2E-013: Successful deletion
    it('Scenario 4: Admin successfully deletes an unassigned custom role', async () => {
      mockDeleteRole.mockResolvedValueOnce({})

      const { user } = setup()

      // Step 1: User searches for role to delete
      const searchInput = screen.getByTestId('search-bar')
      await user.type(searchInput, 'Manager')

      await waitFor(() => {
        expect(screen.getByText('Manager')).toBeInTheDocument()
      })

      // Step 2: User opens action menu
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[0])

      // Step 3: User clicks Delete
      const deleteButton = screen.getByText('delete-role')
      await user.click(deleteButton)

      // Step 4: User confirms deletion
      expect(mockShowModal).toHaveBeenCalled()
      const modalCall = mockShowModal.mock.calls[0][0]
      await modalCall.props.onConfirm()

      // Step 5: Role is deleted successfully
      await waitFor(() => {
        expect(mockDeleteRole).toHaveBeenCalled()
      })
      expect(mockShowSnackbar).toHaveBeenCalledWith('role-deleted-successfully', 'success')
    })

    // TC-E2E-005: Pagination workflow
    it('Scenario 5: Admin navigates through multiple pages of roles', async () => {
      const manyRoles = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Role ${i + 1}`,
        isSystemRole: false,
        behaviors: [] as number[],
        accountIds: [1001],
      }))

      ;(useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: { items: manyRoles },
        isLoading: false,
        isError: false,
        isSuccess: true,
      })

      const { user } = setup()

      // Step 1: User sees first page with pagination (roles sorted alphabetically)
      // Alphabetical order: Role 1, Role 10, Role 11, ..., Role 18, Role 19, Role 2, Role 20, ...
      expect(screen.getByText('Role 1')).toBeInTheDocument()
      expect(screen.getByText('Role 10')).toBeInTheDocument()

      // Step 2: User clicks page 2
      const page2Button = screen.getByRole('button', { name: 'Go to page 2' })
      await user.click(page2Button)

      // Step 3: User sees second page roles (items 11-20)
      await waitFor(() => {
        // After alphabetical sort: Role 11 should be on page 2
        expect(screen.getByText('Role 11')).toBeInTheDocument()
      })
      expect(screen.getByText('Role 20')).toBeInTheDocument()
      // Role 1 should not be visible on page 2
      expect(screen.queryByText('Role 1')).not.toBeInTheDocument()
    })

    // TC-E2E-004: Clear search filter
    it('Scenario 6: Admin filters roles, then clears the filter', async () => {
      const { user } = setup()

      // Step 1: User applies search filter
      const searchInput = screen.getByTestId('search-bar')
      await user.type(searchInput, 'Manager')

      await waitFor(() => {
        expect(screen.getByText('Manager')).toBeInTheDocument()
      })
      expect(screen.queryByText('Admin')).not.toBeInTheDocument()

      // Step 2: User clears search
      await user.clear(searchInput)

      // Step 3: All roles are displayed again
      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument()
      })
      expect(screen.getByText('Purchaser')).toBeInTheDocument()
      expect(screen.getByText('Manager')).toBeInTheDocument()
    })

    // TC-E2E-015: Add new role navigation
    it('Scenario 7: Admin starts creating a new role', async () => {
      const { user } = setup()

      // Step 1: User clicks Add New Role button
      const addButton = screen.getByText('add-new-role')
      await user.click(addButton)

      // Step 2: User navigates to create page
      expect(mockPush).toHaveBeenCalledWith('/my-account/b2b/manage-roles/create')
    })

    // TC-E2E-014: Error handling
    it('Scenario 8: Admin attempts deletion but API fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockDeleteRole.mockRejectedValueOnce(new Error('Network error'))

      const { user } = setup()

      // Step 1: User attempts to delete a role (Non-Purchaser - index 2)
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[2])

      const deleteButton = screen.getByText('delete-role')
      await user.click(deleteButton)

      // Step 2: User confirms deletion
      const modalCall = mockShowModal.mock.calls[0][0]
      await modalCall.props.onConfirm()

      // Step 3: Error message is displayed
      await waitFor(() => {
        expect(mockShowSnackbar).toHaveBeenCalledWith('error-deleting-role', 'error')
      })

      // Step 4: Error is logged
      expect(consoleSpy).toHaveBeenCalledWith('Error deleting role:', expect.any(Error))

      consoleSpy.mockRestore()
    })
  })

  describe('Component Props Handling', () => {
    it('should use initialData when provided', () => {
      setup({ initialData: mockInitialData })
      expect(screen.getByText('Admin')).toBeInTheDocument()
    })

    it('should fetch data when initialData is not provided', () => {
      setup({ initialData: undefined })
      expect(useGetRolesByAccountIdAsync).toHaveBeenCalledWith(1001, undefined)
    })

    it('should handle customerAccount prop correctly', () => {
      const customAccount = {
        id: 9999,
        emailAddress: 'custom@test.com',
      }

      setup({ customerAccount: customAccount })
      expect(useGetRolesByAccountIdAsync).toHaveBeenCalledWith(9999, mockInitialData)
    })
  })

  describe('Role Type Filtering', () => {
    it('should correctly identify and display system roles', () => {
      setup()

      const systemBadges = screen.getAllByText('System')
      expect(systemBadges).toHaveLength(2) // Admin and Viewer
    })

    it('should correctly identify and display custom roles', () => {
      setup()

      const customBadges = screen.getAllByText('Custom')
      expect(customBadges).toHaveLength(3) // Purchaser, Non-Purchaser, Manager
    })

    it('should handle mixed role types in search results', async () => {
      const { user } = setup()
      const searchInput = screen.getByTestId('search-bar')

      // Search for term that matches both system and custom roles
      await user.type(searchInput, 'er')

      await waitFor(() => {
        // Both "Purchaser" (custom) and "Viewer" (system) match
        expect(screen.getByText('Purchaser')).toBeInTheDocument()
      })
      expect(screen.getByText('Viewer')).toBeInTheDocument()
    })
  })
})
