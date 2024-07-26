import { orderGetters } from '@/lib/getters'

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
  externalTransactionId: string,
  payerId: string
): PaymentActionInput => {
  const billingInfo: CrBillingInfo = {
    billingContact: { ...billingAddress, email: billingAddress?.email || checkout?.email },
    card: null,
    paymentType: 'paypal_complete_payments_application',
    paymentWorkflow: 'paypal_complete_payments_application',
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
