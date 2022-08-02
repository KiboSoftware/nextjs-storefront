import creditCardType from 'credit-card-type'

import { CardForm } from '@/lib/types'

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

export const tokenizeCreditCardPayment = async (
  creditCardData: CardForm,
  pciHost: string,
  apiHost: string
) => {
  try {
    const url = `https://${pciHost}/payments/commerce/payments/cards/`
    const tenantId = apiHost.split('//')[1].split('-')[0].split('t')[1].toString()
    const { cardNumber, cardType, cvv } = creditCardData
    const ccData = { cardNumber, cardType, cvv, persistCard: true }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'x-vol-tenant': tenantId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ccData),
    })
    const tokenizedCCData = await res.json()
    if (tokenizedCCData.isSuccessful) {
      return tokenizedCCData
    }
  } catch (e) {
    console.error(e)
  }
}
