import React from 'react'

import { Card, Stack, Typography, CardContent, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ProductItem } from '@/components/common'
import { subscriptionGetters, productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'

import type { CrProduct } from '@/lib/gql/types'

interface MySubscriptionTemplateProps {
  subscription: any
}

interface SubscriptionButtonProps {
  subscriptionButtonName: string
}

const style = {
  button: {
    width: {
      xs: '100%',
      sm: '50%',
      lg: '100%',
    },
    mt: '5%',
  },
  card: {
    maxWidth: '100%',
    border: 1,
    borderRadius: 1,
  },
  subscriptionNumber: {
    pt: {
      xs: '2%',
      md: '0',
    },
    justifyContent: {
      xs: 'flex-start',
      md: 'space-between',
    },
  },
  subscriptionItem: {
    pt: {
      xs: '2%',
      md: '1%',
    },
    justifyContent: 'space-between',
  },
}

const SubscriptionButton = (props: SubscriptionButtonProps) => {
  const { subscriptionButtonName } = props
  const { t } = useTranslation('common')

  return (
    <Button variant="contained" color="secondary" sx={{ ...style.button }}>
      {t(subscriptionButtonName)}
    </Button>
  )
}

const MySubscriptionTemplate = (props: MySubscriptionTemplateProps) => {
  const { subscription } = props

  const {
    subscriberName,
    subscriberAddress,
    subscriptionFrequency,
    nextOrderDate,
    subscriptionNumber,
    subscriptionStatus,
  } = subscriptionGetters.getSubscriptionDetails(subscription)

  const productImage = productGetters.getProductImage(subscription?.items[0]?.product as CrProduct)
  const productImageLink = productGetters.handleProtocolRelativeUrl(productImage)
  const productName = productGetters.getName(subscription?.items[0]?.product as CrProduct)
  const productOptions = productGetters.getOptions(subscription?.items[0]?.product as CrProduct)

  const { getProductLink } = uiHelpers()
  const { t } = useTranslation('common')

  return (
    <Card sx={{ ...style.card }}>
      <CardContent sx={{ bgcolor: 'grey.100' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: '0', md: '5' }}
          sx={{ justifyContent: 'space-between' }}
        >
          <Stack direction="column">
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {subscriberName}
            </Typography>
            <Typography variant="h4">{subscriberAddress}</Typography>
          </Stack>
          <Stack direction="column" sx={{ ...style.subscriptionNumber }}>
            <Stack direction="row">
              <Typography variant="h4" align="right" sx={{ fontWeight: 'bold' }}>
                {t('subscription-number')}
              </Typography>
              <Typography variant="h4" align="right">
                {subscriptionNumber}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ xs: { pl: '0' } }}>
              <Typography variant="h4" align="right" sx={{ fontWeight: 'bold' }}>
                {t('status')}
              </Typography>
              <Typography variant="h4" align="right" sx={{ pl: '2%' }}>
                {subscriptionStatus}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <CardContent>
        <Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={{ ...style.subscriptionItem }}>
          <Stack direction="column" sx={{ pt: { xs: '5 %' } }}>
            <Stack direction="row" sx={{ mt: { md: '3%' } }}>
              <ProductItem
                image={productImageLink}
                name={productName}
                options={productOptions}
                link={getProductLink(subscription?.items[0]?.product?.productCode as string)}
              />
            </Stack>
            <Stack direction="row">
              <Typography sx={{ pr: { xs: '5%', md: '20%' } }}>
                {t('shipment-frequency')}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', display: 'flex', pl: '6%' }}>
                {subscriptionFrequency}
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography>{t('estimated-next-arrival-date')}</Typography>
              <Typography sx={{ fontWeight: 'bold', pl: '10px' }}>{nextOrderDate}</Typography>
            </Stack>
          </Stack>
          <Stack direction="column" sx={{ pb: { xs: '5%', lg: '0' } }}>
            <SubscriptionButton subscriptionButtonName="ship-an-item-now" />
            <SubscriptionButton subscriptionButtonName="skip-shipment" />
            <SubscriptionButton subscriptionButtonName="edit-frequency" />
            <SubscriptionButton subscriptionButtonName="edit-order-date" />
            <SubscriptionButton subscriptionButtonName="cancel-an-item" />
            <SubscriptionButton subscriptionButtonName="edit-billing-information" />
            <SubscriptionButton subscriptionButtonName="edit-shipping-address" />
            <SubscriptionButton subscriptionButtonName="pause-subscription" />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MySubscriptionTemplate
