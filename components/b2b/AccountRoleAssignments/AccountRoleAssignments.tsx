import React, { useState, memo } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { accountRoleAssignmentsStyles } from './AccountRoleAssignments.styles'
import type { GetRolesAsyncResponse } from '@/lib/api/operations/get-roles-across-accounts'

/** Represents a role that can be assigned to a user */
interface Role {
  id: string
  name: string
  isSystemRole: boolean
}

/** Account information with basic details */
interface AccountWithRoles {
  accountId: number
  accountName: string
}

/** Props for the AccountRoleAssignments component */
interface AccountRoleAssignmentsProps {
  /** List of accounts available for role assignment */
  accounts: AccountWithRoles[]
  /** Map of account IDs to selected role IDs */
  selectedRoles: Record<number, string[]>
  /** Callback when role selection changes */
  onChange: (selectedRoles: Record<number, string[]>) => void
  /** Map of account IDs to their available roles data */
  accountRoles?: Record<number, GetRolesAsyncResponse>
}

/** Props for individual account accordion item */
interface AccountAccordionItemProps {
  account: AccountWithRoles
  isExpanded: boolean
  onExpandChange: (accountId: number, isExpanded: boolean) => void
  selectedAccountRoles: string[]
  onRoleToggle: (accountId: number, roleId: string) => void
  searchTerm: string
  rolesData?: GetRolesAsyncResponse
}

// Component to handle individual account accordion with lazy role loading

