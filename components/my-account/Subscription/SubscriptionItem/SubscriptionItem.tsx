import React, { useEffect, useState } from 'react'

import {
  Card,
  Stack,
  Typography,
  CardContent,
  Button,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import Popover from '@mui/material/Popover'
import { useTranslation } from 'next-i18next'

import { ProductItem, KiboSelect } from '@/components/common'
import {
  ConfirmationDialog,
  EditSubscriptionFrequencyDialog,
  EditOrderDateDialog,
  EditBillingAddress,
  AddressFormDialog,
} from '@/components/dialogs'
import { ProductOption } from '@/components/product'
import { useModalContext, useSnackbarContext, useAuthContext } from '@/context'
import {
  useSkipNextSubscriptionMutation,
  useOrderSubscriptionNowMutation,
  useEditSubscriptionFrequencyMutation,
  useUpdateSubscriptionNextOrderDateMutation,
  useUpdateSubscriptionFulfillmentInfoMutation,
  useUpdateSubscriptionPaymentMutation,
  useCustomerCardsQueries,
  useCustomerContactsQueries,
  useCreateCustomerCardsMutation,
  useCreateCustomerAddressMutation,
  usePerformSubscriptionActionMutation,
  useDeleteSubscriptionMutation,
} from '@/hooks'
import { subscriptionGetters, productGetters, userGetters } from '@/lib/getters'
import {
  uiHelpers,
  buildSubscriptionFulfillmentInfoParams,
  buildUpdateSubscriptionPaymentParams,
  buildPauseSubscriptionParams,
  buildCancelSubscriptionParams,
} from '@/lib/helpers'
import type {
  Address,
  FulfillmentInfo,
  BillingInfo,
  PaymentAndBilling,
  SavedCard,
  BillingAddress,
  CardType,
} from '@/lib/types'

import type {
  CrProduct,
  Subscription,
  SbContact,
  Card as CardGqlType,
  CustomerContact,
  CustomerAccount,
} from '@/lib/gql/types'

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

  const [shippingAnchorEl, setShippingAnchorEl] = useState<HTMLButtonElement | undefined>(undefined)
  const [shippingAddress, setShippingAddress] = useState<FulfillmentInfo | undefined>(undefined)

  const [billingAnchorEl, setBillingAnchorEl] = useState<HTMLButtonElement | undefined>(undefined)
  const [billingAddress, setBillingAddress] = useState<BillingInfo | undefined>(undefined)

  const { user } = useAuthContext()

  const { getProductLink } = uiHelpers()
  const { t } = useTranslation('common')

  const { showModal, closeModal } = useModalContext()
  const { showSnackbar } = useSnackbarContext()

  const { orderSubscriptionNow } = useOrderSubscriptionNowMutation()
  const { skipNextSubscription } = useSkipNextSubscriptionMutation()
  const { performSubscriptionActionMutation } = usePerformSubscriptionActionMutation()
  const { editSubscriptionFrequencyMutation } = useEditSubscriptionFrequencyMutation()
  const { deleteSubscription } = useDeleteSubscriptionMutation()
  const { updateSubscriptionNextOrderDateMutation } = useUpdateSubscriptionNextOrderDateMutation()
  const { updateSubscriptionFulfillmentInfoMutation } =
    useUpdateSubscriptionFulfillmentInfoMutation()
  const { updateSubscriptionPaymentMutation } = useUpdateSubscriptionPaymentMutation()
  const { data: cards } = useCustomerCardsQueries(user?.id as number)
  const { data: contacts } = useCustomerContactsQueries(user?.id as number)
  const { addSavedCardDetails } = useCreateCustomerCardsMutation()
  const { addSavedAddressDetails } = useCreateCustomerAddressMutation()

  const Theme = useTheme()
  const mobileView = useMediaQuery(Theme.breakpoints.down('md'))

  const handleShowDialog = (component: any, params: any) => {
    setShippingAnchorEl(undefined)
    setBillingAnchorEl(undefined)

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
  const confirmDeleteSubscription = async (subscriptionId: string, subscriptionItemId: string) => {
    const params = buildCancelSubscriptionParams(subscriptionId, subscriptionItemId)
    await deleteSubscription.mutateAsync(params)
    closeModal()
    showSnackbar(t('subscription-cancelled-successfully'), 'success')
  }

  // Edit Billing Information
  const isBillingPopupOpen = Boolean(billingAnchorEl)
  const billingPopupId = isBillingPopupOpen ? 'simple-billing-popover' : undefined

  const savedCardsAndContacts = userGetters.getSavedCardsAndBillingDetails(cards, contacts)
  const savedCards = savedCardsAndContacts?.map((card: PaymentAndBilling) =>
    subscriptionGetters.getFormattedBillingAddress(t('card-ending-in'), card)
  )

  const handleBillingPopupOpen = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setBillingAnchorEl(event.currentTarget)
  }

  const handleBillingPopupClose = () => setBillingAnchorEl(undefined)

  const saveCard = async (contact: SbContact | CustomerContact, card: SavedCard | CardGqlType) => {
    const params = buildUpdateSubscriptionPaymentParams(
      user as CustomerAccount,
      subscriptionDetailsData,
      contact,
      card
    )

    await updateSubscriptionPaymentMutation.mutateAsync(params)
    closeModal()
    showSnackbar(t('address-updated-successfully'), 'success')
  }

  const handleAddNewCard = async (address: BillingAddress, card: CardType) => {
    // Add address
    const addressResponse = await addSavedAddressDetails.mutateAsync(address)

    const params = {
      accountId: card.accountId,
      cardId: card.cardId,
      cardInput: card.cardInput,
    }
    params.cardInput.contactId = addressResponse.id

    // Add card
    const cardResponse = await addSavedCardDetails.mutateAsync(params)
    await saveCard(addressResponse, cardResponse)
  }

  const handleUpdateCard = (selectedValue: string) => {
    const selectedCard = savedCards.find(
      (card) => card?.formattedAddress === selectedValue
    ) as BillingInfo

    const card = selectedCard?.cardInfo
    const contact = selectedCard?.billingAddressInfo

    if (contact) {
      saveCard(contact, card as SavedCard)
      setBillingAnchorEl(undefined)
      showSnackbar(t('address-updated-successfully'), 'success')
    }
  }

  const setCurrentCardAsDefault = () => {
    const currentCardId = subscriptionDetailsData?.payment?.billingInfo?.card?.paymentServiceCardId
    const currentCard = savedCards.find((card) => card.cardInfo?.id === currentCardId)

    if (currentCard) setBillingAddress(currentCard as BillingInfo)
  }

  const handleCloseModal = () => closeModal()

  // Edit Shipping Address
  const isShippingPopupOpen = Boolean(shippingAnchorEl)
  const shippingPopupId = isShippingPopupOpen ? 'simple-shipping-popover' : undefined

  const handleShippingPopupOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShippingAnchorEl(event.currentTarget)
  }

  const handleShippingPopupClose = () => {
    setShippingAnchorEl(undefined)
  }

  const saveShippingAddress = async (data: Address) => {
    const params = buildSubscriptionFulfillmentInfoParams(subscriptionDetailsData, data)
    await updateSubscriptionFulfillmentInfoMutation.mutateAsync(params)

    closeModal()
    showSnackbar(t('address-updated-successfully'), 'success')
  }

  // Pause Subscription
  const confirmPauseSubscription = async (subscriptionId: string) => {
    const params = buildPauseSubscriptionParams(subscriptionId)
    await performSubscriptionActionMutation.mutateAsync(params)
    showSnackbar(t('subscription-paused'), 'success')
  }
  const handleAddNewShippingAddress = async (data: Address) => saveShippingAddress(data)

  const handleUpdateShippingAddress = async (selectedValue: string) => {
    const selectedAddress = fulfillmentInfoList.find(
      (item) => item.formattedAddress === selectedValue
    )
    const contact = selectedAddress?.fulfillmentContact

    if (contact) {
      await saveShippingAddress({ contact } as Address)
      setShippingAnchorEl(undefined)
      showSnackbar(t('address-updated-successfully'), 'success')
    }
  }

  const setCurrentShippingAddressAsDefault = () => {
    const currentShippingAddress = subscriptionGetters.getFormattedAddress(subscriptionDetailsData)
    if (currentShippingAddress) setShippingAddress(currentShippingAddress)
  }

  // Pause Subscription
  useEffect(() => {
    setCurrentCardAsDefault()
    setCurrentShippingAddressAsDefault()
  }, [])
  useEffect(() => setCurrentCardAsDefault(), [subscriptionDetailsData?.payment])
  useEffect(() => setCurrentShippingAddressAsDefault(), [subscriptionDetailsData?.fulfillmentInfo])

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
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...style.button }}
                onClick={() =>
                  handleShowDialog(ConfirmationDialog, {
                    contentText: t('cancel-subscription-confirmation'),
                    primaryButtonText: t('yes'),
                    onConfirm: confirmDeleteSubscription,
                  })
                }
              >
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
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...style.button }}
                onClick={handleBillingPopupOpen}
              >
                {t('edit-billing-information')}
              </Button>

              <Popover
                id={billingPopupId}
                open={isBillingPopupOpen}
                anchorEl={billingAnchorEl}
                onClose={handleBillingPopupClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div style={{ padding: '20px' }}>
                  <KiboSelect
                    name="billingAddress"
                    onChange={(name: string, value: string) => handleUpdateCard(value)}
                    placeholder={t('select-billing-address')}
                    value={billingAddress?.formattedAddress}
                    disabled={updateSubscriptionPaymentMutation.isLoading}
                  >
                    {savedCards?.map((card) => {
                      return (
                        <MenuItem
                          key={card.formattedAddress}
                          value={`${card.formattedAddress}`}
                          sx={{ fontSize: mobileView ? '0.75rem' : '1rem' }}
                        >
                          {card.formattedAddress}
                        </MenuItem>
                      )
                    })}
                  </KiboSelect>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ ...style.button }}
                    onClick={() =>
                      handleShowDialog(EditBillingAddress, {
                        user,
                        cards,
                        contacts,
                        onSave: handleAddNewCard,
                        onClose: handleCloseModal,
                      })
                    }
                    disabled={updateSubscriptionPaymentMutation.isLoading}
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
                onClick={handleShippingPopupOpen}
              >
                {t('edit-shipping-address')}
              </Button>

              <Popover
                id={shippingPopupId}
                open={isShippingPopupOpen}
                anchorEl={shippingAnchorEl}
                onClose={handleShippingPopupClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div style={{ padding: '20px' }}>
                  <KiboSelect
                    name="shippingAddress"
                    onChange={(name: string, value: string) => handleUpdateShippingAddress(value)}
                    placeholder={t('select-shipping-address')}
                    value={shippingAddress?.formattedAddress}
                    disabled={updateSubscriptionFulfillmentInfoMutation.isLoading}
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
                        onSaveAddress: handleAddNewShippingAddress,
                      })
                    }
                    disabled={updateSubscriptionFulfillmentInfoMutation.isLoading}
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
