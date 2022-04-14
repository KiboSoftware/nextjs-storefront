import React, { SyntheticEvent } from 'react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Typography, Box, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

const Title = () => {
  const { t } = useTranslation('common')
  return (
    <Box display="flex" alignItems="center" data-testid="title-component">
      <CheckCircleIcon
        sx={{
          color: 'primary.main',
        }}
      />
      <Box ml={1}>
        <Typography
          variant="body2"
          component="span"
          fontWeight="bold"
          fontSize="20px"
          color="text.primary"
          sx={{ display: 'block' }}
        >
          {t('add-to-cart')}
        </Typography>
      </Box>
      <Divider />
    </Box>
  )
}

export default Title
