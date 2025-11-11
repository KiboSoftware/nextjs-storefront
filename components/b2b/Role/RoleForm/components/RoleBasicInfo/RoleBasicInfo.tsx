import React, { useMemo } from 'react'

import { Box, MenuItem, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Controller, Control, FieldErrors, ControllerRenderProps } from 'react-hook-form'

import { roleBasicInfoStyles } from './RoleBasicInfo.styles'
import { KiboTextBox, KiboSelect } from '@/components/common'

import { B2BAccount } from '@/lib/gql/types'

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
  onParentAccountChange: (value: string) => void
  isReadOnly?: boolean
  isEditMode?: boolean
}

const RoleBasicInfo: React.FC<RoleBasicInfoProps> = ({
  control,
  errors,
  accounts,
  onParentAccountChange,
  isReadOnly = false,
  isEditMode = false,
}) => {
  const { t } = useTranslation('common')

  // Memoize account menu items to prevent recreation
  const accountMenuItems = useMemo(() => {
    if (!accounts || accounts.length === 0) {
      return (
        <MenuItem key="no-accounts" value="" disabled>
          {t('no-accounts-available')}
        </MenuItem>
      )
    }
    return accounts.map((account) => (
      <MenuItem key={account.id} value={String(account.id)}>
        {account.companyOrOrganization || ''}
      </MenuItem>
    ))
  }, [accounts, t])

  // Memoize labels and placeholders to prevent recreation
  const roleNameLabel = useMemo(() => t('role-name'), [t])
  const roleNamePlaceholder = useMemo(() => t('role-name-placeholder'), [t])
  const parentAccountLabel = useMemo(() => t('parent-account'), [t])
  const selectParentAccountPlaceholder = useMemo(() => t('select-parent-account'), [t])
  const roleInformationLabel = useMemo(() => t('role-information'), [t])

  return (
    <Box sx={roleBasicInfoStyles.container}>
      {/* Role Information Section */}
      <Box sx={roleBasicInfoStyles.sectionContainer}>
        <Typography variant="h6" sx={roleBasicInfoStyles.sectionTitle}>
          {roleInformationLabel}
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
              label={roleNameLabel}
              placeholder={roleNamePlaceholder}
              value={field.value}
              onChange={(_name, value) => field.onChange(value)}
              error={!!errors.roleName}
              helperText={errors.roleName?.message}
              disabled={isReadOnly}
            />
          )}
        />
      </Box>

    {/* Parent Account Field - Hide in readonly mode */}
    {!(isReadOnly || isEditMode) && (
      <Box sx={roleBasicInfoStyles.fieldContainer}>
        <Controller
          name="parentAccount"
          control={control}
          render={({ field }: { field: ControllerRenderProps<RoleFormData, 'parentAccount'> }) => (
            <KiboSelect
              name="parentAccount"
              label={parentAccountLabel}
              onChange={(name: string, value: string) => {
                field.onChange(value)
                onParentAccountChange(value)
              }}
              onBlur={field.onBlur}
              value={field.value || ''}
              disabled={!accounts || accounts.length === 0}
              placeholder={selectParentAccountPlaceholder}
              error={!!errors.parentAccount}
              helperText={errors.parentAccount?.message}
            >
              {accountMenuItems}
            </KiboSelect>
          )}
        />
      </Box>
    )}
    </Box>
  )
}

export default React.memo(RoleBasicInfo)
