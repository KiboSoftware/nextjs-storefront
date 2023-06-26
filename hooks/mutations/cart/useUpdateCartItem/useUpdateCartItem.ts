/**
 * @module useUpdateCartItem
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCartItemMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { CrCart, CrCartItem, CrCartItemInput, Maybe } from '@/lib/gql/types'

interface UpdateCartItemParams {
  cartItemId: string
  cartItemInput: CrCartItemInput
}

const updateCartItem = async (props: UpdateCartItemParams) => {
  const client = makeGraphQLClient()
  const { cartItemId, cartItemInput } = props

  const variables = {
    cartItemId,
    cartItemInput,
  }

  const response = await client.request({
    document: updateCartItemMutation,
    variables,
  })

  return response?.updateCurrentCartItem
}

/**
 * [Mutation hook] useUpdateCartItem uses the graphQL mutation
 *
 * <b>updateCurrentCartItem(cartItemId: String!, cartItemInput: CrCartItemInput): CartItem</b>
 *
 * Description : Updates the 'fulfillmentMethod(Shipping/Pickup in store)' and 'fulfillmentLocationCode' based on selected option on cart page
 *
 * Parameters passed to function updateCartItem(props: UpdateCartItemParams) => expects object of type 'UpdateCartItemParams' containing cartItemId and cartItemInput
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result
 *
 * @returns 'response?.updateCurrentCartItem' which contains the updated fulfillmentMethod and fulfillmentLocationCode
 */
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()
  return {
    updateCartItem: useMutation({
      mutationFn: updateCartItem,
      onMutate: async (modifiedCartItem) => {
        await queryClient.cancelQueries({ queryKey: cartKeys.all })

        const previousCart: CrCart | undefined = queryClient.getQueryData(cartKeys.all)

        queryClient.setQueryData(cartKeys.all, (oldCart: any) => {
          const newCart = {
            ...oldCart,
            items: oldCart?.items?.map((item: Maybe<CrCartItem>) => {
              if (item?.id === modifiedCartItem?.cartItemId) {
                return {
                  ...item,
                  fulfillmentMethod: modifiedCartItem.cartItemInput.fulfillmentMethod,
                  fulfillmentLocationCode: modifiedCartItem.cartItemInput.fulfillmentLocationCode,
                }
              }
              return item
            }),
          }
          return newCart
        })

        return { previousCart }
      },
      onSettled: (_data, error, _, context) => {
        if (error) queryClient.setQueryData(cartKeys.all, context?.previousCart)
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
      },
    }),
  }
}
