import React, { useMemo, useCallback, useState, useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CreateRoleTemplateStyles } from './CreateRoleTemplate.styles'
import { RoleForm } from '@/components/b2b/index'
import { RoleFormData } from '@/components/b2b/Role/RoleForm/components'
import { useSnackbarContext } from '@/context'
import { useCreateRoleAsync, useUpdateRoleAsync } from '@/hooks'
import { useGetRoleByRoleIdAsync } from '@/hooks'
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
        selectedAccounts: roleData.accountIds || [],
        applyToFutureChildren: false,
        selectedPermissions: {}, // Will be populated from roleData.behaviors if needed
      }

      // Convert behaviors array to selectedPermissions format if behaviors exist
      if (roleData.behaviors && Array.isArray(roleData.behaviors) && behaviors?.items) {
        // Group behaviors by category using the actual behavior data
        const permissionsMap: Record<number, number[]> = {}
        roleData.behaviors.forEach((behavior: string | number) => {
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

  const handleCancel = useCallback(() => {
    router.push('/my-account/b2b/manage-roles')
  }, [router])

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
            isLoading={isLoadingRole && !!roleId}
            roleAccountIds={roleData?.accountIds || []}
            roleId={roleId ? parseInt(roleId as string) : undefined}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default React.memo(CreateRoleTemplate)
