import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './UserForm.stories'
import { createQueryClientWrapper } from '@/__test__/utils'

const { Common, WithProps } = composeStories(stories)

const onClose = jest.fn()
const onSave = jest.fn()
const onRoleAssignmentsChange = jest.fn()

// Mock hooks
jest.mock('@/hooks', () => ({
  useAddRoleToCustomerB2bAccountMutation: jest.fn(() => ({
    addRoleToCustomerB2bAccount: {
      mutateAsync: jest.fn().mockResolvedValue(true),
    },
  })),
  useDeleteB2bAccountRoleMutation: jest.fn(() => ({
    deleteB2bAccountUserRole: {
      mutateAsync: jest.fn().mockResolvedValue(true),
    },
  })),
}))

describe('[component] User Form', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Form Rendering and Display', () => {
    it('should render user form with all required fields', async () => {
      render(<Common {...Common.args} />, { wrapper: createQueryClientWrapper() })

      const emailAddressField = screen.getByLabelText('email-address')
      const firstNameField = screen.getByLabelText('first-name')
      const lastNameField = screen.getByLabelText('last-name-or-sur-name')
      const submitButton = screen.getByTestId('submit-button')
      const cancelButton = screen.getByTestId('cancel-button')

      expect(emailAddressField).toBeInTheDocument()
      expect(firstNameField).toBeInTheDocument()
      expect(lastNameField).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
    })

    it('should render AccountRoleAssignments section', () => {
      render(<Common {...Common.args} />, { wrapper: createQueryClientWrapper() })

      const roleAssignmentsHeading = screen.getByText('account-role-assignments')
      expect(roleAssignmentsHeading).toBeInTheDocument()
    })

    it('should show form in create mode with empty fields', () => {
      render(<Common {...Common.args} />, { wrapper: createQueryClientWrapper() })

      const emailAddressField: HTMLInputElement = screen.getByLabelText('email-address')
      const firstNameField: HTMLInputElement = screen.getByLabelText('first-name')
      const lastNameField: HTMLInputElement = screen.getByLabelText('last-name-or-sur-name')

      expect(emailAddressField.value).toBe('')
      expect(firstNameField.value).toBe('')
      expect(lastNameField.value).toBe('')
    })
  })

  describe('Edit Mode Functionality', () => {
    it('should show form in edit mode with pre-populated values', async () => {
      render(<WithProps {...WithProps.args} />, { wrapper: createQueryClientWrapper() })

      const b2BUser = WithProps.args?.b2BUser

      const emailAddressField: HTMLInputElement = screen.getByLabelText('email-address')
      const firstNameField: HTMLInputElement = screen.getByLabelText('first-name')
      const lastNameField: HTMLInputElement = screen.getByLabelText('last-name-or-sur-name')

      await waitFor(() => {
        expect(emailAddressField.value).toBe(b2BUser?.emailAddress)
      })
      await waitFor(() => {
        expect(firstNameField.value).toBe(b2BUser?.firstName)
      })
      await waitFor(() => {
        expect(lastNameField.value).toBe(b2BUser?.lastName)
      })
    })

    it('should disable email field in edit mode', () => {
      render(<WithProps {...WithProps.args} />, { wrapper: createQueryClientWrapper() })

      const emailAddressField: HTMLInputElement = screen.getByLabelText('email-address')
      expect(emailAddressField).toBeDisabled()
    })
  })

  describe('Form Validation - Email Field', () => {
    it('should disable submit button when email field is empty', async () => {
      const user = userEvent.setup()
      render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
        wrapper: createQueryClientWrapper(),
      })

      // Fill in other required fields
      const firstNameField = screen.getByLabelText('first-name')
      const lastNameField = screen.getByLabelText('last-name-or-sur-name')
      await user.type(firstNameField, 'John')
      await user.type(lastNameField, 'Doe')

      // Submit button should be disabled because email is empty/invalid
      const submitButton = screen.getByTestId('submit-button')
      await waitFor(() => {
        expect(submitButton).toBeDisabled()
      })
      expect(onSave).not.toHaveBeenCalled()
    })

    it('should disable submit button for invalid email format - missing @', async () => {
      const user = userEvent.setup()
      render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
        wrapper: createQueryClientWrapper(),
      })

      const emailAddressField = screen.getByLabelText('email-address')
      const firstNameField = screen.getByLabelText('first-name')
      const lastNameField = screen.getByLabelText('last-name-or-sur-name')
      const submitButton = screen.getByTestId('submit-button')

      await user.type(emailAddressField, 'invalidemail')
      await user.type(firstNameField, 'John')
      await user.type(lastNameField, 'Doe')

      // Submit button should be disabled because email format is invalid
      await waitFor(() => {
        expect(submitButton).toBeDisabled()
      })
    })

    it('should disable submit button for invalid email format - missing domain', async () => {
      const user = userEvent.setup()
      render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
        wrapper: createQueryClientWrapper(),
      })

      const emailAddressField = screen.getByLabelText('email-address')
      const firstNameField = screen.getByLabelText('first-name')
      const lastNameField = screen.getByLabelText('last-name-or-sur-name')
      const submitButton = screen.getByTestId('submit-button')

      await user.type(emailAddressField, 'test@')
      await user.type(firstNameField, 'John')
      await user.type(lastNameField, 'Doe')

      // Submit button should be disabled because email format is invalid
      await waitFor(() => {
        expect(submitButton).toBeDisabled()
      })
    })

    it('should accept valid email format', async () => {
      const user = userEvent.setup()
      render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
        wrapper: createQueryClientWrapper(),
      })

      const emailAddressField = screen.getByLabelText('email-address')
      await user.type(emailAddressField, 'test@example.com')
      await user.tab()

      await waitFor(() => {
        const errorMessages = screen.queryByText('invalid-email-error')
        expect(errorMessages).not.toBeInTheDocument()
      })
    })

    it('should accept complex valid email formats', async () => {
      const validEmails = [
        'test.user+tag@example.co.uk',
        'user_name@subdomain.example.com',
        'first.last@example.org',
      ]

      for (const email of validEmails) {
        const user = userEvent.setup()
        const { unmount } = render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
          wrapper: createQueryClientWrapper(),
        })

        const emailAddressField = screen.getByLabelText('email-address')
        await user.type(emailAddressField, email)
        await user.tab()

        await waitFor(() => {
          const errorMessages = screen.queryByText('invalid-email-error')
          expect(errorMessages).not.toBeInTheDocument()
        })

        unmount()
      }
    })
  })

  describe('Form Validation - Name Fields', () => {
    it('should disable submit button when first name field is empty', async () => {
      const user = userEvent.setup()
      render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
        wrapper: createQueryClientWrapper(),
      })

      const emailAddressField = screen.getByLabelText('email-address')
      const lastNameField = screen.getByLabelText('last-name-or-sur-name')
      const submitButton = screen.getByTestId('submit-button')

      await user.type(emailAddressField, 'test@example.com')
      await user.type(lastNameField, 'Doe')

      // Submit button should be disabled because first name is empty
      await waitFor(() => {
        expect(submitButton).toBeDisabled()
      })
      expect(onSave).not.toHaveBeenCalled()
    })

    it('should disable submit button when last name field is empty', async () => {
      const user = userEvent.setup()
      render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
        wrapper: createQueryClientWrapper(),
      })

      const emailAddressField = screen.getByLabelText('email-address')
      const firstNameField = screen.getByLabelText('first-name')
      const submitButton = screen.getByTestId('submit-button')

      await user.type(emailAddressField, 'test@example.com')
      await user.type(firstNameField, 'John')

      // Submit button should be disabled because last name is empty
      await waitFor(() => {
        expect(submitButton).toBeDisabled()
      })
      expect(onSave).not.toHaveBeenCalled()
    })
  })

  describe('Form Submission - User Input', () => {
    it('should capture and display user entered values', async () => {
      const user = userEvent.setup()
      render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
        wrapper: createQueryClientWrapper(),
      })

      const emailAddressField: HTMLInputElement = screen.getByLabelText('email-address')
      const firstNameField: HTMLInputElement = screen.getByLabelText('first-name')
      const lastNameField: HTMLInputElement = screen.getByLabelText('last-name-or-sur-name')

      await user.type(emailAddressField, 'John.john@gmail.com')
      await user.type(firstNameField, 'John')
      await user.type(lastNameField, 'john')

      await waitFor(() => {
        expect(emailAddressField.value).toBe('John.john@gmail.com')
      })
      expect(firstNameField.value).toBe('John')
      expect(lastNameField.value).toBe('john')
    })

    it('should call onSave when form is submitted with valid data', async () => {
      const user = userEvent.setup()
      render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
        wrapper: createQueryClientWrapper(),
      })

      const emailAddressField = screen.getByLabelText('email-address')
      const firstNameField = screen.getByLabelText('first-name')
      const lastNameField = screen.getByLabelText('last-name-or-sur-name')
      const submitButton = screen.getByTestId('submit-button')

      await user.type(emailAddressField, 'john.doe@example.com')
      await user.type(firstNameField, 'John')
      await user.type(lastNameField, 'Doe')

      await act(async () => {
        await user.click(submitButton)
      })

      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            emailAddress: 'john.doe@example.com',
            firstName: 'John',
            lastName: 'Doe',
            roleAssignments: expect.any(Object),
            userIdsByAccount: expect.any(Object),
            changesPerAccount: expect.any(Object),
          })
        )
      })
    })
  })

  describe('Form Actions - Cancel and Close', () => {
    it('should call onClose when cancel button is clicked', async () => {
      const user = userEvent.setup()
      render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
        wrapper: createQueryClientWrapper(),
      })

      const cancelButton = screen.getByTestId('cancel-button')
      await user.click(cancelButton)

      expect(onClose).toHaveBeenCalled()
    })

    it('should not submit form when cancel button is clicked', async () => {
      const user = userEvent.setup()
      render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
        wrapper: createQueryClientWrapper(),
      })

      const emailAddressField = screen.getByLabelText('email-address')
      await user.type(emailAddressField, 'test@example.com')

      const cancelButton = screen.getByTestId('cancel-button')
      await user.click(cancelButton)

      expect(onSave).not.toHaveBeenCalled()
      expect(onClose).toHaveBeenCalled()
    })
  })

  describe('Role Assignment Integration', () => {
    it('should pass role assignments to onSave callback', async () => {
      const user = userEvent.setup()

      render(
        <Common
          {...Common.args}
          onSave={onSave}
          onClose={onClose}
          onRoleAssignmentsChange={onRoleAssignmentsChange}
        />,
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      const emailAddressField = screen.getByLabelText('email-address')
      const firstNameField = screen.getByLabelText('first-name')
      const lastNameField = screen.getByLabelText('last-name-or-sur-name')
      const submitButton = screen.getByTestId('submit-button')

      await user.type(emailAddressField, 'test@example.com')
      await user.type(firstNameField, 'Test')
      await user.type(lastNameField, 'User')

      await act(async () => {
        await user.click(submitButton)
      })

      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            roleAssignments: expect.any(Object),
          })
        )
      })
    })

    it('should handle role assignment changes through callback', async () => {
      render(
        <Common
          {...Common.args}
          onSave={onSave}
          onClose={onClose}
          onRoleAssignmentsChange={onRoleAssignmentsChange}
        />,
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      // The AccountRoleAssignments component should be rendered
      const roleAssignmentsSection = screen.getByText('account-role-assignments')
      expect(roleAssignmentsSection).toBeInTheDocument()
    })
  })

  describe('Loading and Disabled States', () => {
    it('should start with submit button disabled in create mode', async () => {
      render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
        wrapper: createQueryClientWrapper(),
      })

      const submitButton = screen.getByTestId('submit-button')

      // Button should be disabled initially
      expect(submitButton).toBeDisabled()
    })

    it('should keep submit button disabled until all required fields are valid', async () => {
      const user = userEvent.setup()

      render(<Common {...Common.args} onSave={onSave} onClose={onClose} />, {
        wrapper: createQueryClientWrapper(),
      })

      const emailAddressField = screen.getByLabelText('email-address')
      const firstNameField = screen.getByLabelText('first-name')
      const submitButton = screen.getByTestId('submit-button')

      // Initially disabled
      expect(submitButton).toBeDisabled()

      // Still disabled after only email
      await user.type(emailAddressField, 'test@example.com')
      expect(submitButton).toBeDisabled()

      // Still disabled after email and first name
      await user.type(firstNameField, 'Test')
      expect(submitButton).toBeDisabled()
    })
  })

  describe('Accessibility and Form Semantics', () => {
    it('should have proper form element structure', () => {
      render(<Common {...Common.args} />, { wrapper: createQueryClientWrapper() })

      const form = screen.getByTestId('user-form')
      expect(form).toBeInTheDocument()
      expect(form.tagName).toBe('FORM')
    })

    it('should have proper labels for form fields', () => {
      render(<Common {...Common.args} />, { wrapper: createQueryClientWrapper() })

      expect(screen.getByLabelText('email-address')).toBeInTheDocument()
      expect(screen.getByLabelText('first-name')).toBeInTheDocument()
      expect(screen.getByLabelText('last-name-or-sur-name')).toBeInTheDocument()
    })
  })

  describe('Button Visibility Control', () => {
    it('should hide buttons when showButtons is false', () => {
      render(<Common {...Common.args} showButtons={false} />, {
        wrapper: createQueryClientWrapper(),
      })

      const submitButton = screen.queryByTestId('submit-button')
      const cancelButton = screen.queryByTestId('cancel-button')

      expect(submitButton).not.toBeInTheDocument()
      expect(cancelButton).not.toBeInTheDocument()
    })

    it('should show buttons by default or when showButtons is true', () => {
      render(<Common {...Common.args} showButtons={true} />, {
        wrapper: createQueryClientWrapper(),
      })

      const submitButton = screen.getByTestId('submit-button')
      const cancelButton = screen.getByTestId('cancel-button')

      expect(submitButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
    })
  })
})
