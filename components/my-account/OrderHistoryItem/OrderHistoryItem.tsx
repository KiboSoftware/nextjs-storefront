import React from 'react'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { orderGetters } from '@/lib/getters'

import type { Order } from '@/lib/gql/types'

interface OrderHistoryItemProps {
  order: Order
}

const styles = {
  stack: {
    borderBottomColor: 'grey.500',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    pt: 2,
    pb: 3,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  box: {
    width: '5%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}

const OrderHistoryItem = (props: OrderHistoryItemProps) => {
  const { order } = props
  const { t } = useTranslation('common')

  const { submittedDate, productNames, orderTotal, orderStatus } =
    orderGetters.getOrderDetails(order)

  return (
    <Stack sx={styles.stack} direction="row">
      <Stack sx={{ width: '95%' }} gap={0.6}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {submittedDate}
        </Typography>
        <Typography variant="body1" sx={{ color: 'grey.600' }}>
          {productNames}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {t('currency', { val: orderTotal })}
        </Typography>

        <Typography variant="body2" sx={{ color: 'grey.600' }}>
          {orderStatus}
        </Typography>
      </Stack>
      <Box sx={styles.box}>
        <ArrowForwardIosIcon fontSize="inherit" />
      </Box>
    </Stack>
  )
}

export default OrderHistoryItem
