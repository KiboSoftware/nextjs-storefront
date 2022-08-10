import type { SavedCard } from '@/lib/types'

// cards
const getCardNumberPart = (creditCardData?: SavedCard): string =>
  creditCardData?.cardNumberPart || ''
const getIsCardInfoSaved = (creditCardData?: SavedCard): boolean =>
  creditCardData?.isCardInfoSaved || false
const getExpireMonth = (creditCardData?: SavedCard): number => creditCardData?.expireMonth || 0
const getExpireYear = (creditCardData?: SavedCard): number => creditCardData?.expireYear || 0
const getCardType = (creditCardData?: SavedCard): string => creditCardData?.cardType || ''
const getCardId = (creditCardData?: SavedCard): string => creditCardData?.id || ''
const getIsDefaultPaymentMethod = (creditCardData?: SavedCard): boolean =>
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
    isDefaultPaymentMethod: getIsDefaultPaymentMethod(card),
    paymentType: getPaymentType(card),
  }
}

const getTokenizedCardNumberMask = (tokenizedData: any): string => tokenizedData?.numberPart || ''
const getTokenizedId = (tokenizedData: any) => tokenizedData?.id || ''

export const cardGetters = {
  getCardId,
  getCardDetails,
  getTokenizedCardNumberMask,
  getTokenizedId,
}
