import { fullfillmentInfoFragment } from '../../fragments'

const setShippingInfoMutation = /* GraphQL */ `
  mutation setShippingInformation($orderId: String!, $fulfillmentInfoInput: FulfillmentInfoInput) {
    updateOrderFulfillmentInfo(orderId: $orderId, fulfillmentInfoInput: $fulfillmentInfoInput) {
      ...fullfillmentInfoFragment
    }
  }

  ${fullfillmentInfoFragment}
`
export default setShippingInfoMutation
