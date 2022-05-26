/* eslint-disable  jsx-a11y/no-autofocus */
import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, FormControl, Button, InputAdornment, IconButton } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import KiboTextBox from '@/components/common/KiboTextBox/KiboTextBox'
import PasswordValidation from '@/components/common/PasswordValidation/PasswordValidation'
import { isPasswordValid } from '@/lib/helpers/validations/validations'

export interface RegisterAccountDetails {
  email: string
  firstName: string
  lastNameOrSurname: string
  password: string
}

interface ContentProps {
  setAutoFocus?: boolean
  onRegisterToYourAccount: (formData: RegisterAccountDetails) => void
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
  const { setAutoFocus = true, onRegisterToYourAccount } = props
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordValidation, setShowPassowordValidation] = useState<boolean>(false)
  const { t } = useTranslation(['checkout', 'common'])

  const useDetailsSchema = () => {
    return yup.object().shape({
      email: yup.string().email().required(t('this-field-is-required')),
      firstName: yup.string().required(t('this-field-is-required')),
      lastNameOrSurname: yup.string().required(t('this-field-is-required')),
      password: yup.string().required(t('this-field-is-required')),
    })
  }

  const registerAccountDetails = {
    email: '',
    firstName: '',
    lastNameOrSurname: '',
    password: '',
  }

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: registerAccountDetails,
    resolver: yupResolver(useDetailsSchema()),
    shouldFocusError: true,
  })
  const userEnteredFirstName = watch(['firstName']).join('')
  const userEnteredLastName = watch(['lastNameOrSurname']).join('')
  const userEnteredEmail = watch(['email']).join('')
  const userEnteredPassword = watch(['password']).join('')

  const isCreateAccountButtonDisabled = () => {
    return (
      userEnteredEmail !== '' &&
      userEnteredFirstName !== '' &&
      userEnteredLastName !== '' &&
      isPasswordValid(userEnteredPassword)
    )
  }

  const handleCreateAccount = async (registerAccountFormData: RegisterAccountDetails) => {
    console.log(`createAccount: ${JSON.stringify(registerAccountFormData)}`)
    onRegisterToYourAccount(registerAccountFormData)
  }

  return (
    <Box sx={{ ...styles.contentBox }}>
      {setAutoFocus}
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
                setShowPassowordValidation(true)
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

        {showPasswordValidation && (
          <Box sx={{ marginBottom: '2rem' }}>
            <PasswordValidation password={userEnteredPassword} />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit(handleCreateAccount)()}
          disabled={!isCreateAccountButtonDisabled()}
        >
          {t('common:create-an-account')}
        </Button>
      </FormControl>
    </Box>
  )
}

export default Content
