import React, { useMemo, useCallback } from 'react'

import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CreateRoleTemplateStyles } from './CreateRoleTemplate.styles'
import { RoleForm } from '@/components/b2b/index'
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
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default React.memo(CreateRoleTemplate)
