import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PermissionSelector from './PermissionSelector'

// Mock translations
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

interface BehaviorCategory {
  id?: number
  name?: string
}

interface Behavior {
  id?: number
  name?: string
  categoryId?: number
}

const createMockBehaviorCategory = (id: number, name: string): BehaviorCategory => ({
  id,
  name,
})

const createMockBehavior = (id: number, name: string, categoryId: number): Behavior => ({
  id,
  name,
  categoryId,
})

const mockBehaviorCategories = {
  items: [
    createMockBehaviorCategory(1, 'Roles'),
    createMockBehaviorCategory(2, 'Users'),
    createMockBehaviorCategory(3, 'Orders'),
    createMockBehaviorCategory(4, 'Returns'),
  ],
}

const mockBehaviors = {
  items: [
    createMockBehavior(1, 'Create Role', 1),
    createMockBehavior(2, 'Edit Role', 1),
    createMockBehavior(3, 'Delete Role', 1),
    createMockBehavior(4, 'Create User', 2),
    createMockBehavior(5, 'Edit User', 2),
    createMockBehavior(6, 'View Orders', 3),
    createMockBehavior(7, 'Create Orders', 3),
    createMockBehavior(8, 'Process Returns', 4),
  ],
}

const defaultProps = {
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  selectedPermissions: {},
  permissionError: '',
  onBehaviorToggle: jest.fn(),
  onBehaviorNameCheckboxChange: jest.fn(),
  getAllSelectedBehaviors: jest.fn(() => []),
  handleRemoveBehavior: jest.fn(),
}

