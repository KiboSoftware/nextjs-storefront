/* eslint-disable  jsx-a11y/no-autofocus */
import React, { SyntheticEvent, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  FormControl,
  Link,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { KiboSelect, KiboTextBox } from '@/components/common'
import { useAuthContext, useModalContext } from '@/context'
import { useGetAccountsByUser } from '@/hooks'
export interface LoginInputs {
  email: string
  password: string
  accountId?: string
  isRememberMe?: boolean
}

export type LoginData = {
  formData: LoginInputs
  isRememberMe: boolean
}

export interface LoginContentProps {
  onForgotPasswordClick: () => void
}

const styles = {
  contentBox: {
    padding: '0.875rem',
  },
  formInput: {
    width: '100%',
  },
}

const loginDefaultValues = {
  email: '',
  password: '',
  accountId: '',
}

const LoginContent = (props: LoginContentProps) => {
  const { onForgotPasswordClick } = props

  const { login, setAccountsByUser } = useAuthContext()
  const { closeModal } = useModalContext()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false)
  const [emailAddress, setEmailAddress] = React.useState('')
  const { activeUsersAccount, isLoading } = useGetAccountsByUser(emailAddress)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const { t } = useTranslation('common')

  const useLoginInputSchema = () => {
    return yup.object().shape({
      email: yup
        .string()
        .email(t('email-must-be-a-valid-email'))
        .required(t('this-field-is-required')),
      password: yup.string().required(t('this-field-is-required')),
      accountId: yup.string().nullable(),
    })
  }

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: loginDefaultValues,
    resolver: yupResolver(useLoginInputSchema()),
    shouldFocusError: true,
  })

  useEffect(() => {
    if (activeUsersAccount?.length) {
      setValue('accountId', activeUsersAccount[0]?.id.toString())
    }
  }, [activeUsersAccount[0]?.id])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (formData: LoginInputs, e: any) => {
    e.preventDefault()
    const inputData = { formData, isRememberMe }
    login(inputData, handleAccountsByUser)
  }

  const handleAccountsByUser = () => {
    setAccountsByUser && setAccountsByUser(activeUsersAccount)
    closeModal()
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
          defaultValue={loginDefaultValues?.email}
          render={({ field }) => (
            <KiboTextBox
              name="email"
              value={field.value}
              label={t('email')}
              ref={null}
              required
              sx={{ ...styles.formInput }}
              onBlur={(e) => {
                field.onBlur()
                setEmailAddress(field.value)
              }}
              onChange={(_name, value) => field.onChange(value)}
              error={!!errors?.email}
              helperText={errors?.email?.message}
              autoFocus={true}
              {...(isLoading && {
                icon: (
                  <Box p={0.5}>
                    <CircularProgress size={20} />
                  </Box>
                ),
              })}
            />
          )}
        />
        {activeUsersAccount && activeUsersAccount.length > 1 && (
          <Controller
            name="accountId"
            control={control}
            defaultValue={loginDefaultValues?.accountId}
            {...(loginDefaultValues?.accountId && { value: loginDefaultValues?.accountId })}
            render={({ field }) => (
              <>
                <KiboSelect
                  name="accountId"
                  label={t('accounts')}
                  sx={{ typography: 'body2', mb: 3 }}
                  value={field.value}
                  error={!!errors?.accountId}
                  helperText={errors?.accountId?.message as string}
                  onChange={(_name, value) => field.onChange(value)}
                >
                  {activeUsersAccount?.map((account) => (
                    <MenuItem sx={{ typography: 'body2' }} key={account?.id} value={account?.id}>
                      {account?.companyOrOrganization || account?.emailAddress}
                    </MenuItem>
                  ))}
                </KiboSelect>
              </>
            )}
          />
        )}
        <Controller
          name="password"
          control={control}
          defaultValue={loginDefaultValues?.password}
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
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: '18px' }}
          disabled={!isValid || isLoading}
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
