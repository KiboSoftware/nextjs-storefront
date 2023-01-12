import { orderGetters, cardGetters } from '@/lib/getters'
import type { CardTypeForCheckout, TokenizedCard } from '@/lib/types'

import type {
  Checkout,
  CrBillingInfo,
  CrContact,
  CrOrder,
  PaymentActionInput,
} from '@/lib/gql/types'

export const buildCardPaymentActionForCheckoutParams = (
  currencyCode: string,
  checkout: CrOrder | Checkout,
  creditCardData: CardTypeForCheckout,
  tokenizedData: TokenizedCard,
  billingAddress: CrContact,
  isBillingAddressAsShipping: boolean
): PaymentActionInput => {
  const billingInfo: CrBillingInfo = {
    billingContact: billingAddress,
    card: {
      isCardInfoSaved: creditCardData.isCardInfoSaved || false,
      paymentOrCardType: creditCardData.cardType,
      expireMonth: creditCardData.expireMonth,
      expireYear: creditCardData.expireYear,
      paymentServiceCardId: cardGetters.getTokenizedId(tokenizedData),
      cardNumberPartOrMask: cardGetters.getTokenizedCardNumberMask(tokenizedData),
      isUsedRecurring: false,
      isTokenized: true,
    },
  }

  return {
    currencyCode,
    amount: orderGetters.getTotal(checkout),
    newBillingInfo: {
      ...billingInfo,
      paymentType: creditCardData.paymentType,
      paymentWorkflow: creditCardData.paymentWorkflow,
      isSameBillingShippingAddress: isBillingAddressAsShipping,
    },
  }
}
