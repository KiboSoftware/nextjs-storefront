import React, { useState } from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import RoleFormAccountHierarchyTree from './RoleFormAccountHierarchyTree'

import { B2BAccount } from '@/lib/gql/types'

export default {
  title: 'B2B/Role/Components/RoleFormAccountHierarchyTree',
  component: RoleFormAccountHierarchyTree,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof RoleFormAccountHierarchyTree>

// Mock hierarchical B2B Accounts data
const mockHierarchicalAccounts: B2BAccount[] = [
  // Root/Parent Account
  {
    id: 1001,
    parentAccountId: null,
    taxId: '100001',
    companyOrOrganization: 'Global Corporation',
  },
  // Level 1 Children
  {
    id: 1002,
    parentAccountId: 1001,
    taxId: '100002',
    companyOrOrganization: 'North America Division',
  },
  {
    id: 1003,
    parentAccountId: 1001,
    taxId: '100003',
    companyOrOrganization: 'Europe Division',
  },
  {
    id: 1004,
    parentAccountId: 1001,
    taxId: '100004',
    companyOrOrganization: 'Asia Pacific Division',
  },
  // Level 2 Children (North America)
  {
    id: 1005,
    parentAccountId: 1002,
    taxId: '100005',
    companyOrOrganization: 'USA Branch',
  },
  {
    id: 1006,
    parentAccountId: 1002,
    taxId: '100006',
    companyOrOrganization: 'Canada Branch',
  },
  // Level 2 Children (Europe)
  {
    id: 1007,
    parentAccountId: 1003,
    taxId: '100007',
    companyOrOrganization: 'UK Branch',
  },
  {
    id: 1008,
    parentAccountId: 1003,
    taxId: '100008',
    companyOrOrganization: 'Germany Branch',
  },
  {
    id: 1009,
    parentAccountId: 1003,
    taxId: '100009',
    companyOrOrganization: 'France Branch',
  },
  // Level 3 Children (USA Branch)
  {
    id: 1010,
    parentAccountId: 1005,
    taxId: '100010',
    companyOrOrganization: 'East Coast Office',
  },
  {
    id: 1011,
    parentAccountId: 1005,
    taxId: '100011',
    companyOrOrganization: 'West Coast Office',
  },
  // Level 3 Children (UK Branch)
  {
    id: 1012,
    parentAccountId: 1007,
    taxId: '100012',
    companyOrOrganization: 'London Office',
  },
]

const Template: ComponentStory<typeof RoleFormAccountHierarchyTree> = (args) => {
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([])
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set([1001]))
  const [searchQuery, setSearchQuery] = useState('')

  const getChildAccountsForParent = (parentId: number): B2BAccount[] => {
    return mockHierarchicalAccounts.filter((account) => account.parentAccountId === parentId)
  }

  const shouldShowAccount = (accountId: number, query: string): boolean => {
    if (!query) return true

    const account = mockHierarchicalAccounts.find((acc) => acc.id === accountId)
    if (!account) return false

    return account.companyOrOrganization?.toLowerCase().includes(query.toLowerCase()) || false
  }

  // Mock permission function - for stories, let's assume some accounts have permission
  const hasCreateRolePermission = (accountId: number): boolean => {
    // For demo purposes, let's say accounts 1001, 1002, 1005, 1007, 1010 have permission
    return [1001, 1002, 1005, 1007, 1010].includes(accountId)
  }

  const handleAccountSelection = (accountId: number, checked: boolean) => {
    setSelectedAccounts((prev) => {
      if (checked) {
        return [...prev, accountId]
      } else {
        return prev.filter((id) => id !== accountId)
      }
    })
  }

  const handleToggleNodeExpansion = (nodeId: number) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const handleSelectAllAccounts = () => {
    // Select all non-parent accounts
    const allChildAccountIds = mockHierarchicalAccounts
      .filter((account) => account.id !== Number(args.parentAccount))
      .map((account) => account.id)
    setSelectedAccounts(allChildAccountIds)
  }

  const handleDeselectAllAccounts = () => {
    setSelectedAccounts([])
  }

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <RoleFormAccountHierarchyTree
        {...args}
        selectedAccounts={selectedAccounts}
        expandedNodes={expandedNodes}
        searchQuery={searchQuery}
        onAccountSelection={handleAccountSelection}
        onToggleNodeExpansion={handleToggleNodeExpansion}
        onSelectAllAccounts={handleSelectAllAccounts}
        onDeselectAllAccounts={handleDeselectAllAccounts}
        onSearchQueryChange={handleSearchQueryChange}
        shouldShowAccount={shouldShowAccount}
        getChildAccountsForParent={getChildAccountsForParent}
        hasCreateRolePermission={hasCreateRolePermission}
      />
    </Box>
  )
}

export const SpecificChildAccounts = Template.bind({})
SpecificChildAccounts.args = {
  parentAccount: '1001',
  accountScope: 'specific-child',
  accounts: mockHierarchicalAccounts,
  selectedAccounts: [1005, 1007, 1010],
}

export const AllExceptAccounts = Template.bind({})
AllExceptAccounts.args = {
  parentAccount: '1001',
  accountScope: 'all-except',
  accounts: mockHierarchicalAccounts,
  selectedAccounts: [1004, 1009], // Excluded accounts
}

export const NoSelections = Template.bind({})
NoSelections.args = {
  parentAccount: '1001',
  accountScope: 'specific-child',
  accounts: mockHierarchicalAccounts,
  selectedAccounts: [],
}

