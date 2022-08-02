import { PaymentType } from '../constants'
import { billingGetters, cardGetters } from '@/lib/getters'
import type { PaymentAndBilling } from '@/lib/types'

import type {
  CardCollection,
  CustomerContactCollection,
  Card,
  CustomerContact,
} from '@/lib/gql/types'

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
        ...cardGetters.getCardDetails(card),
        isCardInfoSaved: true,
        paymentType: PaymentType.CREDITCARD,
      },
      billingAddressInfo: billingGetters.getBillingDetails(assoiciatedAddress as CustomerContact),
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
  getcustomerAccountCards,
  getCustomerAccountContacts,
  getSavedPaymentAndBillingDetails,
  getDefaultPaymentBillingMethod,
  getOtherPaymentBillingMethod,
}
