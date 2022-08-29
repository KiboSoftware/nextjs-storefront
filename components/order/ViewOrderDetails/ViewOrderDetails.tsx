import React from 'react'

import { ArrowBackIos } from '@mui/icons-material'
import { Divider, Grid, Typography, Box, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { SavedPaymentMethodView } from '@/components/checkout'
import { AddressCard, OrderSummary, ProductItemList } from '@/components/common'
import { ProductOption } from '@/components/product'
import { useStoreLocations } from '@/hooks'
import { billingGetters, orderGetters, storeLocationGetters } from '@/lib/getters'

import type { Maybe, Order, Location } from '@/lib/gql/types'

interface ViewOrderDetailsProps {
  order: Order
  title: string
  isOrderStatus?: boolean
  onGoBackToOrderHistory?: () => void
}

const styles = {
  container: {
    paddingBlock: 2,
  },
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
  },
  heading: {
    pt: 1,
    pb: 3,
  },
  divider: {
    borderColor: 'grey.500',
  },
}

const ViewOrderDetails = (props: ViewOrderDetailsProps) => {
  const { order, title, isOrderStatus = false, onGoBackToOrderHistory } = props
  const { t } = useTranslation(['common', 'checkout', 'orderhistory'])

  const orderNumber = orderGetters.getOrderNumber(order)
  const orderTotal = orderGetters.getTotal(order)
  const submittedDate = orderGetters.getSubmittedDate(order)
  const pickupItems = orderGetters.getPickupItems(order)
  const shipItems = orderGetters.getShipItems(order)
  const fulfillmentContact = orderGetters.getShippingAddress(order)
  const payments = orderGetters.getOrderPayments(order)
  const fulfillmentLocationCodes = orderGetters.getFulfillmentLocationCodes(pickupItems)
  const shippedTo = orderGetters.getShippedTo(order)

  const { data: locations } = useStoreLocations({ filter: fulfillmentLocationCodes })
  const storePickupAddress = storeLocationGetters.getLocations(locations as Maybe<Location>[])

  const orderSummeryArgs = {
    nameLabel: t('order-summary'),
    subTotalLabel: `${t('subtotal')} (${t('item-quantity', { count: order.items?.length })})`,
    shippingTotalLabel: t('shipping'),
    taxLabel: t('estimated-tax'),
    totalLabel: t('total-price'),
    subTotal: t('currency', { val: orderGetters.getSubtotal(order) }),
    discountedSubtotal: t('currency', { val: orderGetters.getDiscountedSubtotal(order) }),
    shippingTotal: orderGetters.getShippingTotal(order)
      ? t('currency', { val: orderGetters.getShippingTotal(order) })
      : t('checkout:free'),
    tax: t('currency', { val: orderGetters.getTaxTotal(order) }),
    total: t('currency', { val: orderTotal }),
  }

  const handleGoBackToOrderHistory = () => onGoBackToOrderHistory && onGoBackToOrderHistory()

  return (
    <>
      {!isOrderStatus && (
        <Stack
          sx={{ ...styles.wrapIcon, py: '1.2rem' }}
          direction="row"
          gap={2}
          onClick={handleGoBackToOrderHistory}
        >
          <ArrowBackIos fontSize="inherit" sx={styles.wrapIcon} />
          <Typography variant="body2">{t('order-history')}</Typography>
        </Stack>
      )}
      <Grid container data-testid="ViewOrderDetails">
        {/* Header section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h1" gutterBottom>
            {title}
          </Typography>
          <Divider sx={{ borderColor: 'primary.main' }} />
        </Grid>

        {/* Order Details Section */}
        <Grid item xs={12} md={7}>
          <Box sx={{ ...styles.container }}>
            <ProductOption
              option={{ name: t('order-number'), value: orderNumber }}
              variant="body1"
            />
            <ProductOption
              option={{ name: t('order-date'), value: submittedDate }}
              variant="body1"
            />
            <ProductOption
              option={{
                name: t('order-total'),
                value: `${t('currency', { val: orderTotal })} ${t('item-quantity', {
                  count: order.items?.length,
                })}`,
              }}
              variant="body1"
            />
            {isOrderStatus && (
              <ProductOption
                option={{ name: t('orderhistory:shipped-to'), value: shippedTo }}
                variant="body1"
              />
            )}
          </Box>
          <Divider sx={{ ...styles.divider }} />
          {/* Shipment orders */}
          {shipItems && shipItems.length > 0 && (
            <Box>
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
                {fulfillmentContact?.address && <AddressCard {...fulfillmentContact?.address} />}
              </Box>
              <Divider sx={{ ...styles.divider }} />
            </Box>
          )}

          {/* Pickup orders */}
          {pickupItems && pickupItems.length > 0 && (
            <Box>
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
                <ProductItemList
                  items={pickupItems}
                  showAddress={true}
                  storePickupAddresses={storePickupAddress}
                />
              </Box>
              <Divider sx={{ ...styles.divider }} />
            </Box>
          )}

          {/* Payment Information */}
          {!isOrderStatus && (
            <Box py={3}>
              <Typography variant="h3" fontWeight={'bold'}>
                {t('checkout:payment-information')}
              </Typography>
              {payments?.map((payment) => {
                const cardDetails = orderGetters.getOrderPaymentCardDetails(
                  payment.billingInfo.card
                )
                const address = billingGetters.getAddress(
                  payment.billingInfo.billingContact.address
                )
                return (
                  <SavedPaymentMethodView
                    key={payment?.id}
                    id={cardDetails.paymentServiceCardId}
                    cardNumberPart={cardDetails.cardNumberPartOrMask}
                    expireMonth={cardDetails.expireMonth}
                    expireYear={cardDetails.expireYear}
                    cardType={cardDetails.cardType}
                    address1={address.address1}
                    address2={address.address2}
                    cityOrTown={address.cityOrTown}
                    postalOrZipCode={address?.postalOrZipCode}
                    stateOrProvince={address.stateOrProvince}
                  />
                )
              })}
            </Box>
          )}
        </Grid>

        {/* Order Summary */}
        {!isOrderStatus && (
          <Grid item xs={12} md={5} sx={{ paddingX: { xs: 0, md: 2 } }}>
            <OrderSummary {...orderSummeryArgs} />
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default ViewOrderDetails
