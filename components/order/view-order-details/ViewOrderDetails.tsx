import React from 'react'

import { Divider, Grid, Typography, Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { SavedPaymentMethodView } from '@/components/checkout'
import AddressCard from '@/components/common/AddressCard/AddressCard'
import OrderSummary from '@/components/common/OrderSummary/OrderSummary'
import ProductItemList from '@/components/common/ProductItemList'
import ProductOption from '@/components/product/ProductOption/ProductOption'
import { orderGetters } from '@/lib/getters'

import type { Order } from '@/lib/gql/types'
interface ViewOrderDetailsProps {
  order: Order
}

const ViewOrderDetails = (props: ViewOrderDetailsProps) => {
  const { order } = props
  const { t } = useTranslation('common')

  const orderNumber = orderGetters.getOrderNumber(order)
  const orderTotal = orderGetters.getTotal(order)
  const fulfillmentContact = orderGetters.getShippingAddress(order)
  const pickupItems = orderGetters.getPickupItems(order)
  const shipItems = orderGetters.getShipItems(order)
  const submittedDate = orderGetters.getSubmittedDate(order)
  const billingContact = orderGetters.getBillingAddress(order)
  const payments = orderGetters.getOrderPayments(order)

  const orderSummeryArgs = {
    standardShippingAmount: 'Free',
    estimatedTaxAmout: `${order?.taxTotal}`,
    orderTotal: `${order?.total}`,
    subTotal: `${order?.subtotal}`,
    numberOfItems: `${order?.items?.length} items`,
    backLabel: 'Go Back',
    checkoutLabel: 'Go to Checkout',
    nameLabel: 'Order Summary',
    cartTotalLabel: 'Subtotal',
    standardShippingLabel: 'Shipping',
    estimatedTaxLabel: 'Estimated Tax',
    orderTotalLabel: 'Total Price',
    shippingLabel: 'Go to Shipping',
  }

  return (
    <Grid container>
      {/* Header section */}
      <Grid item xs={12} md={7}>
        <Typography variant="h1" gutterBottom>
          {t('view-order-details')}
        </Typography>
        <Divider sx={{ height: '1px' }} />
      </Grid>
      <Grid md={5}></Grid>

      {/* Order Details Section */}
      <Grid xs={12} md={7}>
        <Box sx={{ paddingBlock: 2 }}>
          <ProductOption option={{ name: t('order-number'), value: orderNumber }} variant="body1" />
          <ProductOption option={{ name: t('order-date'), value: submittedDate }} variant="body1" />
          <ProductOption
            option={{
              name: t('order-total'),
              value: `${t('currency', { val: orderTotal })} ${t('item-quantity', { count: 15 })}`,
            }}
            variant="body1"
          />
        </Box>
        <Divider sx={{ height: '1px' }} />
        {/* Shipment orders */}
        {shipItems && shipItems.length && (
          <Box sx={{ paddingBlock: 2 }}>
            <Typography variant="h3" gutterBottom>
              {t('shipment-details')}
            </Typography>
            <Box sx={{ pt: 1, pb: 3 }}>
              <Typography variant="h4">{t('delivered')}</Typography>
              <Typography variant="h4" color="primary">
                {orderGetters.getExpectedDeliveryDate(shipItems)}
              </Typography>
            </Box>

            <ProductItemList items={shipItems} />
            <AddressCard {...fulfillmentContact?.address} />
          </Box>
        )}
        <Divider sx={{ height: '1px' }} />

        {/* Pickup orders */}
        {pickupItems && pickupItems.length && (
          <Box sx={{ paddingBlock: 2 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              {t('pickup-title')}
            </Typography>
            <Box sx={{ pt: 1, pb: 3 }}>
              <Typography variant="h4" fontWeight={700}>
                {t('pickup')}
              </Typography>
              <Typography variant="h4" fontWeight={700} color="primary">
                {t('est-pickup')} {orderGetters.getExpectedDeliveryDate(pickupItems)}
              </Typography>
            </Box>
            <ProductItemList items={pickupItems} />
            <AddressCard {...fulfillmentContact?.address} />
            {/* ToBe: Address details need to be handled based on API GetISPULocations by purchase location code */}
          </Box>
        )}

        <Divider sx={{ height: '1px' }} />

        {/* Payment Information */}
        <Box py={3}>
          {payments?.map((payment) => (
            <SavedPaymentMethodView
              key={payment?.id}
              card={payment?.billingInfo?.card}
              billingAddress={payment?.billingInfo?.billingContact?.address}
            />
          ))}
        </Box>

        {/* Order Summary */}
        <OrderSummary {...orderSummeryArgs} />
      </Grid>
    </Grid>
  )
}

export default ViewOrderDetails
