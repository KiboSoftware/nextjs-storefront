import { PaymentType } from '../constants'
import { SavedCard } from './../types/PaymentTypes'
import { cardGetters } from '@/lib/getters'
import type { PaymentAndBilling } from '@/lib/types'

import type {
  CardCollection,
  CustomerContactCollection,
  Card,
  CustomerContact,
  Contact,
} from '@/lib/gql/types'

const getCustomerAccountCards = (customerAccountCards: CardCollection): Card[] =>
  customerAccountCards ? (customerAccountCards?.items as Card[]) : []

const getCustomerAccountContacts = (
  customerAccountContacts: CustomerContactCollection
): CustomerContact[] =>
  customerAccountContacts ? (customerAccountContacts?.items as CustomerContact[]) : []

const getSavedCardsAndBillingDetails = (
  customerAccountCards: CardCollection,
  customerAccountContacts: CustomerContactCollection
): PaymentAndBilling[] => {
  const cards: Card[] = getCustomerAccountCards(customerAccountCards)
  const contacts: CustomerContact[] = getCustomerAccountContacts(customerAccountContacts)

  return cards?.map((card) => {
    const associatedAddress = contacts?.find((contact) => contact.id === card.contactId)
    return {
      cardInfo: {
        ...cardGetters.getCardDetails(card as SavedCard),
        isCardInfoSaved: true,
        paymentType: PaymentType.CREDITCARD,
      },
      billingAddressInfo: {
        contact: associatedAddress as Contact,
      },
    }
  })
}

const getDefaultPaymentBillingMethod = (allPaymentAndBillingInfo: PaymentAndBilling[]) => {
  return allPaymentAndBillingInfo?.find((each) => each?.cardInfo?.isDefaultPayMethod) || {}
}

const getOtherPaymentBillingMethod = (allPaymentAndBillingInfo: PaymentAndBilling[]) => {
  return allPaymentAndBillingInfo?.filter((each) => !each?.cardInfo?.isDefaultPayMethod) || []
}

export const accountDetailsGetters = {
  getCustomerAccountCards,
  getCustomerAccountContacts,
  getSavedCardsAndBillingDetails,
  getDefaultPaymentBillingMethod,
  getOtherPaymentBillingMethod,
}
