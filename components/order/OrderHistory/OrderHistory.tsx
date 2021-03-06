import React, { useState } from 'react'

import { ArrowBackIos } from '@mui/icons-material'
import { Stack, Typography, Divider, Box, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { FilterOrders, FilterTiles, FullWidthDivider } from '@/components/common'
import { OrderHistoryItem, ViewOrderDetails } from '@/components/order'
import { orderGetters } from '@/lib/getters'

import type { OrderCollection, Order, CrAddress, FacetValue } from '@/lib/gql/types'

interface OrderHistoryProps {
  accountTitle: string
  filters: FacetValue[]
  orders: OrderCollection
  storePickupAddress?: CrAddress
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
  const { accountTitle, filters = [], orders, storePickupAddress, onAccountTitleClick } = props
  const { items = [] } = orders
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined)

  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation('common')

  const handleAccountTitleClick = () => {
    onAccountTitleClick()
  }

  const handleHistoryItemClick = (id: string) => {
    const order = items?.find((orderItem) => orderItem?.id === id) as Order
    setSelectedOrder(order)
  }

  const handleRemoveSelectedTile = (tile: string) => {
    //todo
    console.log('remove selected filters')
  }
  const getOrderDetails = (order: Order) => {
    const { id, submittedDate, productNames, orderTotal, orderStatus } =
      orderGetters.getOrderDetails(order)

    return {
      id,
      submittedDate,
      productNames,
      orderTotal,
      orderStatus,
    }
  }

  const showOrderHistoryItem = () => {
    return (
      <Stack>
        <Stack sx={styles.wrapIcon} direction="row" gap={2} onClick={handleAccountTitleClick}>
          <ArrowBackIos fontSize="inherit" sx={styles.wrapIcon} />
          <Typography variant="body1">{accountTitle}</Typography>
        </Stack>

        <Stack sx={{ py: '1.2rem' }}>
          <Typography variant="h1">{t('order-history')}</Typography>
        </Stack>

        <Stack
          direction="row"
          sx={{ display: 'flex', justifyContent: 'space-between', pb: '1.2rem' }}
        >
          <FilterTiles appliedFilters={filters} onRemoveSelectedTile={handleRemoveSelectedTile} />
          <FilterOrders />
        </Stack>

        <Stack>
          {mdScreen ? (
            <Divider sx={{ borderColor: 'primary.main' }} />
          ) : (
            <FullWidthDivider color="primary.main" />
          )}
        </Stack>

        <Stack>
          {items?.map((item) => (
            <OrderHistoryItem
              key={item?.id}
              {...getOrderDetails(item as Order)}
              onHistoryItemClick={handleHistoryItemClick}
            />
          ))}
        </Stack>
      </Stack>
    )
  }

  return (
    <Box>
      {selectedOrder && (
        <ViewOrderDetails order={selectedOrder} storePickupAddress={storePickupAddress} />
      )}
      {!selectedOrder && showOrderHistoryItem()}
    </Box>
  )
}

export default OrderHistory
