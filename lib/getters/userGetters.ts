import { cardGetters } from './cardGetters'
import { AddressType, PaymentType } from '@/lib/constants'

import type {
  B2BUser,
  Card,
  CardCollection,
  CrContact,
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
  if (!addresses?.length) {
    return []
  }
  return addresses
    ?.filter(
      (item: CustomerContact) =>
        item?.types && item.types[0]?.name?.toLowerCase() === addressType.toLowerCase()
    )
    ?.sort((a: any, b: any) => b?.types[0]?.isPrimary - a?.types[0]?.isPrimary)
}

const getUserShippingAddress = (addresses: CustomerContact[]): CustomerContact[] | undefined =>
  getAddresses(addresses, AddressType.SHIPPING)

const getUserBillingAddresses = (addresses: CustomerContact[]): CustomerContact[] =>
  getAddresses(addresses, AddressType.BILLING)

const getSavedCardsAndBillingDetails = (
  customerAccountCards: CardCollection,
  customerAccountContacts: CustomerContactCollection
): PaymentAndBilling[] => {
  const cards: Card[] = getSavedCards(customerAccountCards)
  const contacts: CustomerContact[] = getUserBillingAddresses(
    customerAccountContacts.items as CustomerContact[]
  )

  if (!cards?.length) return []

  return cards?.map((card: Card) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedContact = contacts?.find(
      (contact) => contact.id === card.contactId
    ) as CustomerContact

    const { accountId, types, ...rest } = selectedContact
      ? selectedContact
      : { accountId: 0, types: undefined }

    return {
      cardInfo: {
        ...cardGetters.getCardDetails(card as SavedCard),
        isCardInfoSaved: true,
        paymentType: PaymentType.CREDITCARD,
      },
      billingAddressInfo: {
        contact: rest as CrContact,
      },
    }
  })
}

const getDefaultPaymentBillingMethod = (allPaymentAndBillingInfo: PaymentAndBilling[]) => {
  return allPaymentAndBillingInfo?.find((each) => each?.cardInfo?.isDefaultPayMethod) || {}
}

const getFirstName = (user: CustomerAccount | B2BUser | undefined | null) => user?.firstName ?? ''

const getLastName = (user: CustomerAccount | B2BUser | undefined | null) => user?.lastName ?? ''

const getFullName = (user: CustomerAccount) => `${getFirstName(user)} ${getLastName(user)}`

const getEmailAddress = (user: CustomerAccount | B2BUser | undefined | null) =>
  user?.emailAddress ?? ''

const getUserId = (user: CustomerAccount) => user?.id

const getAllShippingAddresses = (
  checkoutShippingContact: CrContact,
  userShippingAddress: CustomerContact[] = []
) => {
  if (!userShippingAddress.length && checkoutShippingContact === null) {
    return []
  }

  // If checkout has fulfillmentInfo and it is one of the account saved addresses
  const existingAddressId = checkoutShippingContact
    ? userShippingAddress?.findIndex((address) => address?.id === checkoutShippingContact?.id)
    : -1

  if (existingAddressId < 0) {
    if (checkoutShippingContact) {
      // If no, add it to userShippingAddress
      userShippingAddress?.unshift(checkoutShippingContact as CustomerContact)
    }
  } else {
    // If yes, update the entry
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

const getCustomerAccountDetails = (user: CustomerAccount) => {
  return {
    id: getUserId(user),
    firstName: getFirstName(user),
    lastName: getLastName(user),
    emailAddress: getEmailAddress(user),
    fullName: getFullName(user),
  }
}

const getCustomerB2BUsers = (items: B2BUser[]) => items

const getRole = (b2BUser: B2BUser | undefined | null) => b2BUser?.roles?.[0]?.roleName ?? 'N/A'
const getStatus = (b2BUser: B2BUser | undefined | null): boolean | undefined | null =>
  b2BUser?.isActive

export const userGetters = {
  getUserShippingAddress,
  getUserBillingAddresses,
  getSavedAddresses,
  getSavedCardsAndBillingDetails,
  getDefaultPaymentBillingMethod,
  getCustomerAccountDetails,
  getFirstName,
  getLastName,
  getFullName,
  getEmailAddress,
  getUserId,
  getAllShippingAddresses,
  getDefaultShippingAddress,
  getOtherShippingAddress,
  getCustomerB2BUsers,
  getRole,
  getStatus,
}
