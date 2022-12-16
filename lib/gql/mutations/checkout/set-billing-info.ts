import { billingContactFragment } from '../../fragments'

const setBillingInformation = /* GraphQL */ `
  mutation setBillingInformation($orderId: String!, $billingInfoInput: CrBillingInfoInput) {
    updateOrderBillingInfo(orderId: $orderId, billingInfoInput: $billingInfoInput) {
      billingContact {
        ...billingContactFragment
      }
    }
  }

  ${billingContactFragment}
`

export default setBillingInformation
