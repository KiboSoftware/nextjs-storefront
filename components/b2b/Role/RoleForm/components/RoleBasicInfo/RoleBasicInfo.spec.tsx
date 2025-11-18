import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'

import RoleBasicInfo, { RoleFormData } from './RoleBasicInfo'

import type { B2BAccount } from '@/lib/gql/types'

// Mock translations
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

// Mock KiboTextBox and KiboSelect components
jest.mock('@/components/common', () => ({
  KiboTextBox: (props: {
    label: string
    value: string
    onChange: (name: string, value: string) => void
    error: boolean
    helperText?: string
    placeholder?: string
  }) => (
    <div>
      <label>{props.label}</label>
      <input
        data-testid="role-name-input"
        value={props.value}
        onChange={(e) => props.onChange('roleName', e.target.value)}
        placeholder={props.placeholder || ''}
        aria-invalid={props.error}
      />
      {props.helperText && <span data-testid="role-name-error">{props.helperText}</span>}
    </div>
  ),
  KiboSelect: (props: {
    name: string
    label: string
    value: string
    onChange: (name: string, value: string) => void
    onBlur: () => void
    disabled: boolean
    error: boolean
    helperText?: string
    placeholder?: string
    children: React.ReactNode
  }) => (
    <div>
      <label>{props.label}</label>
      <select
        data-testid="parent-account-select"
        value={props.value}
        onChange={(e) => props.onChange(props.name, e.target.value)}
        onBlur={props.onBlur}
        disabled={props.disabled}
        aria-invalid={props.error}
      >
        {props.children}
      </select>
      {props.helperText && <span data-testid="parent-account-error">{props.helperText}</span>}
    </div>
  ),
}))

// Mock Material-UI MenuItem
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  MenuItem: ({
    value,
    children,
    disabled,
  }: {
    value: string
    children: React.ReactNode
    disabled?: boolean
  }) => (
    <option value={value} disabled={disabled}>
      {children}
    </option>
  ),
}))

const mockAccounts: B2BAccount[] = [
  {
    id: 1,
    companyOrOrganization: 'Acme Corporation',
    users: { totalCount: 5 },
  } as unknown as B2BAccount,
  {
    id: 2,
    companyOrOrganization: 'Global Industries',
    users: { totalCount: 10 },
  } as unknown as B2BAccount,
  {
    id: 3,
    companyOrOrganization: 'Tech Solutions Ltd',
    users: { totalCount: 3 },
  } as unknown as B2BAccount,
]

// Wrapper component with react-hook-form
const TestWrapper = ({
  accounts,
  onParentAccountChange,
  defaultValues,
}: {
  accounts?: B2BAccount[]
  onParentAccountChange: (value: string) => void
  defaultValues?: Partial<RoleFormData>
}) => {
  const {
    control,
    formState: { errors },
  } = useForm<RoleFormData>({
    defaultValues: {
      roleName: '',
      parentAccount: '',
      accountScope: 'all-child',
      applyToFutureChildren: false,
      selectedAccounts: [],
      selectedPermissions: {},
      ...defaultValues,
    },
    mode: 'onChange',
  })

  return (
    <RoleBasicInfo
      control={control}
      errors={errors}
      accounts={accounts}
      onParentAccountChange={onParentAccountChange}
    />
  )
}

