import { format } from 'date-fns'

import type { Subscription } from '@/lib/gql/types'

const getSubscriberName = (subscription: Subscription) =>
  `${subscription?.fulfillmentInfo?.fulfillmentContact?.firstName} ${subscription?.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname}`

const getAddress = (subscription: Subscription) =>
  subscription?.fulfillmentInfo?.fulfillmentContact?.address

const getSubscriberAddress = (subscription: Subscription): string =>
  `${getAddress(subscription)?.address1}  ${getAddress(subscription)?.cityOrTown} ${
    getAddress(subscription)?.stateOrProvince
  } ${getAddress(subscription)?.postalOrZipCode}  ${getAddress(subscription)?.countryCode}`

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

export const subscriptionGetters = {
  getSubscriberName,
  getSubscriberAddress,
  nextOrderItemDate,
  getSubscriptionNumber,
  getSubscriptionStatus,
  getSubscriptionFrequency,
  getSubscriptionDetails,
}
