import React, { useEffect, useState, useCallback, useMemo } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowBackIos } from '@mui/icons-material'
import { Box, Button, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
  AccountScopeSelector,
  RoleFormAccountHierarchyTree,
  PermissionSelector,
  RoleBasicInfo,
  RoleFormData,
} from './components'
import { roleFormStyles } from './RoleForm.styles'
import { useSnackbarContext } from '@/context'
import { useApplyRoleToFutureChildrensAsync } from '@/hooks/mutations/b2b/manage-roles/useApplyRoleToFutureChildrensAsync/useApplyRoleToFutureChildrensAsync'
import { useCreateRoleAsync } from '@/hooks/mutations/b2b/manage-roles/useCreateRoleAsync/useCreateRoleAsync'

import { B2BAccount, CustomerAccount } from '@/lib/gql/types'

interface AccountUserBehaviorResult {
  accountId: number
  behaviors: number[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error: unknown
}

interface RoleFormProps {
  onSave?: (data: RoleFormData) => void
  onCancel: () => void
  onBackClick: () => void
  user?: CustomerAccount
  accounts?: B2BAccount[]
  behaviorCategories?: { items?: Array<{ id?: number; name?: string }> }
  behaviors?: { items?: Array<{ id?: number; name?: string; categoryId?: number }> }
  categoriesLoading?: boolean
  behaviorsLoading?: boolean
  accountUserBehaviorResults?: AccountUserBehaviorResult[]
  accountUserBehaviors?: Array<unknown>
  behaviorLoading?: boolean
}

const useRoleFormSchema = () => {
  const { t } = useTranslation('common')
  return yup.object({
    roleName: yup.string().required(t('role-name-required')),
    parentAccount: yup.string().required(t('parent-account-required')),
    accountScope: yup.string(),
  })
}

const RoleForm: React.FC<RoleFormProps> = ({
  onSave,
  onCancel,
  user,
  accounts,
  onBackClick,
  behaviorCategories,
  behaviors,
  categoriesLoading,
  behaviorsLoading,
  accountUserBehaviorResults,
  accountUserBehaviors,
}) => {
  const { t } = useTranslation('common')

  const router = useRouter()
  const styles = roleFormStyles
  const mdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const { showSnackbar } = useSnackbarContext()

  // Use default values for loading states if not provided
  const isLoadingCategories = categoriesLoading || false
  const isLoadingBehaviors = behaviorsLoading || false
  // Check if user has behavior (create role permission) for a specific account
  const hasCreateRolePermission = useCallback(
    (accountId: number): boolean => {
      if (!accountUserBehaviorResults) return false
      const accountBehavior = accountUserBehaviorResults.find(
        (result) => result.accountId === accountId
      )
      return accountBehavior ? accountBehavior.behaviors.includes(2027) : false //Need to replace with constant
    },
    [accountUserBehaviorResults]
  )

  // Initialize create role mutation
  const { createRole } = useCreateRoleAsync()

  // Initialize apply role to future children mutation
  const { applyRoleToFutureChildrens } = useApplyRoleToFutureChildrensAsync()

  const roleSchema = useRoleFormSchema()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<RoleFormData>({
    defaultValues: {
      roleName: '',
      parentAccount: '',
      accountScope: '',
      applyToFutureChildren: false,
      selectedAccounts: [],
      selectedPermissions: {},
    },
    resolver: yupResolver(roleSchema),
  })

  // State management
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedPermissions, setSelectedPermissions] = useState<Record<number, number[]>>({})
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([])
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set())
  const [permissionError, setPermissionError] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Watch form values (must be declared before useEffect hooks that use them)
  const accountScope = watch('accountScope')
  const parentAccount = watch('parentAccount')
  const roleName = watch('roleName')

  // Helper functions
  const getChildAccountsForParent = useCallback(
    (parentId: number): B2BAccount[] => {
      if (!accounts) return []
      return accounts.filter((acc) => acc.parentAccountId === parentId)
    },
    [accounts]
  )

  // Get all accounts where user has create role permission (for parent dropdown)
  const getAccountsWithCreateRolePermission = useCallback((): B2BAccount[] => {
    if (!accounts || !accountUserBehaviorResults) return []

    const accountsWithPermission = accounts.filter((account) => hasCreateRolePermission(account.id))

    return accountsWithPermission
  }, [accounts, accountUserBehaviorResults, hasCreateRolePermission])

  // Get all accounts from hierarchy (not just logged-in user's children)
  const getAllAccountsFromHierarchy = useCallback((): B2BAccount[] => {
    return accounts || []
  }, [accounts])

  const hasChildAccounts = parentAccount
    ? getChildAccountsForParent(Number(parentAccount)).length > 0
    : false

  const shouldShowAccount = useCallback(
    (accountId: number, query: string): boolean => {
      const checkAccountMatch = (id: number, searchQuery: string): boolean => {
        if (!searchQuery.trim()) return true

        const account = accounts?.find((acc) => acc.id === id)
        if (!account) return false

        // Check if current account matches
        const accountName = account.companyOrOrganization || `Account ${id}`
        if (accountName.toLowerCase().includes(searchQuery.toLowerCase())) {
          return true
        }

        // Check if any child accounts match (recursive)
        const childAccounts = getChildAccountsForParent(id)
        return childAccounts.some((child) => checkAccountMatch(child.id, searchQuery))
      }

      return checkAccountMatch(accountId, query)
    },
    [accounts, getChildAccountsForParent]
  )

  // Update parent account when user data loads - set to first account with create role permission
  useEffect(() => {
    if (accountUserBehaviorResults && accounts && accountUserBehaviorResults.length > 0) {
      const accountsWithPermission = getAccountsWithCreateRolePermission()

      // Find user's current account or first account with permission
      const userAccount = accountsWithPermission.find((acc) => acc.id === user?.id)
      const defaultAccount = userAccount || accountsWithPermission[0]

      if (defaultAccount) {
        const userHasChildren =
          accounts.filter((acc) => acc.parentAccountId === defaultAccount.id).length > 0
        reset({
          roleName: '',
          parentAccount: String(defaultAccount.id),
          accountScope: userHasChildren ? 'all-child' : '',
          applyToFutureChildren: false,
          selectedAccounts: [],
          selectedPermissions: {},
        })
      }
    }
  }, [user?.id, reset, accounts, accountUserBehaviorResults, getAccountsWithCreateRolePermission])

  // Set default selected category when categories load
  useEffect(() => {
    if (
      behaviorCategories?.items &&
      behaviorCategories.items.length > 0 &&
      selectedCategory === null
    ) {
      setSelectedCategory(behaviorCategories.items[0].id || null)
    }
  }, [behaviorCategories, selectedCategory])

  // Auto-expand nodes when searching
  useEffect(() => {
    if (searchQuery.trim() && accounts && parentAccount) {
      const expandedIds = new Set<number>()

      const expandParentsOfMatches = (accountId: number) => {
        const account = accounts.find((acc) => acc.id === accountId)
        if (!account) return

        const accountName = account.companyOrOrganization || `Account ${accountId}`
        if (accountName.toLowerCase().includes(searchQuery.toLowerCase())) {
          // Expand all parents
          let currentParentId = account.parentAccountId
          while (currentParentId) {
            expandedIds.add(currentParentId)
            const parentAccount = accounts.find((acc) => acc.id === currentParentId)
            currentParentId = parentAccount?.parentAccountId
          }
        }

        // Check children recursively
        const children = getChildAccountsForParent(accountId)
        children.forEach((child) => expandParentsOfMatches(child.id))
      }

      expandParentsOfMatches(Number(parentAccount))
      setExpandedNodes(expandedIds)
    }
  }, [searchQuery, accounts, parentAccount, getChildAccountsForParent])

  // Event handlers
  const handleParentAccountChange = (value: string) => {
    setValue('parentAccount', value)
    setSelectedAccounts([])
    setValue('selectedAccounts', [])

    const newParentHasChildren = value ? getChildAccountsForParent(Number(value)).length > 0 : false
    if (!newParentHasChildren) {
      setValue('accountScope', '')
    }
  }

  const handleAccountSelection = (accountId: number, checked: boolean) => {
    setSelectedAccounts((prev) => {
      const newSelection = checked ? [...prev, accountId] : prev.filter((id) => id !== accountId)
      setValue('selectedAccounts', newSelection)
      return newSelection
    })
  }

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

  const handleCategorySelect = (category: number) => {
    setSelectedCategory(category)
  }

  const handleBehaviorToggle = (category: number, behavior: number) => {
    setSelectedPermissions((prev) => {
      const categoryPermissions = prev[category] || []
      const isSelected = categoryPermissions.includes(behavior)

      if (isSelected) {
        return {
          ...prev,
          [category]: categoryPermissions.filter((b) => b !== behavior),
        }
      } else {
        return {
          ...prev,
          [category]: [...categoryPermissions, behavior],
        }
      }
    })

    if (permissionError) {
      setPermissionError('')
    }
  }

  const handleBehaviorNameCheckboxChange = () => {
    const selectedCategoryBehaviors =
      behaviors?.items?.filter((behavior) => behavior.categoryId === selectedCategory) || []

    const allSelected = selectedCategoryBehaviors.every((behavior) =>
      selectedPermissions[selectedCategory || 0]?.includes(behavior.id || 0)
    )

    if (allSelected) {
      setSelectedPermissions((prev) => ({
        ...prev,
        [selectedCategory || 0]: [],
      }))
    } else {
      const allBehaviorIds = selectedCategoryBehaviors.map((behavior) => behavior.id || 0)
      setSelectedPermissions((prev) => ({
        ...prev,
        [selectedCategory || 0]: allBehaviorIds,
      }))
    }

    if (permissionError) {
      setPermissionError('')
    }
  }

  // Get behaviors for the selected category
  const selectedCategoryBehaviors =
    behaviors?.items?.filter((behavior) => behavior.categoryId === selectedCategory) || []

  // Get all selected behaviors for the "Selected Behavior" column
  const getAllSelectedBehaviors = () => {
    const allBehaviors: Array<{ category: number; behavior: number }> = []
    Object.entries(selectedPermissions).forEach(([category, behaviors]) => {
      behaviors.forEach((behavior) => {
        allBehaviors.push({ category: Number(category), behavior })
      })
    })
    return allBehaviors
  }

  // Handle removing a behavior from the selected list
  const handleRemoveBehavior = (category: number, behavior: number) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [category]: (prev[category] || []).filter((b) => b !== behavior),
    }))
  }

  const handleSelectAllAccounts = () => {
    if (!parentAccount || !accounts) return

    const getAllDescendants = (parentId: number): number[] => {
      const directChildren = accounts.filter((acc) => acc.parentAccountId === parentId) || []
      const descendants: number[] = []
      directChildren.forEach((child) => {
        // Only include accounts where user has create role permission
        if (hasCreateRolePermission(child.id)) {
          descendants.push(child.id)
        }
        descendants.push(...getAllDescendants(child.id))
      })
      return descendants
    }

    const allDescendantIds = getAllDescendants(Number(parentAccount))
    setSelectedAccounts(allDescendantIds)
    const allIds = new Set(accounts.map((acc) => acc.id) || [])
    setExpandedNodes(allIds)
    setValue('selectedAccounts', allDescendantIds)
  }

  const handleDeselectAllAccounts = () => {
    setSelectedAccounts([])
    setExpandedNodes(new Set())
    setValue('selectedAccounts', [])
  }

  // Form validation - Using useMemo to make it reactive to form and permission changes
  const hasSelectedPermissions = getAllSelectedBehaviors().length > 0

  const isFormValid = useMemo(() => {
    return roleName?.trim() !== '' && parentAccount !== '' && hasSelectedPermissions
  }, [roleName, parentAccount, hasSelectedPermissions])

  const onSubmit = async (data: RoleFormData) => {
    // Validate that at least one permission is selected
    if (!hasSelectedPermissions) {
      setPermissionError(t('at-least-one-permission-required'))
      return
    }

    // Clear permission error if validation passes
    setPermissionError('')

    // Extract all selected behavior IDs from selectedPermissions
    const allSelectedBehaviorIds: number[] = []
    Object.values(selectedPermissions).forEach((behaviorIds) => {
      allSelectedBehaviorIds.push(...behaviorIds)
    })

    // Determine which accounts to include based on account scope selection
    let accountsToInclude: number[] = []
    const parentAccountId = Number(data.parentAccount)

    // If parent has no child accounts, only include the parent account
    if (!hasChildAccounts) {
      accountsToInclude = [parentAccountId]
    } else if (data.accountScope === 'all-child') {
      // First radio button: Apply to all child accounts
      // Include parent + all child accounts and their nested children (recursive) that have create role permission
      const getAllDescendants = (parentId: number): number[] => {
        const directChildren = accounts?.filter((acc) => acc.parentAccountId === parentId) || []
        const descendants: number[] = []
        directChildren.forEach((child) => {
          // Only include if user has create role permission for this account
          if (hasCreateRolePermission(child.id)) {
            descendants.push(child.id)
          }
          descendants.push(...getAllDescendants(child.id)) // Recursively get nested children
        })
        return descendants
      }

      const allDescendantIds = getAllDescendants(parentAccountId)
      accountsToInclude = [parentAccountId, ...allDescendantIds]
    } else if (data.accountScope === 'specific-child') {
      // Second radio button: Apply to specific child accounts
      // Include parent + selected child accounts
      accountsToInclude = [parentAccountId, ...selectedAccounts]
    } else if (data.accountScope === 'all-except') {
      // Third radio button: Apply to all child accounts except selected
      // Include parent + all child accounts and their nested children (recursive) that are NOT selected and have create role permission
      const getAllDescendants = (parentId: number): number[] => {
        const directChildren = accounts?.filter((acc) => acc.parentAccountId === parentId) || []
        const descendants: number[] = []
        directChildren.forEach((child) => {
          // Only include if user has create role permission for this account
          if (hasCreateRolePermission(child.id)) {
            descendants.push(child.id)
          }
          descendants.push(...getAllDescendants(child.id)) // Recursively get nested children
        })
        return descendants
      }

      const allDescendantIds = getAllDescendants(parentAccountId)
      // Remove selected accounts from the list of descendants
      const unselectedDescendantIds = allDescendantIds.filter(
        (id) => !selectedAccounts.includes(id)
      )
      accountsToInclude = [parentAccountId, ...unselectedDescendantIds]
    }

    // Create single payload with the specified format
    const payload = {
      b2BRoleInput: {
        name: data.roleName,
        behaviors: allSelectedBehaviorIds,
        accountIds: accountsToInclude,
        id: 0,
      },
    }
    try {
      // Execute role creation with single API call
      const createdRole = await createRole.mutateAsync(payload)

      // If applyToFutureChildren checkbox is selected and role was created successfully
      if (data.applyToFutureChildren && createdRole?.id) {
        try {
          await applyRoleToFutureChildrens.mutateAsync({
            roleId: createdRole.id,
            accountId: parentAccountId,
            enabled: true,
          })
        } catch (applyError) {
          // Show warning but don't prevent navigation since role was created
          showSnackbar(t('role-created-but-failed-to-apply-to-future-children'), 'warning')
        }
      }

      // Call onSave callback if provided
      showSnackbar(t('role-created-successfully'), 'success')
      router.push('/my-account/b2b/manage-roles')
    } catch (error) {
      console.error('Error creating role:', error)
      // Handle error - you might want to show an error message to the user
      setPermissionError(t('role-creation-failed'))
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ ...styles.container, padding: 0, margin: 0 }}
    >
      <Box>
        <Stack sx={{ ...styles.wrapIcon }} direction="row" gap={2}>
          {/* Header Section with Title and Actions */}
          <Box sx={{ display: 'flex' }} onClick={onBackClick}>
            <ArrowBackIos fontSize="inherit" />
            {mdScreen && <Typography variant="body2">{t('manage-roles')}</Typography>}
          </Box>
          {!mdScreen && (
            <Box sx={{ ...styles.createRoleTitle }}>
              <Typography variant="h2">{t('create-new-role')}</Typography>
            </Box>
          )}
        </Stack>
      </Box>
      {mdScreen && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            mt: 3,
          }}
        >
          <Typography variant="h1">{t('create-new-role')}</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="secondary" onClick={onCancel}>
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!isFormValid}
              sx={{
                bgcolor: isFormValid ? 'primary.main' : 'grey.400',
                '&:hover': {
                  bgcolor: isFormValid ? 'primary.dark' : 'grey.400',
                },
              }}
            >
              {t('create-role')}
            </Button>
          </Box>
        </Box>
      )}

      {/* Basic Information Section */}
      <RoleBasicInfo
        control={control}
        errors={errors}
        accounts={getAccountsWithCreateRolePermission()}
        user={user}
        onParentAccountChange={handleParentAccountChange}
      />

      {/* Account Scope Section */}
      <AccountScopeSelector
        control={control}
        hasChildAccounts={hasChildAccounts}
        selectedAccountsLength={selectedAccounts.length}
        parentAccount={parentAccount}
        accounts={getAccountsWithCreateRolePermission()}
      />

      {/* Account Hierarchy Tree - Show when specific-child or all-except is selected AND parent has children */}
      {parentAccount && (accountScope === 'specific-child' || accountScope === 'all-except') && (
        <RoleFormAccountHierarchyTree
          parentAccount={parentAccount}
          accountScope={accountScope}
          accounts={getAllAccountsFromHierarchy()}
          selectedAccounts={selectedAccounts}
          expandedNodes={expandedNodes}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onAccountSelection={handleAccountSelection}
          onToggleNodeExpansion={toggleNodeExpansion}
          onSelectAllAccounts={handleSelectAllAccounts}
          onDeselectAllAccounts={handleDeselectAllAccounts}
          shouldShowAccount={shouldShowAccount}
          getChildAccountsForParent={getChildAccountsForParent}
          hasCreateRolePermission={hasCreateRolePermission}
        />
      )}

      {/* Permission Configuration Section */}
      <PermissionSelector
        behaviorCategories={behaviorCategories}
        behaviors={behaviors}
        categoriesLoading={isLoadingCategories}
        behaviorsLoading={isLoadingBehaviors}
        selectedCategory={selectedCategory}
        selectedPermissions={selectedPermissions}
        permissionError={permissionError}
        onCategorySelect={handleCategorySelect}
        onBehaviorToggle={handleBehaviorToggle}
        onBehaviorNameCheckboxChange={handleBehaviorNameCheckboxChange}
        getAllSelectedBehaviors={getAllSelectedBehaviors}
        handleRemoveBehavior={handleRemoveBehavior}
        selectedCategoryBehaviors={selectedCategoryBehaviors}
      />

      {!mdScreen && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 2,
            flexDirection: {
              xs: 'column-reverse',
              md: 'row',
            },
          }}
        >
          <Button variant="contained" color="secondary" onClick={onCancel}>
            {t('cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid}
            sx={{
              bgcolor: isFormValid ? 'primary.main' : 'grey.400',
              '&:hover': {
                bgcolor: isFormValid ? 'primary.dark' : 'grey.400',
              },
            }}
          >
            {t('create-role')}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default RoleForm
