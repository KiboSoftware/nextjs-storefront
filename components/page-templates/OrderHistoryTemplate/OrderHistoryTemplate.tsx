import React, { useState } from 'react'

import { Add, ArrowBackIos } from '@mui/icons-material'
import { Stack, Typography, Divider, Box, useMediaQuery, useTheme, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { FilterOrders, FilterTiles, FullWidthDivider } from '@/components/common'
import { OrderHistoryItem, ViewOrderDetails } from '@/components/order'
import { useUpdateRoutes } from '@/hooks'
import { facetGetters, orderGetters } from '@/lib/getters'

import type { OrderCollection, Order } from '@/lib/gql/types'

interface OrderHistoryProps {
  queryFilters: string[]
  orderCollection: OrderCollection
  onAccountTitleClick: () => void
}

const styles = {
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
  },
  filterByButton: {
    textTransform: 'capitalize',
    borderColor: 'grey.900',
    color: 'grey.900',
    justifyContent: 'space-between',
    width: '148px',
    minWidth: '148px',
    height: '2.188rem',
  },
}

const OrderHistoryTemplate = (props: OrderHistoryProps) => {
  const { queryFilters = [], orderCollection, onAccountTitleClick } = props
  const { items = [] } = orderCollection
  const [showFilterBy, setFilterBy] = useState<boolean>(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined)
  const { updateRoute, changeFilters } = useUpdateRoutes()
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation('common')

  const facetList = facetGetters.getFacetListByQueryFilter(queryFilters)
  const facetType = facetGetters.getFacetTypeForHistory(t)
  let appliedFilters = facetGetters.getAppliedFacetList(facetList)

  const handleFilterBy = () => setFilterBy(!showFilterBy)
  const handleAccountTitleClick = () => onAccountTitleClick()
  const handleHistoryItemClick = (id: string) => {
    const order = items?.find((orderItem) => orderItem?.id === id) as Order
    setSelectedOrder(order)
  }
  const handleFilterApply = (selectedFilters: string) => changeFilters(selectedFilters)
  const handleSelectedTileRemoval = (selectedTile: string) => {
    facetList.forEach(
      (facet) => (facet.isApplied = facet.filterValue === selectedTile ? false : facet?.isApplied)
    )
    appliedFilters = facetGetters.getAppliedFacetList(facetList)
    updateRoute(selectedTile)
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
      <Box px={1} py={2}>
        {!showFilterBy && (
          <Stack>
            <Stack sx={styles.wrapIcon} direction="row" gap={2} onClick={handleAccountTitleClick}>
              <ArrowBackIos fontSize="inherit" sx={styles.wrapIcon} />
              <Typography variant="body2">{t('my-account')}</Typography>
            </Stack>

            <Stack sx={{ py: '1.2rem' }}>
              <Typography variant="h1">{t('order-history')}</Typography>
            </Stack>

            <Stack
              direction="row"
              sx={{ display: 'flex', justifyContent: 'space-between', pb: '1.2rem' }}
            >
              <FilterTiles
                appliedFilters={appliedFilters}
                onSelectedTileRemoval={handleSelectedTileRemoval}
              />
              <Button
                variant="outlined"
                endIcon={<Add fontSize="small" />}
                sx={{ ...styles.filterByButton }}
                onClick={handleFilterBy}
              >
                {t('filter-orders')}
              </Button>
            </Stack>

            <Stack>
              {mdScreen ? (
                <Divider sx={{ borderColor: 'primary.main' }} />
              ) : (
                <FullWidthDivider color="primary.main" />
              )}
            </Stack>

            <Stack>
              {items?.map((order) => (
                <OrderHistoryItem
                  key={order?.id}
                  {...getOrderDetails(order as Order)}
                  onHistoryItemClick={handleHistoryItemClick}
                />
              ))}
            </Stack>
          </Stack>
        )}
        {showFilterBy && (
          <Stack>
            <FilterOrders
              facetList={facetType}
              appliedFilters={appliedFilters}
              onFilterByClose={handleFilterBy}
              onFilterApply={handleFilterApply}
              onSelectedTileRemoval={handleSelectedTileRemoval}
            />
          </Stack>
        )}
      </Box>
    )
  }

  return (
    <Box>
      {selectedOrder && (
        <ViewOrderDetails
          title={t('view-order-details')}
          order={selectedOrder}
          onGoBackToOrderHistory={() => setSelectedOrder(undefined)}
        />
      )}
      {!selectedOrder && showOrderHistoryItem()}
    </Box>
  )
}

export default OrderHistoryTemplate