describe('PermissionSelector Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the component with title and description', () => {
      render(<PermissionSelector {...defaultProps} />)

      expect(screen.getByText('permission-configuration')).toBeInTheDocument()
      expect(screen.getByText('permission-configuration-description')).toBeInTheDocument()
    })

    it('should render three main columns', () => {
      render(<PermissionSelector {...defaultProps} />)

      expect(screen.getByText('behavior-category')).toBeInTheDocument()
      expect(screen.getByText('behavior-name')).toBeInTheDocument()
      expect(screen.getByText('selected-behavior')).toBeInTheDocument()
    })

    it('should render all behavior categories', () => {
      render(<PermissionSelector {...defaultProps} />)

      expect(screen.getByText('Roles')).toBeInTheDocument()
      expect(screen.getByText('Users')).toBeInTheDocument()
      expect(screen.getByText('Orders')).toBeInTheDocument()
      expect(screen.getByText('Returns')).toBeInTheDocument()
    })

    it('should render behaviors for selected category', () => {
      render(<PermissionSelector {...defaultProps} />)

      expect(screen.getByText('Create Role')).toBeInTheDocument()
      expect(screen.getByText('Edit Role')).toBeInTheDocument()
      expect(screen.getByText('Delete Role')).toBeInTheDocument()
    })

    it('should highlight selected category when clicked', async () => {
      const user = userEvent.setup()
      render(<PermissionSelector {...defaultProps} />)

      await user.click(screen.getByText('Users'))

      const usersButton = screen.getByRole('button', { name: 'Users' })
      expect(usersButton).toHaveClass('Mui-selected')
    })

    it('should render header checkbox for selecting all behaviors', () => {
      render(<PermissionSelector {...defaultProps} />)

      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBeGreaterThan(0)
    })
  })

  describe('AC7: Permission Categories Configuration', () => {
    it('should display all provided behavior categories', () => {
      const elevenCategories = {
        items: Array.from({ length: 11 }, (_, i) =>
          createMockBehaviorCategory(i + 1, `Category ${i + 1}`)
        ),
      }

      render(<PermissionSelector {...defaultProps} behaviorCategories={elevenCategories} />)

      elevenCategories.items.forEach((cat) => {
        if (cat.name) {
          expect(screen.getByText(cat.name)).toBeInTheDocument()
        }
      })
    })

    it('should allow clicking on category to select it', async () => {
      const user = userEvent.setup()
      render(<PermissionSelector {...defaultProps} />)

      const usersCategory = screen.getByText('Users')
      await user.click(usersCategory)

      // Verify the category becomes selected (visually indicated)
      const usersButton = screen.getByRole('button', { name: 'Users' })
      expect(usersButton).toHaveClass('Mui-selected')
    })

    it('should show behaviors for the selected category', async () => {
      const user = userEvent.setup()
      render(<PermissionSelector {...defaultProps} />)

      // Click on Users category to select it
      await user.click(screen.getByText('Users'))

      // Behaviors for Users category should now be displayed
      expect(screen.getByText('Create User')).toBeInTheDocument()
      expect(screen.getByText('Edit User')).toBeInTheDocument()
    })

    it('should allow selecting individual behaviors', async () => {
      const user = userEvent.setup()
      const onBehaviorToggle = jest.fn()

      render(<PermissionSelector {...defaultProps} onBehaviorToggle={onBehaviorToggle} />)

      await user.click(screen.getByText('Create Role'))

      expect(onBehaviorToggle).toHaveBeenCalledWith(1, 1)
      expect(onBehaviorToggle).toHaveBeenCalledTimes(1)
    })

    it('should show checkbox as checked for selected behaviors', () => {
      const selectedPermissions = {
        1: [1, 2],
      }

      render(<PermissionSelector {...defaultProps} selectedPermissions={selectedPermissions} />)

      const checkboxes = screen.getAllByRole('checkbox')
      // Filter to find the checked behavior checkboxes (excluding header checkbox)
      const checkedCheckboxes = checkboxes.filter((cb) => cb.getAttribute('checked') !== null)

      expect(checkedCheckboxes.length).toBeGreaterThan(0)
    })
  })

  describe('Select All Functionality', () => {
    it('should call onBehaviorNameCheckboxChange when header checkbox is clicked', async () => {
      const user = userEvent.setup()
      const onBehaviorNameCheckboxChange = jest.fn()

      render(
        <PermissionSelector
          {...defaultProps}
          onBehaviorNameCheckboxChange={onBehaviorNameCheckboxChange}
        />
      )

      const headerCheckbox = screen.getAllByRole('checkbox')[0]
      await user.click(headerCheckbox)

      expect(onBehaviorNameCheckboxChange).toHaveBeenCalledTimes(1)
    })

    it('should show header checkbox as checked when all behaviors are selected', () => {
      const selectedPermissions = {
        1: [1, 2, 3],
      }

      render(<PermissionSelector {...defaultProps} selectedPermissions={selectedPermissions} />)

      const headerCheckbox = screen.getAllByRole('checkbox')[0]
      expect(headerCheckbox).toBeChecked()
    })

    it('should show header checkbox as unchecked when no behaviors are selected', () => {
      render(<PermissionSelector {...defaultProps} selectedPermissions={{}} />)

      const headerCheckbox = screen.getAllByRole('checkbox')[0]
      expect(headerCheckbox).not.toBeChecked()
    })

    it('should show header checkbox as indeterminate when some behaviors are selected', () => {
      const selectedPermissions = {
        1: [1],
      }

      render(<PermissionSelector {...defaultProps} selectedPermissions={selectedPermissions} />)

      const headerCheckbox = screen.getAllByRole('checkbox')[0]
      expect(headerCheckbox).toHaveAttribute('data-indeterminate', 'true')
    })

    it('should handle select all with category that has no behaviors', () => {
      const emptyBehaviors = { items: [] }
      const onBehaviorNameCheckboxChange = jest.fn()

      render(
        <PermissionSelector
          {...defaultProps}
          behaviors={emptyBehaviors}
          onBehaviorNameCheckboxChange={onBehaviorNameCheckboxChange}
        />
      )

      const headerCheckbox = screen.getAllByRole('checkbox')[0]
      expect(headerCheckbox).not.toBeChecked()
    })
  })

  describe('Selected Behaviors Display', () => {
    it('should show empty state when no behaviors are selected', () => {
      render(<PermissionSelector {...defaultProps} getAllSelectedBehaviors={() => []} />)

      expect(screen.getByText('no-behaviors-selected')).toBeInTheDocument()
    })

    it('should display selected behaviors in the third column', () => {
      const getAllSelectedBehaviors = jest.fn(() => [
        { category: 1, behavior: 1 },
        { category: 1, behavior: 2 },
      ])

      render(
        <PermissionSelector {...defaultProps} getAllSelectedBehaviors={getAllSelectedBehaviors} />
      )

      // Verify empty state is not shown when behaviors are selected
      expect(screen.queryByText('no-behaviors-selected')).not.toBeInTheDocument()
      // Verify selected behaviors column header is present
      expect(screen.getByText('selected-behavior')).toBeInTheDocument()
      // Verify behaviors appear (they will appear in both middle and right columns)
      const createRoleElements = screen.getAllByText('Create Role')
      expect(createRoleElements.length).toBe(2) // One in middle column, one in selected column
    })

    it('should show remove button for each selected behavior', () => {
      const getAllSelectedBehaviors = jest.fn(() => [
        { category: 1, behavior: 1 },
        { category: 1, behavior: 2 },
      ])

      render(
        <PermissionSelector {...defaultProps} getAllSelectedBehaviors={getAllSelectedBehaviors} />
      )

      const closeIcons = screen.getAllByTestId('CloseIcon')
      expect(closeIcons.length).toBe(2)
    })

    it('should call handleRemoveBehavior when remove button is clicked', async () => {
      const user = userEvent.setup()
      const handleRemoveBehavior = jest.fn()
      const getAllSelectedBehaviors = jest.fn(() => [{ category: 1, behavior: 1 }])

      render(
        <PermissionSelector
          {...defaultProps}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
          handleRemoveBehavior={handleRemoveBehavior}
        />
      )

      // The CloseIcon is in the selected behaviors column
      const closeIcon = screen.getByTestId('CloseIcon')
      await user.click(closeIcon)

      expect(handleRemoveBehavior).toHaveBeenCalledWith(1, 1)
    })

    it('should display behavior names from behaviors list', () => {
      const getAllSelectedBehaviors = jest.fn(() => [
        { category: 2, behavior: 4 },
        { category: 2, behavior: 5 },
      ])

      render(
        <PermissionSelector {...defaultProps} getAllSelectedBehaviors={getAllSelectedBehaviors} />
      )

      expect(screen.getByText('Create User')).toBeInTheDocument()
      expect(screen.getByText('Edit User')).toBeInTheDocument()
    })

    it('should handle unknown behaviors gracefully', () => {
      const getAllSelectedBehaviors = jest.fn(() => [{ category: 1, behavior: 999 }])

      render(
        <PermissionSelector {...defaultProps} getAllSelectedBehaviors={getAllSelectedBehaviors} />
      )

      // Component doesn't display fallback text for unknown behaviors
      // It just renders the list item without text
      expect(screen.queryByText('Behavior 999')).not.toBeInTheDocument()
      expect(screen.getByText('selected-behavior')).toBeInTheDocument()
    })
  })

  describe('Permission Error Display', () => {
    it('should display error message when permissionError is provided', () => {
      const errorMessage = 'At least one permission is required'

      render(<PermissionSelector {...defaultProps} permissionError={errorMessage} />)

      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('should not display error message when permissionError is empty', () => {
      render(<PermissionSelector {...defaultProps} permissionError="" />)

      const errorElements = screen.queryAllByRole('alert')
      expect(errorElements.length).toBe(0)
    })

    it('should display error message with error styling', () => {
      const errorMessage = 'Error message'

      render(<PermissionSelector {...defaultProps} permissionError={errorMessage} />)

      const errorElement = screen.getByText(errorMessage)
      // Verify error message is displayed
      expect(errorElement).toBeInTheDocument()
      expect(errorElement.tagName).toBe('P')
    })
  })

  describe('Category Selection Behavior', () => {
    it('should select category when clicked', async () => {
      const user = userEvent.setup()
      render(<PermissionSelector {...defaultProps} />)

      // Click Roles category
      await user.click(screen.getByText('Roles'))
      expect(screen.getByRole('button', { name: 'Roles' })).toHaveClass('Mui-selected')

      // Click Users category
      await user.click(screen.getByText('Users'))
      expect(screen.getByRole('button', { name: 'Users' })).toHaveClass('Mui-selected')

      // Click Orders category
      await user.click(screen.getByText('Orders'))
      expect(screen.getByRole('button', { name: 'Orders' })).toHaveClass('Mui-selected')
    })

    it('should visually indicate the currently selected category', async () => {
      const user = userEvent.setup()
      render(<PermissionSelector {...defaultProps} />)

      await user.click(screen.getByText('Orders'))

      const ordersButton = screen.getByRole('button', { name: 'Orders' })
      expect(ordersButton).toHaveClass('Mui-selected')
    })

    it('should update behaviors list when category changes', async () => {
      const user = userEvent.setup()
      render(<PermissionSelector {...defaultProps} />)

      // Initially shows Roles behaviors
      expect(screen.getByText('Create Role')).toBeInTheDocument()

      // Switch to Orders category
      await user.click(screen.getByText('Orders'))

      // Should now show Orders behaviors
      expect(screen.getByText('View Orders')).toBeInTheDocument()
    })
  })

  describe('Behavior Toggle Functionality', () => {
    it('should toggle behavior selection when clicked', async () => {
      const user = userEvent.setup()
      const onBehaviorToggle = jest.fn()

      render(<PermissionSelector {...defaultProps} onBehaviorToggle={onBehaviorToggle} />)

      await user.click(screen.getByText('Edit Role'))

      expect(onBehaviorToggle).toHaveBeenCalledWith(1, 2)
    })

    it('should handle multiple behavior toggles', async () => {
      const user = userEvent.setup()
      const onBehaviorToggle = jest.fn()

      render(<PermissionSelector {...defaultProps} onBehaviorToggle={onBehaviorToggle} />)

      await user.click(screen.getByText('Create Role'))
      await user.click(screen.getByText('Edit Role'))
      await user.click(screen.getByText('Delete Role'))

      expect(onBehaviorToggle).toHaveBeenCalledTimes(3)
      expect(onBehaviorToggle).toHaveBeenNthCalledWith(1, 1, 1)
      expect(onBehaviorToggle).toHaveBeenNthCalledWith(2, 1, 2)
      expect(onBehaviorToggle).toHaveBeenNthCalledWith(3, 1, 3)
    })

    it('should show checkbox as checked for toggled behaviors', () => {
      const selectedPermissions = {
        1: [2],
      }

      render(<PermissionSelector {...defaultProps} selectedPermissions={selectedPermissions} />)

      const checkboxes = screen.getAllByRole('checkbox')
      // The second behavior (Edit Role) should be checked (skip header checkbox at index 0)
      const behaviorCheckboxes = checkboxes.slice(1)
      const checkedCheckboxes = behaviorCheckboxes.filter((cb) => cb.hasAttribute('checked'))
      expect(checkedCheckboxes.length).toBeGreaterThan(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty behavior categories', () => {
      render(<PermissionSelector {...defaultProps} behaviorCategories={{ items: [] }} />)

      expect(screen.getByText('behavior-category')).toBeInTheDocument()
    })

    it('should handle undefined behavior categories', () => {
      render(<PermissionSelector {...defaultProps} behaviorCategories={undefined} />)

      expect(screen.getByText('behavior-category')).toBeInTheDocument()
    })

    it('should handle empty behaviors list', () => {
      render(<PermissionSelector {...defaultProps} behaviors={{ items: [] }} />)

      expect(screen.getByText('behavior-name')).toBeInTheDocument()
    })

    it('should handle undefined behaviors', () => {
      render(<PermissionSelector {...defaultProps} behaviors={undefined} />)

      expect(screen.getByText('selected-behavior')).toBeInTheDocument()
    })

    it('should handle empty behavior categories gracefully', () => {
      render(<PermissionSelector {...defaultProps} behaviorCategories={{ items: [] }} />)

      expect(screen.getByText('permission-configuration')).toBeInTheDocument()
    })

    it('should handle category with no behaviors', () => {
      render(<PermissionSelector {...defaultProps} behaviors={{ items: [] }} />)

      const behaviorHeader = screen.getByText('behavior-name')
      expect(behaviorHeader).toBeInTheDocument()
    })

    it('should handle categories without id or name', () => {
      const categoriesWithMissingData = {
        items: [{ id: 1 }, { name: 'Test' }, {}],
      }

      render(
        <PermissionSelector {...defaultProps} behaviorCategories={categoriesWithMissingData} />
      )

      expect(screen.getByText('behavior-category')).toBeInTheDocument()
    })

    it('should handle behaviors without id or name', () => {
      const behaviorsWithMissingData = {
        items: [{ id: 1, categoryId: 1 }, { name: 'Test', categoryId: 1 }, { categoryId: 1 }],
      }

      render(<PermissionSelector {...defaultProps} behaviors={behaviorsWithMissingData} />)

      expect(screen.getByText('behavior-name')).toBeInTheDocument()
    })
  })

  describe('Scenario-Based Tests', () => {
    describe('Scenario 1: User selects a category and views its behaviors', () => {
      it('should display category behaviors when category is selected', async () => {
        const user = userEvent.setup()
        render(<PermissionSelector {...defaultProps} />)

        // User clicks on Users category
        await user.click(screen.getByText('Users'))

        // Verify category is visually selected
        const usersButton = screen.getByRole('button', { name: 'Users' })
        expect(usersButton).toHaveClass('Mui-selected')

        // Verify behaviors for Users category are displayed
        expect(screen.getByText('Create User')).toBeInTheDocument()
        expect(screen.getByText('Edit User')).toBeInTheDocument()
      })
    })

    describe('Scenario 2: User selects individual permissions', () => {
      it('should allow selecting multiple individual permissions', async () => {
        const user = userEvent.setup()
        const onBehaviorToggle = jest.fn()

        render(<PermissionSelector {...defaultProps} onBehaviorToggle={onBehaviorToggle} />)

        // User selects multiple permissions
        await user.click(screen.getByText('Create Role'))
        await user.click(screen.getByText('Edit Role'))

        expect(onBehaviorToggle).toHaveBeenCalledTimes(2)
        expect(onBehaviorToggle).toHaveBeenCalledWith(1, 1)
        expect(onBehaviorToggle).toHaveBeenCalledWith(1, 2)
      })
    })

    describe('Scenario 3: User selects all permissions in a category', () => {
      it('should trigger select all when header checkbox is clicked', async () => {
        const user = userEvent.setup()
        const onBehaviorNameCheckboxChange = jest.fn()

        render(
          <PermissionSelector
            {...defaultProps}
            onBehaviorNameCheckboxChange={onBehaviorNameCheckboxChange}
          />
        )

        const headerCheckbox = screen.getAllByRole('checkbox')[0]
        await user.click(headerCheckbox)

        expect(onBehaviorNameCheckboxChange).toHaveBeenCalledTimes(1)
      })
    })

    describe('Scenario 4: User removes a selected permission', () => {
      it('should call handleRemoveBehavior when user clicks remove button', async () => {
        const user = userEvent.setup()
        const handleRemoveBehavior = jest.fn()
        const getAllSelectedBehaviors = jest.fn(() => [
          { category: 1, behavior: 1 },
          { category: 1, behavior: 2 },
        ])

        render(
          <PermissionSelector
            {...defaultProps}
            getAllSelectedBehaviors={getAllSelectedBehaviors}
            handleRemoveBehavior={handleRemoveBehavior}
          />
        )

        // Find and click first remove button (first CloseIcon)
        const closeIcons = screen.getAllByTestId('CloseIcon')
        await user.click(closeIcons[0])

        expect(handleRemoveBehavior).toHaveBeenCalledWith(1, 1)
      })
    })

    describe('Scenario 5: User switches between categories', () => {
      it('should update displayed behaviors when switching categories', async () => {
        const user = userEvent.setup()
        render(<PermissionSelector {...defaultProps} />)

        // Initially, first category (Roles) is selected
        expect(screen.getByText('Create Role')).toBeInTheDocument()

        // Switch to Orders category
        await user.click(screen.getByText('Orders'))

        // Verify Orders category is now selected
        const ordersButton = screen.getByRole('button', { name: 'Orders' })
        expect(ordersButton).toHaveClass('Mui-selected')

        // Verify behaviors for Orders category are displayed
        expect(screen.getByText('View Orders')).toBeInTheDocument()
        expect(screen.getByText('Create Orders')).toBeInTheDocument()
      })
    })

    describe('Scenario 6: User sees validation error', () => {
      it('should display error message when no permissions are selected', () => {
        const errorMessage = 'At least one permission is required'

        render(<PermissionSelector {...defaultProps} permissionError={errorMessage} />)

        expect(screen.getByText(errorMessage)).toBeInTheDocument()
      })
    })

    describe('Scenario 7: User with many categories and behaviors', () => {
      it('should handle large number of categories and behaviors', () => {
        const manyCategories = {
          items: Array.from({ length: 20 }, (_, i) =>
            createMockBehaviorCategory(i + 1, `Category ${i + 1}`)
          ),
        }

        const manyBehaviors = {
          items: Array.from({ length: 50 }, (_, i) =>
            createMockBehavior(i + 1, `Behavior ${i + 1}`, 1)
          ),
        }

        render(
          <PermissionSelector
            {...defaultProps}
            behaviorCategories={manyCategories}
            behaviors={manyBehaviors}
          />
        )

        expect(screen.getByText('Category 1')).toBeInTheDocument()
        expect(screen.getByText('Category 20')).toBeInTheDocument()
        expect(screen.getByText('Behavior 1')).toBeInTheDocument()
      })
    })

    describe('Scenario 8: Complete permission selection workflow', () => {
      it('should handle complete workflow from selection to display', async () => {
        const user = userEvent.setup()
        const onBehaviorToggle = jest.fn()
        const handleRemoveBehavior = jest.fn()

        const getAllSelectedBehaviors = jest.fn(
          () => [] as Array<{ category: number; behavior: number }>
        )

        const { rerender } = render(
          <PermissionSelector
            {...defaultProps}
            onBehaviorToggle={onBehaviorToggle}
            handleRemoveBehavior={handleRemoveBehavior}
            getAllSelectedBehaviors={getAllSelectedBehaviors}
          />
        )

        // Step 1: Verify first category is selected by default
        const rolesButton = screen.getByRole('button', { name: 'Roles' })
        expect(rolesButton).toHaveClass('Mui-selected')

        // Step 2: Select behaviors
        await user.click(screen.getByText('Create Role'))
        expect(onBehaviorToggle).toHaveBeenCalledWith(1, 1)

        await user.click(screen.getByText('Edit Role'))
        expect(onBehaviorToggle).toHaveBeenCalledWith(1, 2)

        // Step 3: Simulate selected behaviors appearing in third column
        getAllSelectedBehaviors.mockReturnValue([
          { category: 1, behavior: 1 },
          { category: 1, behavior: 2 },
        ] as Array<{ category: number; behavior: number }>)

        rerender(
          <PermissionSelector
            {...defaultProps}
            selectedPermissions={{ 1: [1, 2] }}
            onBehaviorToggle={onBehaviorToggle}
            handleRemoveBehavior={handleRemoveBehavior}
            getAllSelectedBehaviors={getAllSelectedBehaviors}
          />
        )

        // Verify behaviors are shown in selected column
        expect(screen.getByText('selected-behavior')).toBeInTheDocument()
        const createRoleElements = screen.getAllByText('Create Role')
        expect(createRoleElements.length).toBeGreaterThanOrEqual(1)
        const editRoleElements = screen.getAllByText('Edit Role')
        expect(editRoleElements.length).toBeGreaterThanOrEqual(1)
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper list structure', () => {
      render(<PermissionSelector {...defaultProps} />)

      const lists = screen.getAllByRole('list')
      expect(lists.length).toBeGreaterThan(0)
    })

    it('should have clickable list items for categories', () => {
      render(<PermissionSelector {...defaultProps} />)

      // Find button that contains 'Roles' text
      const allButtons = screen.getAllByRole('button')
      const rolesButton = allButtons.find((btn) => btn.textContent === 'Roles')
      expect(rolesButton).toBeDefined()
    })

    it('should have checkboxes with proper roles', () => {
      render(<PermissionSelector {...defaultProps} />)

      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeInTheDocument()
      })
    })

    it('should have icon buttons for removing behaviors', () => {
      const getAllSelectedBehaviors = jest.fn(() => [{ category: 1, behavior: 1 }])

      render(
        <PermissionSelector {...defaultProps} getAllSelectedBehaviors={getAllSelectedBehaviors} />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  describe('Component Integration', () => {
    it('should work with all props provided', () => {
      const props = {
        ...defaultProps,
        selectedPermissions: { 1: [1, 2] },
        permissionError: 'Test error',
        getAllSelectedBehaviors: () => [
          { category: 1, behavior: 1 },
          { category: 1, behavior: 2 },
        ],
      }

      render(<PermissionSelector {...props} />)

      expect(screen.getByText('permission-configuration')).toBeInTheDocument()
      expect(screen.getByText('Test error')).toBeInTheDocument()
    })

    it('should handle state updates correctly', () => {
      const { rerender } = render(<PermissionSelector {...defaultProps} />)

      expect(screen.getByText('no-behaviors-selected')).toBeInTheDocument()

      const getAllSelectedBehaviors = jest.fn(() => [{ category: 1, behavior: 1 }])

      rerender(
        <PermissionSelector {...defaultProps} getAllSelectedBehaviors={getAllSelectedBehaviors} />
      )

      const createRoleElements = screen.getAllByText('Create Role')
      expect(createRoleElements.length).toBeGreaterThanOrEqual(1)
    })

    it('should maintain component stability across re-renders', () => {
      const { rerender } = render(<PermissionSelector {...defaultProps} />)

      rerender(<PermissionSelector {...defaultProps} selectedPermissions={{ 1: [1] }} />)
      rerender(<PermissionSelector {...defaultProps} selectedPermissions={{ 2: [4, 5] }} />)
      rerender(<PermissionSelector {...defaultProps} selectedPermissions={{}} />)

      expect(screen.getByText('permission-configuration')).toBeInTheDocument()
    })
  })

  describe('Disabled/ReadOnly State', () => {
    describe('Basic Disabled Functionality', () => {
      it('should render component in readonly mode', () => {
        render(<PermissionSelector {...defaultProps} isReadOnly={true} />)

        expect(screen.getByText('permission-configuration')).toBeInTheDocument()
        expect(screen.getByText('behavior-category')).toBeInTheDocument()
      })

      it('should disable all checkboxes when isReadOnly is true', () => {
        render(<PermissionSelector {...defaultProps} isReadOnly={true} />)

        const checkboxes = screen.getAllByRole('checkbox')
        checkboxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled()
        })
      })

      it('should disable header checkbox in readonly mode', () => {
        render(<PermissionSelector {...defaultProps} isReadOnly={true} />)

        const checkboxes = screen.getAllByRole('checkbox')
        // First checkbox should be the header checkbox
        expect(checkboxes[0]).toBeDisabled()
      })

      it('should disable behavior checkboxes in readonly mode', () => {
        render(<PermissionSelector {...defaultProps} isReadOnly={true} />)

        const checkboxes = screen.getAllByRole('checkbox')
        // All checkboxes after header should be disabled
        checkboxes.slice(1).forEach((checkbox) => {
          expect(checkbox).toBeDisabled()
        })
      })

      it('should not call onBehaviorToggle when checkbox is disabled', () => {
        const onBehaviorToggle = jest.fn()

        render(
          <PermissionSelector
            {...defaultProps}
            isReadOnly={true}
            onBehaviorToggle={onBehaviorToggle}
          />
        )

        const checkboxes = screen.getAllByRole('checkbox')
        // Verify checkboxes are disabled, preventing user interaction
        checkboxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled()
        })

        // onBehaviorToggle should never be called when isReadOnly is true
        expect(onBehaviorToggle).not.toHaveBeenCalled()
      })

      it('should not call onBehaviorNameCheckboxChange when header checkbox is disabled', () => {
        const onBehaviorNameCheckboxChange = jest.fn()

        render(
          <PermissionSelector
            {...defaultProps}
            isReadOnly={true}
            onBehaviorNameCheckboxChange={onBehaviorNameCheckboxChange}
          />
        )

        const checkboxes = screen.getAllByRole('checkbox')
        // Verify header checkbox is disabled
        expect(checkboxes[0]).toBeDisabled()

        // Callback should never be called when isReadOnly is true
        expect(onBehaviorNameCheckboxChange).not.toHaveBeenCalled()
      })
    })

    describe('Disabled State with Selections', () => {
      it('should display selected permissions in readonly mode', () => {
        const getAllSelectedBehaviors = jest.fn(() => [
          { category: 1, behavior: 1 },
          { category: 1, behavior: 2 },
        ])

        render(
          <PermissionSelector
            {...defaultProps}
            isReadOnly={true}
            selectedPermissions={{ 1: [1, 2] }}
            getAllSelectedBehaviors={getAllSelectedBehaviors}
          />
        )

        const createRoleElements = screen.getAllByText('Create Role')
        expect(createRoleElements.length).toBeGreaterThanOrEqual(1)
      })

      it('should show disabled checkboxes with selected permissions in readonly mode', () => {
        render(
          <PermissionSelector
            {...defaultProps}
            isReadOnly={true}
            selectedPermissions={{ 1: [1, 2, 3] }}
          />
        )

        const checkboxes = screen.getAllByRole('checkbox')
        // All checkboxes should be disabled in readonly mode
        checkboxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled()
        })
        // Component should maintain selected state visually
        expect(checkboxes.length).toBeGreaterThan(0)
      })

      it('should disable remove buttons in readonly mode', () => {
        const getAllSelectedBehaviors = jest.fn(() => [
          { category: 1, behavior: 1 },
          { category: 1, behavior: 2 },
        ])

        render(
          <PermissionSelector
            {...defaultProps}
            isReadOnly={true}
            selectedPermissions={{ 1: [1, 2] }}
            getAllSelectedBehaviors={getAllSelectedBehaviors}
          />
        )

        const removeButtons = screen.getAllByRole('button', { name: '' })
        // Filter for IconButtons (remove buttons have no name)
        const iconButtons = removeButtons.filter(
          (btn) => !btn.textContent || btn.textContent.trim() === ''
        )
        iconButtons.forEach((button) => {
          expect(button).toBeDisabled()
        })
      })

      it('should not allow removing behaviors when buttons are disabled', () => {
        const handleRemoveBehavior = jest.fn()
        const getAllSelectedBehaviors = jest.fn(() => [{ category: 1, behavior: 1 }])

        render(
          <PermissionSelector
            {...defaultProps}
            isReadOnly={true}
            selectedPermissions={{ 1: [1] }}
            getAllSelectedBehaviors={getAllSelectedBehaviors}
            handleRemoveBehavior={handleRemoveBehavior}
          />
        )

        const removeButtons = screen.getAllByRole('button', { name: '' })
        const iconButtons = removeButtons.filter(
          (btn) => !btn.textContent || btn.textContent.trim() === ''
        )

        // Verify remove buttons are disabled, preventing removal
        iconButtons.forEach((button) => {
          expect(button).toBeDisabled()
        })

        // handleRemoveBehavior should never be called
        expect(handleRemoveBehavior).not.toHaveBeenCalled()
      })
    })

    describe('Disabled State with Errors', () => {
      it('should display error message in readonly mode', () => {
        render(
          <PermissionSelector
            {...defaultProps}
            isReadOnly={true}
            permissionError="At least one permission must be selected"
          />
        )

        expect(screen.getByText('At least one permission must be selected')).toBeInTheDocument()
      })

      it('should render error with disabled controls', () => {
        render(
          <PermissionSelector
            {...defaultProps}
            isReadOnly={true}
            permissionError="Invalid permissions"
          />
        )

        expect(screen.getByText('Invalid permissions')).toBeInTheDocument()

        const checkboxes = screen.getAllByRole('checkbox')
        checkboxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled()
        })
      })
    })

    describe('Disabled State Category Navigation', () => {
      it('should allow category selection in readonly mode', async () => {
        const user = userEvent.setup()
        render(<PermissionSelector {...defaultProps} isReadOnly={true} />)

        const usersCategory = screen.getByText('Users')
        await user.click(usersCategory)

        // Should show Users category behaviors
        expect(screen.getByText('Create User')).toBeInTheDocument()
        expect(screen.getByText('Edit User')).toBeInTheDocument()
      })

      it('should navigate between categories while maintaining disabled state', async () => {
        const user = userEvent.setup()
        render(<PermissionSelector {...defaultProps} isReadOnly={true} />)

        // Click on Orders category
        const ordersCategory = screen.getByText('Orders')
        await user.click(ordersCategory)

        expect(screen.getByText('View Orders')).toBeInTheDocument()
        expect(screen.getByText('Create Orders')).toBeInTheDocument()

        // All checkboxes should still be disabled
        const checkboxes = screen.getAllByRole('checkbox')
        checkboxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled()
        })
      })
    })

    describe('Disabled State with Empty Data', () => {
      it('should handle empty selections in readonly mode', () => {
        render(
          <PermissionSelector
            {...defaultProps}
            isReadOnly={true}
            selectedPermissions={{}}
            getAllSelectedBehaviors={() => []}
          />
        )

        expect(screen.getByText('no-behaviors-selected')).toBeInTheDocument()
      })

      it('should disable controls even with no selections', () => {
        render(<PermissionSelector {...defaultProps} isReadOnly={true} selectedPermissions={{}} />)

        const checkboxes = screen.getAllByRole('checkbox')
        checkboxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled()
        })
      })
    })

    describe('Disabled State Scenarios', () => {
      it('Scenario: Admin viewing existing role permissions in readonly mode', () => {
        const getAllSelectedBehaviors = jest.fn(() => [
          { category: 1, behavior: 1 },
          { category: 1, behavior: 2 },
          { category: 2, behavior: 4 },
        ])

        render(
          <PermissionSelector
            {...defaultProps}
            isReadOnly={true}
            selectedPermissions={{ 1: [1, 2], 2: [4] }}
            getAllSelectedBehaviors={getAllSelectedBehaviors}
          />
        )

        // Should show all selected permissions
        const createRoleElements = screen.getAllByText('Create Role')
        expect(createRoleElements.length).toBeGreaterThanOrEqual(1)

        // All controls should be disabled
        const checkboxes = screen.getAllByRole('checkbox')
        checkboxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled()
        })
      })

      it('Scenario: Readonly mode with validation error displayed', () => {
        render(
          <PermissionSelector
            {...defaultProps}
            isReadOnly={true}
            permissionError="Cannot modify system role permissions"
            selectedPermissions={{ 1: [1] }}
          />
        )

        expect(screen.getByText('Cannot modify system role permissions')).toBeInTheDocument()

        const checkboxes = screen.getAllByRole('checkbox')
        checkboxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled()
        })
      })

      it('Scenario: Disabled state prevents all modification interactions', () => {
        const onBehaviorToggle = jest.fn()
        const handleRemoveBehavior = jest.fn()
        const getAllSelectedBehaviors = jest.fn(() => [{ category: 1, behavior: 1 }])

        render(
          <PermissionSelector
            {...defaultProps}
            isReadOnly={true}
            selectedPermissions={{ 1: [1] }}
            onBehaviorToggle={onBehaviorToggle}
            handleRemoveBehavior={handleRemoveBehavior}
            getAllSelectedBehaviors={getAllSelectedBehaviors}
          />
        )

        // Verify all interactive elements are disabled
        const checkboxes = screen.getAllByRole('checkbox')
        checkboxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled()
        })

        const removeButtons = screen.getAllByRole('button', { name: '' })
        const iconButtons = removeButtons.filter(
          (btn) => !btn.textContent || btn.textContent.trim() === ''
        )
        iconButtons.forEach((button) => {
          expect(button).toBeDisabled()
        })

        // Verify no modification callbacks are triggered
        expect(onBehaviorToggle).not.toHaveBeenCalled()
        expect(handleRemoveBehavior).not.toHaveBeenCalled()
      })
    })
  })
})

