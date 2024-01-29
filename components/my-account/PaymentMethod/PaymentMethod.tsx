import React, { useEffect, useState } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Button, Checkbox, FormControlLabel, NoSsr, Stack, Typography } from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'

import { CardDetailsForm } from '@/components/checkout'
import { AddressForm, KiboPagination, AddressCard, KiboRadio } from '@/components/common'
import PaymentBillingCard from '@/components/common/PaymentBillingCard/PaymentBillingCard'
import { ConfirmationDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { useDeleteCustomerCard, useDeleteCustomerAddress } from '@/hooks'
import { DisplayMode, AddressType } from '@/lib/constants'
import { addressGetters, cardGetters, userGetters } from '@/lib/getters'
import { actions, hasPermission, tokenizeCreditCardPayment } from '@/lib/helpers'
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
  const { publicRuntimeConfig } = getConfig()
  const paymentMethodPageSize = publicRuntimeConfig?.paymentMethodPageSize

  const [paymentMethodStartIndex, setPaymentMethodStartIndex] = useState<number>(0)
  const savedCardsAndContacts = userGetters.getSavedCardsAndBillingDetails(cards, contacts)

  const [displaySavedCardsAndContacts, setSavedCardsAndContacts] = useState<PaymentAndBilling[]>(
    savedCardsAndContacts?.slice(paymentMethodStartIndex, paymentMethodPageSize)
  )
  const savedAddresses = userGetters.getSavedAddresses(contacts)
  const billingAddresses = userGetters.getUserBillingAddresses(savedAddresses)

  const { deleteCustomerCard } = useDeleteCustomerCard()
  const { deleteCustomerAddress } = useDeleteCustomerAddress()

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
      isDefaultPayMethod: cardGetters.getIsDefaultPayMethod(cardAndAddressDetails.cardInfo),
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
      await deleteCustomerAddress.mutateAsync(addressData)
    }

    await deleteCustomerCard.mutateAsync({ accountId: user.id, cardId: card.id as string })
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
    }
    addressData.customerContactInput.types = [
      {
        name: AddressType.BILLING,
        isPrimary: isDefaultPaymentMethod,
      },
    ]
    addressData.customerContactInput.accountId = user.id

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
  const handlePaymentMethodPagination = (value: any) => {
    const { startIndex } = value
    const slicedValues = savedCardsAndContacts.slice(startIndex, startIndex + paymentMethodPageSize)
    setPaymentMethodStartIndex(startIndex)
    setSavedCardsAndContacts(slicedValues)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  useEffect(() => {
    setSavedCardsAndContacts(
      savedCardsAndContacts.slice(
        paymentMethodStartIndex,
        paymentMethodStartIndex + paymentMethodPageSize
      )
    )
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [JSON.stringify(savedCardsAndContacts)])

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
          <NoSsr>
            {!hasPermission(actions.VIEW_PAYMENTS) && (
              <Typography variant="body1">{t('not-authorized-payment-information')}</Typography>
            )}
            {hasPermission(actions.VIEW_PAYMENTS) && !displaySavedCardsAndContacts?.length && (
              <Typography variant="body1">{t('no-saved-payments-yet')}</Typography>
            )}
            {hasPermission(actions.VIEW_PAYMENTS) &&
              displaySavedCardsAndContacts?.map((each: PaymentAndBilling) => (
                <Stack key={each?.cardInfo?.id as string} data-testid="saved-cards-and-contacts">
                  {each.cardInfo?.isDefaultPayMethod && (
                    <Typography variant="body1" fontWeight={700}>
                      {t('primary')}
                    </Typography>
                  )}
                  <Box display="flex" justifyContent={'space-between'}>
                    <PaymentBillingCard
                      cardNumberPart={cardGetters.getCardNumberPart(each.cardInfo)}
                      expireMonth={cardGetters.getExpireMonth(each.cardInfo)}
                      expireYear={cardGetters.getExpireYear(each.cardInfo)}
                      cardType={cardGetters.getCardType(each.cardInfo)}
                      paymentType={cardGetters.getPaymentType(each.cardInfo)}
                      {...addressGetters.getAddress(
                        each?.billingAddressInfo?.contact?.address as CrAddress
                      )}
                    />
                    <Stack gap={1}>
                      {hasPermission(actions.EDIT_PAYMENTS) && (
                        <Typography
                          variant="body2"
                          sx={{ cursor: 'pointer' }}
                          onClick={() => handleEdit(each)}
                          data-testid="payment-method-edit-link"
                        >
                          {t('edit')}
                        </Typography>
                      )}
                      {hasPermission(actions.DELETE_PAYMENTS) && (
                        <Typography
                          variant="body2"
                          sx={{ cursor: 'pointer' }}
                          onClick={() => openDeleteConfirmation(each.cardInfo as SavedCard)}
                        >
                          {t('delete')}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              ))}
            {hasPermission(actions.CREATE_PAYMENTS) && (
              <Button
                variant="contained"
                color="inherit"
                sx={{ ...styles.addPaymentMethodButtonStyle }}
                onClick={() => handleAddNewPaymentMethod()}
                startIcon={<AddCircleOutlineIcon />}
              >
                {t('add-payment-method')}
              </Button>
            )}
          </NoSsr>
          {displaySavedCardsAndContacts?.length > 0 && savedCardsAndContacts.length > 5 && (
            <Box display={'flex'} justifyContent={'center'} width="100%" py={10}>
              <KiboPagination
                count={Math.ceil(savedCardsAndContacts.length / paymentMethodPageSize)}
                startIndex={paymentMethodStartIndex}
                pageSize={paymentMethodPageSize}
                onPaginationChange={handlePaymentMethodPagination}
              />
            </Box>
          )}
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
            showCvv={false}
            onSaveCardData={handleCardFormData}
            onFormStatusChange={handleCardFormValidDetails}
          />

          <Stack display={'flex'} paddingY={2} gap={2} pl={1}>
            {!showBillingFormAddress && (
              <>
                {billingAddresses?.length ? (
                  <Typography variant="subtitle2" fontWeight={'bold'}>
                    {t('select-billing-address')}
                  </Typography>
                ) : (
                  handleAddNewBillingAddress()
                )}

                <KiboRadio
                  radioOptions={billingAddresses?.map((address, index) => {
                    return {
                      value: String(address.id),
                      name: String(address.id),
                      optionIndicator: index === 0 ? t('primary') : '',
                      label: (
                        <AddressCard
                          firstName={address.firstName as string}
                          middleNameOrInitial={address.middleNameOrInitial as string}
                          lastNameOrSurname={address.lastNameOrSurname as string}
                          address1={address.address?.address1 as string}
                          address2={address.address?.address2 as string}
                          cityOrTown={address.address?.cityOrTown as string}
                          stateOrProvince={address.address?.stateOrProvince as string}
                          postalOrZipCode={address.address?.postalOrZipCode as string}
                        />
                      ),
                    }
                  })}
                  selected={String(billingFormAddress.contact.id)}
                  align="flex-start"
                  onChange={handleAddressRadioSelection}
                />
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
              </>
            )}

            {Boolean(savedCardsAndContacts?.length) && (
              <FormControlLabel
                sx={{ width: '100%', pl: '0.5rem' }}
                defaultChecked={cardFormDetails.isDefaultPayMethod}
                control={<Checkbox defaultChecked={cardFormDetails.isDefaultPayMethod} />}
                label={`${t('make-this-my-default-payment')}`}
                onChange={(_, value) => setIsDefaultPaymentMethod(value)}
              />
            )}

            <NoSsr>
              {hasPermission(actions.CREATE_CONTACTS) && !showBillingFormAddress && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAddNewBillingAddress}
                  sx={{ maxWidth: '26rem' }}
                >
                  {t('add-new-address')}
                </Button>
              )}
            </NoSsr>
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
