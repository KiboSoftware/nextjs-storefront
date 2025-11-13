import React from 'react'

import { Box, MenuItem, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Controller, Control, FieldErrors, ControllerRenderProps } from 'react-hook-form'

import { roleBasicInfoStyles } from './RoleBasicInfo.styles'
import { KiboTextBox, KiboSelect } from '@/components/common'

import { B2BAccount, CustomerAccount } from '@/lib/gql/types'

export interface RoleFormData {
  roleName: string
  parentAccount: string
  accountScope: string
  applyToFutureChildren: boolean
  selectedAccounts: number[]
  selectedPermissions: Record<number, number[]>
}

interface RoleBasicInfoProps {
  control: Control<RoleFormData>
  errors: FieldErrors<RoleFormData>
  accounts?: B2BAccount[]
  user?: CustomerAccount
  onParentAccountChange: (value: string) => void
}

const RoleBasicInfo: React.FC<RoleBasicInfoProps> = ({
  control,
  errors,
  accounts,
  user,
  onParentAccountChange,
}) => {
  const { t } = useTranslation('common')

  return (
    <Box sx={roleBasicInfoStyles.container}>
      {/* Role Information Section */}
      <Box sx={roleBasicInfoStyles.sectionContainer}>
        <Typography variant="h6" sx={roleBasicInfoStyles.sectionTitle}>
          {t('role-information')}
        </Typography>
      </Box>

      {/* Role Name Field */}
      <Box sx={roleBasicInfoStyles.fieldContainer}>
        <Controller
          name="roleName"
          control={control}
          render={({ field }: { field: ControllerRenderProps<RoleFormData, 'roleName'> }) => (
            <KiboTextBox
              fullWidth
              label={t('role-name')}
              placeholder={t('role-name-placeholder')}
              value={field.value}
              onChange={(_name, value) => field.onChange(value)}
              error={!!errors.roleName}
              helperText={errors.roleName?.message}
            />
          )}
        />
      </Box>

      {/* Parent Account Field */}
      <Box sx={roleBasicInfoStyles.fieldContainer}>
        <Controller
          name="parentAccount"
          control={control}
          render={({ field }: { field: ControllerRenderProps<RoleFormData, 'parentAccount'> }) => (
            <KiboSelect
              name="parentAccount"
              label={t('parent-account')}
              onChange={(name: string, value: string) => {
                // Call field.onChange first to update React Hook Form
                field.onChange(value)
                // Then call our custom handler
                onParentAccountChange(value)
              }}
              onBlur={() => {
                field.onBlur()
              }}
              value={field.value || ''}
              disabled={!accounts || accounts.length === 0}
              placeholder={t('select-parent-account')}
              error={!!errors.parentAccount}
              helperText={errors.parentAccount?.message}
            >
              {accounts && accounts.length > 0
                ? accounts.map((account) => (
                    <MenuItem key={account.id} value={String(account.id)}>
                      {account.companyOrOrganization || ''}
                    </MenuItem>
                  ))
                : [
                    <MenuItem key="no-accounts" value="" disabled>
                      {t('no-accounts-available')}
                    </MenuItem>,
                  ]}
            </KiboSelect>
          )}
        />
      </Box>
    </Box>
  )
}

export default RoleBasicInfo
