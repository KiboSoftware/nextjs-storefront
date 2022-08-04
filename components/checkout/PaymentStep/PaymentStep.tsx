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
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'

import { CardDetailsForm, SavedPaymentMethodView } from '@/components/checkout'
import AddressForm from '@/components/common/AddressForm/AddressForm'
import { useCheckoutStepContext, STEP_STATUS, useAuthContext } from '@/context'
import {
  useCustomerCards,
  useCustomerContacts,
  usePaymentTypes,
  useUpdateCheckoutBillingInfo,
  useCreateCheckoutPaymentMethod,
  useUpdateOrderPaymentActionMutation,
} from '@/hooks'
import { PaymentType } from '@/lib/constants'
import { billingGetters, cardGetters, checkoutGetters, accountDetailsGetters } from '@/lib/getters'
import { tokenizeCreditCardPayment } from '@/lib/helpers'
import { buildCardPaymentActionForCheckoutInput } from '@/lib/helpers/buildPaymentActionForCheckoutInput'
import type {
  Address,
  CardForm,
  ContactForm,
  SavedCard,
  TokenizedCard,
  PaymentAndBilling,
  CardTypeForCheckout,
} from '@/lib/types'

import type { Card, Contact, Order, PaymentActionInput } from '@/lib/gql/types'

interface PaymentStepProps {
  checkout: Order | undefined
  contact?: ContactForm
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

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  width: '100%',
  paddingLeft: '0.5rem',
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
  const { checkout } = props

  // hooks
  const { isAuthenticated, user } = useAuthContext()
  const { t } = useTranslation(['checkout', 'common'])
  const { loadPaymentTypes } = usePaymentTypes()
  const paymentMethods = loadPaymentTypes()

  // getting saved card and billing details
  const { data: customerCardsCollection, isSuccess: isCustomerCardsSuccess } = useCustomerCards(
    user?.id as number
  )

  const { data: customerContactsCollection, isSuccess: isCustomerContactsSuccess } =
    useCustomerContacts(user?.id as number)

  // update checkout payment and billing info
  const createOrderPaymentMethod = useCreateCheckoutPaymentMethod()
  const updateCheckoutBillingInfo = useUpdateCheckoutBillingInfo()
  const updateOrderPaymentAction = useUpdateOrderPaymentActionMutation()

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
  const [shippingAddress, setShippingAddress] = useState<Contact>({})

  const [selectedPaymentBillingRadio, setSelectedPaymentBillingRadio] = useState('')
  const [savedPaymentBillingDetails, setSavedPaymentBillingDetails] = useState<PaymentAndBilling[]>(
    []
  )

  // defualt card details if payment method is card
  const defaultCustomerAccountCard = accountDetailsGetters.getDefaultPaymentBillingMethod(
    savedPaymentBillingDetails
  )

  // other card details with billing if payment method is card
  const previouslySavedCustomerAccountCards = accountDetailsGetters.getOtherPaymentBillingMethod(
    savedPaymentBillingDetails
  )

  // handle saved payment method radio selection to select different payment method
  const handleRadioSavedCardSelection = (value: string) => {
    setSelectedPaymentBillingRadio(value)
  }

