import React from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Stack, Typography, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { FilterOrders, FilterTiles } from '@/components/common'
import { OrderHistoryItem } from '@/components/my-account'

import type { OrderCollection, Order } from '@/lib/gql/types'

interface OrderHistoryProps {
  orders: OrderCollection
  accountTitle: string
  onAccountTitleClick: () => void
}

const styles = {
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
  },
}

const OrderHistory = (props: OrderHistoryProps) => {
  const { orders, accountTitle, onAccountTitleClick } = props
  const { items = [] } = orders

  const { t } = useTranslation('common')

  const handleAccountTitleClick = () => {
    onAccountTitleClick()
  }

  const handleHistoryItemClick = (id: string) => {
    console.log(`id: `, id)
  }

  return (
    <Stack>
      <Stack sx={styles.wrapIcon} direction="row" gap={2} onClick={handleAccountTitleClick}>
        <ArrowBackIosIcon fontSize="inherit" sx={styles.wrapIcon} />
        <Typography variant="body1">{accountTitle}</Typography>
      </Stack>

      <Stack sx={{ pt: '1.2rem', pb: '1.2rem' }}>
        <Typography variant="h1">{t('order-history')}</Typography>
      </Stack>

      <Stack
        direction="row"
        sx={{ display: 'flex', justifyContent: 'space-between', pb: '1.2rem' }}
      >
        {/* tobe: yet to implement */}
        <FilterTiles />
        <FilterOrders />
      </Stack>

      <Stack>
        <Divider sx={{ bgcolor: 'grey.500', borderWidth: '1px' }} />
      </Stack>

      <Stack>
        {items?.map((item, index) => (
          <OrderHistoryItem
            key={index}
            order={item as Order}
            onHistoryItemClick={handleHistoryItemClick}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default OrderHistory
