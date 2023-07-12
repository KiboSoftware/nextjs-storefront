/* eslint-disable  jsx-a11y/no-autofocus */
import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, FormControl, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { KiboTextBox } from '@/components/common'

export interface ResetPasswordInputData {
  email: string
}

interface ContentProps {
  setAutoFocus?: boolean
  isResetPassword: boolean
  onResetPassword: (formData: ResetPasswordInputData) => void
}

const styles = {
  contentBox: {
    padding: '0.875rem',
  },
  formInput: {
    width: '100%',
  },
}

const Content = (props: ContentProps) => {
  const { setAutoFocus = true, isResetPassword, onResetPassword } = props

  const { t } = useTranslation('common')

  const useDetailsSchema = () => {
    return yup.object().shape({
      email: yup.string().email().required(t('this-field-is-required')),
    })
  }

  const resetPasswordFormData = {
    email: '',
  }

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: resetPasswordFormData,
    resolver: yupResolver(useDetailsSchema()),
    shouldFocusError: true,
  })

  const handleCreateAccount = async (data: ResetPasswordInputData) => {
    onResetPassword(data)
  }

  return (
    <Box sx={{ ...styles.contentBox }}>
      <FormControl sx={{ width: '100%' }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              name="email"
              value={field.value}
              label={t('email')}
              required
              autoFocus={setAutoFocus}
              sx={{ ...styles.formInput }}
              onBlur={field.onBlur}
              onChange={(_name, value) => field.onChange(value)}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit(handleCreateAccount)()}
          disabled={!isValid}
        >
          {t('reset-password')}
        </Button>
      </FormControl>
      {isResetPassword && (
        <Typography py={2} color="success.main">
          {t('reset-password-message')}
        </Typography>
      )}
    </Box>
  )
}

export default Content
