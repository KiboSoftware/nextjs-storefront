import React, { useState } from 'react'

import { Typography, Box, useTheme, useMediaQuery, Stack, Link } from '@mui/material'
import { useTranslation } from 'next-i18next'

import Content, { ResetPasswordInputData } from '../Content/Content'
import { KiboDialog } from '@/components/common'
import { LoginDialog } from '@/components/layout'
import { useModalContext } from '@/context/ModalContext'
import { useResetPassword } from '@/hooks'

const resetPasswordStyles = {
  title: { fontWeight: 'bold', display: 'block', marginLeft: '0.75rem', color: 'text.primary' },
  actionsContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '0 2%',
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  link: {
    textDecoration: 'underline',
    color: 'text.primary',
  },
}

const customMaxWidth = '32.375rem'

const ResetPasswordDialog = () => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { resetPassword } = useResetPassword()
  const { showModal, closeModal } = useModalContext()

  const [isResetPassword, setIsResetPassword] = useState<boolean>(false)

  const handleResetPassword = async (params: ResetPasswordInputData) => {
    const res = await resetPassword.mutateAsync({
      emailAddress: params.email,
      userName: params.email,
      customerSetCode: '',
    })
    setIsResetPassword(res?.resetPassword)
  }

  const gotoLogin = () => {
    showModal({ Component: LoginDialog })
  }

  const Title = (
    <Box display={'flex'} alignItems={'center'} data-testid="title-component">
      <Typography variant={mdScreen ? 'h3' : 'h2'} sx={{ ...resetPasswordStyles.title }}>
        {t('reset-password')}
      </Typography>
    </Box>
  )

  const Actions = (
    <Stack data-testid="actions-component" sx={{ ...resetPasswordStyles.actionsContainer }}>
      <Link
        component="button"
        variant="body1"
        aria-label={t('login-to-your-account')}
        onClick={gotoLogin}
        sx={{ ...resetPasswordStyles.link }}
      >
        {t('login-to-your-account')}
      </Link>
    </Stack>
  )

  return (
    <KiboDialog
      Title={Title}
      Content={
        <Content
          setAutoFocus={true}
          onResetPassword={handleResetPassword}
          isResetPassword={isResetPassword}
        />
      }
      Actions={Actions}
      isDialogCentered={true}
      customMaxWidth={customMaxWidth}
      onClose={closeModal}
    />
  )
}

export default ResetPasswordDialog
