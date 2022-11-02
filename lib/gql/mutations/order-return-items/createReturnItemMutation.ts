import { checkoutItemProductFragment } from '@/lib/gql/fragments'

const createReturnItemMutation = /* GraphQL */ `
  mutation createReturn($returnObjInput: ReturnObjInput) {
    createReturn(returnObjInput: $returnObjInput) {
      customerAccountId
      returnNumber
      returnOrderId
      status
      items {
        orderItemId
        reasons {
          reason
          quantity
        }
        returnType
        product {
          ...checkoutItemProductFragment
        }
      }
    }
  }
  ${checkoutItemProductFragment}
`

export default createReturnItemMutation
