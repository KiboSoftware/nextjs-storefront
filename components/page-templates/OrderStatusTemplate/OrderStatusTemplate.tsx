import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboBreadcrumbs from '@/components/core/Breadcrumbs/KiboBreadcrumbs'
import { ViewOrderDetails, ViewOrderStatus } from '@/components/order'
import { OrderStatusFormData } from '@/components/order/ViewOrderStatus/ViewOrderStatus'
import { useUserOrderQueries } from '@/hooks'

import { Order } from '@/lib/gql/types'

const styles = {
  breadcrumbsClass: {
    margin: '1.5rem 0',
    padding: 0,
  },
}

const OrderStatusTemplate = () => {
  const [queryFilters, setQueryFilters] = useState<OrderStatusFormData>({
    billingEmail: '',
    orderNumber: '',
  })
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined)

  const { t } = useTranslation(['common', 'orderhistory'])
  const { data: orderCollection } = useUserOrderQueries(queryFilters)
  const { items = [] } = orderCollection
  const breadCrumbsList = [
    { text: t('home'), link: '/' },
    { text: t('order-status'), link: '/order-status' },
  ]

  const handleShowOrderHistoryItem = () => setSelectedOrder(undefined)
  const handleOrderStatusSubmit = (data: OrderStatusFormData) => setQueryFilters(data)

  useEffect(() => {
    setSelectedOrder((items && items[0]) as Order)
  }, [items])

  return (
    <Grid container px={1}>
      <Grid item xs={12} sx={{ ...styles.breadcrumbsClass }}>
        <KiboBreadcrumbs breadcrumbs={breadCrumbsList} />
      </Grid>
      <Grid item xs={12}>
        {selectedOrder && (
          <ViewOrderDetails
            title={t('view-order-status')}
            isOrderStatus={true}
            order={selectedOrder}
            onShowOrderHistoryItem={handleShowOrderHistoryItem}
          />
        )}
        {!selectedOrder && <ViewOrderStatus onOrderStatusSubmit={handleOrderStatusSubmit} />}
      </Grid>
    </Grid>
  )
}

export default OrderStatusTemplate
