import React, { useEffect, useState } from 'react'

import { Card, Stack, Typography, CardContent, Button, MenuItem } from '@mui/material'
import Popover from '@mui/material/Popover'
import { useTranslation } from 'next-i18next'

import { ProductItem, KiboSelect } from '@/components/common'
import {
  ConfirmationDialog,
  EditSubscriptionFrequencyDialog,
  EditOrderDateDialog,
  AddressFormDialog,
} from '@/components/dialogs'
import { ProductOption } from '@/components/product'
import { useModalContext, useSnackbarContext } from '@/context'
import {
  useSkipNextSubscriptionMutation,
  useOrderSubscriptionNowMutation,
  useEditSubscriptionFrequencyMutation,
  useUpdateSubscriptionNextOrderDateMutation,
  useUpdateSubscriptionFulfillmentInfoMutation,
  usePerformSubscriptionActionMutation,
} from '@/hooks'
import { subscriptionGetters, productGetters } from '@/lib/getters'
import { uiHelpers, buildSubscriptionFulfillmentInfoParams } from '@/lib/helpers'
import type { Address, FulfillmentInfo } from '@/lib/types'

import type { CrProduct, Subscription } from '@/lib/gql/types'

interface SubscriptionItemProps {
  subscriptionDetailsData: Subscription
  fulfillmentInfoList: FulfillmentInfo[]
}

