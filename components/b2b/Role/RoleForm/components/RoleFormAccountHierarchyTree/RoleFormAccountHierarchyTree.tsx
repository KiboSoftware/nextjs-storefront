import React from 'react'

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

import { B2BAccount } from '@/lib/gql/types'

interface RoleFormAccountHierarchyTreeProps {
  parentAccount: string
  accountScope: string
  accounts?: B2BAccount[]
  selectedAccounts: number[]
  expandedNodes: Set<number>
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  onAccountSelection: (accountId: number, checked: boolean) => void
  onToggleNodeExpansion: (nodeId: number) => void
  onSelectAllAccounts: () => void
  onDeselectAllAccounts: () => void
  shouldShowAccount: (accountId: number, query: string) => boolean
  getChildAccountsForParent: (parentId: number) => B2BAccount[]
  hasCreateRolePermission: (accountId: number) => boolean
}

const RoleFormAccountHierarchyTree: React.FC<RoleFormAccountHierarchyTreeProps> = ({
  parentAccount,
  accountScope,
  accounts,
  selectedAccounts,
  expandedNodes,
  searchQuery,
  onSearchQueryChange,
  onAccountSelection,
  onToggleNodeExpansion,
  onSelectAllAccounts,
  onDeselectAllAccounts,
  shouldShowAccount,
  getChildAccountsForParent,
  hasCreateRolePermission,
}) => {
  const { t } = useTranslation('common')

  // Render account hierarchy tree recursively
  const renderAccountHierarchy = (accountId: number, level: number): React.ReactNode => {
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
              onClick={() => onToggleNodeExpansion(accountId)}
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
                onChange={(e) => onAccountSelection(accountId, e.target.checked)}
                disabled={isCheckboxDisabled}
                size="small"
                sx={roleFormAccountHierarchyTreeStyles.checkbox(isParentAccount)}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={roleFormAccountHierarchyTreeStyles.accountLabel(
                  isParentAccount,
                  !hasPermission
                )}
              >
                {account.companyOrOrganization || `Account ${accountId}`}
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
  }

  // Calculate total accounts for display
  const calculateTotalAccounts = (): number => {
    let totalAccounts = 0

    if (accountScope === 'specific-child') {
      // For specific child: parent + selected child accounts (that have permission)
      const selectedAccountsWithPermission = selectedAccounts.filter((accountId) =>
        hasCreateRolePermission(accountId)
      )
      totalAccounts = selectedAccountsWithPermission.length + 1 // +1 for parent
    } else if (accountScope === 'all-except') {
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
  }

  const totalAccounts = calculateTotalAccounts()
  const accountText = totalAccounts === 1 ? t('account') : t('accounts')
  const includingParentText = t('including-parent')

  return (
    <Box sx={roleFormAccountHierarchyTreeStyles.container}>
      <Box sx={roleFormAccountHierarchyTreeStyles.headerContainer}>
        <Box sx={{ width: { xs: '100%', md: '80%' } }}>
          <Typography variant="subtitle2" sx={roleFormAccountHierarchyTreeStyles.titleText}>
            {accountScope === 'specific-child'
              ? t('select-child-accounts')
              : t('select-accounts-to-exclude')}
          </Typography>

          {/* Search Input */}
          <Box sx={roleFormAccountHierarchyTreeStyles.searchContainer}>
            <TextField
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
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
                      onClick={() => onSearchQueryChange('')}
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
              ? `Role will be applied to ${totalAccounts} ${accountText} (${includingParentText})`
              : `Role will be applied to ${totalAccounts} ${accountText}`}
          </Typography>
        </Box>

        <Box sx={roleFormAccountHierarchyTreeStyles.buttonContainer}>
          <Button size="small" variant="outlined" onClick={onDeselectAllAccounts}>
            {t('deselect-all-accounts')}
          </Button>
          <Button size="small" variant="outlined" onClick={onSelectAllAccounts}>
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
