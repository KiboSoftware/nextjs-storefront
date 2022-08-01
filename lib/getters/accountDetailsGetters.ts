import {
  CardCollection,
  CustomerContactCollection,
  Card,
  CustomerContact,
  CrPhone,
  CrAddress,
  CuAddress,
  CuPhone,
  Contact,
} from '../gql/types'
import { SavedCard, SavedBillingAddress } from '@/lib/types'

export interface PaymentAndBilling {
  cardInfo?: SavedCard
  billingAddressInfo?: SavedBillingAddress
}

// cards
const getCardNumberPart = (creditCardData?: SavedCard): string =>
  creditCardData?.cardNumberPart || ''
const getIsCardInfoSaved = (creditCardData?: SavedCard): boolean =>
  creditCardData?.isCardInfoSaved || false
const getExpireMonth = (creditCardData?: SavedCard): number => creditCardData?.expireMonth || 0
const getExpireYear = (creditCardData?: SavedCard): number => creditCardData?.expireYear || 0
const getCardType = (creditCardData?: SavedCard): string => creditCardData?.cardType || ''
const getCardId = (creditCardData?: SavedCard): string => creditCardData?.id || ''
const getIsDefaultPaymentMethod = (creditCardData?: SavedCard): boolean =>
  Boolean(creditCardData?.isDefaultPayMethod)
const getPaymentType = (creditCardData?: SavedCard): string => creditCardData?.paymentType || ''

const getCardDetails = (card: SavedCard) => {
  return {
    cardNumberPart: getCardNumberPart(card),
    isCardInfoSaved: getIsCardInfoSaved(card),
    cardType: getCardType(card),
    expireMonth: getExpireMonth(card),
    expireYear: getExpireYear(card),
    id: getCardId(card),
    isDefaultPaymentMethod: getIsDefaultPaymentMethod(card),
    paymentType: getPaymentType(card),
    contactId: card.contactId,
  }
}

// billing
const getContactNumbers = (contactNumbers?: CuPhone | null): CrPhone => {
  return {
    home: contactNumbers?.home || '',
    mobile: contactNumbers?.mobile || '',
    work: contactNumbers?.work || '',
  }
}
const getAddress = (address?: CuAddress | null): CrAddress => {
  return {
    address1: address?.address1 || '',
    address2: address?.address2 || '',
    address3: address?.address3 || '',
    address4: address?.address4 || '',
    addressType: address?.addressType || '',
    cityOrTown: address?.cityOrTown || '',
    postalOrZipCode: address?.postalOrZipCode || '',
    stateOrProvince: address?.stateOrProvince || '',
  }
}
const getFirstName = (billingData?: CustomerContact): string => billingData?.firstName || ''
const getLastNameOrSurname = (billingData?: CustomerContact): string =>
  billingData?.lastNameOrSurname || ''
const getBillingAddress = (billingData?: CustomerContact): CrAddress =>
  getAddress(billingData?.address)
const getPhoneNumbers = (billingData?: CustomerContact): CrPhone =>
  getContactNumbers(billingData?.phoneNumbers)
const getEmail = (billingData?: CustomerContact): string => billingData?.email || ''
const getId = (billingData?: CustomerContact) => billingData?.id || 0
const getIsSameBillingShippingAddress = (billingData?: any): boolean =>
  Boolean(billingData?.isSameBillingShippingAddress)

const getBillingDetails = (billingData: any): Contact => {
  return {
    firstName: getFirstName(billingData),
    lastNameOrSurname: getLastNameOrSurname(billingData),
    address: getBillingAddress(billingData),
    phoneNumbers: getPhoneNumbers(billingData),
    email: getEmail(billingData),
    id: getId(billingData),
  }
}

const getcustomerAccountCards = (customerAccountCards: CardCollection): Card[] =>
  customerAccountCards ? (customerAccountCards?.items as Card[]) : []

const getCustomerAccountContacts = (
  customerAccountContacts: CustomerContactCollection
): CustomerContact[] =>
  customerAccountContacts ? (customerAccountContacts?.items as CustomerContact[]) : []

const getSavedPaymentAndBillingDetails = (
  customerAccountCards: CardCollection,
  customerAccountContacts: CustomerContactCollection
): PaymentAndBilling[] => {
  const cards: Card[] = getcustomerAccountCards(customerAccountCards)
  const contacts: CustomerContact[] = getCustomerAccountContacts(customerAccountContacts)

  return cards?.map((card) => {
    const assoiciatedAddress = contacts?.find((contact) => contact.id === card.contactId)
    return {
      cardInfo: {
        ...getCardDetails(card),
        isCardInfoSaved: true,
        paymentType: 'creditcard',
      },
      billingAddressInfo: getBillingDetails(assoiciatedAddress),
    }
  })
}

const getDefaultPaymentBillingMethod = (allPaymentAndBillingInfo: PaymentAndBilling[]) => {
  return allPaymentAndBillingInfo?.find((each) => each?.cardInfo?.isDefaultPayMethod) || {}
}

const getOtherPaymentBillingMethod = (allPaymentAndBillingInfo: PaymentAndBilling[]) => {
  return allPaymentAndBillingInfo?.filter((each) => !each?.cardInfo?.isDefaultPayMethod) || []
}

const getTokenizedCardNumberMask = (tokenizedData: any): string => tokenizedData?.numberPart || ''
const getTokenizedId = (tokenizedData: any) => tokenizedData?.id || ''

export const accountDetailsGetters = {
  getcustomerAccountCards,
  getCustomerAccountContacts,
  getSavedPaymentAndBillingDetails,
  getDefaultPaymentBillingMethod,
  getOtherPaymentBillingMethod,
  getCardId,
  getIsSameBillingShippingAddress,
  getCardDetails,
  getBillingDetails,
  getTokenizedCardNumberMask,
  getTokenizedId,
}
