import type { CrContact, CustomerContactInput } from '../gql/types'

export interface CardTypeForCheckout {
  paymentType: string
  isCardInfoSaved: boolean
  cardType: string
  expireMonth: number
  expireYear: number
  paymentWorkflow: string
}

export interface PaymentAndBilling {
  cardInfo?: SavedCard
  billingAddressInfo?: SavedBillingAddress
}

export interface TokenizedCard {
  balance?: number
  id?: string
  isSuccessful?: boolean
  numberPart?: string
  isNewCard?: boolean
}

export interface CardForm {
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardType?: string
  expireMonth?: number
  expireYear?: number
  isCardDetailsValidated?: boolean
  isCardInfoSaved?: boolean
  id?: string
  isDataUpdated?: boolean
}

export interface SavedCard {
  cardNumberPart?: string
  cardType?: string
  expireMonth?: number
  expireYear?: number
  id?: string
  isDefaultPayMethod?: boolean
  nameOnCard?: string
  isCardInfoSaved?: boolean
  paymentType?: string
  contactId?: number
  cardNumber?: string
}

export interface ContactForm {
  id?: number
  firstName: string
  lastNameOrSurname: string
  middleNameOrInitial?: string
  email?: string
  address: {
    address1: string
    address2: string
    address3?: string
    address4?: string
    addressType?: string
    cityOrTown: string
    countryCode: string
    isValidated?: boolean
    postalOrZipCode: string
    stateOrProvince: string
  }
  phoneNumbers: {
    home: string
    mobile?: string
    work?: string
  }
}
export interface Address {
  contact: ContactForm
  isAddressValid?: boolean
  isSameBillingShippingAddress?: boolean
  isDataUpdated?: boolean
}

export interface SavedBillingAddress {
  contact: CrContact
  isSameBillingShippingAddress?: boolean
}

export interface BillingAddress {
  accountId: number
  contactId: number
  customerContactInput: CustomerContactInput
}

export interface CardType {
  accountId: number
  cardId: string
  cardInput: {
    id: string | undefined
    contactId: number
    cardType: string
    cardNumberPart: string
    expireMonth: number
    expireYear: number
    isDefaultPayMethod: boolean
  }
}
