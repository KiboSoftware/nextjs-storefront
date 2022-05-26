import React, { SyntheticEvent, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  FormControl,
  Button,
  InputAdornment,
  IconButton,
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import KiboTextBox from '@/components/common/KiboTextBox/KiboTextBox'

export interface loginInputs {
  email: string
  password: string
  isRememberMe?: boolean
}
const styles = {
  contentBox: {
    padding: '0.875rem',
  },
  formInput: {
    width: '100%',
  },
}

export type loginData = {
  formData: loginInputs
  isRememberMe: boolean
}

export interface KiboLoginContentProps {
  onClickLogin: (data: loginData) => void
  onClickForgotPassword: () => void
}

const KiboLoginContent = (props: KiboLoginContentProps) => {
  const { onClickLogin, onClickForgotPassword } = props
  const [showPassword, setShowPassword] = useState(false)
  const [isRememberMe, setIsRememberMe] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  const { t } = useTranslation(['checkout', 'common'])

  const useLoginInputSchema = () => {
    return yup.object().shape({
      email: yup.string().email().required(t('this-field-is-required')),
      password: yup.string().required(t('this-field-is-required')),
    })
  }

  const loginInputs = {
    email: '',
    password: '',
  }
  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: loginInputs ? loginInputs : undefined,
    resolver: yupResolver(useLoginInputSchema()),
    shouldFocusError: true,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (formData: loginInputs, e: any) => {
    e.preventDefault()
    const inputData = { formData, isRememberMe }
    onClickLogin(inputData)
  }

  const handleForgotPassword = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    onClickForgotPassword()
  }

  return (
    <Box sx={{ ...styles.contentBox }} data-testid="kibo-login-cotent">
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
              required
              sx={{ ...styles.formInput }}
              onBlur={field.onBlur}
              onChange={(_name, value) => field.onChange(value)}
              error={!!errors?.email}
              helperText={errors?.email?.message}
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
              required
              sx={{ ...styles.formInput }}
              onBlur={field.onBlur}
              onChange={(_name, value) => {
                field.onChange(value)
              }}
              error={!!errors?.password}
              helperText={errors?.password?.message}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
        <FormControlLabel
          sx={{ pb: 2 }}
          control={<Checkbox onChange={(_, checked) => setIsRememberMe(checked)} />}
          label="Remember Me"
          labelPlacement="end"
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: '18px' }}
          onClick={handleSubmit(handleLogin)}
          disabled={!isValid}
        >
          {t('common:log-in')}
        </Button>
      </FormControl>
      <Box pt={2} display="flex" justifyContent="center">
        <Link
          component="button"
          variant="body1"
          color="text.primary"
          onClick={handleForgotPassword}
        >
          {t('common:forgot-password')}
        </Link>
      </Box>
    </Box>
  )
}

export default KiboLoginContent