describe('System Role Functionality', () => {
  describe('System Role Display', () => {
    it('should hide close/remove icons when isSystemRole is true', () => {
      const getAllSelectedBehaviors = jest.fn(() => [
        { category: 1, behavior: 1 },
        { category: 1, behavior: 2 },
      ])

      render(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={true}
          isReadOnly={true}
          selectedPermissions={{ 1: [1, 2] }}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
        />
      )

      // Close icons should not be rendered for system roles
      const closeIcons = screen.queryAllByTestId('CloseIcon')
      expect(closeIcons.length).toBe(0)
    })

    it('should show close/remove icons when isSystemRole is false', () => {
      const getAllSelectedBehaviors = jest.fn(() => [
        { category: 1, behavior: 1 },
        { category: 1, behavior: 2 },
      ])

      render(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={false}
          selectedPermissions={{ 1: [1, 2] }}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
        />
      )

      // Close icons should be rendered for custom roles
      const closeIcons = screen.queryAllByTestId('CloseIcon')
      expect(closeIcons.length).toBeGreaterThan(0)
    })

    it('should display system role behaviors without remove buttons', () => {
      const systemRoleBehaviors = [
        { category: 2000, behavior: 2000 },
        { category: 2000, behavior: 2001 },
        { category: 2001, behavior: 2005 },
      ]

      const getAllSelectedBehaviors = jest.fn(() => systemRoleBehaviors)

      const systemRoleProps = {
        ...defaultProps,
        isSystemRole: true,
        isReadOnly: true,
        selectedPermissions: {
          2000: [2000, 2001],
          2001: [2005],
        },
        getAllSelectedBehaviors,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
      }

      render(<PermissionSelector {...systemRoleProps} />)

      // Verify behaviors are displayed
      expect(screen.getByText('selected-behavior')).toBeInTheDocument()

      // Verify no remove buttons are present
      const closeIcons = screen.queryAllByTestId('CloseIcon')
      expect(closeIcons.length).toBe(0)
    })

    it('should render all system role behaviors in readonly mode', () => {
      const getAllSelectedBehaviors = jest.fn(() => [
        { category: 1, behavior: 1 },
        { category: 1, behavior: 2 },
        { category: 1, behavior: 3 },
        { category: 2, behavior: 4 },
        { category: 2, behavior: 5 },
      ])

      render(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={true}
          isReadOnly={true}
          selectedPermissions={{ 1: [1, 2, 3], 2: [4, 5] }}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
        />
      )

      // All behaviors should be displayed
      expect(screen.getAllByText('Create Role').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Edit Role').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Delete Role').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Create User').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Edit User').length).toBeGreaterThanOrEqual(1)
    })

    it('should disable all interactions for system roles', () => {
      const onBehaviorToggle = jest.fn()
      const handleRemoveBehavior = jest.fn()
      const getAllSelectedBehaviors = jest.fn(() => [{ category: 1, behavior: 1 }])

      render(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={true}
          isReadOnly={true}
          selectedPermissions={{ 1: [1] }}
          onBehaviorToggle={onBehaviorToggle}
          handleRemoveBehavior={handleRemoveBehavior}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
        />
      )

      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeDisabled()
      })

      // No callbacks should be triggered
      expect(onBehaviorToggle).not.toHaveBeenCalled()
      expect(handleRemoveBehavior).not.toHaveBeenCalled()
    })
  })

  describe('System Role Scenarios', () => {
    it('Scenario: Viewing Admin system role with full permissions', () => {
      const adminBehaviors = {
        2000: [2000, 2001, 2002, 2003],
        2001: [2005, 2004],
        2002: [2007, 2006],
      }

      const getAllSelectedBehaviors = jest.fn(() => {
        const behaviors: Array<{ category: number; behavior: number }> = []
        Object.entries(adminBehaviors).forEach(([category, behaviorIds]) => {
          behaviorIds.forEach((behaviorId) => {
            behaviors.push({ category: Number(category), behavior: behaviorId })
          })
        })
        return behaviors
      })

      render(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={true}
          isReadOnly={true}
          selectedPermissions={adminBehaviors}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
          behaviorCategories={{
            items: [
              { id: 2000, name: 'User Management' },
              { id: 2001, name: 'Account Management' },
              { id: 2002, name: 'Order Management' },
            ],
          }}
          behaviors={{
            items: [
              { id: 2000, name: 'Add User', categoryId: 2000 },
              { id: 2001, name: 'View User', categoryId: 2000 },
              { id: 2002, name: 'Update User', categoryId: 2000 },
              { id: 2003, name: 'Delete User', categoryId: 2000 },
              { id: 2005, name: 'View Account', categoryId: 2001 },
              { id: 2004, name: 'Edit Account', categoryId: 2001 },
              { id: 2007, name: 'View Order', categoryId: 2002 },
              { id: 2006, name: 'Create Order', categoryId: 2002 },
            ],
          }}
        />
      )

      // Verify no remove buttons
      const closeIcons = screen.queryAllByTestId('CloseIcon')
      expect(closeIcons.length).toBe(0)

      // Verify all checkboxes are disabled
      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeDisabled()
      })

      // Verify behaviors are displayed
      expect(screen.getAllByText('Add User').length).toBeGreaterThan(0)
    })

    it('Scenario: Viewing Purchaser system role with limited permissions', () => {
      const purchaserBehaviors = {
        2000: [2001],
        2001: [2005],
      }

      const getAllSelectedBehaviors = jest.fn(() => [
        { category: 2000, behavior: 2001 },
        { category: 2001, behavior: 2005 },
      ])

      render(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={true}
          isReadOnly={true}
          selectedPermissions={purchaserBehaviors}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
          behaviorCategories={{
            items: [
              { id: 2000, name: 'User Management' },
              { id: 2001, name: 'Account Management' },
            ],
          }}
          behaviors={{
            items: [
              { id: 2001, name: 'View User', categoryId: 2000 },
              { id: 2005, name: 'View Account', categoryId: 2001 },
            ],
          }}
        />
      )

      // Verify no remove buttons
      const closeIcons = screen.queryAllByTestId('CloseIcon')
      expect(closeIcons.length).toBe(0)

      // Verify behaviors are displayed
      expect(screen.getAllByText('View User').length).toBeGreaterThan(0)
      expect(screen.getByText('View Account')).toBeInTheDocument()
    })

    it('Scenario: Comparing system role and custom role display', () => {
      const selectedBehaviors = {
        1: [1, 2],
      }

      const getAllSelectedBehaviors = jest.fn(() => [
        { category: 1, behavior: 1 },
        { category: 1, behavior: 2 },
      ])

      // Render system role
      const { rerender } = render(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={true}
          isReadOnly={true}
          selectedPermissions={selectedBehaviors}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
        />
      )

      // System role should have no remove buttons
      let closeIcons = screen.queryAllByTestId('CloseIcon')
      expect(closeIcons.length).toBe(0)

      // Re-render as custom role
      rerender(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={false}
          isReadOnly={false}
          selectedPermissions={selectedBehaviors}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
        />
      )

      // Custom role should have remove buttons
      closeIcons = screen.queryAllByTestId('CloseIcon')
      expect(closeIcons.length).toBeGreaterThan(0)
    })
  })

  describe('System Role Edge Cases', () => {
    it('should handle system role with empty permissions', () => {
      render(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={true}
          isReadOnly={true}
          selectedPermissions={{}}
          getAllSelectedBehaviors={() => []}
        />
      )

      expect(screen.getByText('no-behaviors-selected')).toBeInTheDocument()

      // Should have no remove buttons
      const closeIcons = screen.queryAllByTestId('CloseIcon')
      expect(closeIcons.length).toBe(0)
    })

    it('should handle system role flag without readonly mode', () => {
      const getAllSelectedBehaviors = jest.fn(() => [{ category: 1, behavior: 1 }])

      render(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={true}
          isReadOnly={false}
          selectedPermissions={{ 1: [1] }}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
        />
      )

      // Should still hide remove buttons even if not readonly
      const closeIcons = screen.queryAllByTestId('CloseIcon')
      expect(closeIcons.length).toBe(0)
    })

    it('should maintain system role behavior when switching categories', async () => {
      const user = userEvent.setup()
      const getAllSelectedBehaviors = jest.fn(() => [
        { category: 1, behavior: 1 },
        { category: 2, behavior: 4 },
      ])

      render(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={true}
          isReadOnly={true}
          selectedPermissions={{ 1: [1], 2: [4] }}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
        />
      )

      // Switch to Users category
      await user.click(screen.getByText('Users'))

      // Should still have no remove buttons
      const closeIcons = screen.queryAllByTestId('CloseIcon')
      expect(closeIcons.length).toBe(0)

      // Checkboxes should still be disabled
      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeDisabled()
      })
    })
  })

  describe('System Role vs Custom Role Behavior', () => {
    it('should differentiate between system and custom roles', () => {
      const selectedBehaviors = { 1: [1, 2] }
      const getAllSelectedBehaviors = jest.fn(() => [
        { category: 1, behavior: 1 },
        { category: 1, behavior: 2 },
      ])

      const { rerender } = render(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={false}
          selectedPermissions={selectedBehaviors}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
        />
      )

      // Custom role: should have remove buttons
      let closeIcons = screen.queryAllByTestId('CloseIcon')
      expect(closeIcons.length).toBeGreaterThan(0)

      // Switch to system role
      rerender(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={true}
          isReadOnly={true}
          selectedPermissions={selectedBehaviors}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
        />
      )

      // System role: should not have remove buttons
      closeIcons = screen.queryAllByTestId('CloseIcon')
      expect(closeIcons.length).toBe(0)
    })

    it('should allow editing custom roles but not system roles', () => {
      const selectedBehaviors = { 1: [1] }
      const getAllSelectedBehaviors = jest.fn(() => [{ category: 1, behavior: 1 }])

      const { rerender } = render(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={false}
          isReadOnly={false}
          selectedPermissions={selectedBehaviors}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
        />
      )

      // Custom role: checkboxes should be enabled
      let checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeEnabled()
      })

      // Switch to system role
      rerender(
        <PermissionSelector
          {...defaultProps}
          isSystemRole={true}
          isReadOnly={true}
          selectedPermissions={selectedBehaviors}
          getAllSelectedBehaviors={getAllSelectedBehaviors}
        />
      )

      // System role: checkboxes should be disabled
      checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeDisabled()
      })
    })
  })
})
