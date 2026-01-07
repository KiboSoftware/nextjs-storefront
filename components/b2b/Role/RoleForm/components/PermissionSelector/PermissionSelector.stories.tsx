import React, { useState } from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import PermissionSelector from './PermissionSelector'

export default {
  title: 'B2B/Role/Components/PermissionSelector',
  component: PermissionSelector,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof PermissionSelector>

// Mock data for behavior categories
const mockBehaviorCategories = {
  items: [
    { id: 1, name: 'Order Management' },
    { id: 2, name: 'Product Management' },
    { id: 3, name: 'Customer Management' },
    { id: 4, name: 'Payment Processing' },
    { id: 5, name: 'Inventory Management' },
    { id: 6, name: 'User Administration' },
  ],
}

// Mock data for behaviors
const mockBehaviors = {
  items: [
    // Order Management behaviors
    { id: 101, name: 'View Orders', categoryId: 1 },
    { id: 102, name: 'Create Orders', categoryId: 1 },
    { id: 103, name: 'Edit Orders', categoryId: 1 },
    { id: 104, name: 'Cancel Orders', categoryId: 1 },
    { id: 105, name: 'Process Returns', categoryId: 1 },

    // Product Management behaviors
    { id: 201, name: 'View Products', categoryId: 2 },
    { id: 202, name: 'Create Products', categoryId: 2 },
    { id: 203, name: 'Edit Products', categoryId: 2 },
    { id: 204, name: 'Delete Products', categoryId: 2 },
    { id: 205, name: 'Manage Categories', categoryId: 2 },

    // Customer Management behaviors
    { id: 301, name: 'View Customers', categoryId: 3 },
    { id: 302, name: 'Create Customers', categoryId: 3 },
    { id: 303, name: 'Edit Customer Info', categoryId: 3 },
    { id: 304, name: 'Deactivate Customers', categoryId: 3 },

    // Payment Processing behaviors
    { id: 401, name: 'Process Payments', categoryId: 4 },
    { id: 402, name: 'Issue Refunds', categoryId: 4 },
    { id: 403, name: 'View Payment History', categoryId: 4 },

    // Inventory Management behaviors
    { id: 501, name: 'View Inventory', categoryId: 5 },
    { id: 502, name: 'Update Stock Levels', categoryId: 5 },
    { id: 503, name: 'Manage Warehouses', categoryId: 5 },

    // User Administration behaviors
    { id: 601, name: 'Manage User Roles', categoryId: 6 },
    { id: 602, name: 'Create User Accounts', categoryId: 6 },
    { id: 603, name: 'Reset Passwords', categoryId: 6 },
  ],
}

// Shared helper functions
const createGetAllSelectedBehaviors = (selectedPermissions: Record<number, number[]>) => () => {
  const allSelected: Array<{ category: number; behavior: number }> = []
  Object.entries(selectedPermissions).forEach(([categoryId, behaviorIds]) => {
    behaviorIds.forEach((behaviorId) => {
      allSelected.push({ category: Number(categoryId), behavior: behaviorId })
    })
  })
  return allSelected
}

const createNoOpHandlers = () => ({
  handleBehaviorToggle: () => {
    // No-op for static stories
  },
  handleBehaviorNameCheckboxChange: () => {
    // No-op for static stories
  },
  handleRemoveBehavior: () => {
    // No-op for static stories
  },
  getAllSelectedBehaviors: () => [],
})

const renderPermissionSelector = (
  args: any,
  selectedPermissions: Record<number, number[]>,
  handlers: {
    handleBehaviorToggle: (category: number, behavior: number) => void
    handleBehaviorNameCheckboxChange: (category: number) => void
    handleRemoveBehavior: (category: number, behavior: number) => void
    getAllSelectedBehaviors: () => Array<{ category: number; behavior: number }>
  }
) => (
  <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
    <PermissionSelector
      {...args}
      selectedPermissions={selectedPermissions}
      onBehaviorToggle={handlers.handleBehaviorToggle}
      onBehaviorNameCheckboxChange={handlers.handleBehaviorNameCheckboxChange}
      getAllSelectedBehaviors={handlers.getAllSelectedBehaviors}
      handleRemoveBehavior={handlers.handleRemoveBehavior}
    />
  </Box>
)

const Template: ComponentStory<typeof PermissionSelector> = (args) => {
  const [selectedPermissions, setSelectedPermissions] = useState<Record<number, number[]>>({
    1: [101, 103], // Order Management: View Orders, Edit Orders
    2: [201], // Product Management: View Products
  })

  const handleBehaviorToggle = (category: number, behavior: number) => {
    setSelectedPermissions((prev) => {
      const categoryBehaviors = prev[category] || []
      const isSelected = categoryBehaviors.includes(behavior)

      if (isSelected) {
        return {
          ...prev,
          [category]: categoryBehaviors.filter((id) => id !== behavior),
        }
      } else {
        return {
          ...prev,
          [category]: [...categoryBehaviors, behavior],
        }
      }
    })
  }

  const handleBehaviorNameCheckboxChange = (selectedCategory: number) => {
    const categoryBehaviors = mockBehaviors.items
      .filter((b) => b.categoryId === selectedCategory)
      .map((b) => b.id || 0)
    const currentSelected = selectedPermissions[selectedCategory] || []
    const allSelected = categoryBehaviors.every((id) => currentSelected.includes(id))

    if (allSelected) {
      setSelectedPermissions((prev) => ({
        ...prev,
        [selectedCategory]: [],
      }))
    } else {
      setSelectedPermissions((prev) => ({
        ...prev,
        [selectedCategory]: categoryBehaviors,
      }))
    }
  }

  const handleRemoveBehavior = (category: number, behavior: number) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [category]: (prev[category] || []).filter((id) => id !== behavior),
    }))
  }

  return renderPermissionSelector(args, selectedPermissions, {
    handleBehaviorToggle,
    handleBehaviorNameCheckboxChange,
    handleRemoveBehavior,
    getAllSelectedBehaviors: createGetAllSelectedBehaviors(selectedPermissions),
  })
}

