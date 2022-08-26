import type { SavedCard, TokenizedCard } from '@/lib/types'

// cards
const getCardNumberPart = (creditCardData?: SavedCard): string =>
  creditCardData?.cardNumberPart || ''

const getCardNumber = (creditCardData?: SavedCard): string => creditCardData?.cardNumber || ''

const getIsCardInfoSaved = (creditCardData?: SavedCard): boolean =>
  creditCardData?.isCardInfoSaved || false

const getExpireMonth = (creditCardData?: SavedCard): number => creditCardData?.expireMonth || 0

const getExpireYear = (creditCardData?: SavedCard): number => creditCardData?.expireYear || 0

const getExpireDate = (creditCardData?: SavedCard): string =>
  `${getExpireMonth(creditCardData)}/${getExpireYear(creditCardData)}`

const getCardType = (creditCardData?: SavedCard): string => creditCardData?.cardType || ''

const getCardId = (creditCardData?: SavedCard): string => creditCardData?.id || ''

const getIsDefaultPayMethod = (creditCardData?: SavedCard): boolean =>
  Boolean(creditCardData?.isDefaultPayMethod)

const getPaymentType = (creditCardData?: SavedCard): string => creditCardData?.paymentType || ''

const getCardDetails = (card: SavedCard) => {
  return {
    cardNumberPart: getCardNumberPart(card),
    isCardInfoSaved: getIsCardInfoSaved(card),
    cardType: getCardType(card),
    expireMonth: getExpireMonth(card),
    expireYear: getExpireYear(card),
    id: getCardId(card),
    isDefaultPayMethod: getIsDefaultPayMethod(card),
    paymentType: getPaymentType(card),
  }
}

const getTokenizedCardNumberMask = (tokenizedData: TokenizedCard): string =>
  tokenizedData?.numberPart || ''

const getTokenizedId = (tokenizedData: TokenizedCard) => tokenizedData?.id || ''

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

  getTokenizedCardNumberMask,
  getTokenizedId,

  getCardDetails,
}
