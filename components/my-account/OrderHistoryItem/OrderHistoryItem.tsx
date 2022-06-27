import React from 'react'

import { ArrowForwardIos } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { Price } from '@/components/common'

export interface OrderHistoryItemProps {
  id: string
  submittedDate: string
  productNames: string
  orderTotal: number
  orderStatus: string
  onHistoryItemClick: (id: string) => void
}

const styles = {
  stack: {
    // tobe: once Geetanshu's PR will be merged, need to replace border with Divider
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
  const { id, submittedDate, productNames, orderTotal, orderStatus, onHistoryItemClick } = props
  const { t } = useTranslation('common')

  const handleHistoryItemClick = (id: string) => {
    onHistoryItemClick(id)
  }

  return (
    <Stack
      sx={styles.stack}
      direction="row"
      data-testid="history-item"
      onClick={() => handleHistoryItemClick(id as string)}
    >
      <Stack sx={{ width: '95%' }} gap={0.6}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {submittedDate}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {productNames}
        </Typography>

        <Price price={t('currency', { val: orderTotal })} />

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {orderStatus}
        </Typography>
      </Stack>
      <Box sx={styles.box}>
        <ArrowForwardIos fontSize="inherit" />
      </Box>
    </Stack>
  )
}

export default OrderHistoryItem
