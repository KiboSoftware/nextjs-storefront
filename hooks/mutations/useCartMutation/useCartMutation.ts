import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import {
  addToCartMutation,
  updateCartItemQuantityMutation,
  deleteCartItemMutation,
} from '@/lib/gql/mutations'
import { buildAddToCartInput } from '@/lib/helpers/buildAddToCartInput'
import { cartKeys } from '@/lib/react-query/queryKeys'

import { ProductOption } from '@/lib/gql/types'

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

export const useCartMutation = () => {
  const queryClient = useQueryClient()
  return {
    addToCart: useMutation(addToCart, {
      onSuccess: () => {
        queryClient.invalidateQueries(cartKeys.all)
      },
    }),
    updateCartItemQuantity: useMutation(updateCartItemQuantity, {
      onSuccess: () => {
        queryClient.invalidateQueries(cartKeys.all)
      },
    }),
    removeCartItem: useMutation(removeCartItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(cartKeys.all)
      },
    }),
  }
}
