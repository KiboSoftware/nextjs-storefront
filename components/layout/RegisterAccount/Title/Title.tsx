import React from 'react'

import { Typography, Box, styled, Theme, useTheme, useMediaQuery } from '@mui/material'
import { useTranslation } from 'next-i18next'
interface StyledThemeProps {
  theme?: Theme
}

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

const Title = () => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <StyledTitleComponent data-testid="title-component">
      <StyledTitle variant={mdScreen ? 'h3' : 'h2'}>{t('registerNow')}</StyledTitle>
    </StyledTitleComponent>
  )
}

export default Title