export const SingleBranchExpanded: ComponentStory<typeof RoleFormAccountHierarchyTree> = (args) => {
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([1005, 1010, 1011])
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set([1001, 1002, 1005]))
  const [searchQuery, setSearchQuery] = useState('')

  const getChildAccountsForParent = (parentId: number): B2BAccount[] => {
    return mockHierarchicalAccounts.filter((account) => account.parentAccountId === parentId)
  }

  const shouldShowAccount = (accountId: number, query: string): boolean => {
    if (!query) return true

    const account = mockHierarchicalAccounts.find((acc) => acc.id === accountId)
    if (!account) return false

    return account.companyOrOrganization?.toLowerCase().includes(query.toLowerCase()) || false
  }

  // Mock permission function - for stories, let's assume some accounts have permission
  const hasCreateRolePermission = (accountId: number): boolean => {
    // For demo purposes, let's say accounts 1001, 1002, 1005, 1007, 1010 have permission
    return [1001, 1002, 1005, 1007, 1010].includes(accountId)
  }

  const handleAccountSelection = (accountId: number, checked: boolean) => {
    setSelectedAccounts((prev) => {
      if (checked) {
        return [...prev, accountId]
      } else {
        return prev.filter((id) => id !== accountId)
      }
    })
  }

  const handleToggleNodeExpansion = (nodeId: number) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const handleSelectAllAccounts = () => {
    const allChildAccountIds = mockHierarchicalAccounts
      .filter((account) => account.id !== Number(args.parentAccount))
      .map((account) => account.id)
    setSelectedAccounts(allChildAccountIds)
  }

  const handleDeselectAllAccounts = () => {
    setSelectedAccounts([])
  }

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <RoleFormAccountHierarchyTree
        {...args}
        selectedAccounts={selectedAccounts}
        expandedNodes={expandedNodes}
        searchQuery={searchQuery}
        onAccountSelection={handleAccountSelection}
        onToggleNodeExpansion={handleToggleNodeExpansion}
        onSelectAllAccounts={handleSelectAllAccounts}
        onDeselectAllAccounts={handleDeselectAllAccounts}
        onSearchQueryChange={handleSearchQueryChange}
        shouldShowAccount={shouldShowAccount}
        getChildAccountsForParent={getChildAccountsForParent}
        hasCreateRolePermission={hasCreateRolePermission}
      />
    </Box>
  )
}

SingleBranchExpanded.args = {
  parentAccount: '1001',
  accountScope: 'specific-child',
  accounts: mockHierarchicalAccounts,
}

export const FlatHierarchy: ComponentStory<typeof RoleFormAccountHierarchyTree> = (args) => {
  const flatAccounts: B2BAccount[] = [
    {
      id: 2001,
      parentAccountId: null,
      taxId: '200001',
      companyOrOrganization: 'Simple Parent Corp',
    },
    {
      id: 2002,
      parentAccountId: 2001,
      taxId: '200002',
      companyOrOrganization: 'Child Company A',
    },
    {
      id: 2003,
      parentAccountId: 2001,
      taxId: '200003',
      companyOrOrganization: 'Child Company B',
    },
  ]

  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([2002])
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set([2001]))
  const [searchQuery, setSearchQuery] = useState('')

  const getChildAccountsForParent = (parentId: number): B2BAccount[] => {
    return flatAccounts.filter((account) => account.parentAccountId === parentId)
  }

  const shouldShowAccount = (accountId: number, query: string): boolean => {
    if (!query) return true

    const account = flatAccounts.find((acc) => acc.id === accountId)
    if (!account) return false

    return account.companyOrOrganization?.toLowerCase().includes(query.toLowerCase()) || false
  }

  // Mock permission function - for flat hierarchy demo
  const hasCreateRolePermission = (accountId: number): boolean => {
    // For demo purposes, let's say account 2001 and 2002 have permission, but not 2003
    return [2001, 2002].includes(accountId)
  }

  const handleAccountSelection = (accountId: number, checked: boolean) => {
    setSelectedAccounts((prev) => {
      if (checked) {
        return [...prev, accountId]
      } else {
        return prev.filter((id) => id !== accountId)
      }
    })
  }

  const handleToggleNodeExpansion = (nodeId: number) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const handleSelectAllAccounts = () => {
    const allChildAccountIds = flatAccounts
      .filter((account) => account.id !== Number(args.parentAccount))
      .map((account) => account.id)
    setSelectedAccounts(allChildAccountIds)
  }

  const handleDeselectAllAccounts = () => {
    setSelectedAccounts([])
  }

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <RoleFormAccountHierarchyTree
        {...args}
        accounts={flatAccounts}
        selectedAccounts={selectedAccounts}
        expandedNodes={expandedNodes}
        searchQuery={searchQuery}
        onAccountSelection={handleAccountSelection}
        onToggleNodeExpansion={handleToggleNodeExpansion}
        onSelectAllAccounts={handleSelectAllAccounts}
        onDeselectAllAccounts={handleDeselectAllAccounts}
        onSearchQueryChange={handleSearchQueryChange}
        shouldShowAccount={shouldShowAccount}
        getChildAccountsForParent={getChildAccountsForParent}
        hasCreateRolePermission={hasCreateRolePermission}
      />
    </Box>
  )
}

FlatHierarchy.args = {
  parentAccount: '2001',
  accountScope: 'specific-child',
}

export const EmptyAccounts = Template.bind({})
EmptyAccounts.args = {
  parentAccount: '1001',
  accountScope: 'specific-child',
  accounts: [
    {
      id: 1001,
      parentAccountId: null,
      taxId: '100001',
      companyOrOrganization: 'Standalone Company',
    },
  ],
  selectedAccounts: [],
}
