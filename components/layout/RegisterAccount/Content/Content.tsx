/* eslint-disable  jsx-a11y/no-autofocus */
import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, FormControl, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { KiboTextBox, PasswordValidation } from '@/components/common'
import { isPasswordValid } from '@/lib/helpers/validations/validations'

export interface RegisterAccountInputData {
  email: string
  firstName: string
  lastNameOrSurname: string
  password: string
}

interface ContentProps {
  setAutoFocus?: boolean
  onRegisterNow: (formData: RegisterAccountInputData) => void
  errorMessage: string
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
  const { setAutoFocus = true, onRegisterNow, errorMessage } = props
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { t } = useTranslation('common')

  const useDetailsSchema = () => {
    return yup.object().shape({
      email: yup.string().email().required(t('this-field-is-required')),
      firstName: yup.string().required(t('this-field-is-required')),
      lastNameOrSurname: yup.string().required(t('this-field-is-required')),
      password: yup
        .string()
        .required(t('this-field-is-required'))
        .test((value = '') => {
          return isPasswordValid(value)
        }),
    })
  }

  const registerAccountFormData = {
    email: '',
    firstName: '',
    lastNameOrSurname: '',
    password: '',
  }

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    watch,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: registerAccountFormData,
    resolver: yupResolver(useDetailsSchema()),
    shouldFocusError: true,
  })
  const userEnteredPassword = watch(['password']).join('')

  const handleCreateAccount = async (registerAccountData: RegisterAccountInputData) => {
    onRegisterNow(registerAccountData)
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
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              value={field.value}
              label={t('first-name')}
              required
              sx={{ ...styles.formInput }}
              onBlur={field.onBlur}
              onChange={(_name, value) => field.onChange(value)}
              error={!!errors?.firstName}
              helperText={errors?.firstName?.message}
            />
          )}
        />
        <Controller
          name="lastNameOrSurname"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              value={field.value}
              label={t('last-name-or-sur-name')}
              required
              sx={{ ...styles.formInput }}
              onBlur={field.onBlur}
              onChange={(_name, value) => field.onChange(value)}
              error={!!errors?.lastNameOrSurname}
              helperText={errors?.lastNameOrSurname?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              value={field.value}
              label={t('password')}
              required
              sx={{ ...styles.formInput }}
              onBlur={field.onBlur}
              onChange={(_name, value) => {
                field.onChange(value)
              }}
              error={!!errors?.password}
              helperText={errors?.password?.message}
              type={showPassword ? 'text' : 'password'}
              icon={showPassword ? <Visibility /> : <VisibilityOff />}
              onIconClick={() => setShowPassword(!showPassword)}
            />
          )}
        />

        {userEnteredPassword && (
          <Box sx={{ marginBottom: '2rem' }}>
            <PasswordValidation password={userEnteredPassword} />
          </Box>
        )}
        {errorMessage && (
          <Typography color="error" justifyContent="center" display="flex">
            {errorMessage}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit(handleCreateAccount)()}
          disabled={!isValid}
        >
          {t('create-an-account')}
        </Button>
      </FormControl>
    </Box>
  )
}

export default Content
