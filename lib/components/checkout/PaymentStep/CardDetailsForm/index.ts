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
