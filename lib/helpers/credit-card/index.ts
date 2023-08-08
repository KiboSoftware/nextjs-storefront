import creditCardType from 'credit-card-type'

import AMEX from '@/assets/american-express.svg'
import DEFAULT from '@/assets/default-card.svg'
import DISCOVER from '@/assets/discover.svg'
import JCB from '@/assets/jcb.svg'
import MASTERCARD from '@/assets/mastercard.svg'
import VISA from '@/assets/visa.svg'
import type { CardForm } from '@/lib/types'

export const prepareCardDataParams = (props: CardForm) => {
  const { cardNumber, expiryDate, cvv } = props
  const cardType =
    props.cardType ?? creditCardType(cardNumber as string)?.[0]?.niceType.toUpperCase() ?? ''
  const expiryMonth = expiryDate?.split('/')[0]
  const expiryYear = expiryDate?.split('/')[1]

  return {
    cardNumber: cardNumber,
    cvv: cvv,
    cardType: cardType,
    expireMonth: Number(expiryMonth),
    expireYear: Number(expiryYear),
  }
}

export const getCreditCardLogo = (name: string): any => {
  const logos: any = {
    DISCOVER: DISCOVER,
    JCB: JCB,
    MC: MASTERCARD,
    VISA: VISA,
    AMEX: AMEX,
  }
  return logos[name] || DEFAULT
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

export const isCardNumberValid = (cardNumber: string | undefined) => {
  if (cardNumber === undefined) return false

  const cardDetails = creditCardType(cardNumber)
  return cardDetails.length !== 0 && cardDetails[0].lengths.includes(cardNumber.length)
}

export const isCardTypeValid = (cardNumber: string | undefined) => {
  if (!cardNumber) return false
  const supportedCards: any = {
    DISCOVER: DISCOVER,
    JCB: JCB,
    MC: MASTERCARD,
    VISA: VISA,
    AMEX: AMEX,
  }
  return Boolean(supportedCards[creditCardType(cardNumber)[0]?.niceType.toUpperCase()])
}
