import React, { useMemo, useCallback, useState, useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CreateRoleTemplateStyles } from './CreateRoleTemplate.styles'
import { RoleForm } from '@/components/b2b/index'
import { RoleFormData } from '@/components/b2b/Role/RoleForm/components'
import { useSnackbarContext } from '@/context'
import { useCreateRoleAsync, useUpdateRoleAsync } from '@/hooks'
import useGetRoleByRoleIdAsync from '@/hooks/queries/b2b/manage-roles/useGetRoleByRoleIdAsync/useGetRoleByRoleIdAsync'
import { B2BAccountHierarchyResult } from '@/lib/types'

import { CustomerAccount } from '@/lib/gql/types'

interface AccountUserBehaviorResult {
  accountId: number
  behaviors: number[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error: unknown
}
interface CreateRoleTemplateProps {
  onBackClick?: () => void
  user?: CustomerAccount
  initialData?: B2BAccountHierarchyResult
  behaviorCategories?: { items?: Array<{ id?: number; name?: string }> }
  behaviors?: { items?: Array<{ id?: number; name?: string; categoryId?: number }> }
  accountUserBehaviorResults?: Array<AccountUserBehaviorResult>
}

const CreateRoleTemplate: React.FC<CreateRoleTemplateProps> = ({
  onBackClick,
  user,
  initialData,
  behaviorCategories,
  behaviors,
  accountUserBehaviorResults,
}) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { showSnackbar } = useSnackbarContext()

  // Memoize breadcrumb list to prevent recreation on every render
  const breadcrumbList = useMemo(
    () => [
      {
        key: 'create-role',
        backText: t('manage-roles'),
        redirectURL: '/my-account/b2b/manage-roles',
      },
    ],
    [t]
  )
  const { createRole } = useCreateRoleAsync()
  const { updateRole } = useUpdateRoleAsync()

  // Check if we're in readonly/view mode or copy mode from query params
  const { roleId, mode } = router.query
  const isReadOnly = mode === 'view'
  const isCopyMode = mode === 'copy'
  const isEditMode = mode === 'edit'

  // Fetch role data if roleId is present (for view, edit, or copy mode)
  const { role: roleData, isLoading: isLoadingRole } = useGetRoleByRoleIdAsync(
    roleId ? parseInt(roleId as string) : 0
  )

  // State to hold the initial form data
  const [formData, setFormData] = useState<RoleFormData | undefined>(undefined)

  // When role data is loaded, prepare the initial data based on mode
  useEffect(() => {
    if (roleData && !isLoadingRole && (isReadOnly || isEditMode || isCopyMode)) {
      // Create form data from role data
      const preparedData: RoleFormData = {
        roleName: isCopyMode ? `${roleData.name}_Copy` : roleData.name || '',
        parentAccount: user?.id?.toString() || '', // Pre-select current account
        accountScope: 'all-child', // Default to current account
        selectedAccounts: [],
        applyToFutureChildren: false,
        selectedPermissions: {}, // Will be populated from roleData.behaviors if needed
      }

      // Convert behaviors array to selectedPermissions format if behaviors exist
      if (roleData.behaviors && Array.isArray(roleData.behaviors) && behaviors?.items) {
        // Group behaviors by category using the actual behavior data
        const permissionsMap: Record<number, number[]> = {}
        roleData.behaviors.forEach((behavior: any) => {
          const behaviorId = typeof behavior === 'string' ? parseInt(behavior) : behavior
          if (!isNaN(behaviorId)) {
            // Find the behavior in the behaviors list to get its categoryId
            const behaviorObj = behaviors.items?.find((b) => b.id === behaviorId)
            if (behaviorObj && behaviorObj.categoryId) {
              const categoryId = behaviorObj.categoryId
              if (!permissionsMap[categoryId]) {
                permissionsMap[categoryId] = []
              }
              permissionsMap[categoryId].push(behaviorId)
            }
          }
        })
        preparedData.selectedPermissions = permissionsMap
      }

      setFormData(preparedData)
    } else if (!roleId) {
      // Clear form data when there's no roleId (create mode)
      setFormData(undefined)
    }
  }, [roleData, isLoadingRole, isReadOnly, isEditMode, isCopyMode, user?.id, roleId, behaviors])


  const activeBreadCrumb = breadcrumbList[0]

  // Memoize callbacks to prevent creating new function references
  const handleBackClick = useCallback(() => {
    if (onBackClick) {
      onBackClick()
    } else {
      router.push(activeBreadCrumb.redirectURL)
    }
  }, [onBackClick, router, activeBreadCrumb.redirectURL])

