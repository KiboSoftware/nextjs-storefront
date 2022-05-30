import React from 'react'

import { Typography, Box, styled, Theme, useTheme, useMediaQuery, Stack, Link } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import Content, {
  RegisterAccountFormData,
} from '@/components/layout/RegisterAccount/Content/Content'

interface RegisterAccountDialogProps {
  isOpen: boolean
  isCenteredDialog: boolean
  setAutoFocus?: boolean
  onDialogClose: () => void
  onLoginToYourAccountDialogToggle: () => void
  onRegisterToYourAccount: (data: RegisterAccountFormData) => void
}

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

const RegisterAccountDialog = (props: RegisterAccountDialogProps) => {
  const {
    isOpen = false,
    setAutoFocus = true,
    isCenteredDialog,
    onDialogClose,
    onLoginToYourAccountDialogToggle,
    onRegisterToYourAccount,
  } = props
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

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
        onClick={onLoginToYourAccountDialogToggle}
        sx={{ textDecoration: 'underline', color: 'text.primary' }}
      >
        {t('login-to-your-account')}
      </Link>
    </StyledActionsComponent>
  )

  const DialogArgs = {
    isOpen,
    Title,
    Content: (
      <Content setAutoFocus={setAutoFocus} onRegisterToYourAccount={onRegisterToYourAccount} />
    ),
    showContentTopDivider: true,
    showContentBottomDivider: true,
    Actions,
    isCenteredDialog: isCenteredDialog,
    customMaxWidth: '32.375rem',
    onClose: onDialogClose,
  }

  return <KiboDialog {...DialogArgs} />
}

export default RegisterAccountDialog
