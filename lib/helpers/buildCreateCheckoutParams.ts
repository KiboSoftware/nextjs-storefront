import { Checkout } from '../gql/types'

export const buildCreateCheckoutParams = (checkout: Checkout) => ({
  checkoutId: checkout.id as string,
  checkoutActionInput: { actionName: 'SubmitOrder' },
})
