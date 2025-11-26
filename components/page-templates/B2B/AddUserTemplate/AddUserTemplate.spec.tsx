import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import AddUserTemplate from './AddUserTemplate'
import { useAuthContext } from '@/context'
import {
  useAddRoleToCustomerB2bAccountMutation,
  useCreateCustomerB2bUserMutation,
  useUpdateCustomerB2bUserMutation,
} from '@/hooks'
import { Routes } from '@/lib/constants'
import type { B2BAccountHierarchyResult } from '@/lib/types'

// Mock dependencies
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}))

jest.mock('@/context', () => ({
  useAuthContext: jest.fn(),
}))

jest.mock('@/hooks', () => ({
  useCreateCustomerB2bUserMutation: jest.fn(),
  useUpdateCustomerB2bUserMutation: jest.fn(),
  useAddRoleToCustomerB2bAccountMutation: jest.fn(),
  useDeleteB2bAccountRoleMutation: jest.fn(),
}))

jest.mock('@/lib/helpers', () => ({
  buildCreateCustomerB2bUserParams: jest.fn((params) => ({
    accountId: params.user?.id,
    b2bUser: {
      emailAddress: params.values.emailAddress,
      firstName: params.values.firstName,
      lastName: params.values.lastName,
    },
  })),
}))

jest.mock('@/components/b2b', () => ({
  UserForm: jest.fn(({ onSave, onClose }) => (
    <div data-testid="user-form">
      <button
        data-testid="save-button"
        onClick={() =>
          onSave({
            emailAddress: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            roleAssignments: { 1: ['101', '102'], 2: ['201'] },
          })
        }
      >
        Save
      </button>
      <button data-testid="cancel-button" onClick={onClose}>
        Cancel
      </button>
    </div>
  )),
}))

const mockPush = jest.fn()
const mockReplace = jest.fn()
const mockUseRouter = useRouter as jest.Mock
const mockUseTranslation = useTranslation as jest.Mock
const mockUseAuthContext = useAuthContext as jest.Mock
const mockUseCreateCustomerB2bUserMutation = useCreateCustomerB2bUserMutation as jest.Mock
const mockUseUpdateCustomerB2bUserMutation = useUpdateCustomerB2bUserMutation as jest.Mock
const mockUseAddRoleToCustomerB2bAccountMutation =
  useAddRoleToCustomerB2bAccountMutation as jest.Mock

