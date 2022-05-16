import creditCardType from 'credit-card-type'

export const cardData = {
  card: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardType: '',
    expireMonth: '',
    expireYear: '',
  },
  paymentType: 'creditcard',
}

interface CardDataParams {
  cardNumber: string
  expiryDate: string
  cvv: string
}

export const getCardData = (props: CardDataParams) => {
  const { cardNumber, expiryDate, cvv } = props

  cardData.card.cardNumber = cardNumber
  const ccardType = creditCardType(cardNumber)
  cardData.card.cardType = ccardType.length ? ccardType[0].type.toUpperCase() : ''

  cardData.card.expiryDate = expiryDate
  const expiryMonthYear = expiryDate?.split('/')
  cardData.card.expireMonth = expiryMonthYear[0]
  cardData.card.expireYear = expiryMonthYear[1]

  cardData.card.cvv = cvv

  return cardData
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
