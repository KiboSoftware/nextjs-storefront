import React from 'react'

import { styled, Link, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'

interface ActionsProps {
  onLoginToYourAccount: () => void
}

const StyledActionsComponent = styled(Stack)(() => ({
  width: '100%',
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: '0 2%',
  marginBottom: '1rem',
  marginTop: '1rem',
}))

const Actions = (props: ActionsProps) => {
  const { onLoginToYourAccount } = props
  const { t } = useTranslation('common')

  return (
    <StyledActionsComponent data-testid="actions-component">
      <Link
        component="button"
        variant="body1"
        aria-label={t('loginToYourAccount')}
        onClick={onLoginToYourAccount}
        sx={{ textDecoration: 'underline', color: 'text.primary' }}
      >
        {t('loginToYourAccount')}
      </Link>
    </StyledActionsComponent>
  )
}

export default Actions
