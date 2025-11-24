import React, { useState, useCallback, useEffect, useMemo } from 'react'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ClearIcon from '@mui/icons-material/Clear'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { roleFormAccountHierarchyTreeStyles } from './RoleFormAccountHierarchyTree.styles'
import { AccountScope, CustomBehaviors } from '@/lib/constants'

import { B2BAccount } from '@/lib/gql/types'

interface AccountUserBehaviorResult {
  accountId: number
  behaviors: number[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error: unknown
}

interface RoleFormAccountHierarchyTreeProps {
  parentAccount: string
  accountScope: string
  accounts?: B2BAccount[]
  selectedAccounts: number[]
  onAccountsChange: (accountIds: number[]) => void
  accountUserBehaviorResults?: AccountUserBehaviorResult[]
}

const RoleFormAccountHierarchyTree: React.FC<RoleFormAccountHierarchyTreeProps> = ({
  parentAccount,
  accountScope,
  accounts,
  selectedAccounts,
  onAccountsChange,
  accountUserBehaviorResults,
}) => {
  const { t } = useTranslation('common')

  // UI-local state only (not shared with parent)
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set())
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Helper functions
  const hasCreateRolePermission = useCallback(
    (accountId: number): boolean => {
      if (!accountUserBehaviorResults) return false
      const accountBehavior = accountUserBehaviorResults.find(
        (result) => result.accountId === accountId
      )
      return accountBehavior
        ? accountBehavior.behaviors.includes(CustomBehaviors.CreateRole)
        : false
    },
    [accountUserBehaviorResults]
  )

  const getChildAccountsForParent = useCallback(
    (parentId: number): B2BAccount[] => {
      if (!accounts) return []
      return accounts.filter((acc) => acc.parentAccountId === parentId)
    },
    [accounts]
  )

  const shouldShowAccount = useCallback(
    (accountId: number, query: string): boolean => {
      const checkAccountMatch = (id: number, searchQuery: string): boolean => {
        if (!searchQuery.trim()) return true

        const account = accounts?.find((acc) => acc.id === id)
        if (!account) return false

        const accountName = account.companyOrOrganization || ''
        if (accountName.toLowerCase().includes(searchQuery.toLowerCase())) {
          return true
        }

        const childAccounts = getChildAccountsForParent(id)
        return childAccounts.some((child) => checkAccountMatch(child.id, searchQuery))
      }

      return checkAccountMatch(accountId, query)
    },
    [accounts, getChildAccountsForParent]
  )

  // Auto-expand nodes when searching
  useEffect(() => {
    if (searchQuery.trim() && accounts && parentAccount) {
      const expandedIds = new Set<number>()

      const expandParentsOfMatches = (accountId: number) => {
        const account = accounts.find((acc) => acc.id === accountId)
        if (!account) return

        const accountName = account.companyOrOrganization || ''
        if (accountName.toLowerCase().includes(searchQuery.toLowerCase())) {
          let currentParentId = account.parentAccountId
          while (currentParentId) {
            expandedIds.add(currentParentId)
            const parentAcc = accounts.find((acc) => acc.id === currentParentId)
            currentParentId = parentAcc?.parentAccountId
          }
        }

        const children = getChildAccountsForParent(accountId)
        children.forEach((child) => expandParentsOfMatches(child.id))
      }

      expandParentsOfMatches(Number(parentAccount))
      setExpandedNodes(expandedIds)
    }
  }, [searchQuery, accounts, parentAccount, getChildAccountsForParent])

