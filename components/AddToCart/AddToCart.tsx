import React from 'react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoIcon from '@mui/icons-material/Info'
import { Button, Typography, Box, Divider, Stack } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import Modal from '@/components/common/Modal/Modal'

interface CartDetailsProps {
  fullfillmentOption: string
  subtotal: string
  tax: string
  total: string
}

const title = (t: any) => (
  <Box display="flex" alignItems="center">
    <CheckCircleIcon
      sx={{
        color: 'primary.main',
      }}
    />
    <Box ml={1} sx={{ display: { sm: 'none', md: 'block' } }}>
      <Typography
        variant="body2"
        component="span"
        fontWeight="bold"
        fontSize="1.5rem"
        color="text.primary"
        sx={{ display: 'block' }}
      >
        {t('add-to-cart')}
      </Typography>
    </Box>
    <Divider />
  </Box>
)

const content = (
  t: any,
  fullfillmentOption: string,
  subtotal: string,
  tax: string,
  total: string
) => (
  <Box sx={{ maxWidth: '518px', width: '100%', minWidth: '320px' }}>
    <Box>
      <Typography gutterBottom>Product Component</Typography>
    </Box>
    <Divider />
    <Box sx={{ padding: '0 7px' }}>
      <Box sx={{ display: 'flex', padding: '9px 0' }}>
        <Typography variant="body2" component="span" color="text.primary" sx={{ flex: '50%' }}>
          {t('cart-sub-total', { quantity: 2 })}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          color="text.primary"
          align="right"
          sx={{ flex: '50%' }}
        >
          ${subtotal}
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
          ${tax}
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
        ${total}
      </Typography>
    </Box>
  </Box>
)

const Actions = (t: any) => {
  const router = useRouter()
  const handleGoToCart = (e: any) => {
    e.preventDefault()
    router.push('/cart')
  }
  const handleContinueShopping = (e: any) => {
    e.preventDefault()
    router.push('product/MS-JKT-001')
  }

  return (
    <Stack
      spacing={1}
      sx={{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '0 2% 4% 2%',
      }}
    >
      <Button variant="contained" sx={{ width: '100%' }} onClick={handleGoToCart}>
        {t('go-to-cart')}
      </Button>
      <Button
        variant="outlined"
        sx={{
          color: `${grey[500]}`,
          background: `${grey[50]}`,
          borderColor: `${grey[500]}`,
        }}
        onClick={handleContinueShopping}
      >
        {t('continue-shopping')}
      </Button>
    </Stack>
  )
}

// Component
const AddToCart = ({ fullfillmentOption, subtotal, tax, total }: CartDetailsProps) => {
  const { t } = useTranslation('common')

  const ModalArgs = {
    open: true,
    title: title(t),
    content: content(t, fullfillmentOption, subtotal, tax, total),
    dividers: false,
    actions: Actions(t),
  }

  return <Modal {...ModalArgs} />
}
export default AddToCart
