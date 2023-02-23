import { format } from 'date-fns'

import { ProductAttribute, DateFormat } from '../constants'
import { addressGetters } from '@/lib/getters'
import type { ProductCustom, PaymentAndBilling } from '@/lib/types'

import type {
  SbContact,
  SbProduct,
  Subscription,
  SbProductProperty,
  CrSubscriptionInfo,
  CustomerContact,
  SbBillingInfo,
} from '@/lib/gql/types'

const getSubscriberName = (subscription: Subscription) =>
  `${subscription?.fulfillmentInfo?.fulfillmentContact?.firstName} ${subscription?.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname}`

const getAddress = (subscription: Subscription) =>
  subscription?.fulfillmentInfo?.fulfillmentContact?.address

const getSubscriberAddress = (subscription: Subscription): string =>
  `${getAddress(subscription)?.address1} ${getAddress(subscription)?.cityOrTown} ${
    getAddress(subscription)?.stateOrProvince
  } ${getAddress(subscription)?.postalOrZipCode} ${getAddress(subscription)?.countryCode}`

const getSubscriptionFrequency = (subscription: Subscription | CrSubscriptionInfo) =>
  subscription?.frequency && `${subscription?.frequency?.value} ${subscription?.frequency?.unit}`

const nextOrderItemDate = (subscription: Subscription) => {
  if (!subscription) return
  return format(new Date(subscription?.nextOrderDate), DateFormat.DATE_FORMAT)
}

const getSubscriptionNumber = (subscription: Subscription) => subscription?.number

const getSubscriptionStatus = (subscription: Subscription) => subscription?.status

const getSubscriptionDetails = (subscription: any) => {
  return {
    subscriberName: getSubscriberName(subscription),
    subscriberAddress: getSubscriberAddress(subscription),
    subscriptionFrequency: getSubscriptionFrequency(subscription),
    nextOrderDate: nextOrderItemDate(subscription),
    subscriptionNumber: getSubscriptionNumber(subscription),
    subscriptionStatus: getSubscriptionStatus(subscription),
  }
}

const getFrequencyValues = (product: SbProduct | ProductCustom | null | undefined) => {
  if (!product) return

  return (
    (product?.properties as SbProductProperty[])?.find(
      (property) => property?.attributeFQN === ProductAttribute.SUBSCRIPTION_FREQUENCY
    )?.values || []
  )
}

const isSubscriptionModeAvailable = (product: ProductCustom | null | undefined) => {
  if (!product) return false

  return (
    product?.properties?.some(
      (property) => property?.attributeFQN === ProductAttribute.SUBSCRIPTION_Mode
    ) || false
  )
}

const getFrequencyUnitAndValue = (selectedFrequency: string) => {
  const [value, unit] = selectedFrequency.split(' ')

  // API accepts unit as singular ex. day or month
  const isUnitPlural = unit.charAt(unit.length - 1).toLowerCase() === 's'
  const unitSingular = isUnitPlural ? unit.slice(0, unit.length - 1) : unit

  return {
    value: +value,
    unit: unitSingular,
  }
}

const getFormattedAddress = (subscription: Subscription) => {
  if (!subscription) return

  const formattedAddress = addressGetters
    .getFormattedAddress(subscription.fulfillmentInfo?.fulfillmentContact as SbContact)
    .trim()

  return {
    formattedAddress,
    fulfillmentContact: subscription.fulfillmentInfo?.fulfillmentContact as SbContact,
  }
}

const getFormattedSubscriptionShippingAddress = (customerContacts: CustomerContact) => {
  if (!customerContacts) return

  const formattedAddress = addressGetters.getFormattedAddress(customerContacts as SbContact).trim()

  return {
    formattedAddress,
    fulfillmentContact: {
      firstName: customerContacts.firstName,
      lastNameOrSurname: customerContacts.lastNameOrSurname,
      email: customerContacts.email,
      address: { ...customerContacts.address },
      phoneNumbers: { ...customerContacts.phoneNumbers },
    },
  }
}

const getSubscriptionReasons = (subscription: Subscription) => subscription?.reasons

const getFormattedSavedCardBillingAddress = (text: string, card: PaymentAndBilling) => {
  const formattedAddress = addressGetters.getFormattedAddress(
    card.billingAddressInfo?.contact as SbContact
  )

  const cardNumberPart = card.cardInfo?.cardNumberPart

  return {
    formattedAddress: `${text} ${cardNumberPart}, ${formattedAddress}`,
    cardInfo: card.cardInfo,
    billingAddressInfo: card.billingAddressInfo?.contact as SbContact,
  }
}

const getFormattedSubscriptionBillingAddress = (text: string, billingInfo: SbBillingInfo) => {
  const formattedAddress = addressGetters.getFormattedAddress(
    billingInfo.billingContact as SbContact
  )

  const cardNumberPart = billingInfo.card?.cardNumberPartOrMask

  return {
    formattedAddress: `${text} ${cardNumberPart}, ${formattedAddress}`,
    cardInfo: billingInfo.card,
    billingAddressInfo: billingInfo.billingContact as SbContact,
  }
}

export const subscriptionGetters = {
  getSubscriberName,
  getSubscriberAddress,
  nextOrderItemDate,
  getSubscriptionNumber,
  getSubscriptionStatus,
  getSubscriptionFrequency,
  getSubscriptionDetails,
  getFrequencyValues,
  isSubscriptionModeAvailable,
  getFrequencyUnitAndValue,
  getSubscriptionReasons,
  getFormattedAddress,
  getFormattedSubscriptionShippingAddress,
  getFormattedSavedCardBillingAddress,
  getFormattedSubscriptionBillingAddress,
}
