import { cardGetters } from './cardGetters'
import { AddressType, PaymentType } from '@/lib/constants'

import type {
  Card,
  CardCollection,
  Contact,
  CustomerAccount,
  CustomerContact,
  CustomerContactCollection,
} from '../gql/types'
import type { PaymentAndBilling, SavedCard } from '../types'

const getSavedAddresses = (customerAccountContacts: CustomerContactCollection): CustomerContact[] =>
  customerAccountContacts ? (customerAccountContacts?.items as CustomerContact[]) : []

const getSavedCards = (customerAccountCards: CardCollection): Card[] =>
  customerAccountCards ? (customerAccountCards?.items as Card[]) : []

const getAddresses = (addresses: CustomerContact[], addressType: string): CustomerContact[] => {
  return addresses
    ?.filter(
      (item: CustomerContact) =>
        item?.types && item.types[0]?.name?.toLowerCase() === addressType.toLowerCase()
    )
    ?.sort((a: any, b: any) => b?.types[0]?.isPrimary - a?.types[0]?.isPrimary)
}

const getUserShippingAddress = (addresses: CustomerContact[]): CustomerContact[] | undefined => {
  if (addresses?.length) return getAddresses(addresses, AddressType.SHIPPING)
}
const getUserBillingAddresses = (addresses: CustomerContact[]): CustomerContact[] | undefined => {
  if (addresses?.length) if (addresses?.length) return getAddresses(addresses, AddressType.BILLING)
}

const getSavedCardsAndBillingDetails = (
  customerAccountCards: CardCollection,
  customerAccountContacts: CustomerContactCollection
): PaymentAndBilling[] => {
  const cards: Card[] = getSavedCards(customerAccountCards)
  const contacts: CustomerContact[] = getSavedAddresses(customerAccountContacts)

  if (!(cards && contacts)) return []

  return cards?.map((card: Card) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accountId, types, ...rest } = contacts?.find(
      (contact) => contact.id === card.contactId
    ) as CustomerContact
    return {
      cardInfo: {
        ...cardGetters.getCardDetails(card as SavedCard),
        isCardInfoSaved: true,
        paymentType: PaymentType.CREDITCARD,
      },
      billingAddressInfo: {
        contact: rest as Contact,
      },
    }
  })
}

const getDefaultPaymentBillingMethod = (allPaymentAndBillingInfo: PaymentAndBilling[]) => {
  return allPaymentAndBillingInfo?.find((each) => each?.cardInfo?.isDefaultPayMethod) || {}
}

const getFirstName = (user: CustomerAccount) => user?.firstName || ''

const getLastName = (user: CustomerAccount) => user?.lastName || ''

const getFullName = (user: CustomerAccount) => `${getFirstName(user)} ${getLastName(user)}`

const getEmailAddress = (user: CustomerAccount) => user?.emailAddress || ''

const getUserId = (user: CustomerAccount) => user?.id

const getPersonalDetails = (user: CustomerAccount) => ({
  firstName: getFirstName(user),
  lastName: getLastName(user),
  emailAddress: getEmailAddress(user),
  fullName: getFullName(user),
  id: getUserId(user),
})

const getAllShippingAddresses = (
  checkoutShippingContact: Contact,
  userShippingAddress: CustomerContact[] = []
) => {
  if (!userShippingAddress.length && checkoutShippingContact === null) {
    return []
  }

  const existingAddressId = userShippingAddress?.findIndex(
    (address) => address?.id === checkoutShippingContact?.id
  )

  if (existingAddressId < 0) {
    userShippingAddress?.unshift(checkoutShippingContact as CustomerContact)
  } else {
    userShippingAddress[existingAddressId] = {
      ...userShippingAddress[existingAddressId],
      ...(checkoutShippingContact as CustomerContact),
    }
  }
  return userShippingAddress
}

const getDefaultShippingAddress = (addresses: CustomerContact[]) =>
  addresses?.find(
    (each) =>
      each?.types &&
      each?.types?.some((type) => type?.name === AddressType.SHIPPING && type?.isPrimary)
  )

const getOtherShippingAddress = (
  addresses: CustomerContact[],
  defaultShippingAddressId: number
) => {
  return (
    Array.from(new Set(addresses?.filter((each) => each?.id != defaultShippingAddressId))) || []
  )
}

export const userGetters = {
  getUserShippingAddress,
  getUserBillingAddresses,
  getSavedAddresses,
  getSavedCards,
  getSavedCardsAndBillingDetails,
  getDefaultPaymentBillingMethod,

  getFirstName,
  getLastName,
  getFullName,
  getEmailAddress,
  getUserId,
  getPersonalDetails,
  getAllShippingAddresses,
  getDefaultShippingAddress,
  getOtherShippingAddress,
}
