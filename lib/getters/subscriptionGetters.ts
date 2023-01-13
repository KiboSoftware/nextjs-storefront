import { format } from 'date-fns'

import { ProductAttribute } from '../constants'
import { addressGetters } from '@/lib/getters'

import type { SbContact, SbProduct, Subscription } from '@/lib/gql/types'

const getSubscriberName = (subscription: Subscription) =>
  `${subscription?.fulfillmentInfo?.fulfillmentContact?.firstName} ${subscription?.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname}`

const getAddress = (subscription: Subscription) =>
  subscription?.fulfillmentInfo?.fulfillmentContact?.address

const getSubscriberAddress = (subscription: Subscription): string =>
  `${getAddress(subscription)?.address1} ${getAddress(subscription)?.cityOrTown} ${
    getAddress(subscription)?.stateOrProvince
  } ${getAddress(subscription)?.postalOrZipCode} ${getAddress(subscription)?.countryCode}`

const getSubscriptionFrequency = (subscription: Subscription) =>
  `${subscription?.frequency?.value} ${subscription?.frequency?.unit}`

const nextOrderItemDate = (subscription: Subscription) =>
  format(new Date(subscription?.nextOrderDate), 'MMMM dd, yyyy')

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

const getFrequencyValues = (product: SbProduct | null | undefined) => {
  if (!product) return

  return product?.properties?.find(
    (property) => property?.attributeFQN === ProductAttribute.SUBSCRIPTION_FREQUENCY
  )?.values
}

const getFormattedAddress = (subscription: Subscription) => {
  const formattedAddress = addressGetters.getFormattedAddress(
    subscription.fulfillmentInfo?.fulfillmentContact as SbContact
  )

  return {
    formattedAddress,
    fulfillmentContact: subscription.fulfillmentInfo?.fulfillmentContact as SbContact,
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
  getFormattedAddress,
}
