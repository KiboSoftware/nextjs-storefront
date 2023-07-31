/**
 * @module useAddCartItem
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { addToCartMutation } from '@/lib/gql/mutations'
import { buildAddToCartParams } from '@/lib/helpers/buildAddToCartParams'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { ProductOption, CrSubscriptionInfo } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface AddToCartProductInput {
  options: ProductOption[]
  productCode: string
  variationProductCode?: string
  fulfillmentMethod?: string
  purchaseLocationCode?: string
}

export interface AddCartItemParams {
  product: AddToCartProductInput
  quantity: number
  subscription?: CrSubscriptionInfo
}

const addToCart = async (props: AddCartItemParams) => {
  const client = makeGraphQLClient()
  const { product, quantity, subscription } = props

  const variables = {
    productToAdd: buildAddToCartParams(product, quantity, subscription),
  }

  const response = await client.request({
    document: addToCartMutation,
    variables,
  })

  return response?.addItemToCurrentCart
}
/**
 * [Mutation hook] useAddCartItem uses the graphQL mutation
 *
 * <b>addItemToCurrentCart(cartItemInput: CrCartItemInput): CartItem</b>
 *
 * Description : Add the product items to the cart with selected quantity
 *
 * Parameters passed to function addToCart(props: AddCartItemParams) => expects object of type 'AddCartItemParams' containing product and quantity
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result.
 *
 * @returns 'response?.addItemToCurrentCart' which contains object of product items added to cart and it's quantity
 */
export const useAddCartItem = () => {
  const queryClient = useQueryClient()
  return {
    addToCart: useMutation({
      mutationFn: addToCart,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
      },
    }),
  }
}
