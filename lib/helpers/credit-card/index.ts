import creditCardType from 'credit-card-type'

import AMEX from '@/assets/american-express.svg'
import DEFAULT from '@/assets/default-card.svg'
import DINERSCLUB from '@/assets/diners-club.svg'
import DISCOVER from '@/assets/discover.svg'
import ELO from '@/assets/elo.svg'
import HIPERCARD from '@/assets/hiper-card.svg'
import JCB from '@/assets/jcb.svg'
import MAESTRO from '@/assets/maestro.svg'
import MASTERCARD from '@/assets/mastercard.svg'
import UNIONPAY from '@/assets/union-pay.svg'
import VISA from '@/assets/visa.svg'
import type { CardForm } from '@/lib/types'

export const prepareCardDataParams = (props: CardForm) => {
  const { cardNumber, expiryDate, cvv } = props
  const cardType =
    props.cardType || creditCardType(cardNumber as string)?.[0]?.type.toUpperCase() || ''
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
    ELO: ELO,
    HIPERCARD: HIPERCARD,
    JCB: JCB,
    MAESTRO: MAESTRO,
    MASTERCARD: MASTERCARD,
    UNIONPAY: UNIONPAY,
    VISA: VISA,
    'AMERICAN-EXPRESS': AMEX,
    'DINERS-CLUB': DINERSCLUB,
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

export const getCardType = (cardNumber: string | undefined) => {
  if (cardNumber === undefined) return false

  return creditCardType(cardNumber).length !== 0
}
