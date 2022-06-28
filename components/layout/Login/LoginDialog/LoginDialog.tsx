import React from 'react'

import { Stack, Typography, Link, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import LoginContent, { LoginData } from '@/components/layout/Login/LoginContent/LoginContent'
import { useAuthContext, useUIContext } from '@/context'

export interface LoginDialogProps {
  isOpen?: boolean
}

export interface LoginFooterProps {
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

const LoginFooter = (props: LoginFooterProps) => {
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

const LoginDialog = () => {
  const { t } = useTranslation(['common'])
  const { isLoginDialogOpen, toggleLoginDialog, toggleRegisterDialog } = useUIContext()
  const { authError = '', login } = useAuthContext()

  const onRegisterClick = () => {
    toggleLoginDialog()
    toggleRegisterDialog()
  }
  const onForgotPassword = () => {
    // do your stuff
  }
  const handleLogin = (params: LoginData) => {
    login(params, toggleLoginDialog)
  }

  return (
    <KiboDialog
      isOpen={isLoginDialogOpen}
      Title={
        <Typography {...styles.loginTitle} data-testid="login-header">
          {t('log-in')}
        </Typography>
      }
      Content={
        <LoginContent
          onLogin={handleLogin}
          onForgotPasswordClick={onForgotPassword}
          errorMessage={authError}
        />
      }
      Actions={<LoginFooter onRegisterNow={onRegisterClick} />}
      customMaxWidth="32.375rem"
      onClose={toggleLoginDialog}
    />
  )
}

export default LoginDialog
