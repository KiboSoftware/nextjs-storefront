import { format } from 'date-fns'

const getSubscriberName = (subscription: any) =>
  `${subscription?.fulfillmentInfo?.fulfillmentContact?.firstName} ${subscription?.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname}`

const getAddress = (subscription: any) => subscription?.fulfillmentInfo?.fulfillmentContact?.address

const getSubscriberAddress = (subscription: any) =>
  `${getAddress(subscription)?.address1} ${getAddress(subscription)?.address2}  ${
    getAddress(subscription)?.cityOrTown
  } ${getAddress(subscription)?.stateOrProvince} ${getAddress(subscription)?.postalOrZipCode}  ${
    getAddress(subscription)?.countryCode
  }`

const getSubscriptionFrequency = (subscription: any) =>
  `${subscription?.frequency?.value} ${subscription?.frequency?.unit}`

const nextOrderItemDate = (subscription: any) =>
  format(new Date(subscription.nextOrderDate), 'MMMM dd, yyyy')

const getSubscriptionNumber = (subscription: any) => subscription?.number

const getSubscriptionStatus = (subscription: any) => subscription?.status

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
  getSubscriptionDetails,
}
