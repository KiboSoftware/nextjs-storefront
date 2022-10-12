import React from 'react'

import { Typography, Box, styled, Theme, useTheme, useMediaQuery, Stack, Link } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'
import { LoginDialog } from '@/components/layout'
import Content, {
  RegisterAccountInputData,
} from '@/components/layout/RegisterAccount/Content/Content'
import { useAuthContext } from '@/context'
import { useModalContext } from '@/context/ModalContext'

interface StyledThemeProps {
  theme?: Theme
}

const StyledActionsComponent = styled(Stack)(() => ({
  width: '100%',
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: '0 2%',
  marginBottom: '1rem',
  marginTop: '1rem',
}))

const StyledTitleComponent = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}))

const StyledTitle = styled(Typography)(({ theme }: StyledThemeProps) => ({
  fontWeight: 'bold',
  display: 'block',
  marginLeft: '0.75rem',
  color: theme?.palette.text.primary,
}))
const customMaxWidth = '32.375rem'

const RegisterAccountDialog = () => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { createAccount, authError } = useAuthContext()
  const { showModal, closeModal } = useModalContext()

  const handleUserRegistration = (params: RegisterAccountInputData) => {
    createAccount(params, closeModal)
  }

  const gotoLogin = () => {
    showModal({ Component: LoginDialog })
  }

  const Title = (
    <StyledTitleComponent data-testid="title-component">
      <StyledTitle variant={mdScreen ? 'h3' : 'h2'}>{t('register-now')}</StyledTitle>
    </StyledTitleComponent>
  )

  const Actions = (
    <StyledActionsComponent data-testid="actions-component">
      <Link
        component="button"
        variant="body1"
        aria-label={t('login-to-your-account')}
        onClick={gotoLogin}
        sx={{ textDecoration: 'underline', color: 'text.primary' }}
      >
        {t('login-to-your-account')}
      </Link>
    </StyledActionsComponent>
  )

  return (
    <KiboDialog
      Title={Title}
      Content={
        <Content
          setAutoFocus={true}
          onRegisterNow={handleUserRegistration}
          errorMessage={authError}
        />
      }
      Actions={Actions}
      isDialogCentered={true}
      customMaxWidth={customMaxWidth}
      onClose={closeModal}
    />
  )
}

export default RegisterAccountDialog
