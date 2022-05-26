import React from 'react'

import { Stack, Typography, Link, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import KiboLoginContent, { loginData } from '@/components/layout/KiboLoginContent/KiboLoginContent'

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

export interface KiboLoginDialogProps {
  isOpen: boolean
  showCloseIconButton?: boolean
  isCenteredDialog?: boolean
  customMaxWidth: string
  showContentTopDivider?: boolean
  showContentBottomDivider?: boolean
  onClose: () => void
  handleLogin: (data: loginData) => void
  handleForgotPassword: () => void
  handleRegisterAccount: () => void
}
export interface KiboLoginFooterProps {
  onClickRegister: () => void
}

const KiboLoginFooter = (props: KiboLoginFooterProps) => {
  const { onClickRegister } = props
  const { t } = useTranslation(['common'])
  return (
    <StyledActionsComponent>
      <Typography variant="h3" color={'primary'} pb={1}>
        {t('dont-have-an-account-yet')}
      </Typography>
      <Link component="button" variant="body1" color="text.primary" onClick={onClickRegister}>
        {t('register-now')}
      </Link>
    </StyledActionsComponent>
  )
}

const KiboLoginDialog = (props: KiboLoginDialogProps) => {
  const {
    isOpen = false,
    isCenteredDialog,
    onClose,
    handleLogin,
    handleForgotPassword,
    handleRegisterAccount,
  } = props
  const { t } = useTranslation(['common'])

  const loginArgs = {
    isOpen: isOpen,
    Title: <Typography {...styles.loginTitle}>{t('log-in')}</Typography>,
    Content: (
      <KiboLoginContent onClickLogin={handleLogin} onClickForgotPassword={handleForgotPassword} />
    ),
    showContentTopDivider: true,
    showContentBottomDivider: true,
    Actions: <KiboLoginFooter onClickRegister={handleRegisterAccount} />,
    isCenteredDialog: isCenteredDialog,
    customMaxWidth: '32.375rem',
    onClose: onClose,
  }
  return <KiboDialog {...loginArgs} />
}

export default KiboLoginDialog
