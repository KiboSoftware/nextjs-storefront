import React, { useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { useGetRolesByAccountIdAsync } from '@/hooks'

interface Role {
  id: string
  name: string
  isSystemRole: boolean
}

interface AccountWithRoles {
  accountId: number
  accountName: string
}

interface AccountRoleAssignmentsProps {
  accounts: AccountWithRoles[]
  selectedRoles: Record<number, string[]> // accountId -> roleIds[]
  onChange: (selectedRoles: Record<number, string[]>) => void
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[300]}`,
  boxShadow: 'none',
  marginBottom: theme.spacing(2),
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: `0 0 ${theme.spacing(2)} 0`,
  },
}))

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  minHeight: '56px',
  '&.Mui-expanded': {
    minHeight: '56px',
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1.5, 0),
    '&.Mui-expanded': {
      margin: theme.spacing(1.5, 0),
    },
  },
}))

const RoleChip = styled(Chip)<{ selected?: boolean }>(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.background.paper,
  color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.grey[300]}`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: selected
      ? theme.palette.primary.dark
      : theme.palette.action.hover,
  },
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
  color: theme.palette.grey[700],
}))

// Component to handle individual account accordion with lazy role loading
interface AccountAccordionItemProps {
  account: AccountWithRoles
  isExpanded: boolean
  onExpandChange: (accountId: number, isExpanded: boolean) => void
  selectedRoles: Record<number, string[]>
  onRoleToggle: (accountId: number, roleId: string) => void
  searchTerm: string
}

const AccountAccordionItem: React.FC<AccountAccordionItemProps> = React.memo(({
  account,
  isExpanded,
  onExpandChange,
  selectedRoles,
  onRoleToggle,
  searchTerm,
}) => {
  const { t } = useTranslation('common')
  const [hasBeenExpanded, setHasBeenExpanded] = useState(isExpanded)

  // Fetch roles when accordion has been expanded
  const { roles: rolesData, isLoading, isSuccess } = useGetRolesByAccountIdAsync(
    account.accountId,
    undefined,
    hasBeenExpanded
  )

  // Memoize role categorization
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

  // Handle expansion change and track first expansion
  const handleExpansionChange = React.useCallback(
    (_event: React.SyntheticEvent, expanded: boolean) => {
      if (expanded && !hasBeenExpanded) {
        setHasBeenExpanded(true)
      }
      onExpandChange(account.accountId, expanded)
    },
    [hasBeenExpanded, onExpandChange, account.accountId]
  )

  // Memoize role click handler to prevent RoleChip re-renders and accordion collapse
  const handleRoleClick = React.useCallback(
    (event: React.MouseEvent, roleId: string) => {
      event.stopPropagation() // Prevent accordion from collapsing
      onRoleToggle(account.accountId, roleId)
    },
    [onRoleToggle, account.accountId]
  )

  // Memoize selected state checks
  const isRoleSelected = React.useCallback(
    (roleId: string) => {
      return selectedRoles[account.accountId]?.includes(roleId) || false
    },
    [selectedRoles, account.accountId]
  )

  // Show loading state, error message, or roles
  const getAccordionContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress size={24} />
        </Box>
      )
    }

    // If fetched but failed, show error message
    if (hasBeenExpanded && !isLoading && !isSuccess) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Typography variant="body2" color="error">
            {t('failed-to-load-roles')}
          </Typography>
        </Box>
      )
    }

    // If no roles available yet (not expanded or loading)
    if (!hasVisibleRoles && !searchTerm) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {t('no-roles-available')}
          </Typography>
        </Box>
      )
    }

    // If searching and no matches
    if (!hasVisibleRoles && searchTerm) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
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
            <SectionTitle variant="subtitle2">{t('system-roles')}</SectionTitle>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {filteredSystemRoles.map((role) => (
                <RoleChip
                  key={role.id}
                  label={role.name}
                  selected={isRoleSelected(role.id)}
                  onClick={(e) => handleRoleClick(e, role.id)}
                />
              ))}
            </Box>
          </>
        )}

        {filteredCustomRoles.length > 0 && (
          <>
            <SectionTitle variant="subtitle2">
              {t('custom-roles', { accountName: account.accountName.split(' ')[1] })}
            </SectionTitle>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {filteredCustomRoles.map((role) => (
                <RoleChip
                  key={role.id}
                  label={role.name}
                  selected={isRoleSelected(role.id)}
                  onClick={(e) => handleRoleClick(e, role.id)}
                />
              ))}
            </Box>
          </>
        )}
      </>
    )
  }

  return (
    <StyledAccordion expanded={isExpanded} onChange={handleExpansionChange}>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${account.accountId}-content`}
        id={`panel-${account.accountId}-header`}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pr: 2 }}>
          <Typography sx={{ fontWeight: 500 }}>{account.accountName}</Typography>
        </Box>
      </StyledAccordionSummary>
      <AccordionDetails>
        {getAccordionContent()}
      </AccordionDetails>
    </StyledAccordion>
  )
})

AccountAccordionItem.displayName = 'AccountAccordionItem'

const AccountRoleAssignments: React.FC<AccountRoleAssignmentsProps> = ({
  accounts,
  selectedRoles,
  onChange,
}) => {
  const { t } = useTranslation('common')
  
  const [expandedAccounts, setExpandedAccounts] = useState<Record<number, boolean>>({})
  const [searchTerm, setSearchTerm] = useState('')

  const handleExpandAll = React.useCallback(() => {
    const allExpanded: Record<number, boolean> = {}
    accounts.forEach((account) => {
      allExpanded[account.accountId] = true
    })
    setExpandedAccounts(allExpanded)
  }, [accounts])

  const handleMinimizeAll = React.useCallback(() => {
    setExpandedAccounts({})
  }, [])

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

  const handleExpandChange = React.useCallback((accountId: number, isExpanded: boolean) => {
    setExpandedAccounts((prev) => ({
      ...prev,
      [accountId]: isExpanded,
    }))
  }, [])

  const handleSearchChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  // Don't filter accounts - let all accounts show and filter roles within each accordion
  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t('account-role-assignments')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
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
        sx={{ mb: 2 }}
        size="small"
      />

      {accounts.map((account) => (
        <AccountAccordionItem
          key={account.accountId}
          account={account}
          isExpanded={expandedAccounts[account.accountId] || false}
          onExpandChange={handleExpandChange}
          selectedRoles={selectedRoles}
          onRoleToggle={handleRoleToggle}
          searchTerm={searchTerm}
        />
      ))}
    </Box>
  )
}

export default AccountRoleAssignments
