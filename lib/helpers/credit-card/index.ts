import creditCardType from 'credit-card-type'

import type { CardForm } from '@/lib/types'

export const prepareCardDataParams = (props: CardForm) => {
  const { cardNumber, expiryDate, cvv } = props
  const cardType = creditCardType(cardNumber as string)
  const expiryMonth = expiryDate?.split('/')[0]
  const expiryYear = expiryDate?.split('/')[1]

  return {
    cardNumber: cardNumber,
    cvv: cvv,
    cardType: cardType.length ? cardType[0].type.toUpperCase() : '',
    expireMonth: Number(expiryMonth),
    expireYear: Number(expiryYear),
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
