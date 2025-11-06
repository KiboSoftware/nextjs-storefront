import React, { useState } from 'react'

import { ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import { Box, Checkbox, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { B2BAccount } from '@/lib/gql/types'

interface RoleAccountHierarchyViewProps {
  accounts?: B2BAccount[]
  selectedAccountIds?: number[]
  parentAccountId?: number
}

const TreeNode = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}))

const NodeContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

const RoleAccountHierarchyView: React.FC<RoleAccountHierarchyViewProps> = ({
  accounts = [],
  selectedAccountIds = [],
  parentAccountId,
}) => {
  const { t } = useTranslation('common')
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set([parentAccountId || 0]))

  const toggleNodeExpansion = (nodeId: number) => {
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

  const getChildAccountsForParent = (parentId: number): B2BAccount[] => {
    return accounts.filter((acc) => acc.parentAccountId === parentId)
  }

  const isAccountSelected = (accountId: number): boolean => {
    return selectedAccountIds.includes(accountId)
  }

  const renderAccountNode = (account: B2BAccount, level: number = 0): React.ReactNode => {
    const children = getChildAccountsForParent(account.id)
    const hasChildren = children.length > 0
    const isExpanded = expandedNodes.has(account.id)
    const isSelected = isAccountSelected(account.id)

    return (
      <Box key={account.id}>
        <NodeContent
          sx={{ paddingLeft: `${level * 24}px` }}
          onClick={() => hasChildren && toggleNodeExpansion(account.id)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ExpandMoreIcon fontSize="small" sx={{ mr: 1 }} />
            ) : (
              <ChevronRightIcon fontSize="small" sx={{ mr: 1 }} />
            )
          ) : (
            <Box sx={{ width: 24, mr: 1 }} />
          )}
          <Checkbox checked={isSelected} disabled size="small" sx={{ mr: 1, p: 0 }} />
          <Typography variant="body2">
            {account.companyOrOrganization || `Account ${account.id}`}
          </Typography>
        </NodeContent>
        {hasChildren && isExpanded && (
          <TreeNode>{children.map((child) => renderAccountNode(child, level + 1))}</TreeNode>
        )}
      </Box>
    )
  }

  // Find the parent/root account to start rendering from
  const rootAccount = parentAccountId
    ? accounts.find((acc) => acc.id === parentAccountId)
    : accounts.find((acc) => !acc.parentAccountId)

  if (!rootAccount) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {t('no-account-hierarchy-available')}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t('account-hierarchy')}
      </Typography>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
          backgroundColor: 'background.paper',
        }}
      >
        {renderAccountNode(rootAccount)}
      </Box>
    </Box>
  )
}

export default RoleAccountHierarchyView
