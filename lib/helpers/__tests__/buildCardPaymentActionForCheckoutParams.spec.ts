import { buildCardPaymentActionForCheckoutParams } from '../buildCardPaymentActionForCheckoutParams'
import { orderMock } from '@/__mocks__/stories'
import { billingInfoInputMock } from '@/__mocks__/stories/billingInfoInputMock'

describe('[helpers] buildAddToWishlistInput function', () => {
  it('should return the buildAddToWishlistItemParams variables', () => {
    const currencyCode = 'US'
    const checkout = orderMock.checkout
    const creditCardData = {
      paymentType: 'CreditCard',
      isCardInfoSaved: false,
      cardType: 'VISA',
      expireMonth: 1,
      expireYear: 2026,
      paymentWorkflow: 'Mozu',
    }

    const tokenizedData = {
      id: '91ee65434560404488c382a9295526ae',
      numberPart: '************1111',
    }

    const billingAddress = {
      ...billingInfoInputMock.billingContact,
    }

    expect(
      buildCardPaymentActionForCheckoutParams(
        currencyCode,
        checkout,
        creditCardData,
        tokenizedData,
        billingAddress,
        false
      )
    ).toStrictEqual({
      currencyCode,
      amount: 125,
      newBillingInfo: {
        ...billingInfoInputMock,
      },
    })
  })
})
