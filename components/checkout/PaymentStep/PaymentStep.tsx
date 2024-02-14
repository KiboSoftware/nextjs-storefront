import React, { useState, useEffect, useMemo } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Help from '@mui/icons-material/Help'
import {
  Stack,
  Checkbox,
  FormControlLabel,
  styled,
  Radio,
  FormControl,
  RadioGroup,
  Typography,
  Button,
  Box,
  Tooltip,
} from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'
import { useReCaptcha } from 'next-recaptcha-v3'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { CardDetailsForm, PurchaseOrderForm } from '@/components/checkout'
import { AddressForm, KiboTextBox, KiboRadio, PaymentBillingCard } from '@/components/common'
import { useCheckoutStepContext, STEP_STATUS, useAuthContext, useSnackbarContext } from '@/context'
import { usePaymentTypes, useValidateCustomerAddress } from '@/hooks'
import { CountryCode, CurrencyCode, PaymentType, PaymentWorkflow } from '@/lib/constants'
import { addressGetters, cardGetters, orderGetters, userGetters } from '@/lib/getters'
import {
  actions,
  buildCardPaymentActionForCheckoutParams,
  buildPurchaseOrderPaymentActionForCheckoutParams,
  hasPermission,
  tokenizeCreditCardPayment,
  validateGoogleReCaptcha,
} from '@/lib/helpers'
import type {
  Address,
  CardForm,
  ContactForm,
  SavedCard,
  TokenizedCard,
  PaymentAndBilling,
  CardTypeForCheckout,
  SavedBillingAddress,
} from '@/lib/types'

import type {
  CrContact,
  CrAddress,
  CrOrder,
  PaymentActionInput,
  Checkout,
  CuAddress,
  CustomerPurchaseOrderPaymentTerm,
  CrPurchaseOrderPayment,
  CrPurchaseOrderPaymentTerm,
  CardCollection,
  CustomerContactCollection,
  CustomerPurchaseOrderAccount,
  CheckoutGrouping,
} from '@/lib/gql/types'

interface PaymentStepProps {
  checkout: CrOrder | Checkout
  contact?: ContactForm
  isMultiShipEnabled?: boolean
  addressCollection?: CustomerContactCollection
  cardCollection?: CardCollection
  customerPurchaseOrderAccount?: CustomerPurchaseOrderAccount
  onVoidPayment: (id: string, paymentId: string, paymentAction: PaymentActionInput) => Promise<void>
  onAddPayment: (id: string, paymentAction: PaymentActionInput) => Promise<void>
}

interface PaymentsType {
  id: string
  name: string
}

const StyledHeadings = styled(Typography)(() => ({
  width: '100%',
  paddingLeft: '0.5rem',
  fontWeight: 'bold',
}))

const formControlLabelStyle = {
  backgroundColor: 'grey.100',
  height: '3.313rem',
  width: '100%',
  marginLeft: '0',
  marginBottom: '1.75rem',
  maxWidth: '26.313rem',
}

const radioStyle = {
  color: 'primary',
  '& .Mui-checked': {
    color: 'primary',
  },
}

const initialCardFormData: CardForm = {
  cardNumber: '',
  cardType: '',
  expireMonth: 0,
  expireYear: 0,
  cvv: '',
  isCardDetailsValidated: false,
  isCardInfoSaved: false,
}

const initialPurchaseOrderFormData: any = {
  poNumber: '',
  purchaseOrderPaymentTerms: '',
  isPurchaseOrderFormValidated: false,
}

const initialBillingAddressData: Address = {
  contact: {
    firstName: '',
    lastNameOrSurname: '',
    email: '',
    address: {
      address1: '',
      address2: '',
      cityOrTown: '',
      stateOrProvince: '',
      postalOrZipCode: '',
      countryCode: '',
    },
    phoneNumbers: {
      home: '',
    },
  },
  isSameBillingShippingAddress: false,
  isAddressValid: false,
  isDataUpdated: false,
}

type SavedPODetails = {
  purchaseOrder: CrPurchaseOrderPayment
  billingAddressInfo: SavedBillingAddress
} | null

