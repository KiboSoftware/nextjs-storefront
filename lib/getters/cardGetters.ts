import type { SavedCard, TokenizedCard } from '@/lib/types'

import type { Card, CrPaymentCard } from '../gql/types'

type GenericCard = SavedCard | Card
// cards
const getCardNumberPart = (creditCardData?: GenericCard): string =>
  creditCardData?.cardNumberPart as string

const getExpireDate = (creditCardData?: GenericCard): string =>
  `${getExpireMonth(creditCardData)}/${getExpireYear(creditCardData)}`

const getCardType = (creditCardData?: GenericCard | CrPaymentCard): string =>
  (creditCardData as GenericCard)?.cardType ??
  ((creditCardData as CrPaymentCard)?.paymentOrCardType as string)

const getCardId = (creditCardData?: GenericCard): string => creditCardData?.id as string

const getIsDefaultPayMethod = (creditCardData?: GenericCard): boolean =>
  Boolean(creditCardData?.isDefaultPayMethod)

const getCardNumber = (creditCardData?: SavedCard): string => creditCardData?.cardNumber as string

const getIsCardInfoSaved = (creditCardData?: SavedCard): boolean =>
  creditCardData?.isCardInfoSaved || false

const getPaymentType = (creditCardData?: SavedCard): string => creditCardData?.paymentType as string

const getExpireMonth = (creditCardData?: GenericCard | CrPaymentCard): number =>
  creditCardData?.expireMonth || 0

const getExpireYear = (creditCardData?: GenericCard | CrPaymentCard): number =>
  creditCardData?.expireYear || 0

const getCardHolderName = (creditCardData?: GenericCard | CrPaymentCard): string =>
  creditCardData?.nameOnCard as string

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
    cardholderName: getCardHolderName(card as SavedCard),
  }
}

const getTokenizedCardNumberMask = (tokenizedData: TokenizedCard): string =>
  tokenizedData?.numberPart as string

const getTokenizedId = (tokenizedData: TokenizedCard) => tokenizedData?.id as string

const getPaymentServiceCardId = (card: CrPaymentCard) => card?.paymentServiceCardId as string
const getCardNumberPartOrMask = (card: CrPaymentCard) => card?.cardNumberPartOrMask as string

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
