import React from 'react'

import { Card, Stack, Typography, CardContent, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ProductItem } from '@/components/common'
import { ConfirmationDialog, EditSubscriptionFrequencyDialog } from '@/components/dialogs'
import { ProductOption } from '@/components/product'
import { useModalContext, useSnackbarContext } from '@/context'
import { useSkipNextSubscriptionMutation, useOrderSubscriptionNowMutation } from '@/hooks'
import { subscriptionGetters, productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'

import type { CrProduct, Subscription, SbSubscriptionItem } from '@/lib/gql/types'

interface SubscriptionItemProps {
  subscriptionDetailsData: Subscription
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
    height: {
      xs: '20%',
      sm: '30%',
      lg: '50%',
    },
    mt: '5%',
    ml: '0.5%',
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

const SubscriptionItem = (props: SubscriptionItemProps) => {
  const { subscriptionDetailsData } = props

  const { getProductLink } = uiHelpers()
  const { t } = useTranslation('common')
  const { showModal } = useModalContext()
  const { showSnackbar } = useSnackbarContext()

  const skipNextSubscription = useSkipNextSubscriptionMutation()
  const { orderSubscriptionNow } = useOrderSubscriptionNowMutation()

  const handleEditFrequency = (subscriptionId: string, subscriptionItems: SbSubscriptionItem[]) => {
    const values = subscriptionGetters.getFrequencyValues(subscriptionItems[0].product)

    showModal({
      Component: EditSubscriptionFrequencyDialog,
      props: { subscriptionId: subscriptionId, values: values },
    })
  }

  const handleShipItemNow = (param: { id: string }) => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        onConfirm: () =>
          orderSubscriptionNow.mutateAsync({
            subscriptionId: param.id,
          }),
        contentText: t('place-an-order-of-this-subscription-now'),
        primaryButtonText: t('confirm'),
      },
    })
  }

  const handleSkipNextSubscription = (subscriptionId: string) => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        onConfirm: () => confirmSkipNextSubscription(subscriptionId),
        contentText: t('skip-next-subscription-confirmation'),
        primaryButtonText: t('Yes'),
      },
    })
  }

  const confirmSkipNextSubscription = async (subscriptionId: string) => {
    try {
      const skipSubscriptionResponse = await skipNextSubscription.mutateAsync(
        subscriptionId as string
      )
      if (skipSubscriptionResponse?.id) {
        const { nextOrderDate } =
          subscriptionGetters.getSubscriptionDetails(skipSubscriptionResponse)
        showSnackbar(t('next-order-skip') + nextOrderDate, 'success')
      }
      return false
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Card sx={{ ...style.card }}>
      <CardContent sx={{ bgcolor: 'grey.100' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: '0', md: '5' }}
          justifyContent={'space-between'}
        >
          <Stack direction="column">
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {subscriptionGetters.getSubscriberName(subscriptionDetailsData)}
            </Typography>
            <Typography variant="h4">
              {subscriptionGetters.getSubscriberAddress(subscriptionDetailsData)}
            </Typography>
          </Stack>
          <Stack direction="column" sx={{ ...style.subscriptionNumber }}>
            <Stack direction="row">
              <ProductOption
                option={{
                  name: t('subscription-number'),
                  value: subscriptionGetters.getSubscriptionNumber(subscriptionDetailsData),
                }}
                variant="h4"
                align="right"
              />
            </Stack>
            <Stack direction="row" sx={{ xs: { pl: '0' } }}>
              <ProductOption
                option={{
                  name: t('status'),
                  value: subscriptionGetters.getSubscriptionStatus(subscriptionDetailsData),
                }}
                variant="h4"
                align="right"
              />
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <CardContent>
        <Stack direction={{ xs: 'column-reverse', md: 'row' }} sx={{ ...style.subscriptionItem }}>
          <Stack direction="column" sx={{ pt: { xs: '5 %' } }}>
            <Stack direction="row" sx={{ mt: { md: '3%' } }}>
              {subscriptionDetailsData?.items &&
                subscriptionDetailsData?.items?.map((subscribedProductItem) => (
                  <ProductItem
                    key={subscribedProductItem?.id as string}
                    image={productGetters.handleProtocolRelativeUrl(
                      productGetters.getProductImage(subscribedProductItem?.product as CrProduct)
                    )}
                    name={productGetters.getName(subscribedProductItem?.product as CrProduct)}
                    options={productGetters.getOptions(subscribedProductItem?.product as CrProduct)}
                    link={getProductLink(subscribedProductItem?.product?.productCode as string)}
                  />
                ))}
            </Stack>
            <Stack direction="row">
              <Typography sx={{ pr: { xs: '5%', md: '20%' } }}>
                {t('shipment-frequency')}
              </Typography>
              <Typography fontWeight="bold" pl="6%" sx={{ display: 'flex' }}>
                {subscriptionGetters.getSubscriptionFrequency(subscriptionDetailsData)}
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography>{t('estimated-next-arrival-date')}</Typography>
              <Typography sx={{ fontWeight: 'bold', pl: '10px' }}>
                {subscriptionGetters.nextOrderItemDate(subscriptionDetailsData)}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            sx={{
              pb: { xs: '5%', lg: '0' },
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Stack direction={{ xs: 'column', md: 'column', lg: 'column' }} ml="2%">
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...style.button }}
                onClick={() => handleShipItemNow({ id: subscriptionDetailsData?.id as string })}
              >
                {t('ship-an-item-now')}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...style.button }}
                onClick={() => handleSkipNextSubscription(subscriptionDetailsData?.id as string)}
              >
                {t('skip-shipment')}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...style.button }}
                onClick={() =>
                  handleEditFrequency(
                    subscriptionDetailsData?.id as string,
                    subscriptionDetailsData?.items as SbSubscriptionItem[]
                  )
                }
              >
                {t('edit-frequency')}
              </Button>
              <Button variant="contained" color="secondary" sx={{ ...style.button }}>
                {t('edit-order-date')}
              </Button>
            </Stack>
            <Stack direction={{ xs: 'column', md: 'column', lg: 'column' }} ml="2%">
              <Button variant="contained" color="secondary" sx={{ ...style.button }}>
                {t('cancel-an-item')}
              </Button>
              <Button variant="contained" color="secondary" sx={{ ...style.button }}>
                {t('edit-billing-information')}
              </Button>
              <Button variant="contained" color="secondary" sx={{ ...style.button }}>
                {t('edit-shipping-address')}
              </Button>
              <Button variant="contained" color="secondary" sx={{ ...style.button }}>
                {t('pause-subscription')}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SubscriptionItem
