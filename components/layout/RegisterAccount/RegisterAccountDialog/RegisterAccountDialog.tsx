import React from 'react'

import { Typography, Box, styled, Theme, useTheme, useMediaQuery, Stack, Link } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import Content, {
  RegisterAccountInputData,
} from '@/components/layout/RegisterAccount/Content/Content'

interface RegisterAccountDialogProps {
  isOpen: boolean
  isDialogCentered: boolean
  setAutoFocus?: boolean
  onDialogClose: () => void
  onLoginToYourAccountDialogToggle: () => void
  onRegisterNow: (data: RegisterAccountInputData) => void
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
const customMaxWidth = '32.375rem'

const RegisterAccountDialog = (props: RegisterAccountDialogProps) => {
  const {
    isOpen = false,
    setAutoFocus,
    isDialogCentered,
    onDialogClose,
    onLoginToYourAccountDialogToggle,
    onRegisterNow,
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

  return (
    <KiboDialog
      isOpen={isOpen}
      Title={Title}
      Content={<Content setAutoFocus={setAutoFocus} onRegisterNow={onRegisterNow} />}
      Actions={Actions}
      isDialogCentered={isDialogCentered}
      customMaxWidth={customMaxWidth}
      onClose={onDialogClose}
    />
  )
}

export default RegisterAccountDialog
