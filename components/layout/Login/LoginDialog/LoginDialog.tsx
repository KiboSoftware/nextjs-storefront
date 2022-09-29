import React from 'react'

import { Stack, Typography, Link, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'
import { RegisterAccountDialog } from '@/components/layout'
import LoginContent, { LoginData } from '@/components/layout/Login/LoginContent/LoginContent'
import { useAuthContext } from '@/context'
import { useModalContext } from '@/context/ModalContext'

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

const LoginFooter = (props: LoginFooterProps) => {
  const { onRegisterNow } = props

  const { t } = useTranslation('common')

  return (
    <StyledActionsComponent>
      <Typography variant="h3" color={'primary'} pb={1}>
        {t('dont-have-an-account-yet')}
      </Typography>
      <Link component="button" variant="body1" color="text.primary" onClick={onRegisterNow}>
        {t('register-now')}
      </Link>
    </StyledActionsComponent>
  )
}

const LoginDialog = () => {
  const { t } = useTranslation('common')

  const { authError = '', login } = useAuthContext()
  const { showModal, closeModal } = useModalContext()

  const onRegisterClick = () => {
    showModal({ Component: RegisterAccountDialog })
  }

  const onForgotPassword = () => {
    // do your stuff
  }

  const handleLogin = (params: LoginData) => {
    login(params, closeModal)
  }

  return (
    <KiboDialog
      Title={t('log-in')}
      Content={
        <LoginContent
          onLogin={handleLogin}
          onForgotPasswordClick={onForgotPassword}
          errorMessage={authError}
        />
      }
      Actions={<LoginFooter onRegisterNow={onRegisterClick} />}
      customMaxWidth="32.375rem"
      onClose={closeModal}
    />
  )
}

export default LoginDialog
