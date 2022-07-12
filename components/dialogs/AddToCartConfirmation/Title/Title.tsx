import React from 'react'

import { CheckCircle } from '@mui/icons-material'
import { Typography, Box, styled, Theme } from '@mui/material'
import { useTranslation } from 'next-i18next'
interface StyledThemeProps {
  theme?: Theme
}

const StyledTitleComponent = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}))

const StyledCheckCircle = styled(CheckCircle)(({ theme }: StyledThemeProps) => ({
  color: theme?.palette.primary.main,
}))

const StyledTitle = styled(Typography)(({ theme }: StyledThemeProps) => ({
  fontWeight: 'bold',
  display: 'block',
  marginLeft: '1rem',
  color: theme?.palette.text.primary,
}))

const Title = () => {
  const { t } = useTranslation('common')
  return (
    <StyledTitleComponent data-testid="title-component">
      <StyledCheckCircle />
      <StyledTitle variant="h3">{t('added-to-cart')}</StyledTitle>
    </StyledTitleComponent>
  )
}

export default Title
