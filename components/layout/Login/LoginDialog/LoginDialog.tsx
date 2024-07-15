import React, { useEffect } from 'react'

import { Stack, Typography, Link, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'
import { RegisterAccountDialog, ResetPasswordDialog } from '@/components/layout'
import LoginContent, { LoginData } from '@/components/layout/Login/LoginContent/LoginContent'
import { useAuthContext } from '@/context'
import { useModalContext } from '@/context/ModalContext'
import { useGetAccountsByUser } from '@/hooks'

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

  const [emailAddress, setEmailAddress] = React.useState('')

  const { login, getAccountsByUser } = useAuthContext()
  const { showModal, closeModal } = useModalContext()
  const { data: accountsByUser, isLoading } = useGetAccountsByUser(emailAddress)

  const onRegisterClick = () => {
    showModal({ Component: RegisterAccountDialog })
  }

  const onForgotPassword = () => {
    showModal({ Component: ResetPasswordDialog })
  }

  const handleLogin = (params: LoginData) => {
    !isLoading && login(params, closeModal)
  }

  const handleGetAccountByUser = (email: string) => {
    setEmailAddress(email)
  }

  useEffect(() => {
    if (accountsByUser) {
      getAccountsByUser(accountsByUser)
    }
  }, [accountsByUser, getAccountsByUser])

  return (
    <KiboDialog
      Title={t('log-in')}
      Content={
        <LoginContent
          isLoading={isLoading}
          accountsByUser={accountsByUser}
          onLogin={handleLogin}
          onForgotPasswordClick={onForgotPassword}
          onGetAccountsByUser={handleGetAccountByUser}
        />
      }
      Actions={<LoginFooter onRegisterNow={onRegisterClick} />}
      customMaxWidth="32.375rem"
      onClose={closeModal}
    />
  )
}

export default LoginDialog
