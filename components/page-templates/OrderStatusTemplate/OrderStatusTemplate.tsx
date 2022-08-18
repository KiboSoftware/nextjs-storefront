import React, { useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboBreadcrumbs from '@/components/core/Breadcrumbs/KiboBreadcrumbs'
import { ViewOrderDetails, ViewOrderStatus } from '@/components/order'
import type { OrderStatusFormDataProps } from '@/components/order/ViewOrderStatus/ViewOrderStatus'
import { useUserOrderQueries } from '@/hooks'

import { Order } from '@/lib/gql/types'

const styles = {
  breadcrumbsClass: {
    margin: '1.5rem 0',
    padding: 0,
  },
}

const OrderStatusTemplate = () => {
  const [queryFilters, setQueryFilters] = useState<OrderStatusFormDataProps>({
    billingEmail: '',
    orderNumber: '',
  })

  const { t } = useTranslation(['common', 'orderhistory'])
  const { data: orderCollection } = useUserOrderQueries(queryFilters)
  const { items = [], pageCount } = orderCollection
  const breadCrumbsList = [
    { text: t('home'), link: '/' },
    { text: t('order-status'), link: '/order-status' },
  ]
  const order = items && (items[0] as Order)
  const handleOrderStatusSubmit = (data: OrderStatusFormDataProps) => setQueryFilters(data)

  return (
    <Grid container px={1}>
      <Grid item xs={12} sx={{ ...styles.breadcrumbsClass }}>
        <KiboBreadcrumbs breadcrumbs={breadCrumbsList} />
      </Grid>
      <Grid item xs={12}>
        {order && (
          <ViewOrderDetails
            title={t('orderhistory:view-order-status')}
            isOrderStatus={true}
            order={order}
          />
        )}
        {!order && (
          <ViewOrderStatus
            onOrderStatusSubmit={handleOrderStatusSubmit}
            lookupWarningMessage={pageCount === 0 ? t('orderhistory:no-orders-found') : ''}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default OrderStatusTemplate
