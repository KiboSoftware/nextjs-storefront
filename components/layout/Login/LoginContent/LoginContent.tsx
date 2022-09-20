/* eslint-disable  jsx-a11y/no-autofocus */
import React, { SyntheticEvent, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  FormControl,
  Button,
  Link,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { KiboTextBox } from '@/components/common'

export interface LoginInputs {
  email: string
  password: string
  isRememberMe?: boolean
}

export type LoginData = {
  formData: LoginInputs
  isRememberMe: boolean
}

export interface LoginContentProps {
  onLogin: (data: LoginData) => void
  onForgotPasswordClick: () => void
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

const LoginContent = (props: LoginContentProps) => {
  const { onLogin, onForgotPasswordClick, errorMessage } = props

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const loginInputs = {
    email: '',
    password: '',
  }

  const { t } = useTranslation('common')

  const useLoginInputSchema = () => {
    return yup.object().shape({
      email: yup
        .string()
        .email(t('email-must-be-a-valid-email'))
        .required(t('this-field-is-required')),
      password: yup.string().required(t('this-field-is-required')),
    })
  }

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: loginInputs,
    resolver: yupResolver(useLoginInputSchema()),
    shouldFocusError: true,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (formData: LoginInputs, e: any) => {
    e.preventDefault()
    const inputData = { formData, isRememberMe }
    onLogin(inputData)
  }

  const handleForgotPassword = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    onForgotPasswordClick()
  }

  return (
    <Box
      sx={{ ...styles.contentBox }}
      data-testid="kibo-login-content"
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      id="loginForm"
    >
      <FormControl sx={{ width: '100%' }}>
        <Controller
          name="email"
          control={control}
          defaultValue={loginInputs?.email}
          render={({ field }) => (
            <KiboTextBox
              name="email"
              value={field.value}
              label={t('email')}
              ref={null}
              required
              sx={{ ...styles.formInput }}
              onBlur={field.onBlur}
              onChange={(_name, value) => field.onChange(value)}
              error={!!errors?.email}
              helperText={errors?.email?.message}
              autoFocus={true}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue={loginInputs?.password}
          render={({ field }) => (
            <KiboTextBox
              name="password"
              value={field.value}
              label={t('password')}
              ref={null}
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
              onIconClick={handleClickShowPassword}
            />
          )}
        />
        <FormControlLabel
          sx={{ pb: 2 }}
          control={<Checkbox onChange={(_, checked) => setIsRememberMe(checked)} />}
          label={t('remember-me')}
          labelPlacement="end"
        />
        {errorMessage && (
          <Typography color="error" justifyContent="center" display="flex">
            {errorMessage}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: '18px' }}
          disabled={!isValid}
          type="submit"
          form="loginForm"
        >
          {t('log-in')}
        </Button>
      </FormControl>
      <Box pt={2} display="flex" justifyContent="center">
        <Link
          component="button"
          variant="body1"
          color="text.primary"
          onClick={handleForgotPassword}
        >
          {t('forgot-password')}
        </Link>
      </Box>
    </Box>
  )
}

export default LoginContent