const PaymentStep = (props: PaymentStepProps) => {
  const {
    checkout,
    isMultiShipEnabled = false,
    cardCollection,
    addressCollection,
    customerPurchaseOrderAccount,
    onVoidPayment,
    onAddPayment,
  } = props

  const { t } = useTranslation('common')
  const { isAuthenticated, user } = useAuthContext()
  const { loadPaymentTypes } = usePaymentTypes()
  const paymentTypes = loadPaymentTypes()
  const { validateCustomerAddress } = useValidateCustomerAddress()

  const newPaymentTypes = paymentTypes
    .map((paymentType: any) =>
      paymentType.id === 'CreditCard' ||
      (hasPermission(actions.VIEW_PO) &&
        paymentType.id === 'PurchaseOrder' &&
        user?.id &&
        customerPurchaseOrderAccount?.isEnabled)
        ? paymentType
        : null
    )
    .filter(Boolean)

  const {
    stepStatus,
    setStepNext,
    setStepStatusValid,
    setStepStatusComplete,
    setStepStatusIncomplete,
  } = useCheckoutStepContext()

  const { executeRecaptcha } = useReCaptcha()
  const { showSnackbar } = useSnackbarContext()

  const { publicRuntimeConfig } = getConfig()
  const reCaptchaKey = publicRuntimeConfig.recaptcha.reCaptchaKey
  const allowInvalidAddresses = publicRuntimeConfig.allowInvalidAddresses

  // getting the selected Payment type from checkout.payments
  const checkoutPayment = orderGetters.getSelectedPaymentType(checkout)
  const checkoutPaymentType = checkoutPayment?.paymentType?.toString() ?? ''

  const [selectedPaymentTypeRadio, setSelectedPaymentTypeRadio] =
    useState<string>(checkoutPaymentType)

  const [isAddingNewPayment, setIsAddingNewPayment] = useState<boolean>(false)

  const handlePaymentTypeRadioChange = (value: string) => {
    setSelectedPaymentTypeRadio(value)
    setIsAddingNewPayment(false)
    setBillingFormAddress(initialBillingAddressData)
  }
  // Purchase Order details
  const handleInitialPODetails: SavedPODetails | null = useMemo(() => {
    return checkoutPaymentType === PaymentType.PURCHASEORDER
      ? {
          purchaseOrder: checkoutPayment?.billingInfo?.purchaseOrder as CrPurchaseOrderPayment,
          billingAddressInfo: {
            contact: checkoutPayment?.billingInfo?.billingContact as CrContact,
          },
        }
      : null
  }, [checkoutPaymentType, checkoutPayment])

  const [
    savedPaymentBillingDetailsForPurchaseOrder,
    setSavedPaymentBillingDetailsForPurchaseOrder,
  ] = useState<SavedPODetails | null>(handleInitialPODetails)

  const creditLimit = customerPurchaseOrderAccount?.creditLimit ?? 0
  const availableBalance = customerPurchaseOrderAccount?.availableBalance ?? 0
  const customerPurchaseOrderPaymentTerms = (
    customerPurchaseOrderAccount?.customerPurchaseOrderPaymentTerms as CustomerPurchaseOrderPaymentTerm[]
  )?.filter(
    (purchaseOrderTerm: CustomerPurchaseOrderPaymentTerm) =>
      purchaseOrderTerm.siteId === checkout.siteId
  )

  const shouldShowPreviouslySavedPaymentsForPurchaseOrder =
    selectedPaymentTypeRadio === PaymentType.PURCHASEORDER &&
    savedPaymentBillingDetailsForPurchaseOrder?.purchaseOrder &&
    !isAddingNewPayment

  // Credit Card
  const [cardOptions, setCardOptions] = useState<PaymentAndBilling[]>([])
  const [selectedCardRadio, setSelectedCardRadio] = useState('')
  const [isCVVAddedForNewPayment, setIsCVVAddedForNewPayment] = useState<boolean>(false)
  const [cvv, setCvv] = useState<string>('')

  const useDetailsSchema = () => {
    return yup.object().shape({
      cvv: yup
        .string()
        .required(t('cvv-is-required'))
        .matches(/^\d{3,4}$/g, t('invalid-cvv')),
    })
  }

  const defaultCvv = {
    cvv: '',
  }
  const {
    formState: { errors, isValid: isCvvValid },
    control,
    resetField,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: defaultCvv,
    resolver: yupResolver(useDetailsSchema()),
    shouldFocusError: true,
  })

  // default card details if payment method is card
  const defaultCustomerAccountCard = userGetters.getDefaultPaymentBillingMethod(cardOptions)

  const shouldShowCardForm =
    selectedPaymentTypeRadio === PaymentType.CREDITCARD && isAddingNewPayment

  const shouldShowPurchaseOrderForm =
    selectedPaymentTypeRadio === PaymentType.PURCHASEORDER && isAddingNewPayment

  const shouldShowBillingAddressForm = shouldShowCardForm || shouldShowPurchaseOrderForm

  const shouldShowPreviouslySavedCards =
    selectedPaymentTypeRadio === PaymentType.CREDITCARD && cardOptions.length && !isAddingNewPayment

  // Form Data
  const [cardFormDetails, setCardFormDetails] = useState<CardForm>({})

  const handleCardFormData = (cardData: CardForm) => {
    setCardFormDetails({
      ...cardFormDetails,
      ...cardData,
    })

    setCvv(cardData.cvv as string)
  }

  const handleCardFormValidDetails = (isValid: boolean) => {
    setCardFormDetails({ ...cardFormDetails, isCardDetailsValidated: isValid })
  }

  const handleSavePaymentMethodCheckbox = () => {
    setCardFormDetails({
      ...cardFormDetails,
      isCardInfoSaved: !cardFormDetails.isCardInfoSaved,
    })
  }

  // purchase order form values
  const [purchaseOrderFormDetails, setPurchaseOrderFormDetails] = useState<
    CrPurchaseOrderPayment & { isPurchaseOrderFormValidated?: boolean }
  >({})

  const handlePurchaseOrderFormData = (purchaseOrderFormData: any) => {
    setPurchaseOrderFormDetails({
      ...purchaseOrderFormDetails,
      ...purchaseOrderFormData,
    })
  }

  const handlePurchaseOrderFormValidDetails = (isValid: boolean) => {
    setPurchaseOrderFormDetails({
      ...purchaseOrderFormDetails,
      isPurchaseOrderFormValidated: isValid,
    })
  }

  // Address
  const [billingFormAddress, setBillingFormAddress] = useState<Address>(initialBillingAddressData)

  const [validateForm, setValidateForm] = useState<boolean>(false)

  const handleBillingFormAddress = (address: Address) => {
    const updatedAddress = {
      contact: {
        ...address.contact,
        // email: checkout?.email,
      },
      isAddressValid: true,
      isDataUpdated: address.isDataUpdated,
    } as Address
    setBillingFormAddress({
      ...billingFormAddress,
      ...updatedAddress,
    })
  }

  const handleBillingFormValidDetails = (isValid: boolean) => {
    setBillingFormAddress({ ...billingFormAddress, isAddressValid: isValid })
  }

  const handleSameAsShippingAddressCheckbox = (value: boolean) => {
    let address = initialBillingAddressData
    if (value) {
      address = {
        contact: (checkout as CrOrder)?.fulfillmentInfo?.fulfillmentContact as ContactForm,
        isSameBillingShippingAddress: value,
      }
    }

    setBillingFormAddress({
      ...address,
      isAddressValid: false,
    })
  }

  const cancelAddingNewPaymentMethod = () => {
    setIsAddingNewPayment(false)
    // setNewPaymentMethod('')
    setBillingFormAddress(initialBillingAddressData)
    // setCardFormDetails(initialCardFormData)
  }

  const handleSaveNewPaymentMethod = async () => {
    setValidateForm(true)
  }

  const handleInitialCardDetailsLoad = () => {
    setStepStatusIncomplete()

    if (!cardCollection || !addressCollection) return

    // get card and billing address formatted data from server
    const accountPaymentDetails =
      userGetters.getSavedCardsAndBillingDetails(cardCollection, addressCollection) || []

    // find default payment details from server data
    const defaultCard = userGetters.getDefaultPaymentBillingMethod(accountPaymentDetails)

    // get previously saved checkout payments
    const checkoutPaymentWithNewStatus = orderGetters.getSelectedPaymentType(checkout)

    // if checkoutPayment details are not present in accountPaymentDetails, push it and set it as selected radio
    if (checkoutPaymentWithNewStatus?.paymentType === PaymentType.CREDITCARD) {
      const cardDetails = checkoutPaymentWithNewStatus?.billingInfo?.card
      const billingAddress = checkoutPaymentWithNewStatus?.billingInfo?.billingContact
      Boolean(
        !accountPaymentDetails?.length ||
          !accountPaymentDetails?.some(
            (each) => each.cardInfo?.id === cardDetails?.paymentServiceCardId
          )
      ) &&
        accountPaymentDetails?.push({
          cardInfo: {
            cardNumberPart: cardDetails?.cardNumberPartOrMask as string,
            id: cardDetails?.paymentServiceCardId as string,
            expireMonth: cardDetails?.expireMonth,
            expireYear: cardDetails?.expireYear,
            paymentType: PaymentType.CREDITCARD,
            cardType: cardDetails?.paymentOrCardType as string,
          },
          billingAddressInfo: {
            contact: {
              ...billingAddress,
            },
          },
        })

      setSelectedCardRadio(cardDetails?.paymentServiceCardId as string)
    } else {
      // if defaultCard is available, set as selected radio
      cardGetters.getCardId(defaultCard?.cardInfo) &&
        selectedCardRadio === '' &&
        setSelectedCardRadio(defaultCard.cardInfo?.id as string)
    }

    if (accountPaymentDetails?.length) {
      setCardOptions(accountPaymentDetails)
    }
  }

  // handle saved payment method radio selection to select different payment method
  const handleRadioSavedCardSelection = (value: string) => {
    setStepStatusIncomplete()
    setSelectedCardRadio(value)
    setIsCVVAddedForNewPayment(false)
    resetField('cvv')
  }

  const handleAddPaymentMethod = () => {
    setBillingFormAddress(initialBillingAddressData)
    setIsAddingNewPayment(true)
  }

  const handleTokenization = async (card: CardForm) => {
    const pciHost = publicRuntimeConfig?.pciHost
    const apiHost = publicRuntimeConfig?.apiHost as string
    const tokenizedCardResponse: TokenizedCard = await tokenizeCreditCardPayment(
      card,
      pciHost,
      apiHost
    )

    if (!tokenizedCardResponse) return

    setIsAddingNewPayment(false)

    setCardOptions([
      ...cardOptions,
      {
        cardInfo: {
          id: tokenizedCardResponse.id,
          cardNumberPart: tokenizedCardResponse.numberPart,
          paymentType: PaymentType.CREDITCARD,
          expireMonth: card.expireMonth,
          expireYear: card.expireYear,
          isCardInfoSaved: card.isCardInfoSaved,
          cardType: card.cardType,
        },
        billingAddressInfo: {
          ...billingFormAddress,
          isSameBillingShippingAddress: billingFormAddress.isSameBillingShippingAddress,
        },
      },
    ])

    setSelectedCardRadio(tokenizedCardResponse.id as string)
    setValidateForm(false)
    setIsCVVAddedForNewPayment(true)
  }

  const handlePurchaseOrderValidation = async (purchaseOrderFormData: any) => {
    setIsAddingNewPayment(false)
    setSavedPaymentBillingDetailsForPurchaseOrder({
      purchaseOrder: {
        purchaseOrderNumber: purchaseOrderFormData?.purchaseOrderNumber,
        paymentTerm: purchaseOrderFormData?.paymentTerm,
      },
      billingAddressInfo: {
        ...billingFormAddress,
        isSameBillingShippingAddress: billingFormAddress.isSameBillingShippingAddress,
      },
    })
    setValidateForm(false)
  }

  const handleValidateBillingAddress = async (address: CuAddress) => {
    try {
      if (!allowInvalidAddresses && address?.countryCode === CountryCode.US) {
        await validateCustomerAddress.mutateAsync({
          addressValidationRequestInput: {
            address,
          },
        })
      }

      selectedPaymentTypeRadio === PaymentType.CREDITCARD &&
        handleTokenization({ ...cardFormDetails })
      selectedPaymentTypeRadio === PaymentType.PURCHASEORDER &&
        handlePurchaseOrderValidation({ ...purchaseOrderFormDetails })
    } catch (error) {
      setValidateForm(false)
      console.error(error)
    }
  }

  const submitFormWithRecaptcha = () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }
    executeRecaptcha('enquiryFormSubmit').then(async (gReCaptchaToken: any) => {
      const captcha = await validateGoogleReCaptcha(gReCaptchaToken)

      if (captcha?.status === 'success') {
        await handlePayment()
      } else {
        showSnackbar(captcha.message, 'error')
      }
    })
  }

  const getCardPaymentAction = async () => {
    let paymentActionToBeAdded: PaymentActionInput = {}
    let paymentActionToBeVoided: PaymentActionInput = {}

    const selectedPaymentMethod = cardOptions.find(
      (each) => each?.cardInfo?.id === selectedCardRadio
    )

    const {
      cardType,
      expireMonth,
      expireYear,
      isCardInfoSaved,
      paymentType,
      cardNumberPart,
      id,
      cardholderName,
    } = cardGetters.getCardDetails(selectedPaymentMethod?.cardInfo as SavedCard)

    if (!isCVVAddedForNewPayment) {
      await handleTokenization({
        id,
        cardType,
        cvv,
        cardNumber: cardNumberPart,
        cardholderName,
      })
    }

    const cardDetails: CardTypeForCheckout = {
      cardType,
      expireMonth,
      expireYear,
      isCardInfoSaved,
      paymentType,
      paymentWorkflow: PaymentWorkflow.MOZU,
    }

    const tokenizedData: TokenizedCard = {
      id,
      numberPart: cardNumberPart,
    }

    const isSameAsShipping = addressGetters.getIsBillingShippingAddressSame(
      selectedPaymentMethod?.billingAddressInfo
    )

    const paymentWithNewStatus = orderGetters.getSelectedPaymentType(checkout)

    if (paymentWithNewStatus?.billingInfo?.card?.paymentServiceCardId === selectedCardRadio) {
      setStepStatusComplete()
      setStepNext()
      return
    }
    paymentActionToBeAdded = {
      ...buildCardPaymentActionForCheckoutParams(
        CurrencyCode.US,
        checkout,
        { ...cardDetails },
        tokenizedData,
        selectedPaymentMethod?.billingAddressInfo?.contact as CrContact,
        isSameAsShipping
      ),
      actionName: '',
    }

    if (paymentWithNewStatus?.paymentType === PaymentType.CREDITCARD) {
      const card = paymentWithNewStatus?.billingInfo?.card
      const voidedCard = {
        paymentWorkflow: paymentWithNewStatus?.paymentWorkflow as string,
        isCardInfoSaved: card?.isCardInfoSaved as boolean,
        cardType: card?.paymentOrCardType as string,
        expireMonth: card?.expireMonth as number,
        expireYear: card?.expireYear as number,
        paymentType: paymentWithNewStatus?.paymentType as string,
      }

      paymentActionToBeVoided = buildCardPaymentActionForCheckoutParams(
        CurrencyCode.US,
        checkout,
        voidedCard,
        tokenizedData,
        paymentWithNewStatus?.billingInfo?.billingContact as CrContact,
        isSameAsShipping
      )

      paymentActionToBeVoided = { ...paymentActionToBeVoided, actionName: 'VoidPayment' }
    }

    return {
      paymentActionToBeAdded,
      paymentActionToBeVoided,
      paymentId: paymentWithNewStatus?.id as string,
    }
  }

  const getPurchaseOrderPaymentAction = () => {
    let paymentActionToBeAdded: PaymentActionInput = {}
    let paymentActionToBeVoided: PaymentActionInput = {}

    const isSameAsShipping = addressGetters.getIsBillingShippingAddressSame(
      savedPaymentBillingDetailsForPurchaseOrder?.billingAddressInfo
    )
    const purchaseOrderData = savedPaymentBillingDetailsForPurchaseOrder?.purchaseOrder ?? {}

    const paymentWithNewStatus = orderGetters.getSelectedPaymentType(checkout)

    if (paymentWithNewStatus?.paymentType === PaymentType.PURCHASEORDER) {
      const purchaseOrderDataWithNewStatus = {
        purchaseOrderNumber: paymentWithNewStatus?.billingInfo?.purchaseOrder?.purchaseOrderNumber,
        purchaseOrderPaymentTerms: paymentWithNewStatus?.billingInfo?.purchaseOrder?.paymentTerm,
      }

      paymentActionToBeVoided = buildPurchaseOrderPaymentActionForCheckoutParams(
        CurrencyCode.US,
        checkout,
        purchaseOrderDataWithNewStatus,
        paymentWithNewStatus?.billingInfo?.billingContact as CrContact,
        isSameAsShipping
      )

      paymentActionToBeVoided = { ...paymentActionToBeVoided, actionName: 'VoidPayment' }
    }

    paymentActionToBeAdded = {
      ...buildPurchaseOrderPaymentActionForCheckoutParams(
        CurrencyCode.US,
        checkout,
        purchaseOrderData,
        savedPaymentBillingDetailsForPurchaseOrder?.billingAddressInfo?.contact as CrContact,
        isSameAsShipping
      ),
      actionName: '',
    }

    return {
      paymentActionToBeAdded,
      paymentActionToBeVoided,
      paymentId: paymentWithNewStatus?.id as string,
    }
  }

  const handlePayment = async () => {
    const paymentMethodSelection: any = {
      [PaymentType.PURCHASEORDER]: getPurchaseOrderPaymentAction,
      [PaymentType.CREDITCARD]: getCardPaymentAction,
    }

    const responseForVoid =
      checkoutPaymentType && (await paymentMethodSelection[checkoutPaymentType]())

    if (responseForVoid?.paymentActionToBeVoided?.actionName) {
      await onVoidPayment(
        checkout?.id as string,
        responseForVoid.paymentId,
        responseForVoid.paymentActionToBeVoided
      )
    }

    const responseForAdd =
      selectedPaymentTypeRadio && (await paymentMethodSelection[selectedPaymentTypeRadio]())

    if (checkout?.id && responseForAdd?.paymentActionToBeAdded) {
      await onAddPayment(checkout.id, responseForAdd?.paymentActionToBeAdded)
      setStepStatusComplete()
      setStepNext()
    }
  }

  const showBillingSameAsShippingAddressCheckbox = () => {
    if (isMultiShipEnabled) {
      if (((checkout as Checkout)?.groupings as CheckoutGrouping[])?.length > 1) {
        const destinations: string[] = []
        return checkout.items?.some((item) => {
          const isSameDestination = destinations?.includes(item?.destinationId as string)
          if (!isSameDestination) {
            destinations.push(item?.destinationId as string)
          }
          return isSameDestination
        })
      } else {
        return true
      }
    } else {
      return (
        (checkout as CrOrder)?.fulfillmentInfo?.shippingMethodCode &&
        (checkout as CrOrder)?.fulfillmentInfo?.shippingMethodName
      )
    }
  }

  useEffect(() => {
    if (selectedPaymentTypeRadio === PaymentType.CREDITCARD) {
      handleInitialCardDetailsLoad()
    }
  }, [selectedPaymentTypeRadio])

  // when payment card and billing address info is available, handleTokenization
  useEffect(() => {
    if (
      (cardFormDetails.isDataUpdated || purchaseOrderFormDetails.isPurchaseOrderFormValidated) &&
      billingFormAddress.isDataUpdated
    ) {
      handleValidateBillingAddress({ ...billingFormAddress.contact.address })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cardFormDetails.isDataUpdated,
    billingFormAddress.isDataUpdated,
    purchaseOrderFormDetails.isPurchaseOrderFormValidated,
  ])

  useEffect(() => {
    if (selectedPaymentTypeRadio === PaymentType.CREDITCARD) {
      if (isAddingNewPayment || (!isCVVAddedForNewPayment && !isCvvValid)) setStepStatusIncomplete()
      else setStepStatusValid()
    } else if (selectedPaymentTypeRadio === PaymentType.PURCHASEORDER) {
      if (isAddingNewPayment || !savedPaymentBillingDetailsForPurchaseOrder)
        setStepStatusIncomplete()
      else setStepStatusValid()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCvvValid,
    isAddingNewPayment,
    savedPaymentBillingDetailsForPurchaseOrder,
    selectedPaymentTypeRadio,
  ])

  useEffect(() => {
    if (stepStatus === STEP_STATUS.SUBMIT) {
      if (reCaptchaKey) {
        submitFormWithRecaptcha()
      } else {
        handlePayment()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepStatus])

  const isAddPaymentMethodButtonDisabled = () => {
    return !(
      billingFormAddress.isAddressValid &&
      (cardFormDetails.isCardDetailsValidated ||
        purchaseOrderFormDetails.isPurchaseOrderFormValidated)
    )
  }

  return (
    <Stack data-testid="checkout-payment">
      <Typography variant="h2" sx={{ paddingBottom: '1.625rem' }}>
        {t('payment-method')}
      </Typography>

      <FormControl>
        <RadioGroup
          aria-labelledby="payment-types-radio"
          aria-label="payment-types"
          value={selectedPaymentTypeRadio}
          onChange={(_, value: string) => handlePaymentTypeRadioChange(value)}
          data-testid="payment-types"
        >
          {newPaymentTypes.map((paymentType: PaymentsType) => {
            return (
              <Box key={paymentType.id}>
                <FormControlLabel
                  sx={{ ...formControlLabelStyle }}
                  value={paymentType.id}
                  control={<Radio sx={{ ...radioStyle }} />}
                  label={paymentType.name}
                />
                {paymentType.id === selectedPaymentTypeRadio ? (
                  <Box sx={{ maxWidth: '100%', mb: 1, pl: 4 }}>
                    {shouldShowPreviouslySavedCards ? (
                      <Stack gap={2} width="100%" data-testid="saved-payment-methods">
                        {cardOptions?.length ? (
                          <>
                            <KiboRadio
                              radioOptions={cardOptions?.map((card) => {
                                const address = addressGetters.getAddress(
                                  card?.billingAddressInfo?.contact.address as CrAddress
                                )
                                return {
                                  value: cardGetters.getCardId(card?.cardInfo),
                                  name: cardGetters.getCardId(card?.cardInfo),
                                  optionIndicator:
                                    defaultCustomerAccountCard.cardInfo?.id === card.cardInfo?.id
                                      ? t('primary')
                                      : '',
                                  label: (
                                    <>
                                      <PaymentBillingCard
                                        cardNumberPart={cardGetters.getCardNumberPart(
                                          card?.cardInfo
                                        )}
                                        expireMonth={cardGetters.getExpireMonth(card?.cardInfo)}
                                        expireYear={cardGetters.getExpireYear(card?.cardInfo)}
                                        paymentType={cardGetters.getPaymentType(card?.cardInfo)}
                                        cardType={cardGetters
                                          .getCardType(card?.cardInfo)
                                          ?.toUpperCase()}
                                        address1={addressGetters.getAddress1(address)}
                                        address2={addressGetters.getAddress2(address)}
                                        cityOrTown={addressGetters.getCityOrTown(address)}
                                        postalOrZipCode={addressGetters.getPostalOrZipCode(address)}
                                        stateOrProvince={addressGetters.getStateOrProvince(address)}
                                      />
                                      {selectedCardRadio === card?.cardInfo?.id &&
                                        !isCVVAddedForNewPayment && (
                                          <Box pt={2} width={'50%'}>
                                            <FormControl sx={{ width: '100%' }}>
                                              <Controller
                                                name="cvv"
                                                control={control}
                                                defaultValue={defaultCvv?.cvv}
                                                render={({ field }) => {
                                                  return (
                                                    <KiboTextBox
                                                      type="password"
                                                      value={field.value || ''}
                                                      label={t('security-code')}
                                                      placeholder={t('security-code-placeholder')}
                                                      required={true}
                                                      onChange={(_, value) => {
                                                        field.onChange(value)
                                                        setCvv(value)
                                                      }}
                                                      onBlur={field.onBlur}
                                                      error={!!errors?.cvv}
                                                      helperText={
                                                        errors?.cvv?.message as unknown as string
                                                      }
                                                      icon={
                                                        <Box
                                                          pr={1}
                                                          pt={0.5}
                                                          sx={{ cursor: 'pointer' }}
                                                        >
                                                          <Tooltip
                                                            title={t('cvv-tooltip-text')}
                                                            placement="top"
                                                          >
                                                            <Help color="disabled" />
                                                          </Tooltip>
                                                        </Box>
                                                      }
                                                    />
                                                  )
                                                }}
                                              />
                                            </FormControl>
                                          </Box>
                                        )}
                                    </>
                                  ),
                                }
                              })}
                              selected={selectedCardRadio}
                              align="flex-start"
                              onChange={handleRadioSavedCardSelection}
                            />
                          </>
                        ) : (
                          <Typography variant="subtitle2">
                            {t('no-previously-saved-payment-methods')}
                          </Typography>
                        )}
                      </Stack>
                    ) : null}
                    {shouldShowPreviouslySavedPaymentsForPurchaseOrder ? (
                      <Stack gap={2} width="100%" data-testid="saved-payment-methods">
                        {savedPaymentBillingDetailsForPurchaseOrder ? (
                          <Box pl={2}>
                            <PaymentBillingCard
                              purchaseOrderNumber={
                                savedPaymentBillingDetailsForPurchaseOrder?.purchaseOrder
                                  ?.purchaseOrderNumber as string
                              }
                              paymentTerm={
                                savedPaymentBillingDetailsForPurchaseOrder?.purchaseOrder
                                  ?.paymentTerm as CrPurchaseOrderPaymentTerm
                              }
                              address1={addressGetters.getAddress1(
                                savedPaymentBillingDetailsForPurchaseOrder?.billingAddressInfo
                                  ?.contact.address as CrAddress
                              )}
                              address2={addressGetters.getAddress2(
                                savedPaymentBillingDetailsForPurchaseOrder?.billingAddressInfo
                                  ?.contact.address as CrAddress
                              )}
                              cityOrTown={addressGetters.getCityOrTown(
                                savedPaymentBillingDetailsForPurchaseOrder?.billingAddressInfo
                                  ?.contact.address as CrAddress
                              )}
                              postalOrZipCode={addressGetters.getPostalOrZipCode(
                                savedPaymentBillingDetailsForPurchaseOrder?.billingAddressInfo
                                  ?.contact.address as CrAddress
                              )}
                              stateOrProvince={addressGetters.getStateOrProvince(
                                savedPaymentBillingDetailsForPurchaseOrder?.billingAddressInfo
                                  ?.contact.address as CrAddress
                              )}
                              paymentType={PaymentType.PURCHASEORDER}
                            />
                          </Box>
                        ) : (
                          <Typography variant="subtitle2">
                            {t('no-previously-saved-payment-methods')}
                          </Typography>
                        )}
                      </Stack>
                    ) : null}
                    {shouldShowCardForm ? (
                      <>
                        <CardDetailsForm
                          validateForm={validateForm}
                          onSaveCardData={handleCardFormData}
                          onFormStatusChange={handleCardFormValidDetails}
                        />

                        {isAuthenticated ? (
                          <FormControlLabel
                            sx={{
                              width: '100%',
                              paddingLeft: '0.5rem',
                            }}
                            control={
                              <Checkbox
                                onChange={handleSavePaymentMethodCheckbox}
                                data-testid="save-payment"
                              />
                            }
                            label={`${t('save-payment-method-checkbox')}`}
                          />
                        ) : null}
                      </>
                    ) : null}
                    {shouldShowPurchaseOrderForm ? (
                      <PurchaseOrderForm
                        creditLimit={creditLimit}
                        availableBalance={availableBalance}
                        validateForm={validateForm}
                        purchaseOrderPaymentTerms={customerPurchaseOrderPaymentTerms}
                        onSavePurchaseData={handlePurchaseOrderFormData}
                        onFormStatusChange={handlePurchaseOrderFormValidDetails}
                      />
                    ) : null}
                    {shouldShowBillingAddressForm ? (
                      <>
                        <StyledHeadings variant="h2" sx={{ paddingTop: '3.125rem' }}>
                          {t('billing-address')}
                        </StyledHeadings>
                        {showBillingSameAsShippingAddressCheckbox() && (
                          <FormControlLabel
                            sx={{
                              width: '100%',
                              paddingLeft: '0.5rem',
                            }}
                            control={<Checkbox name={`${t('billing-address-same-as-shipping')}`} />}
                            label={`${t('billing-address-same-as-shipping')}`}
                            onChange={(_, value) => handleSameAsShippingAddressCheckbox(value)}
                          />
                        )}
                        <AddressForm
                          key={selectedPaymentTypeRadio}
                          contact={billingFormAddress.contact}
                          setAutoFocus={false}
                          isUserLoggedIn={isAuthenticated}
                          onSaveAddress={handleBillingFormAddress}
                          validateForm={validateForm}
                          onFormStatusChange={handleBillingFormValidDetails}
                        />
                        <Stack pl={1} gap={2} sx={{ width: { xs: '100%', md: '50%' } }}>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={cancelAddingNewPaymentMethod}
                          >
                            {t('cancel')}
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            {...(isAddPaymentMethodButtonDisabled() && { disabled: true })}
                            onClick={handleSaveNewPaymentMethod}
                          >
                            {t('save-payment-method')}
                          </Button>
                        </Stack>
                      </>
                    ) : null}
                    {!(shouldShowPurchaseOrderForm || shouldShowCardForm) ? (
                      <Box pt={2}>
                        <Button
                          variant="contained"
                          color="inherit"
                          sx={{ width: { xs: '100%', sm: '50%' } }}
                          onClick={handleAddPaymentMethod}
                        >
                          {t('add-payment-method')}
                        </Button>
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
              </Box>
            )
          })}
        </RadioGroup>
      </FormControl>
    </Stack>
  )
}

export default PaymentStep
