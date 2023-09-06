import React, { useCallback, useEffect, useState, useRef } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { FiberManualRecord } from '@mui/icons-material'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import { LoadingButton } from '@mui/lab'
import {
  Stack,
  Typography,
  Box,
  Grid,
  useMediaQuery,
  Theme,
  InputLabel,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { quoteDetailsTemplateStyles } from './QuoteDetailsTemplate.style'
import {
  B2BProductDetailsTable,
  B2BProductSearch,
  OrderSummaryEditable,
  QuotesCommentThread,
  QuotesHistory,
} from '@/components/b2b'
import AccessWrapper from '@/components/b2b/AccessWrapper/AccessWrapper'
import { CartItemList } from '@/components/cart'
import { ShippingMethod } from '@/components/checkout'
import { AddressCard, AddressForm, KiboRadio, KiboTextBox } from '@/components/common'
import {
  ConfirmationDialog,
  QuoteCommentThreadDialog,
  QuotesHistoryDialog,
} from '@/components/dialogs'
import { useAuthContext, useModalContext } from '@/context'
import {
  useGetPurchaseLocation,
  useGetStoreLocations,
  useProductCardActions,
  useGetB2BUserQueries,
  useDeleteQuoteItem,
  useGetCustomerAddresses,
  useGetQuoteShippingMethods,
  useValidateCustomerAddress,
  useUpdateQuoteFulfillmentInfo,
  useCreateCustomerAddress,
  useUpdateQuoteAdjustments,
  useDeleteQuote,
  useInitiateOrder,
  useUpdateQuote,
  useAddQuoteComment,
} from '@/hooks'
import { useQuoteActions } from '@/hooks/custom/useQuoteActions/useQuoteActions'
import {
  AddressType,
  B2BRoles,
  DefaultId,
  FulfillmentOptions as FulfillmentOptionsConstant,
  QuoteStatus,
  StatusColorCode,
} from '@/lib/constants'
import { orderGetters, productGetters, quoteGetters, userGetters } from '@/lib/getters'
import { buildAddressParams } from '@/lib/helpers'
import { Address } from '@/lib/types'

import {
  AuditRecord,
  CrContact,
  CrOrderItem,
  CuAddress,
  CustomerContact,
  Location,
  Quote,
  QuoteComment,
} from '@/lib/gql/types'
export interface QuoteDetailsTemplateProps {
  quote: Quote
  mode?: string
  currentB2BUser: any
  initialB2BUsers: any
  onAccountTitleClick: () => void
}

const schema = yup.object().shape({
  name: yup.string().required('This field is required'),
})

const QuoteDetailsTemplate = (props: QuoteDetailsTemplateProps) => {
  const { quote, mode, initialB2BUsers, currentB2BUser, onAccountTitleClick } = props
  const { showModal } = useModalContext()
  const { t } = useTranslation('common')
  const updateMode = 'ApplyToDraft'
  const draft = true
  const mdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const { user, isAuthenticated } = useAuthContext()
  const roleName = user?.roleName

  const accountName = user?.companyOrOrganization ?? '-'
  const { number, quoteId, status, createdDate, expirationDate } =
    quoteGetters.getQuoteDetails(quote)
  const quoteItems = (quote?.items as CrOrderItem[]) ?? []

  const { data: b2bUserData } = useGetB2BUserQueries({
    accountId: user?.id as number,
    initialB2BUsers,
  })

  const userIdToEmail: { [userId: string]: string } = {}

  b2bUserData?.items?.forEach((item) => {
    userIdToEmail[item?.userId as string] = item?.emailAddress as string
  })

  const createdBy = quoteGetters.getQuoteCreatedBy(
    currentB2BUser?.items?.[0]?.firstName as string,
    currentB2BUser?.items?.[0]?.lastName as string
  )

  const quoteName = quote?.name ?? ''
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })
  const getStatusColorCode = useCallback((status: string) => {
    return StatusColorCode[status]
  }, [])

  const locationCodes = orderGetters.getFulfillmentLocationCodes(quoteItems as any)
  const { data: locations } = useGetStoreLocations({ filter: locationCodes })
  const fulfillmentLocations = locations && Object.keys(locations).length ? locations : []

  const { deleteQuoteItem } = useDeleteQuoteItem()
  const { updateQuote } = useUpdateQuote()
  const { addComment } = useAddQuoteComment()
  const { initiateOrder } = useInitiateOrder()
  const router = useRouter()
  const { data: purchaseLocation } = useGetPurchaseLocation()
  const { openProductQuickViewModal, handleAddToQuote } = useProductCardActions()
  const { handleQuantityUpdate, handleProductPickupLocation, onFulfillmentOptionChange } =
    useQuoteActions({
      quoteId,
      updateMode,
      quoteItems,
      purchaseLocation,
    })
  const { createCustomerAddress } = useCreateCustomerAddress()
  const { validateCustomerAddress } = useValidateCustomerAddress()
  const { updateQuoteAdjustments } = useUpdateQuoteAdjustments()

  const addItemToQuote = async (
    quoteId: string,
    updateMode: string,
    product: any,
    quantity: number
  ) => {
    handleAddToQuote(quoteId, updateMode, product, quantity)
  }
  const [validateForm, setValidateForm] = useState<boolean>(false)
  const [isNewAddressAdded, setIsNewAddressAdded] = useState<boolean>(false)
  const [isAddressFormValid, setIsAddressFormValid] = useState<boolean>(false)
  const [isAddressSavedToAccount, setIsAddressSavedToAccount] = useState<boolean>(false)
  const { data: addressCollection } = useGetCustomerAddresses(user?.id as number)
  const quoteShippingContact = quoteGetters.getQuoteShippingContact(quote)
  const shipItems = quoteGetters.getQuoteShipItems(quote)
  const pickupItems = quoteGetters.getQuotePickupItems(quote)
  const selectedShippingMethodCode = quoteGetters.getQuoteShippingMethodCode(quote)
  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState<number>(
    quoteShippingContact?.id as number
  )
  const { updateQuoteFulfillmentInfo } = useUpdateQuoteFulfillmentInfo()
  const { deleteQuote } = useDeleteQuote({ draft })
  const shouldFetchShippingMethods =
    quoteId && draft && shipItems?.length && selectedShippingAddressId
  const { data: shippingMethods } = useGetQuoteShippingMethods({
    quoteId,
    draft,
    enabled: !!shouldFetchShippingMethods,
  })
  const shippingAddressRef = useRef<HTMLDivElement>(null)

  const isSaveAndExitDisabled = quoteGetters.getSaveAndExitDisabled(
    quote?.name as string,
    quote?.fulfillmentInfo,
    pickupItems
  )

  const userShippingAddress = isAuthenticated
    ? userGetters.getUserShippingAddress(addressCollection?.items as CustomerContact[])
    : []

  const [savedShippingAddresses, setSavedShippingAddresses] = useState<
    CustomerContact[] | undefined
  >(
    userGetters.getAllShippingAddresses(
      quoteShippingContact,
      userShippingAddress as CustomerContact[]
    )
  )
  const showPreviouslySavedAddress = savedShippingAddresses?.length
  const [shouldShowAddAddressButton, setShouldShowAddAddressButton] = useState<boolean>(true)
  const defaultShippingAddress = userGetters.getDefaultShippingAddress(
    savedShippingAddresses as CustomerContact[]
  )
  const previouslySavedShippingAddress = userGetters.getOtherShippingAddress(
    savedShippingAddresses as CustomerContact[],
    defaultShippingAddress?.id as number
  )

  const handleAddProduct = (product: any) => {
    if (productGetters.isVariationProduct(product)) {
      const dialogProps = {
        title: t('product-configuration-options'),
        cancel: t('cancel'),
        addItemToQuote: t('add-item-to-quote'),
        isB2B: true,
      }
      const quoteDetails = {
        quoteId: quoteId,
        updateMode: updateMode,
      }
      openProductQuickViewModal(product, dialogProps, quoteDetails)
    } else {
      const productData = {
        productCode: productGetters.getProductId(product),
        variationProductCode: productGetters.getVariationProductCode(product),
        fulfillmentMethod: FulfillmentOptionsConstant.SHIP,
        purchaseLocationCode: '',
      }
      addItemToQuote(quoteId, updateMode, productData, 1)
    }
  }

  const handleDeleteItem = async (quoteItemId: string) => {
    try {
      showModal({
        Component: ConfirmationDialog,
        props: {
          onConfirm: () => {
            deleteQuoteItem.mutate({ quoteItemId, quoteId, updateMode })
          },
          title: t('remove-item'),
          contentText: t('remove-quote-item-confirmation'),
          primaryButtonText: t('remove-quote-item'),
          showContentTopDivider: true,
          showContentBottomDivider: true,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleAddNewAddress = () => {
    setValidateForm(false)
    setIsNewAddressAdded(false)
    setShouldShowAddAddressButton(false)
  }

  const handleFormStatusChange = (status: boolean) => setIsAddressFormValid(status)
  const handleAddressValidationAndSave = () => setValidateForm(true)

  const handleSaveQuoteName = async (formData: any) => {
    const { name } = formData
    await updateQuote.mutateAsync({ quoteId, name, updateMode })
  }

  const handleSubmitForApproval = async () => {
    try {
      showModal({
        Component: ConfirmationDialog,
        props: {
          onConfirm: () => {
            updateQuote.mutate({
              quoteId,
              updateMode: 'ApplyAndCommit',
              name: quote?.name as string,
            })
            if (updateQuote.isSuccess) router.push('/my-account/b2b/quotes')
          },
          title: t('submit-quote-title'),
          contentText: t('submit-quote-confirmation'),
          primaryButtonText: t('submit-quote'),
          showContentTopDivider: true,
          showContentBottomDivider: true,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleEditQuote = (quoteId: string) => {
    router.push(`/my-account/quote/${quoteId}?mode=edit`)
  }

  const handleSaveAddressToQuote = async ({ contact }: { contact: CrContact }) => {
    try {
      await validateCustomerAddress.mutateAsync({
        addressValidationRequestInput: { address: contact?.address as CuAddress },
      })
      if (isAddressSavedToAccount) {
        await handleSaveAddressToAccount(contact)
      }
      await updateQuoteFulfillmentInfo.mutateAsync({
        quote,
        quoteId,
        contact: { ...contact, id: contact.id || DefaultId.ADDRESSID },
        updateMode,
      })
      setSelectedShippingAddressId((contact?.id as number) || DefaultId.ADDRESSID)
      setShouldShowAddAddressButton(true)
      setValidateForm(false)
      setIsNewAddressAdded(true)
    } catch (error: any) {
      setValidateForm(false)
      console.error(error)
    }
  }

  const handleAddressSelect = (addressId: string) => {
    const selectedAddress = savedShippingAddresses?.find(
      (address) => address?.id === Number(addressId)
    )
    if (selectedAddress?.id) {
      const contact: CrContact = {
        id: selectedAddress?.id,
        firstName: selectedAddress?.firstName || '',
        lastNameOrSurname: selectedAddress?.lastNameOrSurname || '',
        middleNameOrInitial: selectedAddress?.middleNameOrInitial || '',
        email: selectedAddress?.email || '',
        address: {
          ...(selectedAddress?.address as any),
        },
        phoneNumbers: {
          ...(selectedAddress?.phoneNumbers as any),
        },
      }
      handleSaveAddressToQuote({ contact })
    }
  }

  const handleSaveShippingMethod = async (shippingMethodCode: string) => {
    const shippingMethodName = shippingMethods.find(
      (method) => method.shippingMethodCode === shippingMethodCode
    )?.shippingMethodName as string

    try {
      await updateQuoteFulfillmentInfo.mutateAsync({
        quote,
        quoteId,
        updateMode,
        contact: undefined,
        email: undefined,
        shippingMethodCode,
        shippingMethodName,
      })
      shippingAddressRef.current &&
        (shippingAddressRef.current as Element).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    } catch (error) {
      console.error(error)
    }
  }

  const handleSaveAddressToAccount = async (contact: CrContact) => {
    const address = {
      contact: {
        ...contact,
        email: user?.emailAddress as string,
      },
    } as Address

    const params = buildAddressParams({
      accountId: user?.id as number,
      address,
      isDefaultAddress: false,
      addressType: AddressType.SHIPPING,
    })

    await createCustomerAddress.mutateAsync(params)
    setIsAddressSavedToAccount(false)
  }

  const handleUpdateQuoteAdjustments = async (adjustmentValue: {
    adjustment: number
    shippingAdjustment: number
    handlingAdjustment: number
  }) => {
    try {
      const { adjustment, shippingAdjustment, handlingAdjustment } = adjustmentValue
      await updateQuoteAdjustments.mutateAsync({
        quoteId,
        updateMode,
        adjustment,
        shippingAdjustment,
        handlingAdjustment,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddCommentToQuote = async (comment: string) => {
    try {
      await addComment.mutateAsync({
        quoteId,
        updateMode,
        quoteCommentInput: {
          text: comment,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleViewFullCommentThread = async () => {
    try {
      showModal({
        Component: QuoteCommentThreadDialog,
        props: {
          userId: user?.userId,
          comments: quote?.comments?.reverse(),
          userIdAndEmails: userIdToEmail,
          onAddCommentToQuote: handleAddCommentToQuote,
          showContentTopDivider: true,
          showContentBottomDivider: true,
          mode,
          status,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleViewFullCommentHistory = async () => {
    try {
      showModal({
        Component: QuotesHistoryDialog,
        props: {
          auditHistory: quote?.auditHistory?.reverse() as AuditRecord[],
          userIdAndEmails: userIdToEmail,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleClearChanges = async () => {
    try {
      showModal({
        Component: ConfirmationDialog,
        props: {
          onConfirm: () => {
            deleteQuote.mutate({ quoteId, draft })
          },
          title: t('clear-changes'),
          contentText: t('clear-quote-changes-confirmation'),
          primaryButtonText: t('clear-quote-changes'),
          showContentTopDivider: true,
          showContentBottomDivider: true,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleGotoCheckout = async () => {
    try {
      const initiateOrderResponse = await initiateOrder.mutateAsync({
        quoteId,
      })

      if (initiateOrderResponse?.id) {
        router.push(`/checkout/${initiateOrderResponse.id}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    setSavedShippingAddresses(
      userGetters.getAllShippingAddresses(
        quoteShippingContact,
        userShippingAddress as CustomerContact[]
      )
    )
  }, [JSON.stringify(quoteShippingContact), JSON.stringify(userShippingAddress), isNewAddressAdded])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack sx={quoteDetailsTemplateStyles.wrapIcon} direction="row" gap={2}>
            <Box sx={{ display: 'flex' }} onClick={onAccountTitleClick}>
              <ArrowBackIos fontSize="inherit" sx={quoteDetailsTemplateStyles.wrapIcon} />
              {mdScreen && <Typography variant="body2">{t('quotes')}</Typography>}
            </Box>
            {!mdScreen && (
              <Box sx={quoteDetailsTemplateStyles.createNewQuoteTextBox}>
                {mode === 'create' ? (
                  <Typography variant="h2" sx={quoteDetailsTemplateStyles.createNewQuoteText}>
                    {t('create-a-quote')}
                  </Typography>
                ) : (
                  <Typography variant="h2" sx={quoteDetailsTemplateStyles.createNewQuoteText}>
                    {quoteName}
                  </Typography>
                )}
              </Box>
            )}
          </Stack>
        </Grid>
        {mdScreen && (
          <Grid item xs={12} sm={6}>
            <Box>
              {mode === 'create' ? (
                <Typography variant="h1">{t('create-a-quote')}</Typography>
              ) : (
                <Typography variant="h1">{quoteName}</Typography>
              )}
            </Box>
          </Grid>
        )}
        <Grid item sm={6} display={'flex'} justifyContent={'flex-end'}>
          {mdScreen ? (
            <Stack direction="row" gap={2}>
              <AccessWrapper name="QuoteClearChanges" quoteMode={mode}>
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  disabled={
                    status?.toLowerCase() === 'inreview' ||
                    roleName === B2BRoles.NON_PURCHASER ||
                    !(quote?.hasDraft as boolean)
                  }
                  onClick={handleClearChanges}
                >
                  {t('clear-changes')}
                </LoadingButton>
              </AccessWrapper>
              <AccessWrapper name="EditQuoteButton" quoteMode={mode}>
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  disabled={
                    status?.toLowerCase() === 'inreview' || roleName === B2BRoles.NON_PURCHASER
                  }
                  onClick={() => handleEditQuote(quoteId)}
                >
                  {t('edit-quote')}
                </LoadingButton>
              </AccessWrapper>
              <LoadingButton
                variant="contained"
                color="inherit"
                disabled={
                  status?.toLowerCase() === 'inreview' || roleName === B2BRoles.NON_PURCHASER
                }
                onClick={handleSubmit(handleSaveQuoteName)}
              >
                {t('save-quote')}
              </LoadingButton>
              <AccessWrapper
                name="QuoteSubmitForApproval"
                quoteStatus={QuoteStatus[status]}
                quoteMode={mode}
              >
                <LoadingButton
                  variant="contained"
                  color="primary"
                  disabled={
                    status?.toLowerCase() === 'inreview' ||
                    roleName === B2BRoles.NON_PURCHASER ||
                    !isSaveAndExitDisabled ||
                    !quote?.hasDraft
                  }
                  onClick={handleSubmitForApproval}
                >
                  {t('submit-for-approval')}
                </LoadingButton>
              </AccessWrapper>
              <AccessWrapper name="QuoteContinueToCheckout" quoteStatus={QuoteStatus[status]}>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  disabled={(quote?.hasDraft as boolean) || roleName === B2BRoles.NON_PURCHASER}
                  onClick={handleGotoCheckout}
                >
                  {t('continue-to-checkout')}
                </LoadingButton>
              </AccessWrapper>
            </Stack>
          ) : null}
        </Grid>
        <Grid
          item
          columns={{ xs: 12, md: 8 }}
          xs={12}
          md={12}
          sx={{
            ...quoteDetailsTemplateStyles.quoteDetailsHeading,
            ...quoteDetailsTemplateStyles.gridPaddingTop,
          }}
        >
          <Typography variant="h2" mb={2}>
            {t('quote-details')}
          </Typography>
          <LoadingButton variant="contained" color="secondary">
            {t('print-quote')}
          </LoadingButton>
        </Grid>
        <Grid item xs={12} md={5} style={{ paddingTop: !mdScreen ? '1rem' : '24px' }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('quote-name')}
                placeholder={t('enter-quote-name')}
                autoComplete="off"
                ref={null}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                required
                disabled={
                  status?.toLocaleLowerCase() === 'inreview' || roleName === B2BRoles.NON_PURCHASER
                }
              />
            )}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={10}
          sx={{
            ...quoteDetailsTemplateStyles.quoteDetails,
            ...quoteDetailsTemplateStyles.gridPaddingTop,
          }}
        >
          <Grid container rowSpacing={1} columnSpacing={{ md: 1 }}>
            <Grid item xs={6} md={2}>
              <InputLabel shrink={true} sx={{ position: 'relative' }}>
                {t('quote-number')}
              </InputLabel>
              <Typography>{number}</Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <InputLabel shrink={true} sx={{ position: 'relative' }}>
                {t('status')}
              </InputLabel>
              <Box display={'flex'} gap={1} data-testid={`quote-status`}>
                <FiberManualRecord fontSize="small" color={getStatusColorCode(status)} />
                <Typography variant="body2">{QuoteStatus[status]}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <InputLabel shrink={true} sx={{ position: 'relative' }}>
                {t('account-name')}
              </InputLabel>
              <Typography>{accountName}</Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <InputLabel shrink={true} sx={{ position: 'relative' }}>
                {t('created-by')}
              </InputLabel>
              <Typography>{createdBy}</Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <InputLabel shrink={true} sx={{ position: 'relative' }}>
                {t('date-created')}
              </InputLabel>
              <Typography>{createdDate}</Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <InputLabel shrink={true} sx={{ position: 'relative' }}>
                {t('expiration-date')}
              </InputLabel>
              <Typography>{expirationDate}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h2" mb={2}>
            {t('quote-summary')}
          </Typography>
          <AccessWrapper name="B2BProductSearch" quoteMode={mode} quoteStatus={QuoteStatus[status]}>
            <B2BProductSearch onAddProduct={handleAddProduct} />
          </AccessWrapper>
        </Grid>
        <Grid item xs={12} sx={{ ...quoteDetailsTemplateStyles.gridPaddingTop }}>
          <Stack gap={3}>
            {mdScreen ? (
              <B2BProductDetailsTable
                items={quoteItems}
                fulfillmentLocations={fulfillmentLocations}
                purchaseLocation={purchaseLocation}
                status={status}
                mode={mode}
                isQuote={true}
                onFulfillmentOptionChange={onFulfillmentOptionChange}
                onQuantityUpdate={handleQuantityUpdate}
                onStoreSetOrUpdate={handleProductPickupLocation}
                onItemDelete={handleDeleteItem}
              />
            ) : (
              <Stack spacing={2}>
                {quoteItems && quoteItems?.length > 0 ? (
                  <CartItemList
                    cartItems={quoteItems}
                    fulfillmentLocations={fulfillmentLocations as Location[]}
                    purchaseLocation={purchaseLocation}
                    status={status}
                    mode={mode}
                    isQuote={true}
                    onCartItemDelete={handleDeleteItem}
                    onCartItemQuantityUpdate={handleQuantityUpdate}
                    onFulfillmentOptionChange={onFulfillmentOptionChange}
                    onProductPickupLocation={handleProductPickupLocation}
                    onCartItemActionSelection={() => null}
                  />
                ) : (
                  <Typography variant="body1" sx={quoteDetailsTemplateStyles.noCartItems}>
                    {t('search-to-add-products')}
                  </Typography>
                )}
              </Stack>
            )}
            <Box>
              <OrderSummaryEditable
                itemTaxTotal={quote?.itemTaxTotal}
                adjustment={quote?.adjustment?.amount || (0 as number)}
                dutyTotal={quote?.dutyTotal}
                handlingAdjustment={quote?.handlingAdjustment?.amount || (0 as number)}
                handlingSubTotal={quote?.handlingSubTotal}
                handlingTaxTotal={quote?.handlingTaxTotal}
                handlingTotal={quote?.handlingTotal}
                itemTotal={quote?.itemTotal}
                shippingAdjustment={quote?.shippingAdjustment?.amount || (0 as number)}
                shippingSubTotal={quote?.shippingSubTotal}
                shippingTaxTotal={quote?.shippingTaxTotal}
                shippingTotal={quote?.shippingTotal}
                subTotal={quote?.subTotal}
                onSave={handleUpdateQuoteAdjustments}
                mode={mode}
                status={status}
              />
            </Box>
            <Divider />
            {quoteItems?.length ? (
              shipItems.length > 0 ? (
                <Stack ref={shippingAddressRef}>
                  {
                    <Typography variant="h2" pb={1}>
                      {t('shipping-information')}
                    </Typography>
                  }
                  {shouldShowAddAddressButton && mode && status?.toLowerCase() !== 'inreview' && (
                    <>
                      <Stack gap={2} width="100%">
                        {defaultShippingAddress && (
                          <>
                            <Typography variant="h4" fontWeight={'bold'}>
                              {t('your-default-shipping-address')}
                            </Typography>
                            <KiboRadio
                              radioOptions={[
                                {
                                  value: String(defaultShippingAddress.id),
                                  name: String(defaultShippingAddress.id),
                                  optionIndicator: t('primary'),
                                  label: (
                                    <AddressCard
                                      firstName={defaultShippingAddress?.firstName as string}
                                      middleNameOrInitial={
                                        defaultShippingAddress?.middleNameOrInitial as string
                                      }
                                      lastNameOrSurname={
                                        defaultShippingAddress?.lastNameOrSurname as string
                                      }
                                      address1={defaultShippingAddress?.address?.address1 as string}
                                      address2={defaultShippingAddress?.address?.address2 as string}
                                      cityOrTown={
                                        defaultShippingAddress?.address?.cityOrTown as string
                                      }
                                      stateOrProvince={
                                        defaultShippingAddress?.address?.stateOrProvince as string
                                      }
                                      postalOrZipCode={
                                        defaultShippingAddress?.address?.postalOrZipCode as string
                                      }
                                    />
                                  ),
                                },
                              ]}
                              selected={selectedShippingAddressId?.toString()}
                              align="flex-start"
                              onChange={handleAddressSelect}
                            />
                          </>
                        )}
                        {showPreviouslySavedAddress && (
                          <>
                            <Typography variant="h4" fontWeight={'bold'}>
                              {t('previously-saved-shipping-addresses')}
                            </Typography>
                            <KiboRadio
                              radioOptions={previouslySavedShippingAddress?.map(
                                (address, index) => {
                                  return {
                                    value: String(address.id),
                                    name: String(address.id),
                                    label: (
                                      <AddressCard
                                        firstName={address?.firstName as string}
                                        middleNameOrInitial={address?.middleNameOrInitial as string}
                                        lastNameOrSurname={address?.lastNameOrSurname as string}
                                        address1={address?.address?.address1 as string}
                                        address2={address?.address?.address2 as string}
                                        cityOrTown={address?.address?.cityOrTown as string}
                                        stateOrProvince={
                                          address?.address?.stateOrProvince as string
                                        }
                                        postalOrZipCode={
                                          address?.address?.postalOrZipCode as string
                                        }
                                      />
                                    ),
                                  }
                                }
                              )}
                              selected={selectedShippingAddressId?.toString()}
                              align="flex-start"
                              onChange={handleAddressSelect}
                            />
                          </>
                        )}
                        <AccessWrapper name="QuoteAddShippingAddress">
                          <Button
                            variant="contained"
                            color="inherit"
                            sx={{ width: { xs: '100%', sm: '50%' } }}
                            onClick={handleAddNewAddress}
                          >
                            {t('add-new-address')}
                          </Button>
                        </AccessWrapper>
                      </Stack>
                      {shippingMethods.length > 0 && Boolean(selectedShippingAddressId) && (
                        <ShippingMethod
                          shipItems={shipItems}
                          pickupItems={pickupItems}
                          orderShipmentMethods={[...shippingMethods]}
                          selectedShippingMethodCode={selectedShippingMethodCode}
                          onShippingMethodChange={handleSaveShippingMethod}
                          // onStoreLocatorClick={handleStoreLocatorClick}
                        />
                      )}
                    </>
                  )}
                  {!shouldShowAddAddressButton && mode && status?.toLowerCase() !== 'inreview' && (
                    <>
                      <AddressForm
                        isUserLoggedIn={false}
                        saveAddressLabel={t('save-shipping-address')}
                        setAutoFocus={true}
                        validateForm={validateForm}
                        onSaveAddress={handleSaveAddressToQuote}
                        onFormStatusChange={handleFormStatusChange}
                      />
                      {isAuthenticated && (
                        <FormControlLabel
                          label={t('save-address-to-account')}
                          control={
                            <Checkbox
                              sx={{ marginLeft: '0.5rem' }}
                              inputProps={{
                                'aria-label': t('save-address-to-account'),
                              }}
                              onChange={() => setIsAddressSavedToAccount(!isAddressSavedToAccount)}
                            />
                          }
                        />
                      )}
                      <Box m={1} maxWidth={'872px'} data-testid="address-form">
                        <Grid container>
                          <Grid item xs={6} gap={2} display={'flex'} direction={'column'}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => setShouldShowAddAddressButton(true)}
                            >
                              {t('cancel')}
                            </Button>
                            <Button
                              variant="contained"
                              color="inherit"
                              style={{ textTransform: 'none' }}
                              onClick={handleAddressValidationAndSave}
                              {...(!isAddressFormValid && { disabled: true })}
                            >
                              {t('save-shipping-address')}
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </>
                  )}
                  <AccessWrapper
                    name="ShippingMethodReadOnly"
                    quoteMode={mode}
                    quoteStatus={QuoteStatus[status]}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      {quote?.fulfillmentInfo?.fulfillmentContact && (
                        <Box pb={1}>
                          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {t('address')}
                          </Typography>
                          <AddressCard
                            firstName={
                              quote?.fulfillmentInfo?.fulfillmentContact?.firstName as string
                            }
                            middleNameOrInitial={
                              quote?.fulfillmentInfo?.fulfillmentContact
                                ?.middleNameOrInitial as string
                            }
                            lastNameOrSurname={
                              quote?.fulfillmentInfo?.fulfillmentContact
                                ?.lastNameOrSurname as string
                            }
                            address1={
                              quote?.fulfillmentInfo?.fulfillmentContact?.address
                                ?.address1 as string
                            }
                            address2={
                              quote?.fulfillmentInfo?.fulfillmentContact?.address
                                ?.address2 as string
                            }
                            cityOrTown={
                              quote?.fulfillmentInfo?.fulfillmentContact?.address
                                ?.cityOrTown as string
                            }
                            stateOrProvince={
                              quote?.fulfillmentInfo?.fulfillmentContact?.address
                                ?.stateOrProvince as string
                            }
                            postalOrZipCode={
                              quote?.fulfillmentInfo?.fulfillmentContact?.address
                                ?.postalOrZipCode as string
                            }
                          />
                        </Box>
                      )}
                      {quote?.fulfillmentInfo?.shippingMethodName && Boolean(quote?.subTotal) && (
                        <Box>
                          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {t('shipping-method')}
                          </Typography>
                          <Typography pt={1}>{`${quote?.fulfillmentInfo?.shippingMethodName} - ${t(
                            'currency',
                            {
                              val: quote?.shippingSubTotal,
                            }
                          )}`}</Typography>
                        </Box>
                      )}
                      {!quote?.fulfillmentInfo?.fulfillmentContact &&
                        !quote?.fulfillmentInfo?.shippingMethodName && (
                          <Typography>{t('no-shipping-details-found')}</Typography>
                        )}
                    </Stack>
                  </AccessWrapper>
                  <Divider />
                </Stack>
              ) : (
                <Stack>
                  <Typography variant="h2" component="h2" pb={1} sx={{ fontWeight: 'bold' }}>
                    {t('pickup')}
                  </Typography>
                  <ShippingMethod
                    showTitle={false}
                    shipItems={shipItems}
                    pickupItems={pickupItems}
                    orderShipmentMethods={[...shippingMethods]}
                    selectedShippingMethodCode={selectedShippingMethodCode}
                    onShippingMethodChange={handleSaveShippingMethod}
                    // onStoreLocatorClick={handleStoreLocatorClick}
                  />
                </Stack>
              )
            ) : null}
            <Box>
              <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}
              >
                <Typography variant="h2" pb={1}>
                  {t('comments')}
                </Typography>
                <Button
                  onClick={handleViewFullCommentThread}
                  sx={{ ...quoteDetailsTemplateStyles.viewFullCommentThreadAndHistoryButton }}
                >
                  <Link sx={{ ...quoteDetailsTemplateStyles.viewFullCommentThreadAndHistoryLink }}>
                    {t('view-full-comment-thread')}
                  </Link>
                </Button>
              </Stack>
              <QuotesCommentThread
                comments={quote?.comments?.slice(-3).reverse() as QuoteComment[]}
                userId={user?.userId as string}
                onAddComment={handleAddCommentToQuote}
                status={status}
                mode={mode}
                showLeft
                userIdAndEmails={userIdToEmail}
              />
            </Box>
            <Divider />
            <Box>
              <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}
              >
                <Typography variant="h2" pb={1}>
                  {t('quote-history')}
                </Typography>
                <Button
                  onClick={handleViewFullCommentHistory}
                  sx={{ ...quoteDetailsTemplateStyles.viewFullCommentThreadAndHistoryButton }}
                >
                  <Link sx={{ ...quoteDetailsTemplateStyles.viewFullCommentThreadAndHistoryLink }}>
                    {t('view-full-history')}
                  </Link>
                </Button>
              </Stack>
              <QuotesHistory
                auditHistory={quote?.auditHistory?.slice(-3).reverse() as AuditRecord[]}
                userIdAndEmails={userIdToEmail}
              />
            </Box>

            {!mdScreen ? (
              <Box paddingY={1} display="flex" flexDirection={'column'} gap={2}>
                <AccessWrapper
                  name="QuoteContinueToCheckoutForMobile"
                  quoteStatus={QuoteStatus[status]}
                  hasDraft={quote?.hasDraft as boolean}
                >
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    disabled={(quote?.hasDraft as boolean) || roleName === B2BRoles.NON_PURCHASER}
                    onClick={handleGotoCheckout}
                    fullWidth
                  >
                    {t('continue-to-checkout')}
                  </LoadingButton>
                </AccessWrapper>
                <AccessWrapper
                  name="QuoteSubmitForApprovalForMobile"
                  quoteStatus={QuoteStatus[status]}
                  hasDraft={quote?.hasDraft as boolean}
                >
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    disabled={
                      status?.toLowerCase() === 'inreview' ||
                      roleName === B2BRoles.NON_PURCHASER ||
                      !isSaveAndExitDisabled ||
                      !quote?.hasDraft
                    }
                    onClick={handleSubmitForApproval}
                    fullWidth
                  >
                    {t('submit-for-approval')}
                  </LoadingButton>
                </AccessWrapper>
                <Box display="flex" gap={3}>
                  <AccessWrapper name="QuoteClearChanges" quoteMode={mode}>
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{ padding: '0.375rem 0.5rem' }}
                      disabled={
                        status?.toLowerCase() === 'inreview' ||
                        roleName === B2BRoles.NON_PURCHASER ||
                        !(quote?.hasDraft as boolean)
                      }
                      onClick={handleClearChanges}
                    >
                      {t('clear-changes')}
                    </LoadingButton>
                  </AccessWrapper>
                  <AccessWrapper name="EditQuoteButton" quoteMode={mode}>
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      disabled={
                        status?.toLowerCase() === 'inreview' || roleName === B2BRoles.NON_PURCHASER
                      }
                      sx={{ padding: '0.375rem 0.5rem' }}
                      fullWidth
                      onClick={() => handleEditQuote(quoteId)}
                    >
                      {t('edit-quote')}
                    </LoadingButton>
                  </AccessWrapper>

                  <LoadingButton
                    variant="contained"
                    color="inherit"
                    fullWidth
                    disabled={
                      status?.toLowerCase() === 'inreview' || roleName === B2BRoles.NON_PURCHASER
                    }
                    onClick={handleSubmit(handleSaveQuoteName)}
                  >
                    {t('save-quote')}
                  </LoadingButton>
                </Box>
              </Box>
            ) : null}
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default QuoteDetailsTemplate
