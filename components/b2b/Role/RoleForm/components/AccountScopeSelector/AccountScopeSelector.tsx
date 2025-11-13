import React from 'react'

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

import { B2BAccount } from '@/lib/gql/types'
interface AccountScopeSelectorProps {
  control: Control<RoleFormData>
  hasChildAccounts: boolean
  selectedAccountsLength: number
  parentAccount: string
  accounts?: B2BAccount[]
}

const AccountScopeSelector: React.FC<AccountScopeSelectorProps> = ({
  control,
  hasChildAccounts,
  selectedAccountsLength,
  parentAccount,
  accounts,
}) => {
  const { t } = useTranslation('common')
  const theme = useTheme()

  return (
    <Box sx={accountScopeSelectorStyles.container}>
      <Controller
        name="accountScope"
        control={control}
        render={({ field }) => (
          <FormControl component="fieldset" fullWidth>
            <Typography variant="body2" sx={accountScopeSelectorStyles.sectionTitle}>
              {t('account-hierarchy-scope')}
            </Typography>
            <RadioGroup {...field}>
              <Box>
                <Box sx={accountScopeSelectorStyles.flexContainer}>
                  <FormControlLabel
                    value="all-child"
                    control={<Radio size="small" />}
                    label={t('apply-to-all-child-accounts')}
                    disabled={!hasChildAccounts}
                    sx={accountScopeSelectorStyles.formControlLabelNoMargin}
                  />
                  <Tooltip title={t('apply-to-all-child-accounts-tooltip')} placement="top">
                    <InfoIcon sx={accountScopeSelectorStyles.infoIcon(theme)} />
                  </Tooltip>
                </Box>
                {/* Checkbox for future children - shown when "all-child" is selected */}
                {field.value === 'all-child' && (
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
                              onChange={(e) => checkboxField.onChange(e.target.checked)}
                            />
                          }
                          label={
                            <Typography variant="body2">
                              {t('apply-to-future-child-accounts')}
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
                  label={t('apply-to-specific-child-accounts')}
                  disabled={!hasChildAccounts}
                  sx={accountScopeSelectorStyles.formControlLabelNoMargin}
                />
                <Tooltip title={t('apply-to-specific-child-accounts-tooltip')} placement="top">
                  <InfoIcon sx={accountScopeSelectorStyles.infoIcon(theme)} />
                </Tooltip>
              </Box>
              <Box sx={accountScopeSelectorStyles.flexContainer}>
                <FormControlLabel
                  value="all-except"
                  control={<Radio size="small" />}
                  label={t('apply-to-all-child-accounts-except')}
                  disabled={!hasChildAccounts}
                  sx={accountScopeSelectorStyles.formControlLabelNoMargin}
                />
                <Tooltip title={t('apply-to-all-child-accounts-except-tooltip')} placement="top">
                  <InfoIcon sx={accountScopeSelectorStyles.infoIcon(theme)} />
                </Tooltip>
              </Box>
            </RadioGroup>
          </FormControl>
        )}
      />
    </Box>
  )
}

export default AccountScopeSelector
