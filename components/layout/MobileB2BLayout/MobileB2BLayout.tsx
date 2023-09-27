import React from 'react'

import { ArrowBackIos } from '@mui/icons-material'
import { Box, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

import { MobileB2BLayoutStyles } from './MobileB2BLayout.styles'

interface MobileB2BLayoutProps {
  headerText: string
  backText: string
  onBackClick: () => void
}

const MobileB2BLayout = (props: MobileB2BLayoutProps) => {
  const { headerText, backText, onBackClick } = props

  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      <Grid item xs={12} sx={{ pb: { xs: 3, md: 0 } }}>
        <Stack direction="row" gap={2}>
          <Box
            sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
            onClick={onBackClick}
          >
            <ArrowBackIos
              fontSize="inherit"
              data-testid="arrow-icon"
              sx={MobileB2BLayoutStyles.wrapIcon}
            />
            {mdScreen ? <Typography variant="body2">{backText}</Typography> : null}
          </Box>
          {!mdScreen && (
            <Box sx={MobileB2BLayoutStyles.accountHierarchyTextBox}>
              <Typography variant="h2" sx={MobileB2BLayoutStyles.accountHierarchyText}>
                {headerText}
              </Typography>
            </Box>
          )}
        </Stack>
      </Grid>
      {mdScreen && (
        <Grid item xs={12} sm={6} pb={1}>
          <Box>
            <Typography variant="h1">{headerText}</Typography>
          </Box>
        </Grid>
      )}
    </>
  )
}

export default MobileB2BLayout
