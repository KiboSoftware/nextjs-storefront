/**
 * @module useCreateQuoteFromCart
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createQuoteFromCartMutation } from '@/lib/gql/mutations'
import { quoteKeys } from '@/lib/react-query/queryKeys'

import { Quote } from '@/lib/gql/types'

/**
 * @hidden
 */

interface CreateQuoteFromCartProps {
  cartId: string
  updateMode: string
}
const createQuoteFromCart = async (props: CreateQuoteFromCartProps): Promise<Quote> => {
  const client = makeGraphQLClient()
  const { cartId, updateMode } = props

  const variables = { cartId, updateMode }

  const response = await client.request({
    document: createQuoteFromCartMutation,
    variables,
  })

  return response?.createQuoteFromCart
}
/**
 * [Mutation hook] useCreateQuoteFromCart uses the graphQL mutation
 *
 * <b>createQuoteFromCart($cartId: String!, updateMode: String): Quote</b>
 *
 * Description : create a quote from cart
 *
 * Parameters passed to function createQuoteFromCart(props: CreateQuoteFromCartProps) => expects cartId, updateMode
 *
 * On success, calls invalidateQueries on quoteKeys and fetches the updated result.
 *
 * @returns 'response?.createQuoteFromCart' which contains object of quote created
 */
export const useCreateQuoteFromCart = () => {
  const queryClient = useQueryClient()
  return {
    createQuoteFromCart: useMutation({
      mutationFn: createQuoteFromCart,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: quoteKeys.all })
      },
    }),
  }
}
