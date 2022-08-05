import creditCardType from 'credit-card-type'

import type { CardForm } from '@/lib/types'

export interface CardDataParams {
  cardNumber: string
  expiryDate: string
  cvv: string
}

export const prepareCardDataParams = (props: CardDataParams): CardForm => {
  const { cardNumber, expiryDate, cvv } = props
  const ccardType = creditCardType(cardNumber)
  const expiryMonthYear = expiryDate?.split('/')

  return {
    cardNumber: cardNumber,
    cvv: cvv,
    cardType: ccardType.length ? ccardType[0].type.toUpperCase() : '',
    expireMonth: Number(expiryMonthYear[0]),
    expireYear: Number(expiryMonthYear[1]),
  }
}

export const validateExpiryDate = (validExpiryDate: string | undefined) => {
  if (validExpiryDate === undefined) return false

  const monthYear = validExpiryDate.split('/')
  const month = parseInt(monthYear[0])
  const year = parseInt(monthYear[1])
  const currentDate = new Date()
  const someDay = new Date()
  someDay.setFullYear(year, month, 1)
  return someDay >= currentDate
}

export const getCardType = (cardNumber: string | undefined) => {
  if (cardNumber === undefined) return false

  return creditCardType(cardNumber).length !== 0
}
