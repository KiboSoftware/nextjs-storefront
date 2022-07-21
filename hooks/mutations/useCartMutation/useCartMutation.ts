import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import {
  addToCartMutation,
  updateCartItemQuantityMutation,
  updateCartItemMutation,
  deleteCartItemMutation,
} from '@/lib/gql/mutations'
import { buildAddToCartInput } from '@/lib/helpers/buildAddToCartInput'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { CartItemInput, CartItem, ProductOption } from '@/lib/gql/types'

export interface AddToCartProductInput {
  options: ProductOption[]
  productCode: string
  variationProductCode?: string
  fulfillmentMethod?: string
  purchaseLocationCode?: string
}
interface AddToCartInputParams {
  product: AddToCartProductInput
  quantity: number
}
interface UpdateCartItemQuantityParams {
  cartItemId: string
  quantity: number
}
interface RemoveCartItemParams {
  cartItemId: string
}

interface UpdateCartItemParams {
  cartItemId: string
  cartItemInput: CartItemInput
}

const addToCart = async (props: AddToCartInputParams) => {
  const client = makeGraphQLClient()
  const { product, quantity } = props

  const variables = {
    productToAdd: buildAddToCartInput(product, quantity),
  }

  const response = await client.request({
    document: addToCartMutation,
    variables,
  })

  return response?.addItemToCurrentCart
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
const removeCartItem = async (params: RemoveCartItemParams) => {
  const client = makeGraphQLClient()
  const { cartItemId } = params

  const variables = {
    itemId: cartItemId,
  }
  const response = await client.request({
    document: deleteCartItemMutation,
    variables,
  })

  return response?.deleteCartItemMutation
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

export const useCartMutation = () => {
  const queryClient = useQueryClient()
  return {
    addToCart: useMutation(addToCart, {
      onSuccess: () => {
        queryClient.invalidateQueries(cartKeys.all)
      },
    }),

    updateCartItemQuantity: useMutation(updateCartItemQuantity, {
      // When mutate is called:
      onMutate: async (updateCartItem) => {
        await queryClient.cancelQueries()

        const previousCart: any = queryClient.getQueryData(cartKeys.all)
        const cart = { ...previousCart }
        const cartItem = cart?.items?.find(
          (item: CartItem) => item.id === updateCartItem.cartItemId
        )

        if (cartItem?.id) cartItem.quantity = updateCartItem.quantity
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

    removeCartItem: useMutation(removeCartItem, {
      onMutate: async (deleteCartItem) => {
        await queryClient.cancelQueries()

        const previousCart: any = queryClient.getQueryData(cartKeys.all)
        const newCart = previousCart?.items?.filter(
          (item: CartItem) => item.id !== deleteCartItem.cartItemId
        )
        queryClient.setQueryData(cartKeys.all, newCart)

        return { previousCart }
      },
      onError: (_err, _newCart, context: any) => {
        queryClient.setQueryData(cartKeys.all, context?.previousCart)
      },
      onSettled: () => {
        queryClient.invalidateQueries(cartKeys.all)
      },
    }),

    updateCartItem: useMutation(updateCartItem, {
      onMutate: async (currentData) => {
        await queryClient.cancelQueries(cartKeys.updateCartItem(currentData.cartItemId))
        const previousData = queryClient.getQueryData(
          cartKeys.updateCartItem(currentData.cartItemId)
        )
        queryClient.setQueryData(cartKeys.updateCartItem(currentData.cartItemId), currentData)
        return { previousData, currentData }
      },
      onError: (error, _currentData, context: any) => {
        console.log(error)
        queryClient.setQueryData(
          cartKeys.updateCartItem(context?.cartItemId),
          context?.previousData
        ) // rollback logic
      },
      onSettled: (currentData) => {
        queryClient.invalidateQueries(cartKeys.updateCartItem(currentData.cartItemId)) // refetch the query data
      },
    }),
  }
}
