import React from 'react'

import { CheckCircle } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { validatePassword } from '@/lib/helpers/validations/validations'
interface PasswordValidationProps {
  password: string
}

const PasswordValidation = (props: PasswordValidationProps) => {
  const { password = '' } = props
  const { t } = useTranslation('common')

  const {
    isHavingAtLeastEightCharacters,
    isHavingAtLeastOneNumber,
    isHavingAtLeastOneCapitalLetter,
    isHavingAtLeastOneSpecialCharacter,
  } = validatePassword(password)

  return (
    <Stack gap={1} alignItems={'flex-start'}>
      <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
        {t('password-requirements')}
      </Typography>

      <Stack direction="row" alignItems="center" gap={1}>
        <CheckCircle
          fontSize="small"
          color={isHavingAtLeastEightCharacters ? 'primary' : 'error'}
          data-testid="isHavingAtLeastEightCharacters"
        />
        {t('at-least-eight-characters-long')}
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <CheckCircle
          fontSize="small"
          color={isHavingAtLeastOneNumber ? 'primary' : 'error'}
          data-testid="isHavingAtLeastOneNumber"
        />
        {t('at-least-one-number')}
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <CheckCircle
          fontSize="small"
          color={isHavingAtLeastOneCapitalLetter ? 'primary' : 'error'}
          data-testid="isHavingAtLeastOneCapitalLetter"
        />
        {t('at-least-one-capital-letter')}
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <CheckCircle
          fontSize="small"
          color={isHavingAtLeastOneSpecialCharacter ? 'primary' : 'error'}
          data-testid="isHavingAtLeastOneSpecialCharacter"
        />
        {t('at-least-one-special-character')}
      </Stack>
    </Stack>
  )
}

export default PasswordValidation
