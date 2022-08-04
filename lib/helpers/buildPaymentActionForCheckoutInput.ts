import { checkoutGetters, cardGetters } from '@/lib/getters'
import type { CardTypeForCheckout, TokenizedCard } from '@/lib/types'

import type { BillingInfo, Contact, Order, PaymentActionInput } from '@/lib/gql/types'

export const buildCardPaymentActionForCheckoutInput = (
  currencyCode: string,
  checkout: Order,
  creditCardData: CardTypeForCheckout,
  tokenizedData: TokenizedCard,
  billingAddress: Contact,
  isBillingAddressAsShipping: boolean
): PaymentActionInput => {
  const billingInfo: BillingInfo = {
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
    amount: checkoutGetters.getTotal(checkout),
    newBillingInfo: {
      ...billingInfo,
      paymentType: creditCardData.paymentType,
      paymentWorkflow: creditCardData.paymentWorkflow,
      isSameBillingShippingAddress: isBillingAddressAsShipping,
    },
  }
}