describe('AddUserTemplate', () => {
  const mockCreateUserMutateAsync = jest.fn()
  const mockUpdateUserMutateAsync = jest.fn()
  const mockAddRoleMutateAsync = jest.fn()
  const mockT = jest.fn((key: string) => key)

  const mockInitialData: B2BAccountHierarchyResult = {
    accounts: [
      {
        id: 1,
        companyOrOrganization: 'Account 1',
        parentAccountId: null,
      },
      {
        id: 2,
        companyOrOrganization: 'Account 2',
        parentAccountId: 1,
      },
    ],
    hierarchy: [{ id: 1, children: [{ id: 2, children: [] }] }],
  }

  const mockAccountUserBehaviors = {
    1: [2029, 2027, 1000],
    2: [2029],
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: mockReplace,
      pathname: '/my-account/b2b/users/add-user',
      query: {},
      asPath: '/my-account/b2b/users/add-user',
      route: '/my-account/b2b/users/add-user',
      isReady: true,
      basePath: '',
      locale: 'en',
      defaultLocale: 'en',
    } as never)

    mockUseTranslation.mockReturnValue({
      t: mockT,
      i18n: {
        language: 'en',
        changeLanguage: jest.fn(),
      },
      ready: true,
    } as never)

    mockUseAuthContext.mockReturnValue({
      user: {
        userId: 'user123',
        id: 1,
      },
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
      setAuthError: jest.fn(),
      createAccount: jest.fn(),
    } as never)

    mockUseCreateCustomerB2bUserMutation.mockReturnValue({
      createCustomerB2bUser: {
        mutateAsync: mockCreateUserMutateAsync,
        isLoading: false,
      },
    } as never)

    mockUseUpdateCustomerB2bUserMutation.mockReturnValue({
      updateCustomerB2bUser: {
        mutateAsync: mockUpdateUserMutateAsync,
        isLoading: false,
      },
    } as never)

    mockUseAddRoleToCustomerB2bAccountMutation.mockReturnValue({
      addRoleToCustomerB2bAccount: {
        mutateAsync: mockAddRoleMutateAsync,
        isLoading: false,
      },
    } as never)
  })

  describe('Component Rendering', () => {
    it('should render the component with title and back button', () => {
      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      expect(screen.getByTestId('user-form')).toBeInTheDocument()
      expect(mockT).toHaveBeenCalledWith('users')
      expect(mockT).toHaveBeenCalledWith('add-new-user')
    })

    it('should render UserForm with correct props', () => {
      const { UserForm } = jest.requireMock('@/components/b2b')

      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      expect(UserForm).toHaveBeenCalledWith(
        expect.objectContaining({
          isEditMode: false,
          isUserFormInDialog: false,
          b2BUser: undefined,
          accounts: mockInitialData.accounts,
          accountUserBehaviors: mockAccountUserBehaviors,
        }),
        {}
      )
    })

    it('should handle missing initialData gracefully', () => {
      render(<AddUserTemplate accountUserBehaviors={mockAccountUserBehaviors} />)

      expect(screen.getByTestId('user-form')).toBeInTheDocument()
    })

    it('should handle missing accountUserBehaviors gracefully', () => {
      render(<AddUserTemplate initialData={mockInitialData} />)

      expect(screen.getByTestId('user-form')).toBeInTheDocument()
    })
  })

  describe('User Creation and Role Assignment Flow', () => {
    it('should create user and assign roles successfully', async () => {
      const mockCreatedUser = {
        userId: 'newuser123',
        emailAddress: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      }

      mockCreateUserMutateAsync.mockResolvedValue(mockCreatedUser)
      mockAddRoleMutateAsync.mockResolvedValue(true)

      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const saveButton = screen.getByTestId('save-button')
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockCreateUserMutateAsync).toHaveBeenCalledTimes(1)
      })

      expect(mockCreateUserMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          accountId: 1,
        })
      )

      await waitFor(() => {
        expect(mockAddRoleMutateAsync).toHaveBeenCalledTimes(3)
      })

      expect(mockAddRoleMutateAsync).toHaveBeenCalledWith({
        accountId: 1,
        userId: 'newuser123',
        roleId: 101,
      })

      expect(mockAddRoleMutateAsync).toHaveBeenCalledWith({
        accountId: 1,
        userId: 'newuser123',
        roleId: 102,
      })

      expect(mockAddRoleMutateAsync).toHaveBeenCalledWith({
        accountId: 2,
        userId: 'newuser123',
        roleId: 201,
      })

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(Routes.Users)
      })
    })

    it('should handle user creation with no role assignments', async () => {
      const UserForm = jest.requireMock('@/components/b2b').UserForm
      UserForm.mockImplementation(({ onSave }: { onSave: (data: unknown) => void }) => (
        <button
          data-testid="save-no-roles"
          onClick={() =>
            onSave({
              emailAddress: 'test@example.com',
              firstName: 'John',
              lastName: 'Doe',
              roleAssignments: {},
            })
          }
        >
          Save No Roles
        </button>
      ))

      const mockCreatedUser = {
        userId: 'newuser123',
        emailAddress: 'test@example.com',
      }

      mockCreateUserMutateAsync.mockResolvedValue(mockCreatedUser)

      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const saveButton = screen.getByTestId('save-no-roles')
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockCreateUserMutateAsync).toHaveBeenCalledTimes(1)
      })

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(Routes.Users)
      })

      expect(mockAddRoleMutateAsync).not.toHaveBeenCalled()
    })

    it('should handle user creation without userId', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      const mockCreatedUser = {
        emailAddress: 'test@example.com',
        userId: undefined,
      }

      mockCreateUserMutateAsync.mockResolvedValue(mockCreatedUser)

      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const saveButton = screen.getByTestId('save-button')
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockCreateUserMutateAsync).toHaveBeenCalledTimes(0)
      })

      expect(mockAddRoleMutateAsync).not.toHaveBeenCalled()
      expect(mockReplace).not.toHaveBeenCalled()

      consoleErrorSpy.mockRestore()
    })
  })

  describe('Error Handling', () => {
    it('should handle user creation error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      const mockError = new Error('User creation failed')
      mockCreateUserMutateAsync.mockRejectedValue(mockError)

      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const saveButton = screen.getByTestId('save-button')
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          '[AddUserTemplate] Error in handleSaveUser:',
          mockError
        )
      })

      expect(mockAddRoleMutateAsync).not.toHaveBeenCalled()
      expect(mockReplace).not.toHaveBeenCalled()

      consoleErrorSpy.mockRestore()
    })

    it('should handle role assignment error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      const mockCreatedUser = {
        userId: 'newuser123',
        emailAddress: 'test@example.com',
      }

      mockCreateUserMutateAsync.mockResolvedValue(mockCreatedUser)
      mockAddRoleMutateAsync.mockRejectedValue(new Error('Role assignment failed'))

      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const saveButton = screen.getByTestId('save-button')
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockCreateUserMutateAsync).toHaveBeenCalledTimes(1)
      })

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalled()
      })

      // Component still navigates even if role assignment fails
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(Routes.Users)
      })

      consoleErrorSpy.mockRestore()
    })

    it('should handle partial role assignment failure', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      const mockCreatedUser = {
        userId: 'newuser123',
        emailAddress: 'test@example.com',
      }

      mockCreateUserMutateAsync.mockResolvedValue(mockCreatedUser)
      mockAddRoleMutateAsync
        .mockResolvedValueOnce(true)
        .mockRejectedValueOnce(new Error('Second role failed'))
        .mockResolvedValueOnce(true)

      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const saveButton = screen.getByTestId('save-button')
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockAddRoleMutateAsync).toHaveBeenCalledTimes(3)
      })

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalled()
      })

      // Component still navigates even with partial failures
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(Routes.Users)
      })

      consoleErrorSpy.mockRestore()
    })
  })

  describe('Navigation', () => {
    it('should navigate back to users page on cancel', async () => {
      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const cancelButton = screen.getByTestId('cancel-button')
      await userEvent.click(cancelButton)

      expect(mockReplace).toHaveBeenCalledWith(Routes.Users)
    })

    it('should use correct back button href', () => {
      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const backLink = screen.getByRole('link', { name: /users/i })
      expect(backLink).toHaveAttribute('href', Routes.Users)
    })

    it('should navigate to users page after successful creation', async () => {
      const mockCreatedUser = {
        userId: 'newuser123',
        emailAddress: 'test@example.com',
      }

      mockCreateUserMutateAsync.mockResolvedValue(mockCreatedUser)
      mockAddRoleMutateAsync.mockResolvedValue(true)

      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const saveButton = screen.getByTestId('save-button')
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(Routes.Users)
      })
    })
  })

  describe('Async Operations', () => {
    it('should handle concurrent role assignments correctly', async () => {
      let resolveFirst: ((value: boolean) => void) | undefined
      let resolveSecond: ((value: boolean) => void) | undefined
      let resolveThird: ((value: boolean) => void) | undefined

      const firstPromise = new Promise<boolean>((resolve) => {
        resolveFirst = resolve
      })
      const secondPromise = new Promise<boolean>((resolve) => {
        resolveSecond = resolve
      })
      const thirdPromise = new Promise<boolean>((resolve) => {
        resolveThird = resolve
      })

      const mockCreatedUser = {
        userId: 'newuser123',
        emailAddress: 'test@example.com',
      }

      mockCreateUserMutateAsync.mockResolvedValue(mockCreatedUser)
      mockAddRoleMutateAsync
        .mockReturnValueOnce(firstPromise)
        .mockReturnValueOnce(secondPromise)
        .mockReturnValueOnce(thirdPromise)

      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const saveButton = screen.getByTestId('save-button')
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockAddRoleMutateAsync).toHaveBeenCalledTimes(3)
      })

      expect(mockReplace).not.toHaveBeenCalled()

      resolveSecond?.(true)
      await new Promise((resolve) => setTimeout(resolve, 100))
      expect(mockReplace).not.toHaveBeenCalled()

      resolveThird?.(true)
      await new Promise((resolve) => setTimeout(resolve, 100))
      expect(mockReplace).not.toHaveBeenCalled()

      resolveFirst?.(true)
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(Routes.Users)
      })
    })
  })

  describe('Data Transformation', () => {
    it('should correctly parse string accountIds to integers', async () => {
      const mockCreatedUser = {
        userId: 'newuser123',
        emailAddress: 'test@example.com',
      }

      mockCreateUserMutateAsync.mockResolvedValue(mockCreatedUser)
      mockAddRoleMutateAsync.mockResolvedValue(true)

      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const saveButton = screen.getByTestId('save-button')
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockAddRoleMutateAsync).toHaveBeenCalledWith(
          expect.objectContaining({
            accountId: expect.any(Number),
            roleId: expect.any(Number),
          })
        )
      })
    })

    it('should preserve userId as string', async () => {
      const mockCreatedUser = {
        userId: 'newuser123',
        emailAddress: 'test@example.com',
      }

      mockCreateUserMutateAsync.mockResolvedValue(mockCreatedUser)
      mockAddRoleMutateAsync.mockResolvedValue(true)

      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const saveButton = screen.getByTestId('save-button')
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockAddRoleMutateAsync).toHaveBeenCalledWith(
          expect.objectContaining({
            userId: 'newuser123',
          })
        )
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty accounts array', () => {
      render(
        <AddUserTemplate
          initialData={{ accounts: [], hierarchy: [] }}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      expect(screen.getByTestId('user-form')).toBeInTheDocument()
    })

    it('should handle large number of role assignments', async () => {
      const UserForm = jest.requireMock('@/components/b2b').UserForm
      const manyRoles: Record<number, string[]> = {}
      for (let i = 1; i <= 10; i++) {
        manyRoles[i] = Array.from({ length: 20 }, (_, j) => `${i}${j}`)
      }

      UserForm.mockImplementation(({ onSave }: { onSave: (data: unknown) => void }) => (
        <button
          data-testid="save-many-roles"
          onClick={() =>
            onSave({
              emailAddress: 'test@example.com',
              firstName: 'John',
              lastName: 'Doe',
              roleAssignments: manyRoles,
            })
          }
        >
          Save
        </button>
      ))

      const mockCreatedUser = {
        userId: 'newuser123',
        emailAddress: 'test@example.com',
      }

      mockCreateUserMutateAsync.mockResolvedValue(mockCreatedUser)
      mockAddRoleMutateAsync.mockResolvedValue(true)

      render(
        <AddUserTemplate
          initialData={mockInitialData}
          accountUserBehaviors={mockAccountUserBehaviors}
        />
      )

      const saveButton = screen.getByTestId('save-many-roles')
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockAddRoleMutateAsync).toHaveBeenCalledTimes(200)
      })

      expect(mockReplace).toHaveBeenCalledWith(Routes.Users)
    })
  })
})