  const handleSavePaymentMethodChecbox = () => {
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
      ? checkout?.fulfillmentInfo?.fulfillmentContact
      : initialBillingAddressData
    setShippingAddress(contact as Contact)
    setBillingFormAddress({
      ...billingFormAddress,
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
        paymentWorkflow: 'Mozu',
      }

      const tokenizedData: TokenizedCard = {
        id,
        numberPart: cardNumberPart,
      }

      const isSameAsShipping = billingGetters.getIsSameBillingShippingAddress(
        selectedPaymentMethod?.billingAddressInfo
      )

      paymentAction = buildCardPaymentActionForCheckoutInput(
        'US',
        checkout as Order,
        cardDetails,
        tokenizedData,
        selectedPaymentMethod?.billingAddressInfo as Contact,
        isSameAsShipping
      )
    }

    const selectedCards = checkoutGetters.getSelectedPaymentMethods(
      checkout,
      PaymentType.CREDITCARD
    )

    selectedCards?.forEach(async (card) => {
      paymentAction = { ...paymentAction, actionName: 'VoidPayment' }
      await updateOrderPaymentAction.mutateAsync({
        orderId: checkout?.id as string,
        paymentId: card?.id as string,
        paymentAction,
      })
    })

    if (checkout?.id) {
      paymentAction = { ...paymentAction, actionName: '' }
      await createOrderPaymentMethod.mutateAsync({ orderId: checkout.id, paymentAction })
      await updateCheckoutBillingInfo.mutateAsync({
        orderId: checkout.id,
        billingInfoInput: { ...paymentAction.newBillingInfo },
      })
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
          ...card,
          id: tokenizedCardResponse.id,
          cardNumberPart: tokenizedCardResponse.numberPart,
          contactId: 0,
          paymentType: newPaymentMethod,
        },
        billingAddressInfo: {
          ...billingFormAddress.contact,
          isSameBillingShippingAddress: billingFormAddress.isSameBillingShippingAddress,
        },
      },
    ])

    setSelectedPaymentBillingRadio(tokenizedCardResponse.id as string)
  }

  const getSavedPaymentMethodView = (card: PaymentAndBilling): React.ReactNode => {
    return (
      <SavedPaymentMethodView
        key={card?.cardInfo?.id as string}
        radio
        displayRowDirection={false}
        displayTitle={false}
        selected={selectedPaymentBillingRadio}
        id={card?.cardInfo?.id as string}
        cardNumberPart={card?.cardInfo?.cardNumberPart as string}
        expireMonth={card?.cardInfo?.expireMonth as number}
        expireYear={card?.cardInfo?.expireYear as number}
        address1={card?.billingAddressInfo?.address?.address1 as string}
        address2={card?.billingAddressInfo?.address?.address2 as string}
        cityOrTown={card?.billingAddressInfo?.address?.cityOrTown as string}
        postalOrZipCode={card?.billingAddressInfo?.address?.postalOrZipCode as string}
        stateOrProvince={card?.billingAddressInfo?.address?.stateOrProvince as string}
        onPaymentCardSelection={handleRadioSavedCardSelection}
      />
    )
  }

  // handle initial load of cards and contacts
  useEffect(() => {
    // handle saved payment methods in account
    if (isCustomerCardsSuccess && isCustomerContactsSuccess) {
      const savedInfo = accountDetailsGetters.getSavedPaymentAndBillingDetails(
        customerCardsCollection,
        customerContactsCollection
      )

      const defaultCard = accountDetailsGetters.getDefaultPaymentBillingMethod(savedInfo)
      cardGetters.getCardId(defaultCard?.cardInfo) &&
        setSelectedPaymentBillingRadio(defaultCard.cardInfo?.id as string)

      const selectedCards = checkoutGetters.getSelectedPaymentMethods(
        checkout,
        PaymentType.CREDITCARD
      )

      selectedCards?.forEach((card) => {
        const cardDetails = card?.billingInfo?.card
        const billingAddress = card?.billingInfo?.billingContact
        !savedInfo.some((each) => each.cardInfo?.id === cardDetails?.paymentServiceCardId) &&
          savedInfo.push({
            cardInfo: {
              ...(cardDetails as Card),
              cardNumberPart: cardDetails?.cardNumberPartOrMask,
              id: cardDetails?.paymentServiceCardId,
              contactId: 0,
              paymentType: newPaymentMethod,
            },
            billingAddressInfo: {
              ...billingAddress,
            },
          })

        setSelectedPaymentBillingRadio(cardDetails?.paymentServiceCardId as string)
      })

      if (savedInfo.length) {
        setSavedPaymentBillingDetails(savedInfo)
        setNewPaymentMethod(PaymentType.CREDITCARD)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCustomerCardsSuccess, isCustomerContactsSuccess, checkout])

  // when payment card and billing address info is available, handleTokenization
  useEffect(() => {
    if (isAddingNewPayment && cardFormDetails.cardNumber && billingFormAddress.contact.firstName) {
      handleTokenization({ ...cardFormDetails })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddingNewPayment, cardFormDetails.cardNumber, billingFormAddress.contact.firstName])

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
      setStepStatusComplete()
      setStepNext()
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
            {defaultCustomerAccountCard.cardInfo?.id && (
              <>
                <Typography variant="h4" fontWeight={'bold'}>
                  {t('common:your-default-payment-method')}
                </Typography>
                {getSavedPaymentMethodView(defaultCustomerAccountCard)}
              </>
            )}

            <Typography variant="h4" fontWeight={'bold'}>
              {t('common:previously-saved-payment-methods')}
            </Typography>
            {previouslySavedCustomerAccountCards?.length ? (
              previouslySavedCustomerAccountCards.map((card) => {
                return getSavedPaymentMethodView(card)
              })
            ) : (
              <Typography variant="h4">
                {t('common:no-previously-saved-payment-methods')}
              </Typography>
            )}

            <Button
              variant="contained"
              color="inherit"
              sx={{ width: { xs: '100%', sm: '50%' } }}
              onClick={() => setIsAddingNewPayment(true)}
            >
              {t('common:add-payment-method')}
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
          setValidateForm={setValidateForm}
          onFormStatusChange={(isValid: boolean) =>
            setCardFormDetails({ ...cardFormDetails, isCardDetailsValidated: isValid })
          }
        />
      )}

      {/* Save Payment Method for later checkbox */}
      {shouldShowCardForm() && isAuthenticated && (
        <StyledFormControlLabel
          control={
            <Checkbox onChange={handleSavePaymentMethodChecbox} data-testid="save-payment" />
          }
          label={`${t('save-payment-method')}`}
        />
      )}

      {/* Billing Address Form */}
      {shouldShowBillingAddressForm() && (
        <>
          <StyledHeadings variant="h2" sx={{ paddingTop: '3.125rem' }}>
            {t('billing-address')}
          </StyledHeadings>
          <StyledFormControlLabel
            control={<Checkbox />}
            label={`${t('billing-address-same-as-shipping')}`}
            onChange={(_, value) => handleSameAsShippingAddressCheckbox(value)}
          />
          <AddressForm
            checkout={checkout}
            contact={shippingAddress as ContactForm}
            setAutoFocus={false}
            isUserLoggedIn={isAuthenticated}
            onSaveAddress={handleBillingFormAddress}
            validateForm={validateForm}
            setValidateForm={setValidateForm}
            onFormStatusChange={(isValid: boolean) =>
              setBillingFormAddress({ ...billingFormAddress, isAddressValid: isValid })
            }
          />
          <Stack pl={1} gap={2} sx={{ width: { xs: '100%', md: '50%' } }}>
            <Button variant="contained" color="secondary" onClick={cancelAddingNewPaymentMethod}>
              {t('common:cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              {...(isAddPaymentMethodButtonDisabled() && { disabled: true })}
              onClick={handleSaveNewPaymentMethod}
            >
              {t('common:save-payment-method')}
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  )
}

export default PaymentStep
