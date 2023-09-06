import { quoteFragment } from '../../../fragments'

const updateQuoteFulfillmentInfo = /* GraphQL */ `
  mutation updateQuoteFulfillmentInfo(
    $quoteId: String!
    $updateMode: String
    $fulfillmentInfoInput: CrFulfillmentInfoInput
  ) {
    updateQuoteFulfillmentInfo(
      quoteId: $quoteId
      updateMode: $updateMode
      fulfillmentInfoInput: $fulfillmentInfoInput
    ) {
      ...quoteFragment
    }
  }

  ${quoteFragment}
`
export default updateQuoteFulfillmentInfo
