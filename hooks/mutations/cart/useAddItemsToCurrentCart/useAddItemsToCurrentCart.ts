/**
 * @module useAddItemsToCurrentCart
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { addItemsToCurrentCartMutation } from '@/lib/gql/mutations'
import { buildAddItemsToCartParams } from '@/lib/helpers'
import { cartKeys } from '@/lib/react-query/queryKeys'

import { CrWishlistItem } from '@/lib/gql/types'

/**
 * @hidden
 */

const addItemsToCurrentCart = async ({ items }: { items: CrWishlistItem[] }) => {
  const client = makeGraphQLClient()

  const variables = {
    throwErrorOnInvalidItems: true,
    cartItemInput: buildAddItemsToCartParams(items),
  }

  const response = await client.request({
    document: addItemsToCurrentCartMutation,
    variables,
  })

  return response?.addItemsToCurrentCart
}
/**
 * [Mutation hook] useAddItemsToCurrentCart uses the graphQL mutation
 *
 * <b>addItemsToCurrentCart(throwErrorOnInvalidItems:Boolean,cartItemInput: CrCartItemInput): Boolean</b>
 *
 * Description : Add all the product items to the current cart with selected quantity
 *
 * Parameters passed to function addItemsToCart(props: items) => expects object of type '{items: CrWishlistItem}' containing product and quantity
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result.
 *
 * @returns 'response?.addItemsToCurrentCart' which contains object of product items added to cart and it's quantity
 */
export const useAddItemsToCurrentCart = () => {
  const queryClient = useQueryClient()
  return {
    addItemsToCurrentCart: useMutation({
      mutationFn: addItemsToCurrentCart,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
      },
    }),
  }
}
