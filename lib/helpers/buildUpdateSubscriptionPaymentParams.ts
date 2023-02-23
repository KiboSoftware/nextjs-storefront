import type { SavedCard } from '@/lib/types'

import type {
  SbPayment,
  Subscription,
  SbContact,
  Card as CardType,
  CustomerContact,
  CustomerAccount,
} from '@/lib/gql/types'

export const buildUpdateSubscriptionPaymentParams = (
  user: CustomerAccount,
  subscription: Subscription,
  contact: SbContact | CustomerContact,
  card: SavedCard | CardType
) => {
  const email = user.emailAddress
  const { amountCredited, amountCollected, amountRequested } = subscription.payment as SbPayment

  const {
    id: contactId,
    firstName,
    middleNameOrInitial,
    lastNameOrSurname,
    phoneNumbers,
    address,
  } = contact

  const { id: cardId, expireMonth, expireYear, cardType, cardNumberPart } = card

  return {
    subscriptionId: subscription.id as string,
    paymentInput: {
      amountCredited,
      amountCollected,
      amountRequested,
      paymentType: cardType,
      billingInfo: {
        billingContact: {
          id: contactId,
          email,
          firstName,
          middleNameOrInitial,
          lastNameOrSurname,
          phoneNumbers: { ...phoneNumbers },
          address: { ...address },
        },
        paymentType: cardType,
        card: {
          paymentOrCardType: cardType,
          expireMonth: expireMonth as number,
          expireYear: expireYear as number,
          paymentServiceCardId: cardId,
          cardNumberPartOrMask: cardNumberPart,
        },
      },
    },
  }
}
