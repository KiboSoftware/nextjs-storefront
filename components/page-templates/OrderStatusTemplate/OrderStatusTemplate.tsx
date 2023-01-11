import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboBreadcrumbs from '@/components/core/Breadcrumbs/KiboBreadcrumbs'
import { ViewOrderDetails, ViewOrderStatus } from '@/components/order'
import type { OrderStatusFormDataProps } from '@/components/order/ViewOrderStatus/ViewOrderStatus'
import { useUserOrderQueries } from '@/hooks'

import type { CrOrder } from '@/lib/gql/types'

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
    isRefetching: true,
  })

  const { t } = useTranslation('common')
  const { data: orderCollection, isFetching } = useUserOrderQueries(queryFilters)
  const { items = [], pageCount } = orderCollection
  const order = items && (items[0] as CrOrder)
  const breadCrumbsList = [
    { text: t('home'), link: '/' },
    { text: t('order-status'), link: '/order-status' },
  ]
  const handleOrderStatusSubmit = (data: OrderStatusFormDataProps) => {
    setQueryFilters({ ...data, isRefetching: true })
  }

  useEffect(() => {
    if (isFetching) setQueryFilters({ ...queryFilters, isRefetching: false })
  }, [isFetching])

  return (
    <Grid container px={1}>
      <Grid item xs={12} sx={{ ...styles.breadcrumbsClass }}>
        <KiboBreadcrumbs breadcrumbs={breadCrumbsList} />
      </Grid>
      <Grid item xs={12}>
        {order?.id && (
          <ViewOrderDetails title={t('view-order-status')} isOrderStatus={true} order={order} />
        )}
        {!order?.id && (
          <ViewOrderStatus
            onOrderStatusSubmit={handleOrderStatusSubmit}
            lookupWarningMessage={pageCount === 0 ? t('no-orders-found') : ''}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default OrderStatusTemplate
