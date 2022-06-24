import React from 'react'

import { Divider, Grid, Typography, Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { SavedPaymentMethodView } from '@/components/checkout'
import AddressCard from '@/components/common/AddressCard/AddressCard'
import OrderSummary from '@/components/common/OrderSummary/OrderSummary'
import ProductItemList from '@/components/common/ProductItemList/ProductItemList'
import ProductOption from '@/components/product/ProductOption/ProductOption'
import { orderGetters } from '@/lib/getters'

import type { Order, CrAddress } from '@/lib/gql/types'

interface ViewOrderDetailsProps {
  order: Order
  storePickupAddress?: CrAddress
}

const styles = {
  container: {
    paddingBlock: 2,
  },
  heading: {
    pt: 1,
    pb: 3,
  },
  divider: {
    height: '1px',
  },
}

const ViewOrderDetails = (props: ViewOrderDetailsProps) => {
  const { order, storePickupAddress } = props
  const { t } = useTranslation(['common', 'checkout'])

  const orderNumber = orderGetters.getOrderNumber(order)
  const orderTotal = orderGetters.getTotal(order)
  const submittedDate = orderGetters.getSubmittedDate(order)
  const pickupItems = orderGetters.getPickupItems(order)
  const shipItems = orderGetters.getShipItems(order)
  const fulfillmentContact = orderGetters.getShippingAddress(order)
  const payments = orderGetters.getOrderPayments(order)

  const orderSummeryArgs = {
    nameLabel: t('order-summary'),
    cartTotalLabel: t('subtotal'),
    standardShippingLabel: t('shipping'),
    estimatedTaxLabel: t('estimated-tax'),
    orderTotalLabel: t('total-price'),
    orderTotal: t('currency', { val: orderTotal }),
    numberOfItems: t('item-quantity', { count: order.items?.length }),
    standardShippingAmount: t('currency', { val: orderGetters.getShippingTotal(order) }),
    estimatedTaxAmout: t('currency', { val: orderGetters.getTaxTotal(order) }),
    subTotal: t('currency', { val: orderGetters.getSubtotal(order) }),
  }

  return (
    <Grid container>
      {/* Header section */}
      <Grid item xs={12} md={7}>
        <Typography variant="h1" gutterBottom>
          {t('view-order-details')}
        </Typography>
        <Divider sx={{ ...styles.divider }} />
      </Grid>

      {/* Order Details Section */}
      <Grid item xs={12} md={7}>
        <Box sx={{ ...styles.container }}>
          <ProductOption option={{ name: t('order-number'), value: orderNumber }} variant="body1" />
          <ProductOption option={{ name: t('order-date'), value: submittedDate }} variant="body1" />
          <ProductOption
            option={{
              name: t('order-total'),
              value: `${t('currency', { val: orderTotal })} ${t('item-quantity', {
                count: order.items?.length,
              })}`,
            }}
            variant="body1"
          />
        </Box>
        <Divider sx={{ ...styles.divider }} />
        {/* Shipment orders */}
        {shipItems && shipItems.length && (
          <Box sx={{ ...styles.container }}>
            <Typography variant="h3" gutterBottom fontWeight={700}>
              {t('shipment-details')}
            </Typography>
            <Box sx={{ ...styles.heading }}>
              <Typography variant="h4" fontWeight={700}>
                {t('delivered')}
              </Typography>
              <Typography variant="h4" color="primary">
                {orderGetters.getExpectedDeliveryDate(shipItems)}
              </Typography>
            </Box>

            <ProductItemList items={shipItems} />
            <AddressCard {...fulfillmentContact?.address} />
          </Box>
        )}
        <Divider sx={{ ...styles.divider }} />

        {/* Pickup orders */}
        {pickupItems && pickupItems.length && (
          <Box sx={{ ...styles.container }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              {t('pickup-title')}
            </Typography>
            <Box sx={{ ...styles.heading }}>
              <Typography variant="h4" fontWeight={700}>
                {t('pickup')}
              </Typography>
              <Typography variant="h4" fontWeight={700} color="primary">
                {t('est-pickup')} {orderGetters.getExpectedDeliveryDate(pickupItems)}
              </Typography>
            </Box>
            <ProductItemList items={pickupItems} />
            <AddressCard {...storePickupAddress} />
            {/* ToBe: Address details need to be handled based on API GetISPULocations by purchase location code */}
          </Box>
        )}

        <Divider sx={{ ...styles.divider }} />

        {/* Payment Information */}
        <Box py={3}>
          <Typography variant="h3" fontWeight={'bold'}>
            {t('checkout:payment-information')}
          </Typography>
          {payments?.map((payment) => (
            <SavedPaymentMethodView
              key={payment?.id}
              card={payment?.billingInfo?.card}
              billingAddress={payment?.billingInfo?.billingContact?.address}
            />
          ))}
        </Box>
      </Grid>

      {/* Order Summary */}
      <Grid item xs={12} md={5} sx={{ paddingX: { xs: 0, md: 2 } }}>
        <OrderSummary {...orderSummeryArgs} />
      </Grid>
    </Grid>
  )
}

export default ViewOrderDetails
