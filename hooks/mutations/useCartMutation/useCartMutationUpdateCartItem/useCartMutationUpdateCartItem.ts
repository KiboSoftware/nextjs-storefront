import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCartItemMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { Cart, CartItem, CartItemInput, Maybe } from '@/lib/gql/types'

interface UpdateCartItemParams {
  cartItemId: string
  cartItemInput: CartItemInput
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

export const useCartMutationUpdateCartItem = () => {
  const queryClient = useQueryClient()
  return {
    updateCartItem: useMutation(updateCartItem, {
      onMutate: async (mutatedCartItem) => {
        await queryClient.cancelQueries()
        const previousCart: Cart | undefined = queryClient.getQueryData(cartKeys.all)
        const cart = { ...previousCart }
        const cartItem = cart?.items?.find(
          (item: Maybe<CartItem>) => item?.id === mutatedCartItem?.cartItemId
        )
        if (cartItem?.id) {
          cartItem.fulfillmentMethod = mutatedCartItem.cartItemInput.fulfillmentMethod
          cartItem.fulfillmentLocationCode = mutatedCartItem.cartItemInput.fulfillmentLocationCode
        }
        queryClient.setQueryData(cartKeys.all, cart)
        return { previousCart }
      },
      onError: (_err, _cart, context: any) => {
        queryClient.setQueryData(cartKeys.all, context?.previousCart)
      },
      onSettled: () => {
        queryClient.invalidateQueries(cartKeys.all)
      },
    }),
  }
}
