import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCartItemQuantityMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { CartItem } from '@/lib/gql/types'

interface UpdateCartItemQuantityParams {
  cartItemId: string
  quantity: number
}

const updateCartItemQuantity = async (params: UpdateCartItemQuantityParams) => {
  const client = makeGraphQLClient()
  const { cartItemId, quantity } = params

  const variables = {
    itemId: cartItemId,
    quantity,
  }
  const response = await client.request({
    document: updateCartItemQuantityMutation,
    variables,
  })

  return response?.updateCartItemQuantity
}

export const useCartMutationUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient()
  return {
    updateCartItemQuantity: useMutation(updateCartItemQuantity, {
      // When mutate is called:
      onMutate: async (modifiedCartItem) => {
        await queryClient.cancelQueries()

        const previousCart: any = queryClient.getQueryData(cartKeys.all)
        const cart = { ...previousCart }
        const cartItem = cart?.items?.find(
          (item: CartItem) => item.id === modifiedCartItem.cartItemId
        )

        if (cartItem?.id) cartItem.quantity = modifiedCartItem.quantity
        queryClient.setQueryData(cartKeys.all, cart)

        return { previousCart }
      },
      onError: (_err, _newCart, context: any) => {
        queryClient.setQueryData(cartKeys.all, context?.previousCart)
      },
      onSettled: () => {
        queryClient.invalidateQueries(cartKeys.all)
      },
    }),
  }
}
