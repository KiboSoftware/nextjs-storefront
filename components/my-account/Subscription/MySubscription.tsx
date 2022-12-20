import React from 'react'

import { ArrowBackIos } from '@mui/icons-material'
import { Card, Stack, Typography, CardContent, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ProductItem } from '@/components/common'
import { useSubscriptionsQueries } from '@/hooks'
import { subscriptionGetters, productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'

import type { CrProduct, Subscription } from '@/lib/gql/types'

interface SubscriptionProps {
  onAccountTitleClick: () => void
}

interface SubscriptionButtonProps {
  subscriptionButtonName: string
}

const style = {
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
  },
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
    mt: '1%',
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

const MySubscription = (props: SubscriptionProps) => {
  const { onAccountTitleClick } = props

  const { data: subscriptionDetails } = useSubscriptionsQueries()

  const { getProductLink } = uiHelpers()
  const { t } = useTranslation('common')

  const handleAccountTitleClick = () => onAccountTitleClick()

  return (
    <>
      <Stack sx={{ mt: '2%' }}>
        <Stack sx={style.wrapIcon} direction="row" gap={2} onClick={handleAccountTitleClick}>
          <ArrowBackIos fontSize="inherit" sx={style.wrapIcon} />
          <Typography variant="body2">{t('my-account')}</Typography>
        </Stack>
        <Stack sx={{ py: '1.2rem' }}>
          <Typography variant="h1">{t('my-subscription')}</Typography>
        </Stack>
      </Stack>
      {subscriptionDetails?.items?.map((subscriptionItemData) => (
        <Card key={subscriptionItemData?.id as string} sx={{ ...style.card }}>
          <CardContent sx={{ bgcolor: 'grey.100' }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: '0', md: '5' }}
              sx={{ justifyContent: 'space-between' }}
            >
              <Stack direction="column">
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {subscriptionGetters.getSubscriberName(subscriptionItemData as Subscription)}
                </Typography>
                <Typography variant="h4">
                  {subscriptionGetters.getSubscriberAddress(subscriptionItemData as Subscription)}
                </Typography>
              </Stack>
              <Stack direction="column" sx={{ ...style.subscriptionNumber }}>
                <Stack direction="row">
                  <Typography variant="h4" align="right" sx={{ fontWeight: 'bold' }}>
                    {t('subscription-number')}
                  </Typography>
                  <Typography variant="h4" align="right">
                    {subscriptionGetters.getSubscriptionNumber(
                      subscriptionItemData as Subscription
                    )}
                  </Typography>
                </Stack>
                <Stack direction="row" sx={{ xs: { pl: '0' } }}>
                  <Typography variant="h4" align="right" sx={{ fontWeight: 'bold' }}>
                    {t('status')}
                  </Typography>
                  <Typography variant="h4" align="right" sx={{ pl: '2%' }}>
                    {subscriptionGetters.getSubscriptionStatus(
                      subscriptionItemData as Subscription
                    )}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
          <CardContent>
            <Stack
              direction={{ xs: 'column-reverse', md: 'row' }}
              sx={{ ...style.subscriptionItem }}
            >
              <Stack direction="column" sx={{ pt: { xs: '5 %' } }}>
                <Stack direction="row" sx={{ mt: { md: '3%' } }}>
                  {subscriptionItemData?.items &&
                    subscriptionItemData?.items?.map((subscribedProductItem) => (
                      <ProductItem
                        key={subscribedProductItem?.id as string}
                        image={productGetters.handleProtocolRelativeUrl(
                          productGetters.getProductImage(
                            subscribedProductItem?.product as CrProduct
                          )
                        )}
                        name={productGetters.getName(subscribedProductItem?.product as CrProduct)}
                        options={productGetters.getOptions(
                          subscribedProductItem?.product as CrProduct
                        )}
                        link={getProductLink(subscribedProductItem?.product?.productCode as string)}
                      />
                    ))}
                </Stack>
                <Stack direction="row">
                  <Typography sx={{ pr: { xs: '5%', md: '20%' } }}>
                    {t('shipment-frequency')}
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold', display: 'flex', pl: '6%' }}>
                    {subscriptionGetters.getSubscriptionFrequency(
                      subscriptionItemData as Subscription
                    )}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography>{t('estimated-next-arrival-date')}</Typography>
                  <Typography sx={{ fontWeight: 'bold', pl: '10px' }}>
                    {subscriptionGetters.nextOrderItemDate(subscriptionItemData as Subscription)}
                  </Typography>
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
      ))}
    </>
  )
}

export default MySubscription
