import React, { useEffect, useState } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'

import { CardDetailsForm, SavedPaymentMethodView } from '@/components/checkout'
import { AddressForm, AddressDetailsView } from '@/components/common'
import { ConfirmationDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { useDeleteCustomerCardsMutation, useDeleteCustomerAddressMutation } from '@/hooks'
import { DisplayMode, AddressType } from '@/lib/constants'
import { addressGetters, cardGetters, userGetters } from '@/lib/getters'
import { tokenizeCreditCardPayment } from '@/lib/helpers'
import type {
  Address,
  CardForm,
  ContactForm,
  PaymentAndBilling,
  SavedCard,
  TokenizedCard,
  BillingAddress,
  CardType,
} from '@/lib/types'

import type {
  CardCollection,
  CrAddress,
  CustomerAccount,
  CustomerContactCollection,
  CustomerContactInput,
} from '@/lib/gql/types'

interface PaymentMethodProps {
  user: CustomerAccount
  cards: CardCollection
  contacts: CustomerContactCollection
  displayMode?: 'Edit' | 'AddNew'
  isAddressFormInDialog?: boolean
  onSave: (address: BillingAddress, card: CardType, isUpdatingAddress: boolean) => void
  onClose?: () => void
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

const styles = {
  addPaymentMethodButtonStyle: {
    maxWidth: '26.313rem',
    '& > *:first-of-type': {
      fontSize: 'inherit',
    },
  },
}
const PaymentMethod = (props: PaymentMethodProps) => {
  const {
    user,
    cards,
    contacts,
    displayMode = DisplayMode.EDIT,
    isAddressFormInDialog = false,
    onSave,
    onClose,
  } = props
  const { t } = useTranslation('common')

  const { showModal } = useModalContext()

  const savedCardsAndContacts = userGetters.getSavedCardsAndBillingDetails(cards, contacts)
  const savedAddresses = userGetters.getSavedAddresses(contacts)
  const billingAddresses = userGetters.getUserBillingAddresses(savedAddresses)
  const { deleteSavedCardDetails } = useDeleteCustomerCardsMutation()

  const { deleteSavedAddressDetails } = useDeleteCustomerAddressMutation()

  const [cardFormDetails, setCardFormDetails] = useState<CardForm>(initialCardFormData)
  const [billingFormAddress, setBillingFormAddress] = useState<Address>(initialBillingAddressData)
  const [validateForm, setValidateForm] = useState<boolean>(false)
  const [isAddingNewPayment, setIsAddingNewPayment] = useState<boolean>(
    displayMode === DisplayMode.ADDNEW
  )
  const [showBillingFormAddress, setShowBillingFormAddress] = useState<boolean>(false)

  const [isDefaultPaymentMethod, setIsDefaultPaymentMethod] = useState<boolean>(false)

  const handleCardFormData = (cardData: CardForm) => {
    setCardFormDetails({
      ...cardFormDetails,
      ...cardData,
    })
  }

  const handleBillingFormAddress = (address: Address) => {
    setBillingFormAddress({ ...address })
  }

  const handleCardFormValidDetails = (isValid: boolean) => {
    setCardFormDetails({
      ...cardFormDetails,
      isCardDetailsValidated: isValid,
    })
  }

  const handleBillingFormValidDetails = (isValid: boolean) => {
    setBillingFormAddress({
      ...billingFormAddress,
      isAddressValid: isValid,
    })
  }

  const handleAddressRadioSelection = (value: string) => {
    const selected = billingAddresses?.find((address) => address.id === Number(value))
    setBillingFormAddress({
      ...billingFormAddress,
      contact: selected as ContactForm,
      isAddressValid: true,
      isDataUpdated: true,
    })
  }

  const handleAddNewBillingAddress = () => {
    setShowBillingFormAddress(true)
    setBillingFormAddress(initialBillingAddressData)
  }

  const handleEdit = (cardAndAddressDetails: PaymentAndBilling) => {
    setIsAddingNewPayment(true)
    setCardFormDetails({
      id: cardGetters.getCardId(cardAndAddressDetails.cardInfo),
      cardNumber: cardGetters.getCardNumberPart(cardAndAddressDetails.cardInfo),
      expireMonth: cardGetters.getExpireMonth(cardAndAddressDetails.cardInfo),
      expireYear: cardGetters.getExpireYear(cardAndAddressDetails.cardInfo),
      expiryDate: cardGetters.getExpireDate(cardAndAddressDetails.cardInfo),
      cardType: cardGetters.getCardType(cardAndAddressDetails.cardInfo),
      isDataUpdated: false,
    })

    setBillingFormAddress({
      ...billingFormAddress,
      contact: cardAndAddressDetails.billingAddressInfo?.contact as ContactForm,
      isAddressValid: true,
      isDataUpdated: true,
    })
  }

  const openDeleteConfirmation = (card: SavedCard) => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        onConfirm: () => handleDeletePaymentMethod(card),
        contentText: t('delete-confirmation-text'),
        primaryButtonText: t('delete'),
      },
    })
  }

  const handleDeletePaymentMethod = async (card: SavedCard) => {
    if (card.contactId) {
      const addressData = {
        accountId: user.id,
        contactId: card.contactId,
      }
      await deleteSavedAddressDetails.mutateAsync(addressData)
    }

    await deleteSavedCardDetails.mutateAsync({ accountId: user.id, cardId: card.id as string })
  }

  const cancelAddingNewPaymentMethod = () => {
    setValidateForm(false)

    setCardFormDetails(initialCardFormData)
    setBillingFormAddress(initialBillingAddressData)

    if (displayMode === DisplayMode.EDIT) {
      setIsAddingNewPayment(false)
      setShowBillingFormAddress(false)
    } else {
      if (showBillingFormAddress) setShowBillingFormAddress(false)
      if (!showBillingFormAddress) onClose && onClose()
    }
  }

  const handleSaveNewPaymentMethod = async (event: { detail: number }) => {
    // It will execute only once on multiple clicks
    if (!event.detail || event.detail == 1) {
      setValidateForm(true)
    }
  }

  const isAddPaymentMethodButtonDisabled = () => {
    return !(billingFormAddress.isAddressValid && cardFormDetails.isCardDetailsValidated)
  }

  const handleAddNewPaymentMethod = () => {
    setIsAddingNewPayment(true)
    setCardFormDetails(initialCardFormData)
    setBillingFormAddress(initialBillingAddressData)
  }

  const getAddress = async () => {
    const addressData = {
      accountId: user.id,
      contactId: 0,
      customerContactInput: {
        ...billingFormAddress.contact,
        accountId: user.id,
      } as CustomerContactInput,
    }

    if (billingFormAddress.contact.id) {
      addressData.contactId = billingFormAddress.contact.id
    } else {
      addressData.customerContactInput.types = [
        {
          name: AddressType.BILLING,
          isPrimary: isDefaultPaymentMethod,
        },
      ]
      addressData.customerContactInput.accountId = user.id
    }

    return { ...addressData }
  }

  const handleCardAndBillingAddress = async (tokenizedCardResponse?: TokenizedCard) => {
    const isUpdatingAddress = billingFormAddress.contact.id ? true : false
    const address = await getAddress()
    const accountId = user.id
    const cardId = cardGetters.getCardId(cardFormDetails)

    const cardInput = {
      id: cardId ? cardId : tokenizedCardResponse?.id,
      contactId: 0,
      cardType: cardGetters.getCardType(cardFormDetails),
      cardNumberPart: cardGetters.getCardNumber(cardFormDetails),
      expireMonth: cardGetters.getExpireMonth(cardFormDetails),
      expireYear: cardGetters.getExpireYear(cardFormDetails),
      isDefaultPayMethod: isDefaultPaymentMethod,
    }

    onSave(address, { accountId, cardId, cardInput }, isUpdatingAddress)
    cancelAddingNewPaymentMethod()
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

    handleCardAndBillingAddress(tokenizedCardResponse)
  }

  // when payment card and billing address info is available, handleTokenization
  useEffect(() => {
    if (isAddingNewPayment && billingFormAddress.isDataUpdated && cardFormDetails.isDataUpdated) {
      if (cardGetters.getCardId(cardFormDetails)) {
        handleCardAndBillingAddress()
      } else if (cardGetters.getCardNumber(cardFormDetails)) {
        handleTokenization({ ...cardFormDetails })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isAddingNewPayment,
    cardFormDetails.cardNumber,
    cardFormDetails.isDataUpdated,
    billingFormAddress.isDataUpdated,
  ])

  return (
    <Box width="100%">
      {!isAddingNewPayment && (
        <Stack gap={2}>
          {!savedCardsAndContacts?.length && (
            <Typography variant="body1">{t('no-saved-addresses-yet')}</Typography>
          )}

          {savedCardsAndContacts?.map((each) => (
            <Stack key={each?.cardInfo?.id as string} data-testid="saved-cards-and-contacts">
              {each.cardInfo?.isDefaultPayMethod && (
                <Typography variant="body1" fontWeight={700}>
                  {t('primary')}
                </Typography>
              )}
              <Box display="flex" justifyContent={'space-between'}>
                <SavedPaymentMethodView
                  displayRowDirection={false}
                  displayTitle={false}
                  id={cardGetters.getCardId(each.cardInfo)}
                  cardNumberPart={cardGetters.getCardNumberPart(each.cardInfo)}
                  expireMonth={cardGetters.getExpireMonth(each.cardInfo)}
                  expireYear={cardGetters.getExpireYear(each.cardInfo)}
                  cardType={cardGetters.getCardType(each.cardInfo)}
                  {...addressGetters.getAddress(
                    each?.billingAddressInfo?.contact?.address as CrAddress
                  )}
                />
                <Stack gap={1}>
                  <Typography
                    variant="body2"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleEdit(each)}
                    data-testid="payment-method-edit-link"
                  >
                    {t('edit')}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => openDeleteConfirmation(each.cardInfo as SavedCard)}
                  >
                    {t('delete')}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          ))}
          <Button
            variant="contained"
            color="inherit"
            sx={{ ...styles.addPaymentMethodButtonStyle }}
            onClick={() => handleAddNewPaymentMethod()}
            startIcon={<AddCircleOutlineIcon />}
          >
            {t('add-payment-method')}
          </Button>
        </Stack>
      )}

      {isAddingNewPayment && (
        <Stack>
          <CardDetailsForm
            {...(cardGetters.getCardId(cardFormDetails) && {
              cardValue: {
                ...cardFormDetails,
              },
            })}
            validateForm={validateForm}
            onSaveCardData={handleCardFormData}
            onFormStatusChange={handleCardFormValidDetails}
          />

          <Stack display={'flex'} paddingY={2} gap={2} pl={1}>
            {!showBillingFormAddress && (
              <>
                {billingAddresses?.length ? (
                  <Typography variant="h4" fontWeight={'bold'}>
                    {t('select-billing-address')}
                  </Typography>
                ) : (
                  handleAddNewBillingAddress()
                )}
                {billingAddresses?.map((address, index) => {
                  return (
                    <AddressDetailsView
                      key={address.id}
                      radio={true}
                      id={address.id as number}
                      isPrimary={index === 0}
                      firstName={address.firstName as string}
                      middleNameOrInitial={address.middleNameOrInitial as string}
                      lastNameOrSurname={address.lastNameOrSurname as string}
                      address1={address.address?.address1 as string}
                      address2={address.address?.address2 as string}
                      cityOrTown={address.address?.cityOrTown as string}
                      stateOrProvince={address.address?.stateOrProvince as string}
                      postalOrZipCode={address.address?.postalOrZipCode as string}
                      selected={billingFormAddress.contact.id}
                      handleRadioChange={handleAddressRadioSelection}
                    />
                  )
                })}
              </>
            )}

            {showBillingFormAddress && (
              <>
                <Typography variant="h3" fontWeight={'bold'}>
                  {t('billing-address')}
                </Typography>
                <AddressForm
                  setAutoFocus={false}
                  isUserLoggedIn={true}
                  onSaveAddress={handleBillingFormAddress}
                  validateForm={validateForm}
                  onFormStatusChange={handleBillingFormValidDetails}
                  isAddressFormInDialog={isAddressFormInDialog}
                />
                <FormControlLabel
                  sx={{ width: '100%', pl: '0.5rem' }}
                  control={<Checkbox />}
                  label={`${t('make-this-my-default-payment')}`}
                  onChange={(_, value) => setIsDefaultPaymentMethod(value)}
                />
              </>
            )}

            {!showBillingFormAddress && (
              <Button
                variant="contained"
                color="inherit"
                onClick={handleAddNewBillingAddress}
                sx={{ maxWidth: '26rem' }}
              >
                {t('add-new-address')}
              </Button>
            )}
          </Stack>

          <Stack pl={1} paddingY={2} gap={2} sx={{ maxWidth: '26.313rem' }}>
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
        </Stack>
      )}
    </Box>
  )
}

export default PaymentMethod
