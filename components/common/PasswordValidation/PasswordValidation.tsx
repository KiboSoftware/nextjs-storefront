import React, { forwardRef, useImperativeHandle } from 'react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
interface PasswordValidationProps {
  password: string
}

interface PasswordValidationHandle {
  validatePassword: () => boolean
}

const PasswordValidation = forwardRef<PasswordValidationHandle, PasswordValidationProps>(
  (props, ref) => {
    const { password = '' } = props
    const { t } = useTranslation('checkout')

    const isHavingAtLeastEightCharacters = password.toString().length >= 8
    const isHavingAtLeastOneNumber = /\d/.test(password)
    const isHavingAtLeastOneCapitalLetter = /[A-Z]/.test(password)
    const isHavingAtLeastOneSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    )

    const validatePassword = () => {
      return (
        isHavingAtLeastEightCharacters &&
        isHavingAtLeastOneNumber &&
        isHavingAtLeastOneCapitalLetter &&
        isHavingAtLeastOneSpecialCharacter
      )
    }

    useImperativeHandle(ref, () => ({
      validatePassword,
    }))

    return (
      <Stack gap={1} alignItems={'flex-start'}>
        <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
          {t('password-requirements')}
        </Typography>

        <Stack direction="row" alignItems="center" gap={1}>
          <CheckCircleIcon
            fontSize="small"
            color={isHavingAtLeastEightCharacters ? 'primary' : 'error'}
            data-testid="isHavingAtLeastEightCharacters"
          />
          {t('at-least-eight-characters-long')}
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <CheckCircleIcon
            fontSize="small"
            color={isHavingAtLeastOneNumber ? 'primary' : 'error'}
            data-testid="isHavingAtLeastOneNumber"
          />
          {t('at-least-one-number')}
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <CheckCircleIcon
            fontSize="small"
            color={isHavingAtLeastOneCapitalLetter ? 'primary' : 'error'}
            data-testid="isHavingAtLeastOneCapitalLetter"
          />
          {t('at-least-one-capital-letter')}
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <CheckCircleIcon
            fontSize="small"
            color={isHavingAtLeastOneSpecialCharacter ? 'primary' : 'error'}
            data-testid="isHavingAtLeastOneSpecialCharacter"
          />
          {t('at-least-one-special-character')}
        </Stack>
      </Stack>
    )
  }
)

export default PasswordValidation
PasswordValidation.displayName = 'PasswordValidation'
