import React from 'react'

import { Stack, Typography, Link, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import LoginContent, { LoginData } from '@/components/layout/Login/LoginContent/LoginContent'
import { useUser } from '@/hooks'
export interface LoginDialogProps {
  isOpen?: boolean
  customMaxWidth?: string | number
  onClose: () => void
  onForgotPassword: () => void
  onRegisterNow: () => void
}

export interface KiboLoginFooterProps {
  onRegisterNow: () => void
}

const StyledActionsComponent = styled(Stack)(() => ({
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 2%',
  marginBottom: '1.438rem',
  marginTop: '1.438rem',
}))

const styles = {
  loginTitle: {
    marginLeft: '1rem',
    color: 'text.secendary',
  },
}

const KiboLoginFooter = (props: KiboLoginFooterProps) => {
  const { onRegisterNow } = props

  const { t } = useTranslation(['common'])

  return (
    <StyledActionsComponent>
      <Typography variant="h3" color={'primary'} pb={1}>
        {t('dont-have-an-account-yet')}
      </Typography>
      <Link component="button" variant="body1" color="text.primary" onClick={onRegisterNow}>
        {t('common:register-now')}
      </Link>
    </StyledActionsComponent>
  )
}

const LoginDialog = (props: LoginDialogProps) => {
  const { isOpen = false, onClose, onForgotPassword, onRegisterNow } = props

  const { t } = useTranslation(['common'])
  const { loginUserMutation } = useUser()

  const onRegisterClick = () => {
    onRegisterNow()
  }

  const login = async (params: LoginData) => {
    console.log('login params : ', params)
    const userCredentials = {
      username: params.formData.email,
      password: params.formData.password,
    }

    await loginUserMutation.mutateAsync(userCredentials)
  }

  return (
    <KiboDialog
      isOpen={isOpen}
      Title={
        <Typography {...styles.loginTitle} data-testid="login-header">
          {t('log-in')}
        </Typography>
      }
      Content={<LoginContent onLogin={login} onForgotPasswordClick={onForgotPassword} />}
      Actions={<KiboLoginFooter onRegisterNow={onRegisterClick} />}
      customMaxWidth="32.375rem"
      onClose={onClose}
    />
  )
}

export default LoginDialog
