import { cardGetters } from '../getters'

import type { CrBillingInfo, CrPaymentCard } from '../gql/types'

export const buildCreateCustomerCardParam = (
  params: CrBillingInfo,
  userId: number,
  contactId: number
) => {
  const cardInput = {
    id: params?.card?.paymentServiceCardId as string,
    contactId: contactId,
    cardType: cardGetters.getCardType(params.card as CrPaymentCard),
    cardNumberPart: params.card?.cardNumberPartOrMask as string,
    expireMonth: cardGetters.getExpireMonth(params.card as CrPaymentCard),
    expireYear: cardGetters.getExpireYear(params.card as CrPaymentCard),
    isDefaultPayMethod: false,
  }

  const cardParams = {
    accountId: userId,
    cardId: cardInput.id as string,
    cardInput: cardInput,
  }

  return cardParams
}
