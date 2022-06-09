import React from 'react'

import { Stack, Typography, Link, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'

import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import LoginContent, { LoginData } from '@/components/layout/Login/LoginContent/LoginContent'
import { useAuthContext } from '@/contexts/AuthContext'
import { useUserMutations } from '@/hooks'
import { storeClientCookie } from '@/lib/helpers/cookieHelper'

export interface LoginDialogProps {
  isOpen?: boolean
  onClose: () => void
  onForgotPassword: () => void
  onRegisterNow: () => void
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
  const { loginUserMutation } = useUserMutations()
  const { isLoginDialogOpen = false, toggleLoginDialog, setUser, authError = '' } = useAuthContext()
  const { publicRuntimeConfig } = getConfig()
  const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()

  const onRegisterClick = () => {
    // do your stuff
  }
  const onForgotPassword = () => {
    // do your stuff
  }

  const login = async (params: LoginData) => {
    const userCredentials = {
      username: params?.formData?.email,
      password: params?.formData?.password,
    }

    const data = await loginUserMutation.mutateAsync(userCredentials)
    const account = data?.account
    // set cookie
    const cookie = {
      accessToken: account?.accessToken,
      accessTokenExpiration: account?.accessTokenExpiration,
      refreshToken: account?.refreshToken,
      refreshTokenExpiration: account?.refreshTokenExpiration,
      userId: account?.userId,
    }
    storeClientCookie(authCookieName, cookie)
    setUser(account.customerAccount)
    toggleLoginDialog()
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
          onLogin={login}
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