const style = {
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    mt: '5%',
    ml: '0.5%',
    px: {
      xs: 1,
      sm: 4,
    },
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
  const { subscriptionDetailsData, fulfillmentInfoList } = props

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | undefined>(undefined)
  const [fulfillmentInfo, setFulfillmentInfo] = useState<FulfillmentInfo | undefined>(undefined)

  const { getProductLink } = uiHelpers()
  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()
  const { showSnackbar } = useSnackbarContext()

  const { orderSubscriptionNow } = useOrderSubscriptionNowMutation()
  const { skipNextSubscription } = useSkipNextSubscriptionMutation()
  const { performSubscriptionActionMutation } = usePerformSubscriptionActionMutation()
  const { editSubscriptionFrequencyMutation } = useEditSubscriptionFrequencyMutation()
  const { updateSubscriptionNextOrderDateMutation } = useUpdateSubscriptionNextOrderDateMutation()
  const { updateSubscriptionFulfillmentInfoMutation } =
    useUpdateSubscriptionFulfillmentInfoMutation()

  const handleShowDialog = (component: any, params: any) => {
    setAnchorEl(undefined)

    showModal({
      Component: component,
      props: { ...params },
    })
  }

  // Ship An Item Now
  const handleShipItemNow = async () => {
    await orderSubscriptionNow.mutateAsync({ subscriptionId: subscriptionDetailsData.id as string })
    closeModal()
    showSnackbar(t('item-ordered-successfully'), 'success')
  }

  // Skip Shipment
  const confirmSkipNextSubscription = async () => {
    const skipSubscriptionResponse = await skipNextSubscription.mutateAsync(
      subscriptionDetailsData.id as string
    )

    if (skipSubscriptionResponse?.id) {
      const { nextOrderDate } = subscriptionGetters.getSubscriptionDetails(skipSubscriptionResponse)
      showSnackbar(t('next-order-skip') + nextOrderDate, 'success')
    }
  }

  // Edit Frequency
  const frequencyValues = subscriptionGetters.getFrequencyValues(
    subscriptionDetailsData &&
      subscriptionDetailsData.items &&
      subscriptionDetailsData.items[0] &&
      subscriptionDetailsData.items[0].product
  )

  const handleFrequencySave = async (params: any) => {
    await editSubscriptionFrequencyMutation.mutateAsync(params)
    closeModal()
    showSnackbar(t('subscription-frequency-updated-successfully'), 'success')
  }

  // Edit Order Date
  const handleOrderDateUpdate = async (subscriptionId: string, orderDate: string) => {
    const params = {
      subscriptionId: subscriptionId,
      subscriptionNextOrderDateInput: {
        nextOrderDate: orderDate,
      },
    }

    await updateSubscriptionNextOrderDateMutation.mutateAsync(params)
    closeModal()
    showSnackbar(t('next-order-date') + orderDate, 'success')
  }

  // Cancel An Item
  // Edit Billing Information

  // Edit Shipping Address
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handlePopupOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopupClose = () => {
    setAnchorEl(undefined)
  }

  const handleAddNewAddress = async (data: Address) => {
    const params = buildSubscriptionFulfillmentInfoParams(subscriptionDetailsData, data)
    await updateSubscriptionFulfillmentInfoMutation.mutateAsync(params)

    closeModal()
    showSnackbar(t('address-updated-successfully'), 'success')
  }

  // Pause Subscription
  const confirmPauseSubscription = async (subscriptionId: string) => {
    const params = {
      subscriptionId: subscriptionId,
      subscriptionActionInput: {
        actionName: 'Pause',
        reasons: {
          actionName: 'Pause',
        },
      },
    }
    const pauseSubscriptionResponse = await performSubscriptionActionMutation.mutateAsync(params)
    showSnackbar(t('subscription-paused'), 'success')
  }

  useEffect(() => {
    const updateAddress = async () => {
      const contact = fulfillmentInfo?.fulfillmentContact

      if (contact) {
        await handleAddNewAddress({ contact } as Address)
        setAnchorEl(undefined)
        showSnackbar(t('address-updated-successfully'), 'success')
      }
    }

    updateAddress()
  }, [fulfillmentInfo])

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
            direction="column"
            sx={{
              pb: { xs: '5%', lg: '0' },
              justifyContent: 'flex-end',
            }}
          >
            <Stack direction={'row'} sx={{ whiteSpace: 'nowrap' }} gap={2}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...style.button }}
                onClick={() =>
                  handleShowDialog(ConfirmationDialog, {
                    contentText: t('place-an-order-of-this-subscription-now'),
                    primaryButtonText: t('confirm'),
                    onConfirm: handleShipItemNow,
                  })
                }
              >
                {t('ship-an-item-now')}
              </Button>
              <Button variant="contained" color="secondary" sx={{ ...style.button }}>
                {t('cancel-an-item')}
              </Button>
            </Stack>
            <Stack direction={'row'} sx={{ whiteSpace: 'nowrap' }} gap={2}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...style.button }}
                onClick={() =>
                  handleShowDialog(ConfirmationDialog, {
                    contentText: t('skip-next-subscription-confirmation'),
                    primaryButtonText: t('yes'),
                    onConfirm: confirmSkipNextSubscription,
                  })
                }
              >
                {t('skip-shipment')}
              </Button>
              <Button variant="contained" color="secondary" sx={{ ...style.button }}>
                {t('edit-billing-information')}
              </Button>
            </Stack>
            <Stack direction={'row'} sx={{ whiteSpace: 'nowrap' }} gap={2}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...style.button }}
                onClick={() =>
                  handleShowDialog(EditSubscriptionFrequencyDialog, {
                    subscriptionId: subscriptionDetailsData?.id as string,
                    values: frequencyValues,
                    onFrequencySave: handleFrequencySave,
                    onClose: () => closeModal(),
                  })
                }
              >
                {t('edit-frequency')}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...style.button }}
                onClick={handlePopupOpen}
              >
                {t('edit-shipping-address')}
              </Button>

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopupClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div style={{ padding: '20px' }}>
                  <KiboSelect
                    name="shippingAddress"
                    onChange={(name: string, value: string) =>
                      setFulfillmentInfo(
                        fulfillmentInfoList.find((item) => item.formattedAddress === value)
                      )
                    }
                    placeholder={t('select-shipping-address')}
                    value={fulfillmentInfo?.formattedAddress}
                  >
                    {fulfillmentInfoList?.map((item) => {
                      return (
                        <MenuItem key={item.formattedAddress} value={`${item.formattedAddress}`}>
                          {item.formattedAddress}
                        </MenuItem>
                      )
                    })}
                  </KiboSelect>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ ...style.button }}
                    onClick={() =>
                      handleShowDialog(AddressFormDialog, {
                        subscriptionId: subscriptionDetailsData?.id as string,
                        isUserLoggedIn: true,
                        setAutoFocus: true,
                        onSaveAddress: handleAddNewAddress,
                      })
                    }
                  >
                    {t('add-new-address')}
                  </Button>
                </div>
              </Popover>
            </Stack>
            <Stack direction={'row'} sx={{ whiteSpace: 'nowrap' }} gap={2}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...style.button }}
                onClick={() =>
                  handleShowDialog(EditOrderDateDialog, {
                    subscriptionId: subscriptionDetailsData?.id as string,
                    orderDate: subscriptionGetters.nextOrderItemDate(subscriptionDetailsData),
                    onOrderDateUpdate: handleOrderDateUpdate,
                    onClose: () => closeModal(),
                  })
                }
              >
                {t('edit-order-date')}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...style.button }}
                onClick={() =>
                  handleShowDialog(ConfirmationDialog, {
                    contentText: t('pause-subscription-confirmation'),
                    primaryButtonText: t('yes'),
                    onConfirm: confirmPauseSubscription,
                    onClose: () => closeModal(),
                  })
                }
              >
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
