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
  RoleAccountHierarchyView,
  PermissionSelector,
  RoleBasicInfo,
  RoleFormData,
} from './components'
import { roleFormStyles } from './RoleForm.styles'
import { useSnackbarContext } from '@/context'
import { useApplyRoleToFutureChildrensAsync } from '@/hooks/mutations/b2b/manage-roles/useApplyRoleToFutureChildrensAsync/useApplyRoleToFutureChildrensAsync'
import { useCreateRoleAsync } from '@/hooks/mutations/b2b/manage-roles/useCreateRoleAsync/useCreateRoleAsync'
import { useUpdateRoleAsync } from '@/hooks/mutations/b2b/manage-roles/useUpdateRoleAsync/useUpdateRoleAsync'
import { AccountScope, CustomBehaviors } from '@/lib/constants'

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
  onCancel: () => void
  onBackClick: () => void
  user?: CustomerAccount
  accounts?: B2BAccount[]
  behaviorCategories?: { items?: Array<{ id?: number; name?: string }> }
  behaviors?: { items?: Array<{ id?: number; name?: string; categoryId?: number }> }
  accountUserBehaviorResults?: AccountUserBehaviorResult[]
  isReadOnly?: boolean
  isEditMode?: boolean
  initialData?: RoleFormData
  isLoading?: boolean
  roleAccountIds?: number[]
  roleId?: number
  isSystemRole?: boolean
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
  onCancel,
  user,
  accounts,
  onBackClick,
  behaviorCategories,
  behaviors,
  accountUserBehaviorResults,
  isReadOnly = false,
  isEditMode = false,
  initialData,
  isLoading = false,
  roleAccountIds = [],
  roleId,
  isSystemRole = false,
}) => {
  const { t } = useTranslation('common')

  const router = useRouter()

  // Derive mode from router query
  const { mode } = router.query
  const isCopyMode = mode === 'copy'

  // Calculate page title based on mode
  const pageTitle = isReadOnly
    ? t('view-role-details')
    : isEditMode
    ? t('edit-role')
    : isCopyMode
    ? t('copy-role')
    : t('create-new-role')

  const styles = roleFormStyles
  const mdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const { showSnackbar } = useSnackbarContext()
  // Check if user has behavior (create role permission) for a specific account
  const hasCreateRolePermission = useCallback(
    (accountId: number): boolean => {
      if (!accountUserBehaviorResults) return false
      const accountBehavior = accountUserBehaviorResults.find(
        (result) => result.accountId === accountId
      )
      return accountBehavior
        ? accountBehavior.behaviors.includes(CustomBehaviors.CreateRole)
        : false //Need to replace with constant
    },
    [accountUserBehaviorResults]
  )

  // Initialize create role mutation
  const { createRole } = useCreateRoleAsync()

  // Initialize update role mutation
  const { updateRole } = useUpdateRoleAsync()

  // Initialize apply role to future children mutation
  const { applyRoleToFutureChildren } = useApplyRoleToFutureChildrensAsync()

  const roleSchema = useRoleFormSchema()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<RoleFormData>({
    defaultValues: initialData || {
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
  const [permissionError, setPermissionError] = useState<string>('')

  // Watch form values (must be declared before useEffect hooks that use them)
  const accountScope = watch('accountScope')
  const parentAccount = watch('parentAccount')
  const roleName = watch('roleName')

  // Memoize callback to prevent child re-renders
  const handleAccountsChange = useCallback(
    (accountIds: number[]) => {
      setValue('selectedAccounts', accountIds)
    },
    [setValue]
  )

  // Memoize selected accounts to prevent unnecessary re-renders
  const selectedAccountsValue = watch('selectedAccounts') || []

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
    if (!accounts || accounts.length === 0) {
      // If accounts data is not available, use user data
      return user ? [user as unknown as B2BAccount] : []
    }

    if (!accountUserBehaviorResults || accountUserBehaviorResults.length === 0) {
      // If behavior results not loaded yet, return empty or use user
      return user ? [user as unknown as B2BAccount] : []
    }

    const accountsWithPermission = accounts.filter((account) => {
      const hasPermission = hasCreateRolePermission(account.id)
      return hasPermission
    })
    return accountsWithPermission.length > 0
      ? accountsWithPermission
      : user
      ? [user as unknown as B2BAccount]
      : []
  }, [accounts, accountUserBehaviorResults, hasCreateRolePermission, user])

  // Memoize accounts with permission to prevent re-creating array on every render
  const accountsWithPermission = useMemo(
    () => getAccountsWithCreateRolePermission(),
    [getAccountsWithCreateRolePermission]
  )

  const hasChildAccounts = parentAccount
    ? getChildAccountsForParent(Number(parentAccount)).length > 0
    : false

  // Initialize selectedPermissions from initialData
  const [selectedPermissions, setSelectedPermissions] = useState<Record<number, number[]>>(() =>
    initialData?.selectedPermissions || {}
  )

  // Track if initialData has been applied to prevent unnecessary resets
  const isInitialDataApplied = React.useRef(false)

  // Update form when initialData changes (for view/edit/copy modes)
  useEffect(() => {
    if (initialData && !isInitialDataApplied.current) {
      reset(initialData)
      setSelectedPermissions(initialData.selectedPermissions || {})
      isInitialDataApplied.current = true
    }
  }, [initialData, reset])

  // Update parent account when user data loads - set to logged in user's account (only for create mode)
  useEffect(() => {
    // Only run for create mode (no initialData)
    if (initialData || !user?.id || !accountsWithPermission.length) return

    // Find logged-in user's account first, fallback to first account with permission
    const userAccount = accountsWithPermission.find((acc) => acc.id === user?.id)
    const defaultAccount = userAccount || accountsWithPermission[0]

    if (defaultAccount && !parentAccount) {
      const userHasChildren = accounts
        ? accounts.filter((acc) => acc.parentAccountId === defaultAccount.id).length > 0
        : false

      setValue('parentAccount', String(defaultAccount.id))
      if (userHasChildren) {
        setValue('accountScope', 'all-child')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Event handlers
  const handleParentAccountChange = useCallback(
    (value: string) => {
      setValue('parentAccount', value)
      setValue('selectedAccounts', [])

      const newParentHasChildren = value
        ? getChildAccountsForParent(Number(value)).length > 0
        : false
      if (!newParentHasChildren) {
        setValue('accountScope', '')
      }
    },
    [setValue, getChildAccountsForParent]
  )

  const handleBehaviorToggle = useCallback(
    (category: number, behavior: number) => {
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
    },
    [permissionError]
  )

  const handleBehaviorNameCheckboxChange = useCallback(
    (selectedCategory: number) => {
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
    },
    [behaviors?.items, selectedPermissions, permissionError]
  )

  // Get all selected behaviors for the "Selected Behavior" column
  const getAllSelectedBehaviors = useCallback(() => {
    const allBehaviors: Array<{ category: number; behavior: number }> = []
    Object.entries(selectedPermissions).forEach(([category, behaviors]) => {
      behaviors.forEach((behavior) => {
        allBehaviors.push({ category: Number(category), behavior })
      })
    })
    return allBehaviors
  }, [selectedPermissions])

  // Handle removing a behavior from the selected list
  const handleRemoveBehavior = useCallback((category: number, behavior: number) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [category]: (prev[category] || []).filter((b) => b !== behavior),
    }))
  }, [])

  const onSubmit = async (data: RoleFormData) => {
    // Validate that at least one permission is selected
    if (!hasSelectedPermissions) {
      setPermissionError(t('at-least-one-permission-required'))
      return
    }

    // Validate that account scope is selected when parent has child accounts
    if (hasChildAccounts && !data.accountScope) {
      showSnackbar(t('account-scope-required'), 'error')
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
    } else if (data.accountScope === AccountScope.SpecificChild) {
      // Second radio button: Apply to specific child accounts
      // Include parent + selected child accounts
      accountsToInclude = [parentAccountId, ...(data.selectedAccounts || [])]
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
        (id) => !(data.selectedAccounts || []).includes(id)
      )
      accountsToInclude = [parentAccountId, ...unselectedDescendantIds]
    }

    // Create payload
    const b2BRoleInput = {
      name: data.roleName,
      behaviors: allSelectedBehaviorIds,
      accountIds: accountsToInclude,
      id: isEditMode && roleId ? roleId : 0,
    }

    try {
      if (isEditMode && roleId) {
        // Update existing role
        await updateRole.mutateAsync({
          roleId,
          b2BRoleInput,
        })
        showSnackbar(t('role-updated-successfully'), 'success')
      } else {
        // Create new role (for create mode or copy mode)
        const createdRole = await createRole.mutateAsync({ b2BRoleInput })

        // If applyToFutureChildren checkbox is selected and role was created successfully
        if (data.applyToFutureChildren && createdRole?.id) {
          try {
            await applyRoleToFutureChildren.mutateAsync({
              roleId: createdRole.id,
              accountId: parentAccountId,
              enabled: true,
            })
          } catch (applyError) {
            // Show warning but don't prevent navigation since role was created
            showSnackbar(t('role-created-but-failed-to-apply-to-future-children'), 'warning')
          }
        }

        showSnackbar(
          isCopyMode ? t('role-copied-successfully') : t('role-created-successfully'),
          'success'
        )
      }

      // Navigate back to the roles page
      router.push('/my-account/b2b/manage-roles')
    } catch (error: unknown) {
      console.error('Error saving role:', error)
      // Handle error - you might want to show an error message to the user
      setPermissionError(t('role-creation-failed'))
    }
  }

  // Form validation - Using useMemo to make it reactive to form and permission changes
  const isFormValid = useMemo(() => {
    const hasSelectedPermissions = getAllSelectedBehaviors().length > 0
    return roleName?.trim() !== '' && parentAccount !== '' && hasSelectedPermissions
  }, [roleName, parentAccount, getAllSelectedBehaviors])

  const hasSelectedPermissions = getAllSelectedBehaviors().length > 0

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
              <Typography variant="h2">{pageTitle || t('create-new-role')}</Typography>
            </Box>
          )}
        </Stack>
      </Box>
      {mdScreen && (
        <Box sx={{ ...styles.mdWrapIcon }}>
          <Typography variant="h1">{pageTitle || t('create-new-role')}</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {!isReadOnly && (
              <>
                <Button variant="contained" color="secondary" onClick={onCancel}>
                  {t('cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!isFormValid || isLoading}
                  sx={{
                    bgcolor: isFormValid ? 'primary.main' : 'grey.400',
                    '&:hover': {
                      bgcolor: isFormValid ? 'primary.dark' : 'grey.400',
                    },
                  }}
                >
                  {t('save')}
                </Button>
              </>
            )}
          </Box>
        </Box>
      )}

      {/* Basic Information Section */}
      <RoleBasicInfo
        control={control}
        errors={errors}
        accounts={accountsWithPermission}
        onParentAccountChange={handleParentAccountChange}
        isReadOnly={isReadOnly}
        isEditMode={isEditMode}
      />

      {/* Account Scope Section */}
      {!(isReadOnly || isEditMode) && (
        <AccountScopeSelector control={control} hasChildAccounts={hasChildAccounts} />
      )}

      {/* Account Hierarchy Tree - Show when specific-child or all-except is selected AND parent has children */}
      {!(isReadOnly || isEditMode) &&
        parentAccount &&
        (accountScope === AccountScope.SpecificChild ||
          accountScope === AccountScope.AllExcept) && (
          <RoleFormAccountHierarchyTree
            parentAccount={parentAccount}
            accountScope={accountScope}
            accounts={accounts}
            selectedAccounts={selectedAccountsValue}
            onAccountsChange={handleAccountsChange}
            accountUserBehaviorResults={accountUserBehaviorResults}
          />
        )}

      {/* Account Hierarchy View Section - Shows which accounts the role is applied to */}
      {isSystemRole && (
        <Box sx={roleFormStyles.container}>
          <Typography variant="body2">{t('account-hierarchy-scope')}</Typography>
           <Typography variant="body2" sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }} >
              {t('system-role-applies-to-all-accounts')}
            </Typography>
        </Box>
      )}
      {/* Show in readonly mode OR edit mode */}
      {(isReadOnly || isEditMode) && roleAccountIds && roleAccountIds.length > 0 && (
        <RoleAccountHierarchyView
          accounts={accounts}
          selectedAccountIds={roleAccountIds}
          parentAccountId={Number(parentAccount) || user?.id}
        />
      )}

      {/* Permission Configuration Section */}
      <PermissionSelector
        behaviorCategories={behaviorCategories}
        behaviors={behaviors}
        selectedPermissions={selectedPermissions}
        permissionError={permissionError}
        isReadOnly={isReadOnly}
        isSystemRole={isSystemRole}
        onBehaviorToggle={handleBehaviorToggle}
        onBehaviorNameCheckboxChange={handleBehaviorNameCheckboxChange}
        getAllSelectedBehaviors={getAllSelectedBehaviors}
        handleRemoveBehavior={handleRemoveBehavior}
      />

      {!mdScreen && !isReadOnly && (
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
            disabled={!isFormValid || isLoading}
            sx={{
              bgcolor: isFormValid ? 'primary.main' : 'grey.400',
              '&:hover': {
                bgcolor: isFormValid ? 'primary.dark' : 'grey.400',
              },
            }}
          >
            {t('save')}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default RoleForm
