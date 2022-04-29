import React from 'react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Typography, Box, styled, Theme } from '@mui/material'
import { useTranslation } from 'next-i18next'
interface StyledThemeProps {
  theme?: Theme
}

const StyledTitleComponent = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}))

const StyledCheckCircleIcon = styled(CheckCircleIcon)(({ theme }: StyledThemeProps) => ({
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
      <StyledCheckCircleIcon />
      <StyledTitle variant="h3">{t('add-to-cart')}</StyledTitle>
    </StyledTitleComponent>
  )
}

export default Title
