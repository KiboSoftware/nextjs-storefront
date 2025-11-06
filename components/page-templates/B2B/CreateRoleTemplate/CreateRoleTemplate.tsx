import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CreateRoleTemplateStyles } from './CreateRoleTemplate.styles'
import { RoleForm } from '@/components/b2b/index'
import { RoleFormData } from '@/components/b2b/Role/RoleForm/components'
import { useCreateRoleAsync } from '@/hooks/mutations/b2b/manage-roles/useCreateRoleAsync/useCreateRoleAsync'
import { useGetRoleByIdAsync } from '@/hooks/queries/b2b/manage-roles/useGetRoleByIdAsync/useGetRoleByIdAsync'

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
  categoriesLoading?: boolean
  behaviorsLoading?: boolean
  accountUserBehaviorResults?: Array<AccountUserBehaviorResult>
  accountUserBehaviors?: Array<unknown>
  behaviorLoading?: boolean
}

const CreateRoleTemplate: React.FC<CreateRoleTemplateProps> = ({
  onBackClick,
  user,
  initialData,
  behaviorCategories,
  behaviors,
  categoriesLoading,
  behaviorsLoading,
  accountUserBehaviorResults,
  accountUserBehaviors,
  behaviorLoading,
}) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const { createRole } = useCreateRoleAsync()

  // Check if we're in readonly/view mode or copy mode from query params
  const { roleId, mode } = router.query
  const isReadOnly = mode === 'view'
  const isCopyMode = mode === 'copy'
  const isEditMode = mode === 'edit'

  // Fetch role data if roleId is present (for view, edit, or copy mode)
  const { role: roleData, isLoading: isLoadingRole } = useGetRoleByIdAsync(
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
        accountScope: 'current-account', // Default to current account
        selectedAccounts: [],
        applyToFutureChildren: false,
        selectedPermissions: {}, // Will be populated from roleData.behaviors if needed
      }

      // Convert behaviors array to selectedPermissions format if behaviors exist
      if (roleData.behaviors && Array.isArray(roleData.behaviors)) {
        // Group behaviors by category
        const permissionsMap: Record<number, number[]> = {}
        roleData.behaviors.forEach((behavior) => {
          const behaviorId = typeof behavior === 'string' ? parseInt(behavior) : behavior
          if (!isNaN(behaviorId)) {
            // You may need to map behaviors to categories properly based on your data structure
            // For now, grouping all under category 0 as placeholder
            if (!permissionsMap[0]) {
              permissionsMap[0] = []
            }
            permissionsMap[0].push(behaviorId)
          }
        })
        preparedData.selectedPermissions = permissionsMap
      }

      setFormData(preparedData)
    } else if (!roleId) {
      // Clear form data when there's no roleId (create mode)
      setFormData(undefined)
    }
  }, [roleData, isLoadingRole, isReadOnly, isEditMode, isCopyMode, user?.id, roleId])

  const breadcrumbList = [
    {
      key: 'create-role',
      backText: t('manage-roles'),
      redirectURL: '/my-account/b2b/manage-roles',
    },
  ]
  const activeBreadCrumb = breadcrumbList[0]

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      router.push(activeBreadCrumb.redirectURL)
    }
  }

  const handleSave = async (data: RoleFormData) => {
    try {
      // TODO: Implement actual role creation logic using createRole mutation
      // await createRole.mutateAsync({ b2BRoleInput: transformedData })

      // For now, just navigate back to the roles page
      router.push('/my-account/b2b/manage-roles')
    } catch (error) {
      console.error('Error creating role:', error)
      // TODO: Add proper error handling
    }
  }

  const handleCancel = () => {
    router.push('/my-account/b2b/manage-roles')
  }

  // Determine page title based on mode
  const getPageTitle = () => {
    if (isReadOnly) return t('view-role-details')
    if (isEditMode) return t('edit-role')
    if (isCopyMode) return t('copy-role')
    return t('create-new-role')
  }

  return (
    <Grid>
      <Grid item style={{ marginTop: '10px', marginBottom: '20px' }}>
        <Box sx={CreateRoleTemplateStyles.container}>
          {/* Desktop Back Button */}

          {/* Role Form */}
          <RoleForm
            onSave={handleSave}
            onCancel={handleCancel}
            user={user}
            accounts={initialData?.accounts}
            onBackClick={handleBackClick}
            behaviorCategories={behaviorCategories}
            behaviors={behaviors}
            categoriesLoading={categoriesLoading}
            behaviorsLoading={behaviorsLoading}
            accountUserBehaviorResults={accountUserBehaviorResults}
            accountUserBehaviors={accountUserBehaviors}
            behaviorLoading={behaviorLoading}
            initialData={formData}
            isReadOnly={isReadOnly}
            pageTitle={getPageTitle()}
            isLoading={isLoadingRole && !!roleId}
            roleAccountIds={roleData?.accountIds}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default CreateRoleTemplate
