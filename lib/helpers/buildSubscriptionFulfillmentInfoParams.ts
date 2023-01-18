import type { Address } from '@/lib/types'

import type { Subscription } from '@/lib/gql/types'

export const buildSubscriptionFulfillmentInfoParams = (
  subscriptionDetailsData: Subscription,
  data: Address
) => {
  return {
    subscriptionId: subscriptionDetailsData.id as string,
    fulfillmentInfoInput: {
      fulfillmentContact: {
        ...data.contact,
      },
      shippingMethodCode: subscriptionDetailsData?.fulfillmentInfo?.shippingMethodCode as string,
      shippingMethodName: subscriptionDetailsData?.fulfillmentInfo?.shippingMethodName as string,
    },
  }
}
