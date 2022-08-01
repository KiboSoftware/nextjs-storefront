export const paymentCardItems = /* GraphQL */ `
  fragment customerAccountCardItems on Card {
    id
    nameOnCard
    cardType
    expireMonth
    expireYear
    cardNumberPart
    contactId
    isDefaultPayMethod
  }
`
