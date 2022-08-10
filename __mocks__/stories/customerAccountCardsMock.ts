import { CardCollection } from '@/lib/gql/types'

export const customerAccountCardsMock: { customerAccountCards: CardCollection } = {
  customerAccountCards: {
    totalCount: 1,
    items: [
      {
        id: '726df82aaf8a406fac8efdecb54964dd',
        nameOnCard: 'Chandradeepta Laha',
        cardType: 'VISA',
        expireMonth: 12,
        expireYear: 2027,
        cardNumberPart: '************1111',
        contactId: 1495,
        isDefaultPayMethod: true,
      },
    ],
  },
}
