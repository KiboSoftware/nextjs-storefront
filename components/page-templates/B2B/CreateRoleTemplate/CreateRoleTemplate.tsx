import React, { useMemo, useCallback } from 'react'

import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'

import { CreateRoleTemplateStyles } from './CreateRoleTemplate.styles'
import { RoleForm } from '@/components/b2b/index'
import { RoleFormData } from '@/components/b2b/Role/RoleForm/components'
import { useGetRoleByRoleIdAsync } from '@/hooks'
import { AccountScope, ActionName } from '@/lib/constants'
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
  const router = useRouter()

  // Check if we're in readonly/view mode or copy mode from query params
  const { roleId, mode } = router.query
  const isReadOnly = mode === ActionName.VIEW
  const isCopyMode = mode === ActionName.COPY
  const isEditMode = mode === ActionName.EDIT

  // Fetch role data if roleId is present (for view, edit, or copy mode)
  const { role: roleData, isLoading: isLoadingRole } = useGetRoleByRoleIdAsync(
    roleId ? parseInt(roleId as string) : 0
  )

  // Transform role data into form data format using useMemo
  const formData = useMemo<RoleFormData | undefined>(() => {
    // Create mode - no initial data needed
    if (!roleId) return undefined

    // Loading state - wait for data
    if (isLoadingRole || !roleData) return undefined

    // Only prepare data for view, edit, or copy modes
    if (!isReadOnly && !isEditMode && !isCopyMode) return undefined

    // Create form data from role data
    const preparedData: RoleFormData = {
      roleName: isCopyMode ? `${roleData.name}_Copy` : roleData.name || '',
      parentAccount: user?.id?.toString() || '',
      accountScope: AccountScope.AllChild,
      selectedAccounts: roleData.accountIds || [],
      applyToFutureChildren: false,
      selectedPermissions: {},
    }

    // Convert behaviors array to selectedPermissions format if behaviors exist
    if (roleData.behaviors && Array.isArray(roleData.behaviors) && behaviors?.items) {
      const permissionsMap: Record<number, number[]> = {}
      
      roleData.behaviors.forEach((behavior: string | number) => {
        const behaviorId = typeof behavior === 'string' ? parseInt(behavior) : behavior
        if (isNaN(behaviorId)) return

        // Find the behavior in the behaviors list to get its categoryId
        const behaviorObj = behaviors.items?.find((b) => b.id === behaviorId)
        if (behaviorObj?.categoryId) {
          const categoryId = behaviorObj.categoryId
          if (!permissionsMap[categoryId]) {
            permissionsMap[categoryId] = []
          }
          permissionsMap[categoryId].push(behaviorId)
        }
      })
      
      preparedData.selectedPermissions = permissionsMap
    }

    return preparedData
  }, [roleData, isLoadingRole, isReadOnly, isEditMode, isCopyMode, user?.id, roleId, behaviors])

  // Memoize callbacks to prevent creating new function references
  const handleBackClick = useCallback(() => {
    if (onBackClick) {
      onBackClick()
    } else {
      router.push('/my-account/b2b/manage-roles')
    }
  }, [onBackClick, router])

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