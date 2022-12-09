import type { SavedCard, TokenizedCard } from '@/lib/types'

import type { Card, CrPaymentCard } from '../gql/types'

type GenericCard = SavedCard | Card
// cards
const getCardNumberPart = (creditCardData?: GenericCard): string =>
  creditCardData?.cardNumberPart || ''

const getExpireDate = (creditCardData?: GenericCard): string =>
  `${getExpireMonth(creditCardData)}/${getExpireYear(creditCardData)}`

const getCardType = (creditCardData?: GenericCard): string => creditCardData?.cardType || ''

const getCardId = (creditCardData?: GenericCard): string => creditCardData?.id || ''

const getIsDefaultPayMethod = (creditCardData?: GenericCard): boolean =>
  Boolean(creditCardData?.isDefaultPayMethod)

const getCardNumber = (creditCardData?: SavedCard): string => creditCardData?.cardNumber || ''

const getIsCardInfoSaved = (creditCardData?: SavedCard): boolean =>
  creditCardData?.isCardInfoSaved || false

const getPaymentType = (creditCardData?: SavedCard): string => creditCardData?.paymentType || ''

const getExpireMonth = (creditCardData?: GenericCard | CrPaymentCard): number =>
  creditCardData?.expireMonth || 0

const getExpireYear = (creditCardData?: GenericCard | CrPaymentCard): number =>
  creditCardData?.expireYear || 0

const getCardDetails = (card: GenericCard) => {
  return {
    cardNumberPart: getCardNumberPart(card),
    cardType: getCardType(card),
    expireMonth: getExpireMonth(card),
    expireYear: getExpireYear(card),
    id: getCardId(card),
    isDefaultPayMethod: getIsDefaultPayMethod(card),
    isCardInfoSaved: getIsCardInfoSaved(card as SavedCard),
    paymentType: getPaymentType(card as SavedCard),
  }
}

const getTokenizedCardNumberMask = (tokenizedData: TokenizedCard): string =>
  tokenizedData?.numberPart || ''

const getTokenizedId = (tokenizedData: TokenizedCard) => tokenizedData?.id || ''

const getPaymentServiceCardId = (card: CrPaymentCard) => card.paymentServiceCardId || ''
const getCardNumberPartOrMask = (card: CrPaymentCard) => card.cardNumberPartOrMask || ''

export const cardGetters = {
  getCardId,
  getCardNumber,
  getCardNumberPart,
  getExpireMonth,
  getExpireYear,
  getCardType,
  getIsDefaultPayMethod,
  getPaymentType,
  getIsCardInfoSaved,
  getExpireDate,
  getPaymentServiceCardId,
  getCardNumberPartOrMask,

  getTokenizedCardNumberMask,
  getTokenizedId,

  getCardDetails,
}
