import React from 'react'

import { Divider, Grid, Typography, Box } from '@mui/material'

import { argsWithLabel } from '@/__mocks__/productItemListMockData'
import ProductItemList from '@/components/common/ProductItemList'
import ProductOption from '@/components/product/ProductOption/ProductOption'
import { checkoutGetters, orderGetters } from '@/lib/getters'

import { Order } from '@/lib/gql/types'
// Note:
// 1. Create Store details Card with radio option
// 2. Create OrderSummary Total Details Component.

interface ViewOrderDetailsProps {
  order: Order
}

const ViewOrderDetails = (props: ViewOrderDetailsProps) => {
  const { order } = props

  const orderNumber = orderGetters.getOrderNumber(order)
  const orderTotal = orderGetters.getOrderTotal(order)
  const address = orderGetters.getShippingAddress(order)

  const pickupItems = checkoutGetters.getPickupItems(order)
  const shipItems = checkoutGetters.getShipItems(order)

  return (
    <Grid container>
      {/* Header section */}
      <Grid item xs={12} md={7}>
        <Typography variant="h1" gutterBottom>
          View Order Details
        </Typography>
        <Divider sx={{ height: '1px' }} />
      </Grid>
      <Grid md={5}></Grid>

      {/* Order Details Section */}
      <Grid xs={12} md={7}>
        <Box sx={{ paddingBlock: 2 }}>
          <ProductOption option={{ name: 'Order Number', value: orderNumber }} variant="body1" />
          <ProductOption
            option={{ name: 'Order Date', value: 'December 1, 2021, 1:43 PM CT' }}
            variant="body1"
          />
          <ProductOption
            option={{ name: 'Order Total', value: `${orderTotal} (${order?.items?.length} items)` }}
            variant="body1"
          />
        </Box>
        <Divider sx={{ height: '1px' }} />

        {/* Shipment orders */}
        {shipItems && shipItems.length && (
          <Box sx={{ paddingBlock: 2 }}>
            <Typography variant="h3" gutterBottom>
              Shipment Details
            </Typography>
            <Box sx={{ pt: 1, pb: 3 }}>
              <Typography variant="h4">Delivered</Typography>
              <Typography variant="h4" color="primary">
                Wednesday, December 22, 2021
              </Typography>
            </Box>

            {/* <ProductItemList items={shipItems} /> */}

            {/* Insert AddressCard Component here */}
          </Box>
        )}

        {/* Pickup orders */}
        {pickupItems && pickupItems.length && (
          <Box sx={{ paddingBlock: 2 }}>
            <Typography variant="h3" gutterBottom>
              Pickup
            </Typography>
            <Box sx={{ pt: 1, pb: 3 }}>
              <Typography variant="h4">Pickup in store</Typography>
              <Typography variant="h4" color="primary">
                Est. Pickup: Monday, December 20, 2021
              </Typography>
            </Box>

            {/* <ProductItemList items={pickupItems} /> */}
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default ViewOrderDetails
