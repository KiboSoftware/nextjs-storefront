import { quoteFragment } from '../../../fragments'

const updateQuoteCouponMutation = /* GraphQL */ `
  mutation updateQuoteCoupon($quoteId: String!, $couponCode: String!, $updateMode: String) {
    updateQuoteCoupon(quoteId: $quoteId, couponCode: $couponCode, updateMode: $updateMode) {
      ...quoteFragment
    }
  }
  ${quoteFragment}
`

export default updateQuoteCouponMutation
