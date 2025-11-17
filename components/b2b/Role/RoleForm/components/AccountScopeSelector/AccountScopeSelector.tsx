import React, { useMemo } from 'react'

import InfoIcon from '@mui/icons-material/Info'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Control, Controller } from 'react-hook-form'

import { accountScopeSelectorStyles } from './AccountScopeSelector.styles'
import { RoleFormData } from '../RoleBasicInfo/RoleBasicInfo'
import { AccountScope } from '@/lib/constants'

interface AccountScopeSelectorProps {
  control: Control<RoleFormData>
  hasChildAccounts: boolean
}

const AccountScopeSelector: React.FC<AccountScopeSelectorProps> = ({
  control,
  hasChildAccounts,
}) => {
  const { t } = useTranslation('common')
  const theme = useTheme()

  // Memoize translation strings
  const accountHierarchyScopeLabel = useMemo(() => t('account-hierarchy-scope'), [t])
  const applyToAllChildAccountsLabel = useMemo(() => t('apply-to-all-child-accounts'), [t])
  const applyToAllChildAccountsTooltip = useMemo(
    () => t('apply-to-all-child-accounts-tooltip'),
    [t]
  )
  const applyToFutureChildAccountsLabel = useMemo(() => t('apply-to-future-child-accounts'), [t])
  const applyToSpecificChildAccountsLabel = useMemo(
    () => t('apply-to-specific-child-accounts'),
    [t]
  )
  const applyToSpecificChildAccountsTooltip = useMemo(
    () => t('apply-to-specific-child-accounts-tooltip'),
    [t]
  )
  const applyToAllChildAccountsExceptLabel = useMemo(
    () => t('apply-to-all-child-accounts-except'),
    [t]
  )
  const applyToAllChildAccountsExceptTooltip = useMemo(
    () => t('apply-to-all-child-accounts-except-tooltip'),
    [t]
  )

  // Memoize theme-based styles
  const infoIconStyle = useMemo(() => accountScopeSelectorStyles.infoIcon(theme), [theme])

  return (
    <Box sx={accountScopeSelectorStyles.container}>
      <Controller
        name="accountScope"
        control={control}
        render={({ field }) => (
          <FormControl component="fieldset" fullWidth>
            <Typography variant="body2" sx={accountScopeSelectorStyles.sectionTitle}>
              {accountHierarchyScopeLabel}
            </Typography>
            <RadioGroup {...field}>
              <Box>
                <Box sx={accountScopeSelectorStyles.flexContainer}>
                  <FormControlLabel
                    value="all-child"
                    control={<Radio size="small" />}
                    label={applyToAllChildAccountsLabel}
                    disabled={!hasChildAccounts}
                    sx={accountScopeSelectorStyles.formControlLabelNoMargin}
                    name="account-scope"
                  />
                  <Tooltip title={applyToAllChildAccountsTooltip} placement="top">
                    <InfoIcon sx={infoIconStyle} />
                  </Tooltip>
                </Box>
                {/* Checkbox for future children - shown when "all-child" is selected */}
                {field.value === AccountScope.AllChild && (
                  <Box sx={accountScopeSelectorStyles.checkboxContainer}>
                    <Controller
                      name="applyToFutureChildren"
                      control={control}
                      render={({ field: checkboxField }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={checkboxField.value}
                              disabled={!hasChildAccounts}
                              onChange={checkboxField.onChange}
                            />
                          }
                          label={
                            <Typography variant="body2">
                              {applyToFutureChildAccountsLabel}
                            </Typography>
                          }
                          disabled={!hasChildAccounts}
                        />
                      )}
                    />
                  </Box>
                )}
              </Box>
              <Box sx={accountScopeSelectorStyles.flexContainer}>
                <FormControlLabel
                  value="specific-child"
                  control={<Radio size="small" />}
                  label={applyToSpecificChildAccountsLabel}
                  disabled={!hasChildAccounts}
                  sx={accountScopeSelectorStyles.formControlLabelNoMargin}
                  name="account-scope"
                />
                <Tooltip title={applyToSpecificChildAccountsTooltip} placement="top">
                  <InfoIcon sx={infoIconStyle} />
                </Tooltip>
              </Box>
              <Box sx={accountScopeSelectorStyles.flexContainer}>
                <FormControlLabel
                  value="all-except"
                  control={<Radio size="small" />}
                  label={applyToAllChildAccountsExceptLabel}
                  disabled={!hasChildAccounts}
                  sx={accountScopeSelectorStyles.formControlLabelNoMargin}
                  name="account-scope"
                />
                <Tooltip title={applyToAllChildAccountsExceptTooltip} placement="top">
                  <InfoIcon sx={infoIconStyle} />
                </Tooltip>
              </Box>
            </RadioGroup>
          </FormControl>
        )}
      />
    </Box>
  )
}

export default React.memo(AccountScopeSelector)
