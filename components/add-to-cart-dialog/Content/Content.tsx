import React from 'react'

import InfoIcon from '@mui/icons-material/Info'
import { Typography, Box, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

interface CartContentProps {
  fullfillmentOption: string
  quantity: number
  subtotal: number
  tax: number
  total: number
}

const Content = (props: CartContentProps) => {
  const { fullfillmentOption, quantity, subtotal, tax, total } = props
  const { t } = useTranslation('common')

  return (
    <Box sx={{ width: '100%' }} data-testid="content-component">
      <Box>
        <Typography gutterBottom>Product Component</Typography>
      </Box>
      <Divider />
      <Box sx={{ padding: '0 7px' }}>
        <Box sx={{ display: 'flex', padding: '9px 0' }}>
          <Typography variant="body2" component="span" color="text.primary" sx={{ flex: '50%' }}>
            {t('cart-sub-total', { quantity: quantity })}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            color="text.primary"
            align="right"
            sx={{ flex: '50%' }}
          >
            {t('currency', { val: subtotal })}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', padding: '9px 0' }}>
          <Typography variant="body2" component="span" color="text.primary" sx={{ flex: '50%' }}>
            {t('standard-shopping')}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            color="text.primary"
            align="right"
            sx={{ flex: '50%' }}
          >
            {fullfillmentOption}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', padding: '9px 0' }}>
          <Typography variant="body2" component="span" color="text.primary" sx={{ flex: '50%' }}>
            {t('estimated-tax')} <InfoIcon sx={{ width: '11px', height: '11px' }} />
          </Typography>
          <Typography
            variant="body2"
            component="span"
            color="text.primary"
            align="right"
            sx={{ flex: '50%' }}
          >
            {t('currency', { val: tax })}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ margin: '0 7px' }} />
      <Box sx={{ padding: '19px 7px 4px 7px', display: 'flex' }}>
        <Typography variant="body2" component="span" fontWeight="bold" color="text.primary">
          {t('total')}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          fontWeight="bold"
          color="text.primary"
          align="right"
          sx={{ flex: '0 100%' }}
        >
          {t('currency', { val: total })}
        </Typography>
      </Box>
    </Box>
  )
}

export default Content