const AccountAccordionItem: React.FC<AccountAccordionItemProps> = memo((props) => {
  const {
    account,
    isExpanded,
    onExpandChange,
    selectedAccountRoles,
    onRoleToggle,
    searchTerm,
    rolesData,
  } = props

  const { t } = useTranslation('common')

  // Memoize role categorization - only recalculate when rolesData changes
  const { systemRoles, customRoles } = React.useMemo(() => {
    const system: Role[] = []
    const custom: Role[] = []

    if (rolesData?.items) {
      rolesData.items.forEach((item) => {
        const role: Role = {
          id: item.id?.toString() || '',
          name: item.name || '',
          isSystemRole: item.isSystemRole || false,
        }
        if (role.isSystemRole) {
          system.push(role)
        } else {
          custom.push(role)
        }
      })
    }

    return { systemRoles: system, customRoles: custom }
  }, [rolesData?.items])

  // Memoize filtered roles
  const { filteredSystemRoles, filteredCustomRoles } = React.useMemo(() => {
    const filterRoles = (roles: Role[]) => {
      if (!searchTerm) return roles
      const lowerSearchTerm = searchTerm.toLowerCase()
      return roles.filter((role) => role.name.toLowerCase().includes(lowerSearchTerm))
    }

    return {
      filteredSystemRoles: filterRoles(systemRoles),
      filteredCustomRoles: filterRoles(customRoles),
    }
  }, [systemRoles, customRoles, searchTerm])

  const hasVisibleRoles = filteredSystemRoles.length > 0 || filteredCustomRoles.length > 0

  // Handle expansion change
  const handleExpansionChange = React.useCallback(
    (_event: React.SyntheticEvent, expanded: boolean) => {
      onExpandChange(account.accountId, expanded)
    },
    [onExpandChange, account.accountId]
  )

  // Memoize role click handler to prevent RoleChip re-renders and accordion collapse
  const handleRoleClick = React.useCallback(
    (event: React.MouseEvent, roleId: string) => {
      event.stopPropagation() // Prevent accordion from collapsing
      onRoleToggle(account.accountId, roleId)
    },
    [onRoleToggle, account.accountId]
  )

  // Check if a specific role is selected - memoized to prevent recalculation
  const isRoleSelected = React.useCallback(
    (roleId: string) => {
      return selectedAccountRoles.includes(roleId)
    },
    [selectedAccountRoles]
  )

  // Memoize accordion content to prevent recreation on every render
  const accordionContent = React.useMemo(() => {
    // If no roles available
    if (!hasVisibleRoles && !searchTerm) {
      return (
        <Box sx={accountRoleAssignmentsStyles.noRolesBox}>
          <Typography variant="body2" color="text.secondary">
            {t('no-roles-available')}
          </Typography>
        </Box>
      )
    }

    // If searching and no matches
    if (!hasVisibleRoles && searchTerm) {
      return (
        <Box sx={accountRoleAssignmentsStyles.noRolesBox}>
          <Typography variant="body2" color="text.secondary">
            {t('no-roles-match', { searchTerm })}
          </Typography>
        </Box>
      )
    }

    // Show roles
    return (
      <>
        {filteredSystemRoles.length > 0 && (
          <>
            <Typography variant="subtitle2" sx={accountRoleAssignmentsStyles.sectionTitle}>
              {t('system-roles')}
            </Typography>
            <Box sx={accountRoleAssignmentsStyles.rolesGrid}>
              {filteredSystemRoles.map((role) => (
                <Chip
                  key={role.id}
                  label={role.name}
                  title={role.name}
                  sx={accountRoleAssignmentsStyles.roleChip(isRoleSelected(role.id))}
                  onClick={(e) => handleRoleClick(e, role.id)}
                />
              ))}
            </Box>
          </>
        )}

        {filteredCustomRoles.length > 0 && (
          <>
            <Typography variant="subtitle2" sx={accountRoleAssignmentsStyles.sectionTitle}>
              {t('custom-roles')}
            </Typography>
            <Box sx={accountRoleAssignmentsStyles.rolesGridNoMargin}>
              {filteredCustomRoles.map((role) => (
                <Chip
                  key={role.id}
                  label={role.name}
                  title={role.name}
                  sx={accountRoleAssignmentsStyles.roleChip(isRoleSelected(role.id))}
                  onClick={(e) => handleRoleClick(e, role.id)}
                />
              ))}
            </Box>
          </>
        )}
      </>
    )
  }, [
    filteredSystemRoles,
    filteredCustomRoles,
    hasVisibleRoles,
    searchTerm,
    isRoleSelected,
    handleRoleClick,
    t
  ])

  return (
    <Accordion expanded={isExpanded} onChange={handleExpansionChange} sx={accountRoleAssignmentsStyles.styledAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${account.accountId}-content`}
        id={`panel-${account.accountId}-header`}
        sx={accountRoleAssignmentsStyles.styledAccordionSummary}
      >
        <Box sx={accountRoleAssignmentsStyles.accordionSummaryContent}>
          <Typography variant="subtitle1" sx={accountRoleAssignmentsStyles.accountName}>
            {account.accountName}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>{accordionContent}</AccordionDetails>
    </Accordion>
  )
})

AccountAccordionItem.displayName = 'AccountAccordionItem'

const AccountRoleAssignments: React.FC<AccountRoleAssignmentsProps> = (props) => {
  const { accounts, selectedRoles, onChange, accountRoles = {} } = props
  const { t } = useTranslation('common')

  // Initialize expanded state - auto-expand accounts with selected roles, and first accordion
  // Only calculated once on mount
  const initialExpandedState = React.useMemo(() => {
    const expanded: Record<number, boolean> = {}

    // Expand accounts with selected roles (includes existing roles from parent)
    Object.keys(selectedRoles).forEach((accountIdStr) => {
      const accountId = Number(accountIdStr)
      if (selectedRoles[accountId]?.length > 0) {
        expanded[accountId] = true
      }
    })

    // Auto-expand first accordion if no accounts are expanded
    if (Object.keys(expanded).length === 0 && accounts.length > 0) {
      expanded[accounts[0].accountId] = true
    }

    return expanded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount with initial selectedRoles

  const [expandedAccounts, setExpandedAccounts] =
    useState<Record<number, boolean>>(initialExpandedState)
  const [searchTerm, setSearchTerm] = useState('')

  // Stable callback - doesn't recreate unless accounts array changes
  const handleExpandAll = React.useCallback(() => {
    setExpandedAccounts(() => {
      const allExpanded: Record<number, boolean> = {}
      accounts.forEach((account) => {
        allExpanded[account.accountId] = true
      })
      return allExpanded
    })
  }, [accounts])

  // Stable callback - never recreates
  const handleMinimizeAll = React.useCallback(() => {
    setExpandedAccounts({})
  }, [])

  // Stable callback - only recreates when selectedRoles or onChange changes
  const handleRoleToggle = React.useCallback(
    (accountId: number, roleId: string) => {
      const accountRoles = selectedRoles[accountId] || []
      const isSelected = accountRoles.includes(roleId)

      const newAccountRoles = isSelected
        ? accountRoles.filter((id) => id !== roleId)
        : [...accountRoles, roleId]

      onChange({
        ...selectedRoles,
        [accountId]: newAccountRoles,
      })
    },
    [selectedRoles, onChange]
  )

  // Stable callback - never recreates (uses functional state update)
  const handleExpandChange = React.useCallback((accountId: number, isExpanded: boolean) => {
    setExpandedAccounts((prev) => ({
      ...prev,
      [accountId]: isExpanded,
    }))
  }, [])

  // Stable callback - never recreates (uses functional state update)
  const handleSearchChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  // Don't filter accounts - let all accounts show and filter roles within each accordion
  return (
    <Box sx={accountRoleAssignmentsStyles.container}>
      <Box sx={accountRoleAssignmentsStyles.header}>
        <Typography variant="h6" sx={accountRoleAssignmentsStyles.title}>
          {t('account-role-assignments')}
        </Typography>
        <Box sx={accountRoleAssignmentsStyles.buttonGroup}>
          <Button variant="outlined" size="small" onClick={handleExpandAll}>
            {t('expand-all')}
          </Button>
          <Button variant="outlined" size="small" onClick={handleMinimizeAll}>
            {t('minimize-all')}
          </Button>
        </Box>
      </Box>

      <TextField
        fullWidth
        placeholder={t('search-roles')}
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={accountRoleAssignmentsStyles.searchField}
        size="small"
      />

      {accounts.map((account) => {
        const accountId = account.accountId
        const selectedAccountRoles = selectedRoles[accountId] || []

        return (
          <AccountAccordionItem
            key={accountId}
            account={account}
            isExpanded={expandedAccounts[accountId] || false}
            onExpandChange={handleExpandChange}
            selectedAccountRoles={selectedAccountRoles}
            onRoleToggle={handleRoleToggle}
            searchTerm={searchTerm}
            rolesData={accountRoles[accountId]}
          />
        )
      })}
    </Box>
  )
}

export default AccountRoleAssignments
