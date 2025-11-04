import React from 'react'

import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CreateRoleTemplateStyles } from './CreateRoleTemplate.styles'
import { RoleForm } from '@/components/b2b/index'
import { RoleFormData } from '@/components/b2b/Role/RoleForm/components'
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

  const handleSave = (data: RoleFormData) => {
    // For now, just navigate back to the roles page
    router.push('/my-account/b2b/manage-roles')
  }

  const handleCancel = () => {
    router.push('/my-account/b2b/manage-roles')
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
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default CreateRoleTemplate
