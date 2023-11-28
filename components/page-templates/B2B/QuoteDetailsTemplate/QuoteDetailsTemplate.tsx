import React, { useCallback, useEffect, useState, useRef } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { FiberManualRecord } from '@mui/icons-material'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import Close from '@mui/icons-material/Close'
import Done from '@mui/icons-material/Done'
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
  NoSsr,
} from '@mui/material'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, useForm } from 'react-hook-form'
import { useReactToPrint } from 'react-to-print'
import * as yup from 'yup'

import QuoteDetailsPrintTemplate from './QuoteDetailsPrintTemplate'
import { quoteDetailsTemplateStyles } from './QuoteDetailsTemplate.style'
import {
  B2BProductDetailsTable,
  B2BProductSearch,
  OrderSummaryEditable,
  QuotesCommentThread,
  QuotesHistory,
} from '@/components/b2b'
import { CartItemList } from '@/components/cart'
import { ShippingMethod } from '@/components/checkout'
import { AddressCard, AddressForm, KiboRadio, KiboTextBox } from '@/components/common'
import {
  ConfirmationDialog,
  QuoteCommentThreadDialog,
  QuotesHistoryDialog,
} from '@/components/dialogs'
import { useAuthContext, useModalContext, useSnackbarContext } from '@/context'
import {
  useGetPurchaseLocation,
  useGetStoreLocations,
  useProductCardActions,
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
  useGetB2BUsersEmailAndId,
  useUpdateOrderPersonalInfo,
  PersonalInfo,
  useUpdateQuoteCoupon,
  useDeleteQuoteCoupon,
} from '@/hooks'
import { useQuoteActions } from '@/hooks/custom/useQuoteActions/useQuoteActions'
import {
  AddressType,
  CountryCode,
  DefaultId,
  FulfillmentOptions as FulfillmentOptionsConstant,
  QuoteStatus,
  QuoteUpdateMode,
  StatusColorCode,
} from '@/lib/constants'
import { orderGetters, productGetters, quoteGetters, userGetters } from '@/lib/getters'
import { buildAddressParams, hasPermission } from '@/lib/helpers'
import { actions } from '@/lib/helpers/permissions'
import { Address } from '@/lib/types'

