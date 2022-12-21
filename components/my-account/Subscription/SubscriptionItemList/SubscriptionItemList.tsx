import React from 'react'

import { Card, Stack, Typography, CardContent, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ProductItem } from '@/components/common'
import { ConfirmationDialog } from '@/components/dialogs'
import { ProductOption } from '@/components/product'
import { useModalContext } from '@/context'
import { useOrderSubscriptionNowMutation } from '@/hooks'
import { subscriptionGetters, productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'

import type { CrProduct, Subscription, SubscriptionCollection } from '@/lib/gql/types'

interface SubscriptionItemListProps {
  subscriptionDetailsData: SubscriptionCollection
}

interface SubscriptionButtonProps {
  subscriptionButtonName: string

  // use param as object
  handleButtonClick: (param?: any) => void
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
  const { subscriptionButtonName, handleButtonClick } = props
  const { t } = useTranslation('common')

  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{ ...style.button }}
      onClick={handleButtonClick}
    >
      {t(subscriptionButtonName)}
    </Button>
  )
}

const SubscriptionItemList = (props: SubscriptionItemListProps) => {
  const { subscriptionDetailsData: subscriptionDetails } = props

  const { orderSubscriptionNow } = useOrderSubscriptionNowMutation()

  const { getProductLink } = uiHelpers()
  const { t } = useTranslation('common')
  const { showModal } = useModalContext()

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

  return (
    <>
      {subscriptionDetails?.totalCount > 0 &&
        subscriptionDetails?.items?.map((subscriptionItemData) => (
          <Card key={subscriptionItemData?.id as string} sx={{ ...style.card }}>
            <CardContent sx={{ bgcolor: 'grey.100' }}>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: '0', md: '5' }}
                justifyContent={'space-between'}
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
                    <ProductOption
                      option={{
                        name: t('subscription-number'),
                        value: subscriptionGetters.getSubscriptionNumber(
                          subscriptionItemData as Subscription
                        ),
                      }}
                      variant="h4"
                      align="right"
                    />
                  </Stack>
                  <Stack direction="row" sx={{ xs: { pl: '0' } }}>
                    <ProductOption
                      option={{
                        name: t('status'),
                        value: subscriptionGetters.getSubscriptionStatus(
                          subscriptionItemData as Subscription
                        ),
                      }}
                      variant="h4"
                      align="right"
                    />
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
                          link={getProductLink(
                            subscribedProductItem?.product?.productCode as string
                          )}
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
                  <SubscriptionButton
                    subscriptionButtonName="ship-an-item-now"
                    handleButtonClick={() =>
                      handleShipItemNow({ id: subscriptionItemData?.id as string })
                    }
                  />
                  <SubscriptionButton
                    subscriptionButtonName="skip-shipment"
                    handleButtonClick={() => null}
                  />
                  <SubscriptionButton
                    subscriptionButtonName="edit-frequency"
                    handleButtonClick={() => null}
                  />
                  <SubscriptionButton
                    subscriptionButtonName="edit-order-date"
                    handleButtonClick={() => null}
                  />
                  <SubscriptionButton
                    subscriptionButtonName="cancel-an-item"
                    handleButtonClick={() => null}
                  />
                  <SubscriptionButton
                    subscriptionButtonName="edit-billing-information"
                    handleButtonClick={() => null}
                  />
                  <SubscriptionButton
                    subscriptionButtonName="edit-shipping-address"
                    handleButtonClick={() => null}
                  />
                  <SubscriptionButton
                    subscriptionButtonName="pause-subscription"
                    handleButtonClick={() => null}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      {subscriptionDetails?.totalCount === 0 && (
        <Typography>{t('no-subscription-message')}</Typography>
      )}
    </>
  )
}

export default SubscriptionItemList
