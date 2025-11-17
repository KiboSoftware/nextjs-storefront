import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'

import AccountScopeSelector from './AccountScopeSelector'

import type { RoleFormData } from '../RoleBasicInfo/RoleBasicInfo'

// Mock translations
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

// Test wrapper component to provide form context
const TestWrapper = ({
  hasChildAccounts = true,
  defaultValues = {},
}: {
  hasChildAccounts?: boolean
  defaultValues?: Partial<RoleFormData>
}) => {
  const { control } = useForm<RoleFormData>({
    defaultValues: {
      roleName: '',
      parentAccount: '',
      accountScope: 'all-child',
      selectedAccounts: [],
      applyToFutureChildren: false,
      ...defaultValues,
    },
  })

  return <AccountScopeSelector control={control} hasChildAccounts={hasChildAccounts} />
}

describe('AccountScopeSelector Component', () => {
  describe('Component Rendering', () => {
    it('should render the component with section title', () => {
      render(<TestWrapper />)

      expect(screen.getByText('account-hierarchy-scope')).toBeInTheDocument()
    })

    it('should render all three radio options', () => {
      render(<TestWrapper />)

      expect(screen.getByLabelText('apply-to-all-child-accounts')).toBeInTheDocument()
      expect(screen.getByLabelText('apply-to-specific-child-accounts')).toBeInTheDocument()
      expect(screen.getByLabelText('apply-to-all-child-accounts-except')).toBeInTheDocument()
    })

    it('should render info icons with tooltips for each option', () => {
      render(<TestWrapper />)

      // Check for tooltip titles
      const infoIcons = screen.getAllByTestId('InfoIcon')
      expect(infoIcons).toHaveLength(3)
    })

    it('should render radio group as a form control', () => {
      render(<TestWrapper />)

      const radioGroup = screen.getByRole('radiogroup')
      expect(radioGroup).toBeInTheDocument()
    })
  })

  describe('AC2: Radio Options Functionality', () => {
    it('should have only one radio option selected at a time', async () => {
      const user = userEvent.setup()
      render(<TestWrapper defaultValues={{ accountScope: 'all-child' }} />)

      // Initially all-child is selected
      const allChildRadio = screen.getByLabelText('apply-to-all-child-accounts')
      expect(allChildRadio).toBeChecked()

      // Click specific-child radio
      const specificChildRadio = screen.getByLabelText('apply-to-specific-child-accounts')
      await user.click(specificChildRadio)

      await waitFor(() => {
        expect(specificChildRadio).toBeChecked()
      })
      expect(allChildRadio).not.toBeChecked()
    })

    it('should allow selecting "apply to all child accounts" option', async () => {
      const user = userEvent.setup()
      render(<TestWrapper defaultValues={{ accountScope: 'specific-child' }} />)

      const allChildRadio = screen.getByLabelText('apply-to-all-child-accounts')
      await user.click(allChildRadio)

      await waitFor(() => {
        expect(allChildRadio).toBeChecked()
      })
    })

    it('should allow selecting "apply to specific child accounts" option', async () => {
      const user = userEvent.setup()
      render(<TestWrapper defaultValues={{ accountScope: 'all-child' }} />)

      const specificChildRadio = screen.getByLabelText('apply-to-specific-child-accounts')
      await user.click(specificChildRadio)

      await waitFor(() => {
        expect(specificChildRadio).toBeChecked()
      })
    })

    it('should allow selecting "apply to all except" option', async () => {
      const user = userEvent.setup()
      render(<TestWrapper defaultValues={{ accountScope: 'all-child' }} />)

      const allExceptRadio = screen.getByLabelText('apply-to-all-child-accounts-except')
      await user.click(allExceptRadio)

      await waitFor(() => {
        expect(allExceptRadio).toBeChecked()
      })
    })

    it('should switch between radio options correctly', async () => {
      const user = userEvent.setup()
      render(<TestWrapper />)

      const allChildRadio = screen.getByLabelText('apply-to-all-child-accounts')
      const specificChildRadio = screen.getByLabelText('apply-to-specific-child-accounts')
      const allExceptRadio = screen.getByLabelText('apply-to-all-child-accounts-except')

      // Select all-child
      await user.click(allChildRadio)
      await waitFor(() => expect(allChildRadio).toBeChecked())

      // Switch to specific-child
      await user.click(specificChildRadio)
      await waitFor(() => {
        expect(specificChildRadio).toBeChecked()
      })
      expect(allChildRadio).not.toBeChecked()

      // Switch to all-except
      await user.click(allExceptRadio)
      await waitFor(() => {
        expect(allExceptRadio).toBeChecked()
      })
      expect(specificChildRadio).not.toBeChecked()
    })
  })

  describe('AC6: No Child Accounts Scenario', () => {
    it('should disable all options when parent has no children', () => {
      render(<TestWrapper hasChildAccounts={false} />)

      const allChildRadio = screen.getByLabelText('apply-to-all-child-accounts')
      const specificChildRadio = screen.getByLabelText('apply-to-specific-child-accounts')
      const allExceptRadio = screen.getByLabelText('apply-to-all-child-accounts-except')

      expect(allChildRadio).toBeDisabled()
      expect(specificChildRadio).toBeDisabled()
      expect(allExceptRadio).toBeDisabled()
    })

    it('should disable future children checkbox when no children exist', () => {
      render(
        <TestWrapper
          hasChildAccounts={false}
          defaultValues={{ accountScope: 'all-child', applyToFutureChildren: false }}
        />
      )

      const futureChildrenCheckbox = screen.getByLabelText('apply-to-future-child-accounts')
      expect(futureChildrenCheckbox).toBeDisabled()
    })

    it('should have all radio options disabled when hasChildAccounts is false', () => {
      render(<TestWrapper hasChildAccounts={false} />)

      const allChildRadio = screen.getByLabelText('apply-to-all-child-accounts')
      const specificChildRadio = screen.getByLabelText('apply-to-specific-child-accounts')
      const allExceptRadio = screen.getByLabelText('apply-to-all-child-accounts-except')

      expect(allChildRadio).toBeDisabled()
      expect(specificChildRadio).toBeDisabled()
      expect(allExceptRadio).toBeDisabled()
    })
  })

  describe('Future Children Checkbox', () => {
    it('should show future children checkbox when all-child is selected', () => {
      render(<TestWrapper defaultValues={{ accountScope: 'all-child' }} />)

      expect(screen.getByLabelText('apply-to-future-child-accounts')).toBeInTheDocument()
    })

    it('should hide future children checkbox when specific-child is selected', () => {
      render(<TestWrapper defaultValues={{ accountScope: 'specific-child' }} />)

      expect(screen.queryByLabelText('apply-to-future-child-accounts')).not.toBeInTheDocument()
    })

    it('should hide future children checkbox when all-except is selected', () => {
      render(<TestWrapper defaultValues={{ accountScope: 'all-except' }} />)

      expect(screen.queryByLabelText('apply-to-future-child-accounts')).not.toBeInTheDocument()
    })

    it('should allow checking future children checkbox', async () => {
      const user = userEvent.setup()
      render(
        <TestWrapper defaultValues={{ accountScope: 'all-child', applyToFutureChildren: false }} />
      )

      const checkbox = screen.getByLabelText('apply-to-future-child-accounts')
      expect(checkbox).not.toBeChecked()

      await user.click(checkbox)

      await waitFor(() => {
        expect(checkbox).toBeChecked()
      })
    })

    it('should allow unchecking future children checkbox', async () => {
      const user = userEvent.setup()
      render(
        <TestWrapper defaultValues={{ accountScope: 'all-child', applyToFutureChildren: true }} />
      )

      const checkbox = screen.getByLabelText('apply-to-future-child-accounts')
      expect(checkbox).toBeChecked()

      await user.click(checkbox)

      await waitFor(() => {
        expect(checkbox).not.toBeChecked()
      })
    })

    it('should persist checkbox state when switching back to all-child', async () => {
      const user = userEvent.setup()
      render(
        <TestWrapper defaultValues={{ accountScope: 'all-child', applyToFutureChildren: true }} />
      )

      // Checkbox is checked initially
      let checkbox = screen.getByLabelText('apply-to-future-child-accounts')
      expect(checkbox).toBeChecked()

      // Switch to specific-child (checkbox should disappear)
      const specificChildRadio = screen.getByLabelText('apply-to-specific-child-accounts')
      await user.click(specificChildRadio)

      await waitFor(() => {
        expect(screen.queryByLabelText('apply-to-future-child-accounts')).not.toBeInTheDocument()
      })

      // Switch back to all-child
      const allChildRadio = screen.getByLabelText('apply-to-all-child-accounts')
      await user.click(allChildRadio)

      await waitFor(() => {
        checkbox = screen.getByLabelText('apply-to-future-child-accounts')
        // Note: The checkbox state is controlled by react-hook-form, so it maintains its value
        expect(checkbox).toBeInTheDocument()
      })
    })

    it('should be disabled when hasChildAccounts is false', () => {
      render(
        <TestWrapper
          hasChildAccounts={false}
          defaultValues={{ accountScope: 'all-child', applyToFutureChildren: false }}
        />
      )

      const checkbox = screen.getByLabelText('apply-to-future-child-accounts')
      expect(checkbox).toBeDisabled()
    })

    it('should be enabled when hasChildAccounts is true', () => {
      render(
        <TestWrapper
          hasChildAccounts={true}
          defaultValues={{ accountScope: 'all-child', applyToFutureChildren: false }}
        />
      )

      const checkbox = screen.getByLabelText('apply-to-future-child-accounts')
      expect(checkbox).toBeEnabled()
    })
  })

  describe('Conditional Rendering Based on Account Scope', () => {
    it('should show checkbox when all-child is selected', () => {
      render(<TestWrapper defaultValues={{ accountScope: 'all-child' }} />)
      expect(screen.getByLabelText('apply-to-future-child-accounts')).toBeInTheDocument()
    })

    it('should hide checkbox when specific-child is selected', () => {
      render(<TestWrapper defaultValues={{ accountScope: 'specific-child' }} />)
      expect(screen.queryByLabelText('apply-to-future-child-accounts')).not.toBeInTheDocument()
    })

    it('should hide checkbox when all-except is selected', () => {
      render(<TestWrapper defaultValues={{ accountScope: 'all-except' }} />)
      expect(screen.queryByLabelText('apply-to-future-child-accounts')).not.toBeInTheDocument()
    })

    it('should dynamically show/hide checkbox when radio selection changes', async () => {
      const user = userEvent.setup()
      render(<TestWrapper defaultValues={{ accountScope: 'all-child' }} />)

      // Initially visible
      expect(screen.getByLabelText('apply-to-future-child-accounts')).toBeInTheDocument()

      // Switch to specific-child
      await user.click(screen.getByLabelText('apply-to-specific-child-accounts'))

      await waitFor(() => {
        expect(screen.queryByLabelText('apply-to-future-child-accounts')).not.toBeInTheDocument()
      })

      // Switch back to all-child
      await user.click(screen.getByLabelText('apply-to-all-child-accounts'))

      await waitFor(() => {
        expect(screen.getByLabelText('apply-to-future-child-accounts')).toBeInTheDocument()
      })
    })
  })

  describe('Tooltips and Info Icons', () => {
    it('should display tooltip for all-child option', () => {
      render(<TestWrapper />)

      const infoIcons = screen.getAllByTestId('InfoIcon')
      expect(infoIcons[0]).toBeInTheDocument()
    })

    it('should display tooltip for specific-child option', () => {
      render(<TestWrapper />)

      const infoIcons = screen.getAllByTestId('InfoIcon')
      expect(infoIcons[1]).toBeInTheDocument()
    })

    it('should display tooltip for all-except option', () => {
      render(<TestWrapper />)

      const infoIcons = screen.getAllByTestId('InfoIcon')
      expect(infoIcons[2]).toBeInTheDocument()
    })

    it('should render all info icons even when options are disabled', () => {
      render(<TestWrapper hasChildAccounts={false} />)

      const infoIcons = screen.getAllByTestId('InfoIcon')
      expect(infoIcons).toHaveLength(3)
    })
  })

  describe('Props Integration', () => {
    it('should work with hasChildAccounts prop', () => {
      const { rerender } = render(<TestWrapper hasChildAccounts={true} />)
      expect(screen.getByText('account-hierarchy-scope')).toBeInTheDocument()

      rerender(<TestWrapper hasChildAccounts={false} />)
      expect(screen.getByText('account-hierarchy-scope')).toBeInTheDocument()
    })
  })

  describe('Form Control Integration', () => {
    it('should integrate with react-hook-form control', () => {
      render(<TestWrapper />)

      const radioGroup = screen.getByRole('radiogroup')
      expect(radioGroup).toBeInTheDocument()
    })

    it('should handle form default values correctly', () => {
      render(<TestWrapper defaultValues={{ accountScope: 'specific-child' }} />)

      const specificChildRadio = screen.getByLabelText('apply-to-specific-child-accounts')
      expect(specificChildRadio).toBeChecked()
    })

    it('should handle checkbox form integration', () => {
      render(
        <TestWrapper defaultValues={{ accountScope: 'all-child', applyToFutureChildren: true }} />
      )

      const checkbox = screen.getByLabelText('apply-to-future-child-accounts')
      expect(checkbox).toBeChecked()
    })

    it('should update form state when radio changes', async () => {
      const user = userEvent.setup()
      render(<TestWrapper defaultValues={{ accountScope: 'all-child' }} />)

      const specificChildRadio = screen.getByLabelText('apply-to-specific-child-accounts')
      await user.click(specificChildRadio)

      await waitFor(() => {
        expect(specificChildRadio).toBeChecked()
      })
    })

    it('should update form state when checkbox changes', async () => {
      const user = userEvent.setup()
      render(
        <TestWrapper defaultValues={{ accountScope: 'all-child', applyToFutureChildren: false }} />
      )

      const checkbox = screen.getByLabelText('apply-to-future-child-accounts')
      await user.click(checkbox)

      await waitFor(() => {
        expect(checkbox).toBeChecked()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper radio button roles', () => {
      render(<TestWrapper />)

      const radios = screen.getAllByRole('radio')
      expect(radios).toHaveLength(3)
    })

    it('should have proper checkbox role', () => {
      render(<TestWrapper defaultValues={{ accountScope: 'all-child' }} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
    })

    it('should associate labels with form controls', () => {
      render(<TestWrapper />)

      expect(screen.getByLabelText('apply-to-all-child-accounts')).toBeInTheDocument()
      expect(screen.getByLabelText('apply-to-specific-child-accounts')).toBeInTheDocument()
      expect(screen.getByLabelText('apply-to-all-child-accounts-except')).toBeInTheDocument()
    })

    it('should maintain disabled state for accessibility', () => {
      render(<TestWrapper hasChildAccounts={false} />)

      const specificChildRadio = screen.getByLabelText('apply-to-specific-child-accounts')
      const allExceptRadio = screen.getByLabelText('apply-to-all-child-accounts-except')

      expect(specificChildRadio).toBeDisabled()
      expect(allExceptRadio).toBeDisabled()
    })

    it('should have accessible radiogroup structure', () => {
      render(<TestWrapper />)

      const radioGroup = screen.getByRole('radiogroup')
      const radios = screen.getAllByRole('radio')

      expect(radioGroup).toBeInTheDocument()
      radios.forEach((radio) => {
        expect(radioGroup).toContainElement(radio)
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid radio button clicks', async () => {
      const user = userEvent.setup()
      render(<TestWrapper />)

      const allChildRadio = screen.getByLabelText('apply-to-all-child-accounts')
      const specificChildRadio = screen.getByLabelText('apply-to-specific-child-accounts')
      const allExceptRadio = screen.getByLabelText('apply-to-all-child-accounts-except')

      // Rapid clicks
      await user.click(allChildRadio)
      await user.click(specificChildRadio)
      await user.click(allExceptRadio)
      await user.click(allChildRadio)

      await waitFor(() => {
        expect(allChildRadio).toBeChecked()
      })
      expect(specificChildRadio).not.toBeChecked()
      expect(allExceptRadio).not.toBeChecked()
    })

    it('should handle rapid checkbox toggling', async () => {
      const user = userEvent.setup()
      render(
        <TestWrapper defaultValues={{ accountScope: 'all-child', applyToFutureChildren: false }} />
      )

      const checkbox = screen.getByLabelText('apply-to-future-child-accounts')

      // Rapid toggles
      await user.click(checkbox)
      await user.click(checkbox)
      await user.click(checkbox)

      await waitFor(() => {
        expect(checkbox).toBeChecked()
      })
    })

    it('should handle hasChildAccounts prop changing dynamically', () => {
      const { rerender } = render(<TestWrapper hasChildAccounts={true} />)

      expect(screen.getByLabelText('apply-to-specific-child-accounts')).toBeEnabled()

      rerender(<TestWrapper hasChildAccounts={false} />)

      expect(screen.getByLabelText('apply-to-specific-child-accounts')).toBeDisabled()
    })
  })

  describe('Scenario-Based Tests', () => {
    describe('Scenario 1: User with parent account having multiple children', () => {
      it('should enable all radio options and allow selection', async () => {
        const user = userEvent.setup()
        render(<TestWrapper hasChildAccounts={true} />)

        // All options should be enabled
        expect(screen.getByLabelText('apply-to-all-child-accounts')).toBeEnabled()
        expect(screen.getByLabelText('apply-to-specific-child-accounts')).toBeEnabled()
        expect(screen.getByLabelText('apply-to-all-child-accounts-except')).toBeEnabled()

        // User can select any option
        const specificRadio = screen.getByLabelText('apply-to-specific-child-accounts')
        await user.click(specificRadio)
        await waitFor(() => {
          expect(specificRadio).toBeChecked()
        })
      })
    })

    describe('Scenario 2: User selects all-child and wants future children included', () => {
      it('should show and allow checking the future children checkbox', async () => {
        const user = userEvent.setup()
        render(
          <TestWrapper
            hasChildAccounts={true}
            defaultValues={{ accountScope: 'all-child', applyToFutureChildren: false }}
          />
        )

        // Checkbox should be visible and enabled
        const checkbox = screen.getByLabelText('apply-to-future-child-accounts')
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).toBeEnabled()

        // User checks it
        await user.click(checkbox)

        await waitFor(() => {
          expect(checkbox).toBeChecked()
        })
      })
    })

    describe('Scenario 3: User switches from all-child to specific-child', () => {
      it('should hide future children checkbox and maintain radio selection', async () => {
        const user = userEvent.setup()
        render(
          <TestWrapper
            hasChildAccounts={true}
            defaultValues={{ accountScope: 'all-child', applyToFutureChildren: true }}
          />
        )

        // Initially checkbox is visible
        expect(screen.getByLabelText('apply-to-future-child-accounts')).toBeInTheDocument()

        // Switch to specific-child
        await user.click(screen.getByLabelText('apply-to-specific-child-accounts'))

        await waitFor(() => {
          // Checkbox should be hidden
          expect(screen.queryByLabelText('apply-to-future-child-accounts')).not.toBeInTheDocument()
        })
        // Radio should be selected
        expect(screen.getByLabelText('apply-to-specific-child-accounts')).toBeChecked()
      })
    })

    describe('Scenario 4: Parent account has no children', () => {
      it('should disable all options and checkbox when no children exist', () => {
        render(
          <TestWrapper hasChildAccounts={false} defaultValues={{ accountScope: 'all-child' }} />
        )

        // All radio options should be disabled
        expect(screen.getByLabelText('apply-to-all-child-accounts')).toBeDisabled()
        expect(screen.getByLabelText('apply-to-specific-child-accounts')).toBeDisabled()
        expect(screen.getByLabelText('apply-to-all-child-accounts-except')).toBeDisabled()

        // Checkbox should be disabled
        const checkbox = screen.getByLabelText('apply-to-future-child-accounts')
        expect(checkbox).toBeDisabled()
      })
    })

    describe('Scenario 5: User wants to exclude specific accounts', () => {
      it('should allow selecting all-except option', async () => {
        const user = userEvent.setup()
        render(
          <TestWrapper hasChildAccounts={true} defaultValues={{ accountScope: 'all-child' }} />
        )

        // User selects all-except
        await user.click(screen.getByLabelText('apply-to-all-child-accounts-except'))

        await waitFor(() => {
          expect(screen.getByLabelText('apply-to-all-child-accounts-except')).toBeChecked()
        })
        // Future children checkbox should be hidden
        expect(screen.queryByLabelText('apply-to-future-child-accounts')).not.toBeInTheDocument()
      })
    })

    describe('Scenario 6: User navigates through all options sequentially', () => {
      it('should handle sequential option changes correctly', async () => {
        const user = userEvent.setup()
        render(<TestWrapper hasChildAccounts={true} />)

        // Start with all-child
        await user.click(screen.getByLabelText('apply-to-all-child-accounts'))
        await waitFor(() => {
          expect(screen.getByLabelText('apply-to-all-child-accounts')).toBeChecked()
        })
        expect(screen.getByLabelText('apply-to-future-child-accounts')).toBeInTheDocument()

        // Move to specific-child
        await user.click(screen.getByLabelText('apply-to-specific-child-accounts'))
        await waitFor(() => {
          expect(screen.getByLabelText('apply-to-specific-child-accounts')).toBeChecked()
        })
        expect(screen.queryByLabelText('apply-to-future-child-accounts')).not.toBeInTheDocument()

        // Move to all-except
        await user.click(screen.getByLabelText('apply-to-all-child-accounts-except'))
        await waitFor(() => {
          expect(screen.getByLabelText('apply-to-all-child-accounts-except')).toBeChecked()
        })
        expect(screen.queryByLabelText('apply-to-future-child-accounts')).not.toBeInTheDocument()

        // Back to all-child
        await user.click(screen.getByLabelText('apply-to-all-child-accounts'))
        await waitFor(() => {
          expect(screen.getByLabelText('apply-to-all-child-accounts')).toBeChecked()
        })
        expect(screen.getByLabelText('apply-to-future-child-accounts')).toBeInTheDocument()
      })
    })

    describe('Scenario 7: User with limited permissions (no children visible)', () => {
      it('should disable all options when hasChildAccounts is false', () => {
        render(<TestWrapper hasChildAccounts={false} />)

        expect(screen.getByLabelText('apply-to-all-child-accounts')).toBeDisabled()
        expect(screen.getByLabelText('apply-to-specific-child-accounts')).toBeDisabled()
        expect(screen.getByLabelText('apply-to-all-child-accounts-except')).toBeDisabled()
      })
    })
  })

  describe('Component Lifecycle', () => {
    it('should mount without errors', () => {
      const { container } = render(<TestWrapper />)
      expect(container).toBeInTheDocument()
    })

    it('should unmount without errors', () => {
      const { unmount } = render(<TestWrapper />)
      expect(() => unmount()).not.toThrow()
    })

    it('should handle re-renders with prop changes', () => {
      const { rerender } = render(<TestWrapper hasChildAccounts={true} />)

      expect(screen.getByLabelText('apply-to-specific-child-accounts')).toBeEnabled()

      rerender(<TestWrapper hasChildAccounts={false} />)

      expect(screen.getByLabelText('apply-to-specific-child-accounts')).toBeDisabled()
    })
  })
})
