import React from 'react'

import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CreateRoleTemplateStyles } from './CreateRoleTemplate.styles'
import { RoleForm, RoleFormData } from '@/components/b2b/Role/RoleForm/RoleForm'
import { MobileB2BLayout } from '@/components/layout'
import { B2BAccountHierarchyResult } from '@/lib/types'

import { CustomerAccount } from '@/lib/gql/types'

interface CreateRoleTemplateProps {
  onBackClick?: () => void
  user?: CustomerAccount
  initialData?: B2BAccountHierarchyResult
}

const CreateRoleTemplate: React.FC<CreateRoleTemplateProps> = ({
  onBackClick,
  user,
  initialData,
}) => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const router = useRouter()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

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
    // TODO: Implement the API call to save the role
    console.log('Saving role:', data)

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
          {mdScreen && (
            <Box sx={{ mb: 2 }}>
              <Button
                startIcon={<ArrowBackIos fontSize="small" />}
                onClick={handleBackClick}
                sx={{ color: 'text.primary', textTransform: 'none' }}
              >
                {t('manage-roles')}
              </Button>
            </Box>
          )}

          {/* Header Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant={mdScreen ? 'h1' : 'h2'} sx={{ mb: 1 }}>
              {t('create-new-role') || 'Create New Role'}
            </Typography>
          </Box>

          {/* Role Form */}
          <RoleForm
            onSave={handleSave}
            onCancel={handleCancel}
            user={user}
            accounts={initialData?.accounts}
            hierarchy={initialData?.hierarchy}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default CreateRoleTemplate
