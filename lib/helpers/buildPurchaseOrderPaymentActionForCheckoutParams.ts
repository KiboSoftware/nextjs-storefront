import { PaymentType } from '../constants'
import { orderGetters } from '@/lib/getters'

import type {
  Checkout,
  CrBillingInfo,
  CrContact,
  CrOrder,
  CrPurchaseOrderPayment,
  PaymentActionInput,
} from '@/lib/gql/types'

export const buildPurchaseOrderPaymentActionForCheckoutParams = (
  currencyCode: string,
  checkout: CrOrder | Checkout,
  purchaseOrderData: CrPurchaseOrderPayment,
  billingAddress: CrContact,
  isBillingAddressAsShipping: boolean
): PaymentActionInput => {
  const billingInfo: CrBillingInfo = {
    billingContact: { ...billingAddress, email: billingAddress?.email ?? checkout?.email },
    purchaseOrder: {
      purchaseOrderNumber: purchaseOrderData?.purchaseOrderNumber,
      paymentTerm: {
        code: purchaseOrderData?.paymentTerm?.code,
        description: purchaseOrderData?.paymentTerm?.description,
      },
      customFields: [],
    },
  }
  return {
    currencyCode,
    amount: orderGetters.getTotal(checkout),
    newBillingInfo: {
      ...billingInfo,
      paymentType: PaymentType.PURCHASEORDER,
      isSameBillingShippingAddress: isBillingAddressAsShipping,
    },
  }
}
