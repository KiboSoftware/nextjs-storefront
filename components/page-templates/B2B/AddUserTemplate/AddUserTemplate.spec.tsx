import React from 'react'

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
    b2BUserAndAuthInfoInput: {
      b2BUser: {
        firstName: params.values.firstName,
        lastName: params.values.lastName,
        emailAddress: params.values.emailAddress,
        userName: params.values.emailAddress,
        localeCode: 'en-US',
      },
    },
  })),
  buildUpdateCustomerB2bUserParams: jest.fn((params) => ({
    accountId: params.user?.id,
    userId: params.b2BUser?.userId,
    b2BUser: {
      emailAddress: params.values.emailAddress,
      firstName: params.values.firstName,
      lastName: params.values.lastName,
    },
  })),
}))

jest.mock('@/components/b2b', () => ({
  UserForm: jest.fn(),
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

    // Set default UserForm implementation
    const { UserForm } = jest.requireMock('@/components/b2b')
    UserForm.mockImplementation(
      ({
        onSave,
        onValidationChange,
      }: {
        onSave: (data: unknown) => void
        onValidationChange?: (isValid: boolean) => void
      }) => {
        // Simulate form validation passing
        React.useEffect(() => {
          onValidationChange?.(true)
        }, [onValidationChange])

        return (
          <form
            id="addUserForm"
            data-testid="user-form"
            onSubmit={(e) => {
              e.preventDefault()
              onSave({
                emailAddress: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe',
                roleAssignments: { 1: ['101', '102'], 2: ['201'] },
              })
            }}
          >
            <input type="text" data-testid="user-form-input" />
          </form>
        )
      }
    )

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
      expect(mockT).toHaveBeenCalledWith('add-new-user')
      expect(mockT).toHaveBeenCalledWith('cancel')
      expect(mockT).toHaveBeenCalledWith('save')
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

      const saveButton = screen.getByRole('button', { name: /save/i })
      await userEvent.click(saveButton)

      // Expect user creation for both accounts since both have role assignments
      await waitFor(() => {
        expect(mockCreateUserMutateAsync).toHaveBeenCalledTimes(2)
      })

      expect(mockCreateUserMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          accountId: 1,
        })
      )

      expect(mockCreateUserMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          accountId: 2,
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

      const saveButton = screen.getByRole('button', { name: /save/i })
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockCreateUserMutateAsync).toHaveBeenCalledTimes(2)
      })

      // Roles are not added if userId is missing
      expect(mockAddRoleMutateAsync).not.toHaveBeenCalled()

      // Still navigates even without userId
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(Routes.Users)
      })

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

      const saveButton = screen.getByRole('button', { name: /save/i })
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          '[AddUserTemplate] Failed to create user for account 1:',
          mockError
        )
      })

      expect(mockAddRoleMutateAsync).not.toHaveBeenCalled()

      // Still navigates even with errors
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(Routes.Users)
      })

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

      const saveButton = screen.getByRole('button', { name: /save/i })
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockCreateUserMutateAsync).toHaveBeenCalledTimes(2)
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

      const saveButton = screen.getByRole('button', { name: /save/i })
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

      const cancelButton = screen.getByRole('button', { name: /cancel/i })
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

      const backLink = screen.getByRole('link')
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

      const saveButton = screen.getByRole('button', { name: /save/i })
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

      const saveButton = screen.getByRole('button', { name: /save/i })
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockAddRoleMutateAsync).toHaveBeenCalledTimes(3)
      })

      // Resolve all promises
      resolveFirst?.(true)
      resolveSecond?.(true)
      resolveThird?.(true)

      // Wait for all operations to complete
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

      const saveButton = screen.getByRole('button', { name: /save/i })
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

      const saveButton = screen.getByRole('button', { name: /save/i })
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
  })
})
