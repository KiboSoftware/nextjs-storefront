import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Divider, Box, Typography, Container, FormControl } from '@mui/material'
import router from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { KiboTextBox, PasswordValidation } from '@/components/common'
import { useUpdateForgottenPassword } from '@/hooks'
import { isPasswordValid } from '@/lib/helpers/validations/validations'

type PasswordFieldType = 'newPassword' | 'confirmPassword'

export interface ResetPasswordConfirmationTemplateProps {
  token: string
  userName: string
}

const usePasswordInputSchema = () => {
  const { t } = useTranslation('common')

  return yup.object().shape({
    newPassword: yup
      .string()
      .required(t('this-field-is-required'))
      .test((value = '') => {
        return isPasswordValid(value)
      }),
    confirmPassword: yup
      .string()
      .required(t('this-field-is-required'))
      .oneOf([yup.ref('newPassword')], t('it-should-match-your-new-password')),
  })
}

const ResetPasswordConfirmationTemplate = (props: ResetPasswordConfirmationTemplateProps) => {
  const { token, userName } = props

  const { t } = useTranslation('common')

  const passwordSchema = usePasswordInputSchema()
  const { updateForgottenPassword } = useUpdateForgottenPassword()
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  })

  const handleClickShowPassword = (type: PasswordFieldType) => {
    setShowPassword({
      ...showPassword,
      [type]: !showPassword[type],
    })
  }
  const {
    formState: { errors, isValid, isDirty },
    watch,
    control,
    trigger,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    resolver: yupResolver(passwordSchema),
    shouldFocusError: true,
  })
  const newPassword = watch('newPassword')
  const confirmationPassword = watch('confirmPassword')

  const handleResetPassword = async (formData: any) => {
    try {
      const updatedPassword = await updateForgottenPassword.mutateAsync({
        userName: userName,
        confirmationCode: token,
        newPassword: formData.newPassword,
      })

      if (updatedPassword) router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  const onValid = (formData: any) => handleResetPassword(formData)

  useEffect(() => {
    if (newPassword && confirmationPassword) {
      trigger('confirmPassword')
    }
  }, [newPassword, confirmationPassword, trigger])

  return (
    <Container maxWidth={'lg'}>
      <Box py={4}>
        <Typography variant="h1" gutterBottom>
          {t('reset-password')}
        </Typography>
        <Divider sx={{ borderColor: 'primary.main' }} />
      </Box>

      <Box pb={4}>
        <FormControl>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <KiboTextBox
                value={field.value || ''}
                label={t('new-password')}
                required
                onBlur={field.onBlur}
                onChange={(_name, value) => field.onChange(value)}
                error={!!errors.newPassword}
                helperText={errors?.newPassword?.message as string}
                type={showPassword.newPassword ? 'text' : 'password'}
                icon={showPassword.newPassword ? <Visibility /> : <VisibilityOff />}
                onIconClick={() => handleClickShowPassword('newPassword')}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <KiboTextBox
                value={field.value || ''}
                label={t('confirm-password')}
                required
                onBlur={field.onBlur}
                onChange={(_name, value) => field.onChange(value)}
                error={!!errors.confirmPassword}
                helperText={errors?.confirmPassword?.message as string}
                type={showPassword.confirmPassword ? 'text' : 'password'}
                icon={showPassword.confirmPassword ? <Visibility /> : <VisibilityOff />}
                onIconClick={() => handleClickShowPassword('confirmPassword')}
              />
            )}
          />
          <Box sx={{ paddingBlock: 2 }}>
            <PasswordValidation password={newPassword as string} />
          </Box>

          <Box maxWidth="23.5rem">
            <Button
              variant="contained"
              color="inherit"
              fullWidth
              sx={{ mt: '0.75rem' }}
              {...((!isValid || !isDirty) && { disabled: true })}
              onClick={() => handleSubmit(onValid)()}
            >
              {t('reset-password')}
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Container>
  )
}

export default ResetPasswordConfirmationTemplate