import {
  AuditRecord,
  CrAppliedDiscount,
  CrContact,
  CrOrderInput,
  CrOrderItem,
  CrShippingDiscount,
  CrShippingRate,
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
  const { publicRuntimeConfig } = getConfig()
  const allowInvalidAddresses = publicRuntimeConfig.allowInvalidAddresses

  const componentRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      document.getElementById('printable-quote-details')?.style.setProperty('display', 'block')
    },
    onAfterPrint: () => {
      document.getElementById('printable-quote-details')?.style.setProperty('display', 'none')
    },
    onPrintError: () => {
      document.getElementById('printable-quote-details')?.style.setProperty('display', 'none')
    },
    pageStyle: `margin: 1rem`,
  })

  const { showModal } = useModalContext()
  const { t } = useTranslation('common')
  const updateMode = QuoteUpdateMode.ApplyToDraft
  const draft = true
  const mdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const { user, isAuthenticated } = useAuthContext()
  const [promoError, setPromoError] = useState<string>('')

  const accountName = user?.companyOrOrganization ?? '-'
  const { number, quoteId, status, createdDate, expirationDate } =
    quoteGetters.getQuoteDetails(quote)
  const quoteItems = (quote?.items as CrOrderItem[]) ?? []

  const userIdToEmail = useGetB2BUsersEmailAndId(initialB2BUsers)

  const createdBy = quoteGetters.getQuoteCreatedBy(
    currentB2BUser?.items?.[0]?.firstName as string,
    currentB2BUser?.items?.[0]?.lastName as string
  )

  const quoteName = quote?.name ?? ''
  const { control, watch, handleSubmit } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })
  const quoteNameField = watch()
  const getStatusColorCode = useCallback((status: string) => {
    return StatusColorCode[status]
  }, [])

  const locationCodes = orderGetters.getFulfillmentLocationCodes(quoteItems as any)
  const { data: locations } = useGetStoreLocations({ filter: locationCodes })
  const fulfillmentLocations = locations && Object.keys(locations).length ? locations : []

  const { showSnackbar } = useSnackbarContext()

  const { updateQuote } = useUpdateQuote()
  const { addComment } = useAddQuoteComment()
  const { initiateOrder } = useInitiateOrder()
  const router = useRouter()
  const [quoteNameInputValue, setQuoteNameInputValue] = useState<string>(
    quote?.name ? quote.name : ''
  )
  const { data: purchaseLocation } = useGetPurchaseLocation()

  const { createCustomerAddress } = useCreateCustomerAddress()
  const { validateCustomerAddress } = useValidateCustomerAddress()
  const { updateQuoteAdjustments } = useUpdateQuoteAdjustments()
  const { updateQuoteCoupon } = useUpdateQuoteCoupon()
  const { deleteQuoteCoupon } = useDeleteQuoteCoupon()

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
  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState<number | null>(
    quoteShippingContact?.id as number
  )
  const { deleteQuote } = useDeleteQuote({ draft })
  const shouldFetchShippingMethods =
    quoteId && draft && shipItems?.length && selectedShippingAddressId
  const { updateQuoteFulfillmentInfo } = useUpdateQuoteFulfillmentInfo({
    shouldFetchShippingMethods: !!shouldFetchShippingMethods,
  })
  const { openProductQuickViewModal, handleAddToQuote } = useProductCardActions(
    !!shouldFetchShippingMethods
  )
  const { deleteQuoteItem } = useDeleteQuoteItem({
    shouldFetchShippingMethods: !!shouldFetchShippingMethods,
  })
  const { data: shippingMethods } = useGetQuoteShippingMethods({
    quoteId,
    draft,
    enabled: !!shouldFetchShippingMethods,
  })

  const { handleQuantityUpdate, handleProductPickupLocation, onFulfillmentOptionChange } =
    useQuoteActions({
      quoteId,
      updateMode,
      quoteItems,
      purchaseLocation,
      shouldFetchShippingMethods: !!shouldFetchShippingMethods,
    })

  const { updateOrderPersonalInfo } = useUpdateOrderPersonalInfo()

  const shippingAddressRef = useRef<HTMLDivElement>(null)

  const isSaveAndExitEnabled = quoteGetters.getSaveAndExitEnabled(
    quote?.name as string,
    quote?.fulfillmentInfo,
    shipItems,
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
  const showPreviouslySavedAddress = savedShippingAddresses && savedShippingAddresses.length > 0
  const [shouldShowAddAddressButton, setShouldShowAddAddressButton] = useState<boolean>(true)
  const defaultShippingAddress = userGetters.getDefaultShippingAddress(
    savedShippingAddresses as CustomerContact[]
  )
  const previouslySavedShippingAddress = userGetters.getOtherShippingAddress(
    savedShippingAddresses as CustomerContact[],
    defaultShippingAddress?.id as number
  )

  const getQuoteShippingMethodName = (
    shippingMethods: CrShippingRate[],
    selectedShippingMethodCode: string
  ) => {
    const shippingMethod = {
      ...shippingMethods?.find(
        (method) => method?.shippingMethodCode === selectedShippingMethodCode
      ),
    }
    const shippingMethodName =
      shippingMethod?.shippingMethodName &&
      `${shippingMethod?.shippingMethodName}` +
        ' - ' +
        t('currency', { val: shippingMethod?.price })
    return shippingMethodName
  }

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
      openProductQuickViewModal({
        product,
        dialogProps,
        quoteDetails,
        shouldFetchShippingMethods: !!shouldFetchShippingMethods,
      })
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
    try {
      const response = await updateQuote.mutateAsync({ quoteId, name, updateMode })
      if (response) showSnackbar(t('quote-saved-success-message'), 'success')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmitForApproval = async () => {
    try {
      showModal({
        Component: ConfirmationDialog,
        props: {
          onConfirm: () => {
            updateQuote.mutate({
              quoteId,
              updateMode: QuoteUpdateMode.ApplyAndCommit,
              name: quote?.name as string,
            })
            router.push('/my-account/b2b/quotes')
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
    router.push(`/my-account/b2b/quote/${quoteId}?mode=edit`)
  }

  const handleSaveAddressToQuote = async ({ contact }: { contact: CrContact }) => {
    try {
      if (!allowInvalidAddresses && contact?.address?.countryCode === CountryCode.US) {
        await validateCustomerAddress.mutateAsync({
          addressValidationRequestInput: { address: contact?.address as CuAddress },
        })
      }

      if (isAddressSavedToAccount) {
        const customerSavedAddress = await handleSaveAddressToAccount(contact)
        const { accountId: _, types: __, ...customerContact } = customerSavedAddress
        await updateQuoteFulfillmentInfo.mutateAsync({
          quote,
          quoteId,
          contact: { ...customerContact, id: customerContact.id },
          updateMode,
        })
        setSelectedShippingAddressId(customerSavedAddress?.id as number)
      } else {
        await updateQuoteFulfillmentInfo.mutateAsync({
          quote,
          quoteId,
          contact: { ...contact, id: contact.id || DefaultId.ADDRESSID },
          updateMode,
        })
        setSelectedShippingAddressId((contact?.id as number) || DefaultId.ADDRESSID)
      }
      setIsAddressSavedToAccount(false)
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
      handleSaveAddressToQuote({
        contact,
      })
    }
  }

  const handleSaveShippingMethod = async (shippingMethodCode: string) => {
    const shippingMethodName = getQuoteShippingMethodName(shippingMethods, shippingMethodCode)
    try {
      await updateQuoteFulfillmentInfo.mutateAsync({
        quote,
        quoteId,
        updateMode,
        contact: undefined,
        email: undefined,
        shippingMethodCode: shippingMethodName ? shippingMethodCode : undefined,
        shippingMethodName: shippingMethodName ? shippingMethodName : undefined,
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

    return await createCustomerAddress.mutateAsync(params)
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
          comments: quote?.comments,
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
          auditHistory: quote?.auditHistory as AuditRecord[],
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
            if (selectedShippingAddressId) {
              setSelectedShippingAddressId(null)
            }
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
  const handleApplyCouponCode = async (couponCode: string) => {
    try {
      setPromoError('')
      const response = await updateQuoteCoupon.mutateAsync({
        quoteId,
        couponCode,
        updateMode,
      })
      if (response?.invalidCoupons?.length) {
        setPromoError(`<strong>${couponCode}</strong> ${response?.invalidCoupons[0]?.reason}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleRemoveCouponCode = async (couponCode: string) => {
    try {
      await deleteQuoteCoupon.mutateAsync({
        quoteId,
        couponCode,
        updateMode,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleGotoCheckout = async () => {
    try {
      const initiateOrderResponse = await initiateOrder.mutateAsync({
        quoteId,
      })

      if (initiateOrderResponse?.id) {
        const personalInfo: PersonalInfo = {
          checkout: initiateOrderResponse as CrOrderInput,
          email: user?.emailAddress as string,
        }
        await updateOrderPersonalInfo.mutateAsync(personalInfo)
        router.push(`/checkout/${initiateOrderResponse.id}`)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleUpdateQuoteFulfillmentInfo = async () => {
    if (shouldFetchShippingMethods) {
      const shippingMethodName = getQuoteShippingMethodName(
        shippingMethods,
        selectedShippingMethodCode
      )

      await updateQuoteFulfillmentInfo.mutateAsync({
        quote,
        quoteId,
        updateMode,
        shippingMethodCode: shippingMethodName ? selectedShippingMethodCode : undefined,
        shippingMethodName: shippingMethodName ? shippingMethodName : undefined,
      })
    }
  }

  useEffect(() => {
    if (!!selectedShippingMethodCode) {
      handleUpdateQuoteFulfillmentInfo()
    }
  }, [JSON.stringify(shippingMethods), JSON.stringify(quote?.fulfillmentInfo?.fulfillmentContact)])

  useEffect(() => {
    setSavedShippingAddresses(
      userGetters.getAllShippingAddresses(
        quoteShippingContact,
        userShippingAddress as CustomerContact[]
      )
    )
  }, [JSON.stringify(quoteShippingContact), JSON.stringify(userShippingAddress), isNewAddressAdded])

  useEffect(() => {
    setQuoteNameInputValue(quote?.name ? quote?.name : '')
  }, [JSON.stringify(quote?.name)])

  const isQuoteNameEditable = !Boolean(
    QuoteStatus[status] === QuoteStatus.InReview ||
      QuoteStatus[status] === QuoteStatus.Completed ||
      QuoteStatus[status] === QuoteStatus.Expired ||
      !Boolean(quoteNameField.name) ||
      quote?.name === quoteNameInputValue
  )

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
        <Grid item xs={12}>
          <Stack flexDirection="row" justifyContent="space-between">
            {mdScreen && (
              <Grid item>
                <Box>
                  {mode === 'create' ? (
                    <Typography variant="h1">{t('create-a-quote')}</Typography>
                  ) : (
                    <Typography variant="h1">{quoteName}</Typography>
                  )}
                </Box>
              </Grid>
            )}
            <Grid item display={'flex'} justifyContent={'flex-end'}>
              {mdScreen ? (
                <Stack direction="row" gap={2}>
                  {(mode === 'create' || mode === 'edit') && (
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      disabled={
                        QuoteStatus[status] === QuoteStatus.InReview ||
                        QuoteStatus[status] === QuoteStatus.Completed ||
                        !(quote?.hasDraft as boolean)
                      }
                      onClick={handleClearChanges}
                    >
                      {t('clear-changes')}
                    </LoadingButton>
                  )}
                  {!mode && (
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      disabled={
                        QuoteStatus[status] === QuoteStatus.InReview ||
                        QuoteStatus[status] === QuoteStatus.Completed ||
                        QuoteStatus[status] === QuoteStatus.Expired
                      }
                      onClick={() => handleEditQuote(quoteId)}
                    >
                      {t('edit-quote')}
                    </LoadingButton>
                  )}
                  <LoadingButton variant="contained" color="secondary" onClick={handlePrint}>
                    {t('print-quote')}
                  </LoadingButton>
                  {(QuoteStatus[quote?.status as string] !== QuoteStatus.ReadyForCheckout ||
                    mode === 'edit') && (
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      disabled={
                        QuoteStatus[status] === QuoteStatus.InReview ||
                        QuoteStatus[status] === QuoteStatus.Completed ||
                        QuoteStatus[status] === QuoteStatus.Expired ||
                        !isSaveAndExitEnabled ||
                        !quote?.hasDraft
                      }
                      onClick={handleSubmitForApproval}
                    >
                      {t('submit-for-approval')}
                    </LoadingButton>
                  )}
                  <NoSsr>
                    {hasPermission(actions.CREATE_CHECKOUT) &&
                      QuoteStatus[quote?.status as string] === QuoteStatus.ReadyForCheckout && (
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          disabled={quote?.hasDraft as boolean}
                          onClick={handleGotoCheckout}
                        >
                          {t('continue-to-checkout')}
                        </LoadingButton>
                      )}
                  </NoSsr>
                </Stack>
              ) : null}
            </Grid>
          </Stack>
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
        </Grid>

        {(mode === 'edit' || mode === 'create') && (
          <>
            <Grid
              item
              xs={isQuoteNameEditable ? 10 : 12}
              md={5}
              style={{ paddingTop: !mdScreen ? '1rem' : '24px' }}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Box display={'flex'} alignItems={'center'} gap={1}>
                    <KiboTextBox
                      {...field}
                      value={quoteNameInputValue || ''}
                      label={t('quote-name')}
                      placeholder={t('enter-quote-name')}
                      autoComplete="off"
                      ref={null}
                      onChange={(_name: string, value = '') => {
                        setQuoteNameInputValue(value)
                        field.onChange(value)
                      }}
                      onBlur={field.onBlur}
                      required
                      disabled={
                        QuoteStatus[status] === QuoteStatus.InReview ||
                        QuoteStatus[status] === QuoteStatus.Completed ||
                        QuoteStatus[status] === QuoteStatus.Expired
                      }
                    />
                  </Box>
                )}
              />
            </Grid>

            {isQuoteNameEditable && (
              <Grid item xs={2} md={5} display={'flex'} alignItems={'center'}>
                <Box display={'flex'} gap={1} pt={1}>
                  <Button
                    variant="contained"
                    sx={{ p: 0.5 }}
                    aria-label="item-view"
                    name="item-view"
                    data-testid="save-quote-name"
                    disabled={
                      QuoteStatus[status] === QuoteStatus.InReview ||
                      QuoteStatus[status] === QuoteStatus.Completed ||
                      QuoteStatus[status] === QuoteStatus.Expired ||
                      !Boolean(quoteNameField.name) ||
                      quote?.name === quoteNameInputValue
                    }
                    onClick={handleSubmit(handleSaveQuoteName)}
                  >
                    <Done />
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ p: 0.5 }}
                    aria-label="item-view"
                    name="item-view"
                    data-testid="cancel-quote-name"
                    onClick={() => setQuoteNameInputValue(quote?.name as string)}
                  >
                    <Close />
                  </Button>
                </Box>
              </Grid>
            )}
          </>
        )}

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

        {/* Product search section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h2" mb={2}>
            {t('quote-summary')}
          </Typography>
          {mode &&
            QuoteStatus[quote?.status as string] !== QuoteStatus.InReview &&
            QuoteStatus[quote?.status as string] !== QuoteStatus.Completed && (
              <B2BProductSearch onAddProduct={handleAddProduct} />
            )}
        </Grid>

        {/* Product details table section */}
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
                shippingDiscounts={quote?.shippingDiscounts as CrShippingDiscount[]}
                handlingDiscounts={quote?.handlingDiscounts as CrAppliedDiscount[]}
                orderDiscounts={quote?.orderDiscounts as CrAppliedDiscount[]}
                promoList={quote?.couponCodes as string[]}
                mode={mode}
                status={status}
                total={quote?.total}
                promoError={promoError}
                itemLevelProductDiscountTotal={quote?.itemLevelProductDiscountTotal}
                onSave={handleUpdateQuoteAdjustments}
                onApplyCouponCode={handleApplyCouponCode}
                onRemoveCouponCode={handleRemoveCouponCode}
              />
            </Box>
            <Divider />
            {quoteItems?.length > 0 ? (
              shipItems?.length > 0 ? (
                <Stack ref={shippingAddressRef}>
                  {
                    <Typography variant="h2" pb={1}>
                      {t('shipping-information')}
                    </Typography>
                  }
                  {shouldShowAddAddressButton &&
                    mode &&
                    QuoteStatus[status] !== QuoteStatus.InReview &&
                    QuoteStatus[status] !== QuoteStatus.Completed &&
                    QuoteStatus[status] !== QuoteStatus.Expired && (
                      <Box pb={2}>
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
                                        address1={
                                          defaultShippingAddress?.address?.address1 as string
                                        }
                                        address2={
                                          defaultShippingAddress?.address?.address2 as string
                                        }
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
                                          middleNameOrInitial={
                                            address?.middleNameOrInitial as string
                                          }
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
                          <NoSsr>
                            {hasPermission(actions.CREATE_CONTACTS) && (
                              <Button
                                variant="contained"
                                color="inherit"
                                sx={{ width: { xs: '100%', sm: '50%' } }}
                                onClick={handleAddNewAddress}
                              >
                                {t('add-new-address')}
                              </Button>
                            )}
                          </NoSsr>
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
                      </Box>
                    )}
                  {!shouldShowAddAddressButton &&
                    mode &&
                    QuoteStatus[status] !== QuoteStatus.InReview &&
                    QuoteStatus[status] !== QuoteStatus.Completed &&
                    QuoteStatus[status] !== QuoteStatus.Expired && (
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
                                onChange={() =>
                                  setIsAddressSavedToAccount(!isAddressSavedToAccount)
                                }
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
                  {(!mode ||
                    QuoteStatus[quote?.status as string] === QuoteStatus.InReview ||
                    QuoteStatus[quote?.status as string] === QuoteStatus.Completed) && (
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
                          <Typography pt={1}>
                            {quote?.fulfillmentInfo?.shippingMethodName}
                          </Typography>
                        </Box>
                      )}
                      {!quote?.fulfillmentInfo?.fulfillmentContact &&
                        !quote?.fulfillmentInfo?.shippingMethodName && (
                          <Typography pb={1}>{t('no-shipping-information-selected')}</Typography>
                        )}
                    </Stack>
                  )}
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
                comments={quote?.comments?.slice(-3) as QuoteComment[]}
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
                auditHistory={quote?.auditHistory?.slice(-3) as AuditRecord[]}
                userIdAndEmails={userIdToEmail}
              />
            </Box>

            {!mdScreen ? (
              <Box paddingY={1} display="flex" flexDirection={'column'} gap={2}>
                <NoSsr>
                  {hasPermission(actions.CREATE_CHECKOUT) &&
                    QuoteStatus[quote?.status as string] === QuoteStatus.ReadyForCheckout &&
                    !quote?.hasDraft && (
                      <LoadingButton
                        variant="contained"
                        color="primary"
                        disabled={quote?.hasDraft as boolean}
                        onClick={handleGotoCheckout}
                        fullWidth
                      >
                        {t('continue-to-checkout')}
                      </LoadingButton>
                    )}
                </NoSsr>
                {(QuoteStatus[quote?.status as string] !== QuoteStatus.ReadyForCheckout ||
                  quote?.hasDraft) && (
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    disabled={
                      QuoteStatus[status] === QuoteStatus.InReview ||
                      QuoteStatus[status] === QuoteStatus.Completed ||
                      QuoteStatus[status] === QuoteStatus.Expired ||
                      !isSaveAndExitEnabled ||
                      !quote?.hasDraft
                    }
                    onClick={handleSubmitForApproval}
                    fullWidth
                  >
                    {t('submit-for-approval')}
                  </LoadingButton>
                )}
                <Box display="flex" gap={3}>
                  {(mode === 'create' || mode === 'edit') && (
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{ padding: '0.375rem 0.5rem' }}
                      disabled={
                        QuoteStatus[status] === QuoteStatus.InReview ||
                        QuoteStatus[status] === QuoteStatus.Completed ||
                        QuoteStatus[status] === QuoteStatus.Expired ||
                        !(quote?.hasDraft as boolean)
                      }
                      onClick={handleClearChanges}
                    >
                      {t('clear-changes')}
                    </LoadingButton>
                  )}
                  {!mode && (
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      disabled={
                        QuoteStatus[status] === QuoteStatus.InReview ||
                        QuoteStatus[status] === QuoteStatus.Completed ||
                        QuoteStatus[status] === QuoteStatus.Expired
                      }
                      sx={{ padding: '0.375rem 0.5rem' }}
                      fullWidth
                      onClick={() => handleEditQuote(quoteId)}
                    >
                      {t('edit-quote')}
                    </LoadingButton>
                  )}

                  <LoadingButton
                    variant="contained"
                    color="inherit"
                    fullWidth
                    disabled={
                      QuoteStatus[status] === QuoteStatus.InReview ||
                      QuoteStatus[status] === QuoteStatus.Completed ||
                      QuoteStatus[status] === QuoteStatus.Expired ||
                      !Boolean(quoteNameField.name) ||
                      quote?.name === quoteNameInputValue
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

      {/* Print Template */}
      <Box pt={3} id="printable-quote-details" display={'none'} ref={componentRef}>
        <QuoteDetailsPrintTemplate quote={quote} accountName={accountName} createdBy={createdBy} />
      </Box>
    </>
  )
}

export default QuoteDetailsTemplate
