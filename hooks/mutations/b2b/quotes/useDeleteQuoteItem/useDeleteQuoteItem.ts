/**
 * @module useDeleteQuoteItem
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteQuoteItemMutation } from '@/lib/gql/mutations'
import { quoteKeys, quoteShippingMethodKeys } from '@/lib/react-query/queryKeys'
import type { ShouldFetchShippingMethods } from '@/lib/types'

interface DeleteQuoteItemParams {
  quoteId: string
  quoteItemId: string
  updateMode?: string
}

const deleteQuoteItem = async (params: DeleteQuoteItemParams): Promise<boolean> => {
  const client = makeGraphQLClient()
  const { quoteItemId, quoteId, updateMode } = params
  const variables = {
    quoteId: quoteId,
    quoteItemId: quoteItemId,
    updateMode: updateMode,
  }
  const response = await client.request({
    document: deleteQuoteItemMutation,
    variables,
  })

  return response?.deleteQuoteItem
}

/**
 * [Mutation hook] useDeleteQuoteItem uses the graphQL mutation
 *
 * <b>deleteQuoteItem($quoteId: String, $quoteItemId: String!): Boolean</b>
 *
 * Description : Removes the product item from the quote
 *
 * Parameters passed to function deleteQuoteItem(params: DeleteQuoteItemParams) => expects object of type DeleteQuoteItemParams containing quoteItemId of the product to be deleted and quote Id
 *
 * On success, calls invalidateQueries on quoteKeys and fetches the updated result
 *
 * @returns 'response?.deleteQuoteItemMutation' returns 'true' if product is deleted
 */
export const useDeleteQuoteItem = ({ shouldFetchShippingMethods }: ShouldFetchShippingMethods) => {
  const queryClient = useQueryClient()
  return {
    deleteQuoteItem: useMutation({
      mutationFn: deleteQuoteItem,
      onMutate: async (deleteQuoteItem) => {
        await queryClient.cancelQueries({ queryKey: quoteKeys.all })
        const previousQuote: any = queryClient.getQueryData(quoteKeys.all)
        const newQuote = {
          ...previousQuote,
          items: previousQuote?.items?.filter(
            (item: any) => item.id !== deleteQuoteItem.quoteItemId
          ),
        }
        queryClient.setQueryData(quoteKeys.all, newQuote)

        return { previousQuote }
      },
      onSettled: (_data, error, _, context) => {
        if (error) queryClient.setQueryData(quoteKeys.all, context?.previousQuote)
        queryClient.invalidateQueries({ queryKey: quoteKeys.all })
        if (shouldFetchShippingMethods) {
          queryClient.invalidateQueries({ queryKey: quoteShippingMethodKeys.all })
        }
      },
    }),
  }
}
