import React from 'react'

import { Box, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { OrderSummary, ProductItemList } from '@/components/common'
import { ProductOptionList } from '@/components/product'
import { orderGetters } from '@/lib/getters'

import type { CrOrder } from '@/lib/gql/types'

const OrderConfirmation = ({ order }: { order: CrOrder }) => {
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
      value: String(orderNumber),
    },
    {
      name: t('order-date'),
      value: submittedDate,
    },
  ]

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
      : t('free'),
    tax: t('currency', { val: orderGetters.getTaxTotal(order) }),
    total: t('currency', { val: orderTotal }),
  }

  return (
    <Grid container data-testid="order-confirmation">
      <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <Container maxWidth="xs">
          <Stack width={'100%'} alignItems="center" gap={3}>
            <Typography variant="h1">{t('thank-you')}</Typography>
            <Box display="flex" gap={3}>
              <Typography variant="h2" fontWeight={'normal'}>
                {t('item-quantity', { count: order.items?.length })}
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
            {t('your-order-was-placed-successfully')}
          </Typography>
          <Typography variant="h3" color={'common.white'} fontWeight={'normal'}>
            {t('check-your-email-for-your-order-confirmation')}
          </Typography>
        </Stack>

        <Stack width={'100%'} alignItems="center" gap={3}>
          <Container maxWidth="xs">
            <Box>
              <ProductOptionList options={options} variant={'h3'} fontWeight={'normal'} />
            </Box>
            <br />
            <Typography variant="h3" sx={{ display: 'inline' }}>
              {t('we-have-sent-the-order-confirmation-details-to')}
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
            {shipItems && shipItems.length > 0 && (
              <Box sx={{ paddingBlock: 2 }}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                  {t('shipping-to-home')}
                </Typography>

                <ProductItemList items={shipItems} />
              </Box>
            )}
            <Divider sx={{ height: '1px' }} />

            {/* Pickup orders */}
            {pickupItems && pickupItems.length > 0 && (
              <Box sx={{ paddingBlock: 2 }}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                  {t('pickup')}
                </Typography>
                <ProductItemList items={pickupItems} />
              </Box>
            )}
          </Container>
        </Stack>
        {/* Order Summary */}
        <Stack width={'100%'} alignItems="center">
          <Container maxWidth="xs" sx={{ p: 0 }}>
            <OrderSummary {...orderSummeryArgs} />
          </Container>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default OrderConfirmation
