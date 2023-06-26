/**
 * @module useCreateCustomerCard
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
 * [Mutation hook] useCreateCustomerCard uses the graphQL mutation
 *
 * <b>createCustomerAccountCard(accountId: Int!, cardInput: CardInput): Card</b>
 *
 * Description : Save the customer's card details to the account which can be used at the time of checkout for payment.
 *
 * Parameters passed to internal function addCustomerAccountCardDetails(params: AddCustomerAccountCardDetailsParams) => expects object of type AddCustomerAccountCardDetailsParams containing accountId and cardInput.
 *
 * On success, calls invalidateQueries all customerAccountCardsKeys and fetches the updated result.
 *
 * @returns 'response?.createCustomerAccountCard', which has customer's card details like nameOnCard, cardType, contactId etc.
 */

export const useCreateCustomerCard = () => {
  const queryClient = useQueryClient()

  return {
    createCustomerCard: useMutation({
      mutationFn: addCustomerAccountCardDetails,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: customerAccountCardsKeys.all })
      },
    }),
  }
}
