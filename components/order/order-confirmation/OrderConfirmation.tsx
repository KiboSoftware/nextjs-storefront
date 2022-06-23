import React from 'react'

import { Box, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import OrderSummary from '@/components/common/OrderSummary/OrderSummary'
import ProductItemList from '@/components/common/ProductItemList'
import ProductOptionList from '@/components/product/ProductOptionList/ProductOptionList'
import { orderGetters } from '@/lib/getters'

import { Order } from '@/lib/gql/types'

const OrderConfirmation = ({ order }: { order: Order }) => {
  const { t } = useTranslation('common')

  const orderTotal = orderGetters.getTotal(order)
  const orderNumber = orderGetters.getOrderNumber(order)
  const submittedDate = orderGetters.getSubmittedDate(order)
  const pickupItems = orderGetters.getPickupItems(order)
  const shipItems = orderGetters.getShipItems(order)
  const email = orderGetters.getEmail(order)

  const options = [
    {
      name: t('your-order'),
      value: orderNumber,
    },
    {
      name: t('order-date'),
      value: submittedDate,
    },
  ]

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
      <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <Container maxWidth="xs">
          <Stack width={'100%'} alignItems="center" gap={3}>
            <Typography variant="h1">{t('thank-you')}</Typography>
            <Box display="flex" gap={3}>
              <Typography variant="h2" fontWeight={'normal'}>
                {t('item-quantity', { count: 15 })}
              </Typography>
              <Typography variant="h2">{t('currency', { val: orderTotal })}</Typography>
            </Box>
          </Stack>
        </Container>

        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: 'primary.main',
            height: '14.375rem',
            paddingX: 3,
            gap: 3,
          }}
        >
          <Typography variant="h1" color={'common.white'}>
            {t('order-placed-confirmation-text')}
          </Typography>
          <Typography variant="h3" color={'common.white'} fontWeight={'normal'}>
            {t('check-email-confirmation-text')}
          </Typography>
        </Stack>

        <Stack width={'100%'} alignItems="center" gap={3}>
          <Container maxWidth="xs">
            <Box>
              <ProductOptionList options={options} variant={'h4'} fontWeight={'normal'} />
            </Box>
            <br />
            <Typography variant="h4" sx={{ display: 'inline' }}>
              {t('order-confirmation-to-email-text')}
              <Box sx={{ fontWeight: 'bold' }}>{email}</Box>
            </Typography>
          </Container>
        </Stack>

        <Stack width={'100%'} alignItems="center">
          <Container maxWidth="xs">
            <Typography variant="h2" gutterBottom>
              {t('order-details')}
            </Typography>
            <Divider sx={{ height: '1px', bgcolor: 'primary.main' }} />
            {shipItems && shipItems.length && (
              <Box sx={{ paddingBlock: 2 }}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                  {t('ship')}
                </Typography>

                <ProductItemList items={shipItems} />
              </Box>
            )}
            <Divider sx={{ height: '1px' }} />

            {/* Pickup orders */}
            {pickupItems && pickupItems.length && (
              <Box sx={{ paddingBlock: 2 }}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                  {t('pickup-title')}
                </Typography>
                <ProductItemList items={pickupItems} />
              </Box>
            )}
          </Container>
        </Stack>
        {/* Order Summary */}
        <Stack width={'100%'} alignItems="center">
          <Container maxWidth="xs">
            <OrderSummary {...orderSummeryArgs} />
          </Container>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default OrderConfirmation
