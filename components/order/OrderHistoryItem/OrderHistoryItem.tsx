import React from 'react'

import { ArrowForwardIos } from '@mui/icons-material'
import { Box, Stack, Typography, useMediaQuery, useTheme, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { FullWidthDivider, Price } from '@/components/common'

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

  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const handleHistoryItemClick = () => {
    onHistoryItemClick(id)
  }

  return (
    <Stack>
      <Stack
        sx={styles.stack}
        direction="row"
        data-testid="history-item"
        onClick={handleHistoryItemClick}
      >
        <Stack sx={{ width: '95%' }} gap={0.6}>
          <Typography variant="body1" fontWeight="bold">
            {submittedDate}
          </Typography>
          <Typography variant="body1" color={'text.secondary'}>
            {productNames}
          </Typography>

          <Price price={t('currency', { val: orderTotal })} />

          <Typography variant="body2" color={'primary'}>
            {orderStatus}
          </Typography>
        </Stack>
        <Box sx={styles.box}>
          <ArrowForwardIos fontSize="inherit" />
        </Box>
      </Stack>
      <Stack>
        {mdScreen ? <Divider sx={{ borderColor: 'grey.500' }} /> : <FullWidthDivider />}
      </Stack>
    </Stack>
  )
}

export default OrderHistoryItem