  const handleSave = async (data: RoleFormData) => {
    try {
      // Transform form data to B2BRoleInput
      const behaviors: number[] = []
      Object.values(data.selectedPermissions || {}).forEach((categoryBehaviors) => {
        behaviors.push(...categoryBehaviors)
      })

      // Calculate accountIds based on account scope
      // For edit mode, use the original roleData.accountIds
      let accountIds: number[] = []

      if (isEditMode && roleData?.accountIds) {
        // In edit mode, preserve the original account associations
        accountIds = roleData.accountIds
      } else {
        // For create/copy mode, calculate accountIds based on form selections
        const parentAccountId = parseInt(data.parentAccount)

        if (data.accountScope === 'all-child') {
          // Include parent and all child accounts recursively
          const getAllDescendants = (parentId: number): number[] => {
            const directChildren =
              initialData?.accounts?.filter((acc) => acc.parentAccountId === parentId) || []
            const descendants: number[] = []
            directChildren.forEach((child) => {
              descendants.push(child.id)
              descendants.push(...getAllDescendants(child.id))
            })
            return descendants
          }
          accountIds = [parentAccountId, ...getAllDescendants(parentAccountId)]
        } else if (data.accountScope === 'specific-child') {
          // Include parent and selected child accounts
          accountIds = [parentAccountId, ...(data.selectedAccounts || [])]
        } else if (data.accountScope === 'all-except') {
          // Include parent and all child accounts except selected ones
          const getAllDescendants = (parentId: number): number[] => {
            const directChildren =
              initialData?.accounts?.filter((acc) => acc.parentAccountId === parentId) || []
            const descendants: number[] = []
            directChildren.forEach((child) => {
              descendants.push(child.id)
              descendants.push(...getAllDescendants(child.id))
            })
            return descendants
          }
          const allDescendantIds = getAllDescendants(parentAccountId)
          accountIds = [
            parentAccountId,
            ...allDescendantIds.filter((id) => !data.selectedAccounts?.includes(id)),
          ]
        } else {
          // Current account only
          accountIds = [parentAccountId]
        }
      }

      const b2BRoleInput = {
        name: data.roleName,
        isSystemRole: false,
        behaviors,
        accountIds,
      }

      if (isEditMode && roleId) {
        // Update existing role
        await updateRole.mutateAsync({
          accountId: user?.id as number,
          roleId: parseInt(roleId as string),
          b2BRoleInput,
        })
        showSnackbar(t('role-updated-successfully'), 'success')
      } else {
        // Create new role (for create mode or copy mode)
        await createRole.mutateAsync({ b2BRoleInput })
        showSnackbar(
          isCopyMode ? t('role-copied-successfully') : t('role-created-successfully'),
          'success'
        )
      }

      // Navigate back to the roles page
      router.push('/my-account/b2b/manage-roles')
    } catch (error) {
      console.error('Error saving role:', error)
      showSnackbar(isEditMode ? t('error-updating-role') : t('error-creating-role'), 'error')
    }
  }

  const handleCancel = useCallback(() => {
    router.push('/my-account/b2b/manage-roles')
  }, [router])

  // Determine page title based on mode
  const getPageTitle = () => {
    if (isReadOnly) return t('view-role-details')
    if (isEditMode) return t('edit-role')
    if (isCopyMode) return t('copy-role')
    return t('create-new-role')
  }

  // Determine submit button text based on mode
  const getSubmitButtonText = () => {
    if (isEditMode) return t('edit-role')
    if (isCopyMode) return t('copy-role')
    return t('create-role')
  }

  return (
    <Grid>
      <Grid item style={{ marginTop: '10px', marginBottom: '20px' }}>
        <Box sx={CreateRoleTemplateStyles.container}>
          {/* Desktop Back Button */}

          {/* Role Form */}
          <RoleForm
            onCancel={handleCancel}
            user={user}
            accounts={initialData?.accounts}
            onBackClick={handleBackClick}
            behaviorCategories={behaviorCategories}
            behaviors={behaviors}
            accountUserBehaviorResults={accountUserBehaviorResults}
            initialData={formData}
            isReadOnly={isReadOnly}
            isEditMode={isEditMode}
            pageTitle={getPageTitle()}
            isLoading={isLoadingRole && !!roleId}
            roleAccountIds={[]}
            submitButtonText={getSubmitButtonText()}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default React.memo(CreateRoleTemplate)
