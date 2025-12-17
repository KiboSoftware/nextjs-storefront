import React, { useState, useEffect, useCallback, useMemo } from 'react'

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

  // Compute initial expanded nodes based on selectedAccountIds and parentAccountId
  const computeExpandedNodes = useMemo((): Set<number> => {
    const expandedSet = new Set<number>()

    // Always expand parent account if it exists
    if (parentAccountId) {
      expandedSet.add(parentAccountId)
    }

    // For each selected account, expand all its parent nodes
    selectedAccountIds.forEach((selectedId) => {
      let currentAccount = accounts.find((acc) => acc.id === selectedId)

      while (currentAccount) {
        if (currentAccount.parentAccountId) {
          expandedSet.add(currentAccount.parentAccountId)
        }
        currentAccount = accounts.find((acc) => acc.id === currentAccount?.parentAccountId)
      }
    })

    return expandedSet
  }, [accounts, selectedAccountIds, parentAccountId])

  // State for expanded nodes, initialized with computed value
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(computeExpandedNodes)

  // Update expanded nodes when computed value changes (props update)
  useEffect(() => {
    setExpandedNodes(computeExpandedNodes)
  }, [computeExpandedNodes])

  // Toggle node expansion (memoized to prevent recreating on every render)
  const handleToggleNodeExpansion = useCallback((nodeId: number) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }, [])

  // Memoize account lookup map for better performance
  const accountsById = useMemo(() => {
    const map = new Map<number, B2BAccount>()
    accounts.forEach((acc) => acc.id && map.set(acc.id, acc))
    return map
  }, [accounts])

  // Memoize children map for efficient lookups
  const childrenByParentId = useMemo(() => {
    const map = new Map<number, B2BAccount[]>()
    accounts.forEach((acc) => {
      if (acc.parentAccountId) {
        const children = map.get(acc.parentAccountId) || []
        children.push(acc)
        map.set(acc.parentAccountId, children)
      }
    })
    return map
  }, [accounts])

  // Get child accounts for a parent (memoized via childrenByParentId)
  const getChildAccountsForParent = useCallback(
    (parentId: number): B2BAccount[] => {
      return childrenByParentId.get(parentId) || []
    },
    [childrenByParentId]
  )

  // Render account hierarchy tree recursively (memoized to prevent unnecessary re-renders)
  const renderAccountHierarchy = useCallback(
    (accountId: number, level: number): React.ReactNode => {
      const account = accountsById.get(accountId)
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
            <Box>
              {childAccounts.map((child: B2BAccount) =>
                renderAccountHierarchy(child.id as number, level + 1)
              )}
            </Box>
          )}
        </Box>
      )
    },
    [
      accountsById,
      getChildAccountsForParent,
      expandedNodes,
      selectedAccountIds,
      parentAccountId,
      handleToggleNodeExpansion,
      t,
    ]
  )

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
      <Typography variant="body2">{t('account-hierarchy-scope')}</Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={roleAccountHierarchyViewStyles.countText}
      >
        {t('role-applied-to-single', { totalAccounts: selectedCount, accountText })}
      </Typography>

      <Box sx={roleAccountHierarchyViewStyles.treeContainer}>
        {renderAccountHierarchy(parentAccountId, 0)}
      </Box>
    </Box>
  )
}

// Memoize component to prevent unnecessary re-renders when parent re-renders
export default React.memo(RoleAccountHierarchyView)
