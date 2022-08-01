import { Card, Contact } from '../gql/types'

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
}

export interface SavedCard extends Card {
  isCardInfoSaved?: boolean
  paymentType?: string
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
  isBillingAddressValid: boolean
  isSameBillingShippingAddress?: boolean
}

export interface SavedBillingAddress extends Contact {
  isSameBillingShippingAddress?: boolean
}
