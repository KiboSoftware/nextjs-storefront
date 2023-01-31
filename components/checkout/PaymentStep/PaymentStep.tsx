import React, { useState, useEffect, ChangeEvent } from 'react'

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
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'

import { CardDetailsForm, SavedPaymentMethodView } from '@/components/checkout'
import { AddressForm } from '@/components/common'
import { useCheckoutStepContext, STEP_STATUS, useAuthContext } from '@/context'
import { useCustomerCardsQueries, useCustomerContactsQueries, usePaymentTypes } from '@/hooks'
import { PaymentType, PaymentWorkflow } from '@/lib/constants'
import { addressGetters, cardGetters, orderGetters, userGetters } from '@/lib/getters'
import { tokenizeCreditCardPayment } from '@/lib/helpers'
import { buildCardPaymentActionForCheckoutParams } from '@/lib/helpers/buildCardPaymentActionForCheckoutParams'
import type {
  Address,
  CardForm,
  ContactForm,
  SavedCard,
  TokenizedCard,
  PaymentAndBilling,
  CardTypeForCheckout,
} from '@/lib/types'

import type {
  CrContact,
  CrAddress,
  CrOrder,
  PaymentActionInput,
  CrPayment,
  Maybe,
  Checkout,
} from '@/lib/gql/types'

interface PaymentStepProps {
  checkout: CrOrder | Checkout
  contact?: ContactForm
  isMultiShipEnabled?: boolean
  onVoidPayment: (id: string, paymentId: string, paymentAction: PaymentActionInput) => void
  onAddPayment: (id: string, paymentAction: PaymentActionInput) => void
}

