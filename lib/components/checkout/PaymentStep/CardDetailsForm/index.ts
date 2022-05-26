import creditCardType from 'credit-card-type'

export interface CardDataParams {
  cardNumber: string
  expiryDate: string
  cvv: string
}

export const prepareCardDataParams = (props: CardDataParams) => {
  const { cardNumber, expiryDate, cvv } = props
  const ccardType = creditCardType(cardNumber)
  const expiryMonthYear = expiryDate?.split('/')

  return {
    card: {
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
      cardType: ccardType.length ? ccardType[0].type.toUpperCase() : '',
      expireMonth: expiryMonthYear[0],
      expireYear: expiryMonthYear[1],
    },
    paymentType: 'creditcard',
  }
}

export const validateExpiryDate = (validExpiryDate: string | undefined) => {
  if (validExpiryDate != undefined) {
    const monthYear = validExpiryDate.split('/')
    const month = parseInt(monthYear[0])
    const year = parseInt(monthYear[1])
    const currentDate = new Date()
    const someDay = new Date()
    someDay.setFullYear(year, month, 1)
    return someDay >= currentDate
  }
  return false
}

export const getCardType = (cardNumber: string | undefined) => {
  if (cardNumber != undefined) {
    return creditCardType(cardNumber).length !== 0
  }
  return false
}
