import {
  baseSubscriptionFragment,
  subscriptionItemFragment,
  subscriptionPaymentFragment,
  subscriptionFullfillmentInfoFragment,
  subscriptionReasonsFragment,
  subscriptionOneTimeProductFragment,
  subscriptionDiscountFragment,
} from '@/lib/gql/fragments'

const skipNextSubscriptionMutation = /* GraphQL */ `
  mutation skipNextSubscription($subscriptionId: String!) {
    skipNextSubscription(subscriptionId: $subscriptionId) {
      ...baseSubscriptionFragment
      items {
        ...subscriptionItemFragment
      }
      payment {
        ...subscriptionPaymentFragment
      }
      fulfillmentInfo {
        ...subscriptionFullfillmentInfoFragment
      }
      frequency {
        unit
        value
      }
      orderDiscounts {
        ...subscriptionDiscountFragment
      }
      shippingDiscounts {
        methodCode
        discount {
          ...subscriptionDiscountFragment
        }
      }
      reasons {
        ...subscriptionReasonsFragment
      }
      invalidCoupons {
        couponCode
        reason
      }
      onetimeProducts {
        ...subscriptionOneTimeProductFragment
      }
      onetimeShippingMethod {
        shippingMethodCode
        shippingMethodName
      }
    }
  }
  ${baseSubscriptionFragment}
  ${subscriptionItemFragment}
  ${subscriptionPaymentFragment}
  ${subscriptionFullfillmentInfoFragment}
  ${subscriptionReasonsFragment}
  ${subscriptionOneTimeProductFragment}
  ${subscriptionDiscountFragment}
`

export default skipNextSubscriptionMutation
