import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCustomerAccountCard } from '@/lib/gql/mutations'
import { customerAccountCardsKeys } from '@/lib/react-query/queryKeys'

import type { CardInput } from '@/lib/gql/types'

interface AddCustomerAccountCardDetailsParams {
  accountId: number
  cardInput: CardInput
}

const addCustomerAccountCardDetails = async (params: AddCustomerAccountCardDetailsParams) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: createCustomerAccountCard,
    variables: params,
  })

  return response.createCustomerAccountCard
}

/**
 * [ Mutation hook => useCreateCustomerCardsMutation calls the graphQL mutation
 *
 * createCustomerAccountCard(accountId: Int!, cardInput: CardInput): Card
 *
 * Description : Save the customer's card details to the account which can be used at the time of checkout for payment.
 *
 * Parameters passed to function addCustomerAccountCardDetails(params: AddCustomerAccountCardDetailsParams) => expects object containing accountId and cardInput to add the card details.
 *
 * On success, calls invalidateQueries all customerAccountCardsKeys and fetches the updated result.
 *
 * @returns 'response?.createCustomerAccountCard', which has customer's card details like nameOnCard, cardType, contactId etc.
 */

export const useCreateCustomerCardsMutation = () => {
  const queryClient = useQueryClient()

  return {
    addSavedCardDetails: useMutation(addCustomerAccountCardDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries(customerAccountCardsKeys.all)
      },
    }),
  }
}