interface PaymentMethod {
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

const initialBillingAddressData: Address = {
  contact: {
    firstName: '',
    lastNameOrSurname: '',
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
}

const PaymentStep = (props: PaymentStepProps) => {
  const { checkout, isMultiShipEnabled, onVoidPayment, onAddPayment } = props

  // hooks
  const { isAuthenticated, user } = useAuthContext()
  const { t } = useTranslation('common')

  const { loadPaymentTypes } = usePaymentTypes()
  const paymentMethods = loadPaymentTypes()

  // getting saved card and billing details
  const { data: customerCardsCollection, isSuccess: isCustomerCardsSuccess } =
    useCustomerCardsQueries(user?.id as number)

  const { data: customerContactsCollection, isSuccess: isCustomerContactsSuccess } =
    useCustomerContactsQueries(user?.id as number)

  // checkout context handling
  const {
    stepStatus,
    setStepNext,
    setStepStatusValid,
    setStepStatusComplete,
    setStepStatusIncomplete,
  } = useCheckoutStepContext()

  // states
  const [newPaymentMethod, setNewPaymentMethod] = useState<string>('')
  const [cardFormDetails, setCardFormDetails] = useState<CardForm>(initialCardFormData)

  const [billingFormAddress, setBillingFormAddress] = useState<Address>(initialBillingAddressData)
  const [validateForm, setValidateForm] = useState<boolean>(false)
  const [isAddingNewPayment, setIsAddingNewPayment] = useState<boolean>(false)

  const [selectedPaymentBillingRadio, setSelectedPaymentBillingRadio] = useState('')
  const [savedPaymentBillingDetails, setSavedPaymentBillingDetails] = useState<PaymentAndBilling[]>(
    []
  )

  // default card details if payment method is card
  const defaultCustomerAccountCard = userGetters.getDefaultPaymentBillingMethod(
    savedPaymentBillingDetails
  )

  // handle saved payment method radio selection to select different payment method
  const handleRadioSavedCardSelection = (value: string) => {
    setSelectedPaymentBillingRadio(value)
  }

  const handleSavePaymentMethodCheckbox = () => {
    setCardFormDetails({
      ...cardFormDetails,
      isCardInfoSaved: !cardFormDetails.isCardInfoSaved,
    })
  }

  const handleCardFormData = (cardData: CardForm) => {
    setCardFormDetails({
      ...cardFormDetails,
      ...cardData,
    })
  }

  const handleSameAsShippingAddressCheckbox = (value: boolean) => {
    const contact = value
      ? (checkout as CrOrder)?.fulfillmentInfo?.fulfillmentContact
      : initialBillingAddressData
    setBillingFormAddress({
      ...billingFormAddress,
      contact: { ...(contact as ContactForm) },
      isSameBillingShippingAddress: value,
    })
  }

  const handleBillingFormAddress = (address: Address) => {
    setBillingFormAddress(address)
  }

  // when adding new payment method, set payment method type (ex: credit card / check)
  const handlePaymentMethodSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAddingNewPayment(true)
    setNewPaymentMethod(event.target.value)
  }

  const shouldShowPreviouslySavedPayments = () => {
    if (Boolean(savedPaymentBillingDetails?.length)) {
      return isAddingNewPayment ? false : true
    }
    return false
  }

  const shouldShowPaymentMethodOptions = () => {
    if (!savedPaymentBillingDetails?.length || isAddingNewPayment) return true

    return false
  }

  const shouldShowCardForm = () => {
    if (isAddingNewPayment && newPaymentMethod === PaymentType.CREDITCARD) {
      return true
    }

    return false
  }

  const shouldShowBillingAddressForm = () => {
    if (isAddingNewPayment && Boolean(newPaymentMethod)) {
      return true
    }
    return false
  }

  const isAddPaymentMethodButtonDisabled = () => {
    return !(billingFormAddress.isAddressValid && cardFormDetails.isCardDetailsValidated)
  }

  const cancelAddingNewPaymentMethod = () => {
    setIsAddingNewPayment(false)
  }

  const handleCardFormValidDetails = (isValid: boolean) => {
    setCardFormDetails({ ...cardFormDetails, isCardDetailsValidated: isValid })
  }

  const handleBillingFormValidDetails = (isValid: boolean) => {
    setBillingFormAddress({ ...billingFormAddress, isAddressValid: isValid })
  }

  const handleAddPaymentMethod = () => {
    setBillingFormAddress(initialBillingAddressData)
    setIsAddingNewPayment(true)
  }

  // Sets validateForm to true to get the card and billing details
  const handleSaveNewPaymentMethod = async () => {
    setValidateForm(true)
  }

  const saveCardDataToOrder = async () => {
    let paymentAction: PaymentActionInput = {}

    const selectedPaymentMethod = savedPaymentBillingDetails.find(
      (each) => each?.cardInfo?.id === selectedPaymentBillingRadio
    )

    if (newPaymentMethod === PaymentType.CREDITCARD) {
      const {
        cardType,
        expireMonth,
        expireYear,
        isCardInfoSaved,
        paymentType,
        cardNumberPart,
        id,
      } = cardGetters.getCardDetails(selectedPaymentMethod?.cardInfo as SavedCard)

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

      paymentAction = buildCardPaymentActionForCheckoutParams(
        'US',
        checkout,
        cardDetails,
        tokenizedData,
        selectedPaymentMethod?.billingAddressInfo?.contact as CrContact,
        isSameAsShipping
      )
    }

    const selectedCards = orderGetters.getSelectedPaymentMethods(checkout, PaymentType.CREDITCARD)

    if (
      selectedCards?.some(
        (card: Maybe<CrPayment>) =>
          card?.billingInfo?.card?.paymentServiceCardId === selectedPaymentBillingRadio
      )
    ) {
      setStepStatusComplete()
      setStepNext()
      return
    }

    selectedCards?.forEach(async (card: Maybe<CrPayment>) => {
      paymentAction = { ...paymentAction, actionName: 'VoidPayment' }
      onVoidPayment(checkout?.id as string, card?.id as string, paymentAction)
    })

    if (checkout?.id) {
      paymentAction = { ...paymentAction, actionName: '' }
      onAddPayment(checkout.id, paymentAction)
      setStepStatusComplete()
      setStepNext()
    }
  }

  const handleTokenization = async (card: CardForm) => {
    const { publicRuntimeConfig } = getConfig()
    const pciHost = publicRuntimeConfig?.pciHost
    const apiHost = publicRuntimeConfig?.apiHost as string
    const tokenizedCardResponse: TokenizedCard = await tokenizeCreditCardPayment(
      card,
      pciHost,
      apiHost
    )

    if (!tokenizedCardResponse) return

    cancelAddingNewPaymentMethod()

    setSavedPaymentBillingDetails([
      ...savedPaymentBillingDetails,
      {
        cardInfo: {
          id: tokenizedCardResponse.id,
          cardNumberPart: tokenizedCardResponse.numberPart,
          paymentType: newPaymentMethod,
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

    setSelectedPaymentBillingRadio(tokenizedCardResponse.id as string)
    setValidateForm(false)
  }

  const getSavedPaymentMethodView = (card: PaymentAndBilling): React.ReactNode => {
    const address = addressGetters.getAddress(
      card?.billingAddressInfo?.contact.address as CrAddress
    )
    return (
      <Box key={card?.cardInfo?.id as string}>
        {defaultCustomerAccountCard.cardInfo?.id === card.cardInfo?.id && (
          <Typography variant="h4" fontWeight={'bold'}>
            {t('primary')}
          </Typography>
        )}
        <SavedPaymentMethodView
          radio
          displayRowDirection={false}
          displayTitle={false}
          selected={selectedPaymentBillingRadio}
          id={cardGetters.getCardId(card?.cardInfo)}
          cardNumberPart={cardGetters.getCardNumberPart(card?.cardInfo)}
          expireMonth={cardGetters.getExpireMonth(card?.cardInfo)}
          expireYear={cardGetters.getExpireYear(card?.cardInfo)}
          cardType={cardGetters.getCardType(card?.cardInfo)}
          address1={addressGetters.getAddress1(address)}
          address2={addressGetters.getAddress2(address)}
          cityOrTown={addressGetters.getCityOrTown(address)}
          postalOrZipCode={addressGetters.getPostalOrZipCode(address)}
          stateOrProvince={addressGetters.getStateOrProvince(address)}
          onPaymentCardSelection={handleRadioSavedCardSelection}
        />
      </Box>
    )
  }

  const handleInitialCardDetailsLoad = () => {
    // get card and billing address formatted data from server
    const accountPaymentDetails =
      userGetters.getSavedCardsAndBillingDetails(
        customerCardsCollection,
        customerContactsCollection
      ) || []

    // find default payment details from server data
    const defaultCard = userGetters.getDefaultPaymentBillingMethod(accountPaymentDetails)

    // if defaultCard is available, set as selected radio
    cardGetters.getCardId(defaultCard?.cardInfo) &&
      setSelectedPaymentBillingRadio(defaultCard.cardInfo?.id as string)

    // get previously saved checkout payments
    const checkoutPayments = orderGetters.getSelectedPaymentMethods(
      checkout,
      PaymentType.CREDITCARD
    )

    // if checkoutPayment details are not present in accountPaymentDetails, push it and set it as selected radio
    checkoutPayments?.forEach((card: Maybe<CrPayment>) => {
      const cardDetails = card?.billingInfo?.card
      const billingAddress = card?.billingInfo?.billingContact
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

      setSelectedPaymentBillingRadio(cardDetails?.paymentServiceCardId as string)
    })

    if (accountPaymentDetails?.length) {
      setSavedPaymentBillingDetails(accountPaymentDetails)
      setNewPaymentMethod(PaymentType.CREDITCARD)
    }
  }

  // handle initial load of cards and contacts
  useEffect(() => {
    // handle saved payment methods in account
    if ((isCustomerCardsSuccess && isCustomerContactsSuccess) || !isAuthenticated) {
      handleInitialCardDetailsLoad()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCustomerCardsSuccess, isCustomerContactsSuccess, checkout])

  // when payment card and billing address info is available, handleTokenization
  useEffect(() => {
    if (
      isAddingNewPayment &&
      validateForm &&
      cardFormDetails.cardNumber &&
      billingFormAddress.contact.firstName
    ) {
      handleTokenization({ ...cardFormDetails })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isAddingNewPayment,
    validateForm,
    cardFormDetails.cardNumber,
    billingFormAddress.contact.firstName,
  ])

  // handling review order button status (enabled/disabled)
  useEffect(() => {
    if (selectedPaymentBillingRadio) {
      isAddingNewPayment ? setStepStatusIncomplete() : setStepStatusValid()
    } else {
      setStepStatusIncomplete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPaymentBillingRadio, isAddingNewPayment])

  useEffect(() => {
    if (stepStatus === STEP_STATUS.SUBMIT) {
      saveCardDataToOrder()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepStatus])

  return (
    <Stack data-testid="checkout-payment">
      <Typography variant="h2" sx={{ paddingBottom: '1.625rem' }}>
        {t('payment-method')}
      </Typography>

      {shouldShowPreviouslySavedPayments() && (
        <>
          <Stack gap={2} width="100%" data-testid="saved-payment-methods">
            {savedPaymentBillingDetails?.length ? (
              savedPaymentBillingDetails.map((card) => {
                return getSavedPaymentMethodView(card)
              })
            ) : (
              <Typography variant="h4">{t('no-previously-saved-payment-methods')}</Typography>
            )}

            <Button
              variant="contained"
              color="inherit"
              sx={{ width: { xs: '100%', sm: '50%' } }}
              onClick={handleAddPaymentMethod}
            >
              {t('add-payment-method')}
            </Button>
          </Stack>
        </>
      )}

      {/* Payment Method Options Radio List */}
      {shouldShowPaymentMethodOptions() && (
        <FormControl sx={{ maxWidth: '26.313rem' }}>
          <RadioGroup
            aria-labelledby="payment-types-radio"
            name="radio-buttons-group"
            value={newPaymentMethod}
            onChange={handlePaymentMethodSelection}
            data-testid="payment-types"
          >
            {paymentMethods.map((paymentMethod: PaymentMethod) => {
              return (
                <FormControlLabel
                  key={paymentMethod.id}
                  sx={{ ...formControlLabelStyle }}
                  value={paymentMethod.id}
                  control={<Radio sx={{ ...radioStyle }} />}
                  label={paymentMethod.name}
                />
              )
            })}
          </RadioGroup>
        </FormControl>
      )}

      {/* Card Details Form */}
      {shouldShowCardForm() && (
        <CardDetailsForm
          validateForm={validateForm}
          onSaveCardData={handleCardFormData}
          onFormStatusChange={handleCardFormValidDetails}
        />
      )}

      {/* Save Payment Method for later checkbox */}
      {shouldShowCardForm() && isAuthenticated && (
        <FormControlLabel
          sx={{
            width: '100%',
            paddingLeft: '0.5rem',
          }}
          control={
            <Checkbox onChange={handleSavePaymentMethodCheckbox} data-testid="save-payment" />
          }
          label={`${t('save-payment-method-checkbox')}`}
        />
      )}

      {/* Billing Address Form */}
      {shouldShowBillingAddressForm() && (
        <>
          <StyledHeadings variant="h2" sx={{ paddingTop: '3.125rem' }}>
            {t('billing-address')}
          </StyledHeadings>
          {!isMultiShipEnabled && (
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
            contact={billingFormAddress.contact}
            setAutoFocus={false}
            isUserLoggedIn={isAuthenticated}
            onSaveAddress={handleBillingFormAddress}
            validateForm={validateForm}
            onFormStatusChange={handleBillingFormValidDetails}
          />
          <Stack pl={1} gap={2} sx={{ width: { xs: '100%', md: '50%' } }}>
            <Button variant="contained" color="secondary" onClick={cancelAddingNewPaymentMethod}>
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
      )}
    </Stack>
  )
}

export default PaymentStep
