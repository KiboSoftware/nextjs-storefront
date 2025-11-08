import React, { useState } from 'react'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Checkbox, FormControlLabel, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { roleAccountHierarchyViewStyles } from './RoleAccountHierarchyView.styles'

import { B2BAccount } from '@/lib/gql/types'

interface RoleAccountHierarchyViewProps {
  accounts?: B2BAccount[]
  selectedAccountIds?: number[]
  parentAccountId?: number
}

const RoleAccountHierarchyView: React.FC<RoleAccountHierarchyViewProps> = ({
  accounts = [],
  selectedAccountIds = [],
  parentAccountId,
}) => {
  const { t } = useTranslation('common')
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(
    new Set(parentAccountId ? [parentAccountId] : [])
  )

  // Toggle node expansion
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

  // Get child accounts for a parent
  const getChildAccountsForParent = (parentId: number): B2BAccount[] => {
    return accounts.filter((acc) => acc.parentAccountId === parentId)
  }

  // Render account hierarchy tree recursively
  const renderAccountHierarchy = (accountId: number, level: number): React.ReactNode => {
    const account = accounts.find((acc) => acc.id === accountId)
    if (!account) return null

    const childAccounts = getChildAccountsForParent(accountId)
    const hasChildren = childAccounts.length > 0
    const isExpanded = expandedNodes.has(accountId)
    const isSelected = selectedAccountIds.includes(accountId)
    const isParentAccount = accountId === parentAccountId

    return (
      <Box key={accountId}>
        <Box
          sx={{
            ...roleAccountHierarchyViewStyles.accountItem,
            pl: level * 3,
          }}
        >
          {hasChildren ? (
            <IconButton
              size="small"
              onClick={() => handleToggleNodeExpansion(accountId)}
              sx={roleAccountHierarchyViewStyles.expandButton}
            >
              {isExpanded ? (
                <ExpandMoreIcon fontSize="small" />
              ) : (
                <ChevronRightIcon fontSize="small" />
              )}
            </IconButton>
          ) : (
            <Box sx={roleAccountHierarchyViewStyles.spacer} />
          )}

          <FormControlLabel
            control={<Checkbox checked={isSelected} disabled={true} size="small" />}
            label={
              <Typography
                variant="body2"
                sx={roleAccountHierarchyViewStyles.accountLabel(isParentAccount)}
              >
                {account.companyOrOrganization || `Account ${accountId}`}
                {isParentAccount && ` (${t('parent')})`}
              </Typography>
            }
            sx={roleAccountHierarchyViewStyles.formControlLabel}
          />

          {hasChildren && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={roleAccountHierarchyViewStyles.childCountText}
            >
              ({childAccounts.length} {childAccounts.length === 1 ? t('child') : t('children')})
            </Typography>
          )}
        </Box>

        {hasChildren && isExpanded && (
          <Box>{childAccounts.map((child) => renderAccountHierarchy(child.id, level + 1))}</Box>
        )}
      </Box>
    )
  }

  if (!accounts || accounts.length === 0 || !parentAccountId) {
    return (
      <Box sx={roleAccountHierarchyViewStyles.emptyState}>
        <Typography variant="body2" sx={roleAccountHierarchyViewStyles.emptyStateText}>
          {t('no-accounts-available')}
        </Typography>
      </Box>
    )
  }

  const selectedCount = selectedAccountIds.length
  const accountText = selectedCount === 1 ? t('account') : t('accounts')

  return (
    <Box sx={roleAccountHierarchyViewStyles.container}>
      <Typography variant="subtitle2" sx={roleAccountHierarchyViewStyles.sectionTitle}>
        {t('account-hierarchy')}
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={roleAccountHierarchyViewStyles.countText}
      >
        {`Role is applied to ${selectedCount} ${accountText}`}
      </Typography>

      <Box sx={roleAccountHierarchyViewStyles.treeContainer}>
        {renderAccountHierarchy(parentAccountId, 0)}
      </Box>
    </Box>
  )
}

export default RoleAccountHierarchyView
