import React from 'react'

import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

const _offline = () => {
  const { t } = useTranslation('common')
  return (
    <Grid
      container
      sx={{
        position: 'relative',
        minHeight: { xs: 'calc(100vh - 55px)', md: 'calc(100vh - 183px)' },
      }}
    >
      <Grid
        item
        xs={12}
        textAlign="center"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          gap: 10,
        }}
      >
        <Typography variant="h1" color="primary" gutterBottom>
          {t('you-are-offline')}
        </Typography>
        <Typography variant="h3" gutterBottom>
          {t('we-could-not-load-this-page-on-this-connection')}
        </Typography>
        <Typography variant="h3" gutterBottom>
          {t('please-try-again')}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default _offline