describe('RoleBasicInfo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the component with all required elements', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />)

      expect(screen.getByText('role-information')).toBeInTheDocument()
      expect(screen.getByText('role-name')).toBeInTheDocument()
      expect(screen.getByText('parent-account')).toBeInTheDocument()
    })

    it('should render role name input field', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      const roleNameInput = screen.getByTestId('role-name-input')
      expect(roleNameInput).toBeInTheDocument()
      expect(roleNameInput).toHaveAttribute('placeholder', 'role-name-placeholder')
    })

    it('should render parent account select field', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />)

      const parentAccountSelect = screen.getByTestId('parent-account-select')
      expect(parentAccountSelect).toBeInTheDocument()
    })

    it('should render section title with proper styling', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      const sectionTitle = screen.getByText('role-information')
      expect(sectionTitle).toBeInTheDocument()
    })
  })

  describe('AC1: Display Requirements Validation', () => {
    it('should display role name field with label', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      expect(screen.getByText('role-name')).toBeInTheDocument()
      expect(screen.getByTestId('role-name-input')).toBeInTheDocument()
    })

    it('should display parent account dropdown with label', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />)

      expect(screen.getByText('parent-account')).toBeInTheDocument()
      expect(screen.getByTestId('parent-account-select')).toBeInTheDocument()
    })

    it('should display role information section header', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      const header = screen.getByText('role-information')
      expect(header).toBeInTheDocument()
    })
  })

  describe('Role Name Field Functionality', () => {
    it('should allow typing in role name field', async () => {
      const user = userEvent.setup()
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      const roleNameInput = screen.getByTestId('role-name-input')
      await user.type(roleNameInput, 'Sales Manager')

      expect(roleNameInput).toHaveValue('Sales Manager')
    })

    it('should show placeholder text in role name field', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      const roleNameInput = screen.getByTestId('role-name-input')
      expect(roleNameInput).toHaveAttribute('placeholder', 'role-name-placeholder')
    })

    it('should handle empty role name input', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      const roleNameInput = screen.getByTestId('role-name-input')
      expect(roleNameInput).toHaveValue('')
    })

    it('should accept special characters in role name', async () => {
      const user = userEvent.setup()
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      const roleNameInput = screen.getByTestId('role-name-input')
      await user.type(roleNameInput, 'Manager-Sales_2024')

      expect(roleNameInput).toHaveValue('Manager-Sales_2024')
    })

    it('should handle long role name input', async () => {
      const user = userEvent.setup()
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      const longRoleName = 'A'.repeat(100)
      const roleNameInput = screen.getByTestId('role-name-input')
      await user.type(roleNameInput, longRoleName)

      expect(roleNameInput).toHaveValue(longRoleName)
    })
  })

  describe('Parent Account Dropdown Functionality', () => {
    it('should populate dropdown with account options', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />)

      expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
      expect(screen.getByText('Global Industries')).toBeInTheDocument()
      expect(screen.getByText('Tech Solutions Ltd')).toBeInTheDocument()
    })

    it('should call onParentAccountChange when account is selected', async () => {
      const user = userEvent.setup()
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />)

      const parentAccountSelect = screen.getByTestId('parent-account-select')
      await user.selectOptions(parentAccountSelect, '1')

      expect(onParentAccountChange).toHaveBeenCalledWith('1')
      expect(onParentAccountChange).toHaveBeenCalledTimes(1)
    })

    it('should update selected value when account is changed', async () => {
      const user = userEvent.setup()
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />)

      const parentAccountSelect = screen.getByTestId('parent-account-select')
      await user.selectOptions(parentAccountSelect, '2')

      expect(parentAccountSelect).toHaveValue('2')
    })

    it('should handle multiple account selections', async () => {
      const user = userEvent.setup()
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />)

      const parentAccountSelect = screen.getByTestId('parent-account-select')

      await user.selectOptions(parentAccountSelect, '1')
      expect(onParentAccountChange).toHaveBeenCalledWith('1')

      await user.selectOptions(parentAccountSelect, '3')
      expect(onParentAccountChange).toHaveBeenCalledWith('3')

      expect(onParentAccountChange).toHaveBeenCalledTimes(2)
    })

    it('should display correct account names from data', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />)

      mockAccounts.forEach((account) => {
        expect(screen.getByText(account.companyOrOrganization as string)).toBeInTheDocument()
      })
    })
  })

  describe('Empty and Disabled States', () => {
    it('should disable parent account dropdown when no accounts are provided', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={[]} onParentAccountChange={onParentAccountChange} />)

      const parentAccountSelect = screen.getByTestId('parent-account-select')
      expect(parentAccountSelect).toBeDisabled()
    })

    it('should disable parent account dropdown when accounts is undefined', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      const parentAccountSelect = screen.getByTestId('parent-account-select')
      expect(parentAccountSelect).toBeDisabled()
    })

    it('should show no accounts message when accounts array is empty', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={[]} onParentAccountChange={onParentAccountChange} />)

      expect(screen.getByText('no-accounts-available')).toBeInTheDocument()
    })

    it('should show no accounts message option as disabled', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={[]} onParentAccountChange={onParentAccountChange} />)

      const noAccountsOption = screen.getByText('no-accounts-available')
      expect(noAccountsOption).toBeInTheDocument()
    })

    it('should enable parent account dropdown when accounts are available', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />)

      const parentAccountSelect = screen.getByTestId('parent-account-select')
      expect(parentAccountSelect).toBeEnabled()
    })
  })

  describe('Props Integration', () => {
    it('should pass control prop correctly to form fields', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      expect(screen.getByTestId('role-name-input')).toBeInTheDocument()
      expect(screen.getByTestId('parent-account-select')).toBeInTheDocument()
    })

    it('should work with provided accounts', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />)

      expect(screen.getByText('role-information')).toBeInTheDocument()
      expect(screen.getByTestId('parent-account-select')).toBeEnabled()
    })

    it('should handle different account arrays', () => {
      const onParentAccountChange = jest.fn()
      const singleAccount = [mockAccounts[0]]

      render(<TestWrapper accounts={singleAccount} onParentAccountChange={onParentAccountChange} />)

      expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
      expect(screen.queryByText('Global Industries')).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle accounts with empty companyOrOrganization', () => {
      const onParentAccountChange = jest.fn()
      const accountsWithEmpty = [
        { id: 1, companyOrOrganization: '', users: { totalCount: 5 } } as unknown as B2BAccount,
      ]

      render(
        <TestWrapper accounts={accountsWithEmpty} onParentAccountChange={onParentAccountChange} />
      )

      expect(screen.getByTestId('parent-account-select')).toBeInTheDocument()
    })

    it('should handle accounts with null or undefined names', () => {
      const onParentAccountChange = jest.fn()
      const accountsWithNull: B2BAccount[] = [
        { id: 1, companyOrOrganization: null, users: { totalCount: 5 } } as unknown as B2BAccount,
      ]

      render(
        <TestWrapper accounts={accountsWithNull} onParentAccountChange={onParentAccountChange} />
      )

      expect(screen.getByTestId('parent-account-select')).toBeInTheDocument()
    })

    it('should handle accounts with very long names', () => {
      const onParentAccountChange = jest.fn()
      const longName = 'A'.repeat(200)
      const accountsWithLongName = [
        {
          id: 1,
          companyOrOrganization: longName,
          users: { totalCount: 5 },
        } as unknown as B2BAccount,
      ]

      render(
        <TestWrapper
          accounts={accountsWithLongName}
          onParentAccountChange={onParentAccountChange}
        />
      )

      expect(screen.getByText(longName)).toBeInTheDocument()
    })

    it('should handle accounts with special characters in names', () => {
      const onParentAccountChange = jest.fn()
      const specialName = 'Company & Co. (Ltd) - 2024'
      const accountsWithSpecialChars = [
        {
          id: 1,
          companyOrOrganization: specialName,
          users: { totalCount: 5 },
        } as unknown as B2BAccount,
      ]

      render(
        <TestWrapper
          accounts={accountsWithSpecialChars}
          onParentAccountChange={onParentAccountChange}
        />
      )

      expect(screen.getByText(specialName)).toBeInTheDocument()
    })

    it('should handle large number of accounts', () => {
      const onParentAccountChange = jest.fn()
      const manyAccounts = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        companyOrOrganization: `Account ${i + 1}`,
        users: { totalCount: i },
      })) as unknown as B2BAccount[]

      render(<TestWrapper accounts={manyAccounts} onParentAccountChange={onParentAccountChange} />)

      expect(screen.getByTestId('parent-account-select')).toBeInTheDocument()
      expect(screen.getByText('Account 1')).toBeInTheDocument()
      expect(screen.getByText('Account 100')).toBeInTheDocument()
    })
  })

  describe('Scenario-Based Tests', () => {
    describe('Scenario 1: User creates a new role with valid data', () => {
      it('should allow entering role name and selecting parent account', async () => {
        const user = userEvent.setup()
        const onParentAccountChange = jest.fn()

        render(
          <TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />
        )

        // Step 1: Enter role name
        const roleNameInput = screen.getByTestId('role-name-input')
        await user.type(roleNameInput, 'Sales Manager')
        expect(roleNameInput).toHaveValue('Sales Manager')

        // Step 2: Select parent account
        const parentAccountSelect = screen.getByTestId('parent-account-select')
        await user.selectOptions(parentAccountSelect, '1')
        expect(onParentAccountChange).toHaveBeenCalledWith('1')
        expect(parentAccountSelect).toHaveValue('1')
      })
    })

    describe('Scenario 2: User tries to select parent account without any available accounts', () => {
      it('should disable dropdown and show no accounts message', () => {
        const onParentAccountChange = jest.fn()

        render(<TestWrapper accounts={[]} onParentAccountChange={onParentAccountChange} />)

        const parentAccountSelect = screen.getByTestId('parent-account-select')
        expect(parentAccountSelect).toBeDisabled()
        expect(screen.getByText('no-accounts-available')).toBeInTheDocument()
      })
    })

    describe('Scenario 3: User changes parent account selection', () => {
      it('should update selection and trigger callback', async () => {
        const user = userEvent.setup()
        const onParentAccountChange = jest.fn()

        render(
          <TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />
        )

        const parentAccountSelect = screen.getByTestId('parent-account-select')

        // First selection
        await user.selectOptions(parentAccountSelect, '1')
        expect(onParentAccountChange).toHaveBeenCalledWith('1')

        // Change selection
        await user.selectOptions(parentAccountSelect, '2')
        expect(onParentAccountChange).toHaveBeenCalledWith('2')
        expect(onParentAccountChange).toHaveBeenCalledTimes(2)
      })
    })

    describe('Scenario 4: User enters role name with special characters', () => {
      it('should accept and display special characters in role name', async () => {
        const user = userEvent.setup()
        const onParentAccountChange = jest.fn()

        render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

        const roleNameInput = screen.getByTestId('role-name-input')
        await user.type(roleNameInput, 'Manager-Level_1 (Sales & Marketing)')

        expect(roleNameInput).toHaveValue('Manager-Level_1 (Sales & Marketing)')
      })
    })

    describe('Scenario 5: User with single account available', () => {
      it('should show only one account option', () => {
        const onParentAccountChange = jest.fn()
        const singleAccount = [mockAccounts[0]]

        render(
          <TestWrapper accounts={singleAccount} onParentAccountChange={onParentAccountChange} />
        )

        expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
        expect(screen.queryByText('Global Industries')).not.toBeInTheDocument()
        expect(screen.queryByText('Tech Solutions Ltd')).not.toBeInTheDocument()
      })
    })

    describe('Scenario 6: User interacts with all form fields sequentially', () => {
      it('should maintain form state across interactions', async () => {
        const user = userEvent.setup()
        const onParentAccountChange = jest.fn()

        render(
          <TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />
        )

        // Enter role name
        const roleNameInput = screen.getByTestId('role-name-input')
        await user.type(roleNameInput, 'Test Role')
        expect(roleNameInput).toHaveValue('Test Role')

        // Select account
        const parentAccountSelect = screen.getByTestId('parent-account-select')
        await user.selectOptions(parentAccountSelect, '2')
        expect(parentAccountSelect).toHaveValue('2')

        // Verify role name still has value
        expect(roleNameInput).toHaveValue('Test Role')
      })
    })

    describe('Scenario 7: User clears and re-enters role name', () => {
      it('should handle clearing and re-entering role name', async () => {
        const user = userEvent.setup()
        const onParentAccountChange = jest.fn()

        render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

        const roleNameInput = screen.getByTestId('role-name-input')

        // Enter initial value
        await user.type(roleNameInput, 'Initial Name')
        expect(roleNameInput).toHaveValue('Initial Name')

        // Clear
        await user.clear(roleNameInput)
        expect(roleNameInput).toHaveValue('')

        // Re-enter
        await user.type(roleNameInput, 'New Name')
        expect(roleNameInput).toHaveValue('New Name')
      })
    })

    describe('Scenario 8: Component receives updated accounts prop', () => {
      it('should display new accounts when props change', () => {
        const onParentAccountChange = jest.fn()
        const { rerender } = render(
          <TestWrapper accounts={[mockAccounts[0]]} onParentAccountChange={onParentAccountChange} />
        )

        expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
        expect(screen.queryByText('Global Industries')).not.toBeInTheDocument()

        // Update with all accounts
        rerender(
          <TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />
        )

        expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
        expect(screen.getByText('Global Industries')).toBeInTheDocument()
        expect(screen.getByText('Tech Solutions Ltd')).toBeInTheDocument()
      })
    })

    describe('Scenario 9: Multiple rapid account selections', () => {
      it('should handle rapid selections correctly', async () => {
        const user = userEvent.setup()
        const onParentAccountChange = jest.fn()

        render(
          <TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />
        )

        const parentAccountSelect = screen.getByTestId('parent-account-select')

        // Rapid selections
        await user.selectOptions(parentAccountSelect, '1')
        await user.selectOptions(parentAccountSelect, '2')
        await user.selectOptions(parentAccountSelect, '3')

        expect(onParentAccountChange).toHaveBeenCalledTimes(3)
        expect(onParentAccountChange).toHaveBeenNthCalledWith(1, '1')
        expect(onParentAccountChange).toHaveBeenNthCalledWith(2, '2')
        expect(onParentAccountChange).toHaveBeenNthCalledWith(3, '3')
        expect(parentAccountSelect).toHaveValue('3')
      })
    })

    describe('Scenario 10: Complete form filling workflow', () => {
      it('should support complete user workflow from start to finish', async () => {
        const user = userEvent.setup()
        const onParentAccountChange = jest.fn()

        render(
          <TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />
        )

        // User sees the form
        expect(screen.getByText('role-information')).toBeInTheDocument()

        // User fills role name
        const roleNameInput = screen.getByTestId('role-name-input')
        await user.type(roleNameInput, 'Regional Manager')
        expect(roleNameInput).toHaveValue('Regional Manager')

        // User reviews available accounts
        expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
        expect(screen.getByText('Global Industries')).toBeInTheDocument()

        // User selects parent account
        const parentAccountSelect = screen.getByTestId('parent-account-select')
        await user.selectOptions(parentAccountSelect, '2')
        expect(onParentAccountChange).toHaveBeenCalledWith('2')

        // Verify final state
        expect(roleNameInput).toHaveValue('Regional Manager')
        expect(parentAccountSelect).toHaveValue('2')
      })
    })
  })

  describe('Component Integration', () => {
    it('should work correctly with react-hook-form Controller', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      expect(screen.getByTestId('role-name-input')).toBeInTheDocument()
      expect(screen.getByTestId('parent-account-select')).toBeInTheDocument()
    })

    it('should maintain form state across re-renders', () => {
      const onParentAccountChange = jest.fn()
      const { rerender } = render(
        <TestWrapper
          accounts={mockAccounts}
          onParentAccountChange={onParentAccountChange}
          defaultValues={{ roleName: 'Test Role' }}
        />
      )

      expect(screen.getByTestId('role-name-input')).toHaveValue('Test Role')

      rerender(
        <TestWrapper
          accounts={mockAccounts}
          onParentAccountChange={onParentAccountChange}
          defaultValues={{ roleName: 'Test Role' }}
        />
      )

      expect(screen.getByTestId('role-name-input')).toHaveValue('Test Role')
    })

    it('should handle component unmount gracefully', () => {
      const onParentAccountChange = jest.fn()
      const { unmount } = render(
        <TestWrapper accounts={mockAccounts} onParentAccountChange={onParentAccountChange} />
      )

      expect(() => unmount()).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('should have proper labels for form fields', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      expect(screen.getByText('role-name')).toBeInTheDocument()
      expect(screen.getByText('parent-account')).toBeInTheDocument()
    })

    it('should set aria-invalid on role name input when error exists', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      const roleNameInput = screen.getByTestId('role-name-input')
      // Initially no error
      expect(roleNameInput).toHaveAttribute('aria-invalid', 'false')
    })

    it('should set aria-invalid on parent account select when error exists', () => {
      const onParentAccountChange = jest.fn()

      render(<TestWrapper onParentAccountChange={onParentAccountChange} />)

      const parentAccountSelect = screen.getByTestId('parent-account-select')
      // Initially no error
      expect(parentAccountSelect).toHaveAttribute('aria-invalid', 'false')
    })
  })
})
