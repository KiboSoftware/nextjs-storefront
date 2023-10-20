import { quoteFragment } from '../../../fragments'

const deleteQuoteCouponMutation = /* GraphQL */ `
  mutation deleteQuoteCoupon($quoteId: String!, $couponCode: String!, $updateMode: String) {
    deleteQuoteCoupon(quoteId: $quoteId, couponCode: $couponCode, updateMode: $updateMode) {
      ...quoteFragment
    }
  }
  ${quoteFragment}
`

export default deleteQuoteCouponMutation
