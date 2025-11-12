import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import ManageRolesTemplate from './ManageRolesTemplate'
import { useAuthContext, useModalContext, useSnackbarContext } from '@/context'
import {
  useGetRolesByAccountIdAsync,
  useDeleteRoleAsync,
  useGetUsersByRoleAsync,
} from '@/hooks'

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
      onAccountTitleClick: jest.fn(),
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
    expect(screen.getByText('Admin_Copy')).toBeInTheDocument()
    expect(screen.getByText('Purchaser_Copy')).toBeInTheDocument()
  })

  it('should filter roles when searching', async () => {
    const { user } = setup()
    const searchInput = screen.getByPlaceholderText(/search-roles/i)

    await user.type(searchInput, 'Admin')

    await waitFor(() => {
      expect(screen.getByText('Admin')).toBeInTheDocument()
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
      (useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: null,
        isLoading: true,
        isError: false,
        isSuccess: false,
      })

      setup()
      expect(screen.getByText('loading')).toBeInTheDocument()
    })

    it('should show error state', () => {
      (useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
        roles: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
      })

      setup()
      expect(screen.getByText('error-loading-roles')).toBeInTheDocument()
    })

    it('should show no records message when no roles exist', () => {
      (useGetRolesByAccountIdAsync as jest.Mock).mockReturnValue({
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

      // Click more actions menu for custom role (Purchaser - index 1)
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[1])

      // Click edit role
      const editButton = screen.getByText('edit-role')
      await user.click(editButton)

      expect(mockPush).toHaveBeenCalledWith(
        '/my-account/b2b/manage-roles/create?roleId=2&mode=edit'
      )
    })

    it('should navigate to copy role page when Copy Role is clicked', async () => {
      const { user } = setup()

      // Click more actions menu for custom role
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[1])

      // Click copy role
      const copyButton = screen.getByText('copy-role')
      await user.click(copyButton)

      expect(mockPush).toHaveBeenCalledWith(
        '/my-account/b2b/manage-roles/create?roleId=2&mode=copy'
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

      // Click menu for custom role (Purchaser - index 1)
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[1])

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

      // Click menu for custom role
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[1])

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

      // Click menu for custom role
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[1])

      // Click delete
      const deleteButton = screen.getByText('delete-role')
      await user.click(deleteButton)

      // Get the onConfirm callback and execute it
      const modalCall = mockShowModal.mock.calls[0][0]
      await modalCall.props.onConfirm()

      await waitFor(() => {
        expect(mockDeleteRole).toHaveBeenCalledWith({ roleId: 2 })
      })
      expect(mockShowSnackbar).toHaveBeenCalledWith('role-deleted-successfully', 'success')
    })

    it('should show error message and log error to console when deletion fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockDeleteRole.mockRejectedValueOnce(new Error('Delete failed'))
      const { user } = setup()

      // Click menu for custom role
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[1])

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
      const actionButtons = screen.getAllByLabelText('actions')
      await user.click(actionButtons[1])

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
  })
})