export const Default = Template.bind({})
Default.args = {
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  permissionError: '',
}

export const WithError = Template.bind({})
WithError.args = {
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  permissionError: 'At least one permission must be selected for each role.',
}

export const EmptyData = Template.bind({})
EmptyData.args = {
  behaviorCategories: { items: [] },
  behaviors: { items: [] },
  permissionError: '',
}

export const NoSelections: ComponentStory<typeof PermissionSelector> = (args) => {
  const [selectedPermissions] = useState<Record<number, number[]>>({})
  return renderPermissionSelector(args, selectedPermissions, createNoOpHandlers())
}

NoSelections.args = {
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  permissionError: '',
}

export const ReadOnlyMode = Template.bind({})
ReadOnlyMode.args = {
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  permissionError: '',
  isReadOnly: true,
}

export const DisabledWithSelections: ComponentStory<typeof PermissionSelector> = (args) => {
  const [selectedPermissions] = useState<Record<number, number[]>>({
    1: [101, 102, 103, 104, 105], // All Order Management permissions
    2: [201, 203], // Product Management: View and Edit
    3: [301], // Customer Management: View Customers
    4: [401, 403], // Payment Processing: Process Payments and View History
  })

  return renderPermissionSelector(
    args,
    selectedPermissions,
    createGetAllSelectedBehaviors(selectedPermissions)
      ? {
          ...createNoOpHandlers(),
          getAllSelectedBehaviors: createGetAllSelectedBehaviors(selectedPermissions),
        }
      : createNoOpHandlers()
  )
}

DisabledWithSelections.args = {
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  permissionError: '',
  isReadOnly: true,
}

export const DisabledWithError: ComponentStory<typeof PermissionSelector> = (args) => {
  const [selectedPermissions] = useState<Record<number, number[]>>({})
  return renderPermissionSelector(args, selectedPermissions, createNoOpHandlers())
}

DisabledWithError.args = {
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  permissionError: 'At least one permission must be selected for each role.',
  isReadOnly: true,
}

export const SystemRoleView: ComponentStory<typeof PermissionSelector> = (args) => {
  const [selectedPermissions] = useState<Record<number, number[]>>({
    1: [101, 102, 103, 104, 105], // All Order Management permissions
    2: [201, 202, 203, 204, 205], // All Product Management permissions
    3: [301, 302, 303, 304], // All Customer Management permissions
    4: [401, 402, 403], // All Payment Processing permissions
    5: [501, 502, 503], // All Inventory Management permissions
    6: [601, 602, 603], // All User Administration permissions
  })

  return renderPermissionSelector(args, selectedPermissions, {
    ...createNoOpHandlers(),
    getAllSelectedBehaviors: createGetAllSelectedBehaviors(selectedPermissions),
  })
}

SystemRoleView.args = {
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  permissionError: '',
  isReadOnly: true,
  isSystemRole: true,
}

export const SystemRolePurchaser: ComponentStory<typeof PermissionSelector> = (args) => {
  const [selectedPermissions] = useState<Record<number, number[]>>({
    1: [101, 103], // Order Management: View, Edit
    2: [201], // Product Management: View
    4: [403], // Payment Processing: View History
  })

  return renderPermissionSelector(args, selectedPermissions, {
    ...createNoOpHandlers(),
    getAllSelectedBehaviors: createGetAllSelectedBehaviors(selectedPermissions),
  })
}

SystemRolePurchaser.args = {
  behaviorCategories: mockBehaviorCategories,
  behaviors: mockBehaviors,
  permissionError: '',
  isReadOnly: true,
  isSystemRole: true,
}