  // Event handlers
  const toggleNodeExpansion = useCallback((nodeId: number) => {
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

  const handleAccountSelection = useCallback(
    (accountId: number, checked: boolean) => {
      const newSelectedAccounts = checked
        ? [...selectedAccounts, accountId]
        : selectedAccounts.filter((id) => id !== accountId)
      onAccountsChange(newSelectedAccounts)
    },
    [selectedAccounts, onAccountsChange]
  )

  const handleSelectAllAccounts = useCallback(() => {
    if (!parentAccount || !accounts) return

    const getAllDescendants = (parentId: number): number[] => {
      const directChildren = accounts.filter((acc) => acc.parentAccountId === parentId) || []
      const descendants: number[] = []
      directChildren.forEach((child) => {
        if (hasCreateRolePermission(child.id)) {
          descendants.push(child.id)
        }
        descendants.push(...getAllDescendants(child.id))
      })
      return descendants
    }

    const allDescendantIds = getAllDescendants(Number(parentAccount))
    onAccountsChange(allDescendantIds)
    const allIds = new Set(accounts.map((acc) => acc.id))
    setExpandedNodes(allIds)
  }, [parentAccount, accounts, hasCreateRolePermission, onAccountsChange])

  const handleDeselectAllAccounts = useCallback(() => {
    onAccountsChange([])
    setExpandedNodes(new Set())
  }, [onAccountsChange])

  // Render account hierarchy tree recursively
  const renderAccountHierarchy = useCallback(
    (accountId: number, level: number): React.ReactNode => {
      const account = accounts?.find((acc) => acc.id === accountId)
      if (!account) return null

      // Filter based on search query
      if (!shouldShowAccount(accountId, searchQuery)) {
        return null
      }

      const childAccounts = getChildAccountsForParent(accountId).filter((child) =>
        shouldShowAccount(child.id, searchQuery)
      )
      const hasChildren = childAccounts.length > 0
      const isExpanded = expandedNodes.has(accountId)
      const isSelected = selectedAccounts.includes(accountId)
      const isParentAccount = accountId === Number(parentAccount)
      const hasPermission = hasCreateRolePermission(accountId)
      const isCheckboxDisabled = isParentAccount || !hasPermission

      return (
        <Box key={accountId}>
          <Box
            sx={{
              ...roleFormAccountHierarchyTreeStyles.accountItem,
              pl: level * 3,
            }}
          >
            {hasChildren ? (
              <IconButton
                size="small"
                onClick={() => toggleNodeExpansion(accountId)}
                sx={roleFormAccountHierarchyTreeStyles.expandButton}
              >
                {isExpanded ? (
                  <ExpandMoreIcon fontSize="small" />
                ) : (
                  <ChevronRightIcon fontSize="small" />
                )}
              </IconButton>
            ) : (
              <Box sx={roleFormAccountHierarchyTreeStyles.spacer} />
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={isSelected}
                  onChange={(e) => handleAccountSelection(accountId, e.target.checked)}
                  disabled={isCheckboxDisabled}
                  size="small"
                  sx={roleFormAccountHierarchyTreeStyles.checkbox(isParentAccount)}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={roleFormAccountHierarchyTreeStyles.accountLabel(isParentAccount)}
                >
                  {account.companyOrOrganization || ''}
                  {isParentAccount && ` (${t('parent')})`}
                </Typography>
              }
              sx={roleFormAccountHierarchyTreeStyles.formControlLabel}
            />

            {hasChildren && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={roleFormAccountHierarchyTreeStyles.childCountText}
              >
                ({getChildAccountsForParent(accountId).length}{' '}
                {getChildAccountsForParent(accountId).length === 1 ? t('child') : t('children')})
              </Typography>
            )}
          </Box>

          {hasChildren && isExpanded && (
            <Box>{childAccounts.map((child) => renderAccountHierarchy(child.id, level + 1))}</Box>
          )}
        </Box>
      )
    },
    [
      accounts,
      shouldShowAccount,
      searchQuery,
      getChildAccountsForParent,
      expandedNodes,
      selectedAccounts,
      parentAccount,
      hasCreateRolePermission,
      handleAccountSelection,
      toggleNodeExpansion,
      t,
    ]
  )

  // Calculate total accounts for display
  const totalAccounts = useMemo((): number => {
    let totalAccounts = 0

    if (accountScope === AccountScope.SpecificChild) {
      // For specific child: parent + selected child accounts (that have permission)
      const selectedAccountsWithPermission = selectedAccounts.filter((accountId) =>
        hasCreateRolePermission(accountId)
      )
      totalAccounts = selectedAccountsWithPermission.length + 1 // +1 for parent
    } else if (accountScope === AccountScope.AllExcept) {
      // For all except: parent + all child accounts with permission - selected (excluded) accounts
      const getAllDescendants = (parentId: number): number[] => {
        const directChildren = accounts?.filter((acc) => acc.parentAccountId === parentId) || []
        const descendants: number[] = []
        directChildren.forEach((child) => {
          if (hasCreateRolePermission(child.id)) {
            descendants.push(child.id)
          }
          descendants.push(...getAllDescendants(child.id))
        })
        return descendants
      }

      const allDescendantIds = getAllDescendants(Number(parentAccount))
      const excludedAccountsWithPermission = selectedAccounts.filter((accountId) =>
        hasCreateRolePermission(accountId)
      )
      totalAccounts = allDescendantIds.length + 1 - excludedAccountsWithPermission.length // +1 for parent
    }

    return totalAccounts
  }, [accountScope, selectedAccounts, hasCreateRolePermission, accounts, parentAccount])

  const accountText = totalAccounts === 1 ? t('account') : t('accounts')
  const includingParentText = t('including-parent')

  return (
    <Box sx={roleFormAccountHierarchyTreeStyles.container}>
      <Box sx={roleFormAccountHierarchyTreeStyles.headerContainer}>
        <Box sx={{ width: { xs: '100%', md: '80%' } }}>
          <Typography variant="subtitle2" sx={roleFormAccountHierarchyTreeStyles.titleText}>
            {accountScope === AccountScope.SpecificChild
              ? t('select-child-accounts')
              : t('select-accounts-to-exclude')}
          </Typography>

          {/* Search Input */}
          <Box sx={roleFormAccountHierarchyTreeStyles.searchContainer}>
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search-accounts')}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchQuery('')}
                      edge="end"
                      sx={roleFormAccountHierarchyTreeStyles.clearSearchButton}
                      title="Clear search"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={roleFormAccountHierarchyTreeStyles.searchField}
            />
          </Box>

          {/* Show count of accounts that will receive the role */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={roleFormAccountHierarchyTreeStyles.countText}
          >
            {totalAccounts > 1
              ? t('role-applied-to-multiple', {
                  totalAccounts,
                  accountText,
                  includingParentText,
                })
              : t('role-applied-to-single', {
                  totalAccounts,
                  accountText,
                })}
          </Typography>
        </Box>

        <Box sx={roleFormAccountHierarchyTreeStyles.buttonContainer}>
          <Button size="small" variant="outlined" onClick={handleDeselectAllAccounts}>
            {t('deselect-all-accounts')}
          </Button>
          <Button size="small" variant="outlined" onClick={handleSelectAllAccounts}>
            {t('select-all-accounts')}
          </Button>
        </Box>
      </Box>

      <Box sx={roleFormAccountHierarchyTreeStyles.treeContainer}>
        {renderAccountHierarchy(Number(parentAccount), 0)}
      </Box>
    </Box>
  )
}

export default RoleFormAccountHierarchyTree
