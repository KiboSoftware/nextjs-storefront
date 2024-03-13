import { PaymentType } from '../constants'
import { orderGetters, cardGetters } from '@/lib/getters'
import type { CardTypeForCheckout, TokenizedCard } from '@/lib/types'

import type {
  Checkout,
  CrBillingInfo,
  CrContact,
  CrOrder,
  PaymentActionInput,
} from '@/lib/gql/types'

export const buildPayPalPaymentActionForCheckoutParams = (
  currencyCode: string,
  checkout: CrOrder | Checkout,
  billingAddress: CrContact | undefined,
  // isBillingAddressAsShipping: boolean,
  externalTransactionId: string,
  payerId: string
): PaymentActionInput => {
  const billingInfo: CrBillingInfo = {
    billingContact: { ...billingAddress, email: billingAddress?.email || checkout?.email },
    card: null,
    paymentType: 'PayPalExpress2',
    paymentWorkflow: 'PayPalExpress2',
    // isSameBillingShippingAddress: isBillingAddressAsShipping,
    externalTransactionId: externalTransactionId,
    data: {
      paypal: {
        payerId: payerId,
      },
    },
  }

  return {
    currencyCode,
    amount: orderGetters.getTotal(checkout),
    newBillingInfo: {
      ...billingInfo,
    },
  }
}
