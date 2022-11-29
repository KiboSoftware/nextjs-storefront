import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { addToCartMutation } from '@/lib/gql/mutations'
import { buildAddToCartParams } from '@/lib/helpers/buildAddToCartParams'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { ProductOption } from '@/lib/gql/types'

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

const addToCart = async (props: AddToCartInputParams) => {
  const client = makeGraphQLClient()
  const { product, quantity } = props

  const variables = {
    productToAdd: buildAddToCartParams(product, quantity),
  }

  const response = await client.request({
    document: addToCartMutation,
    variables,
  })

  return response?.addItemToCurrentCart
}
/**
 * [Mutation hook] useAddToCartMutation uses the graphql mutation
 *
 * <b>addItemToCurrentCart(cartItemInput: CartItemInput): CartItem</b>
 *
 * Description : Add the product items to the cart with selected quantity
 *
 * Parameters passed to function addToCart(props: AddToCartInputParams) => expects object of type 'AddToCartInputParams' containing product details and quantity
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result.
 *
 * @returns 'response?.addItemToCurrentCart' which contains object of product items added to cart and it's quantity
 */
export const useAddToCartMutation = () => {
  const queryClient = useQueryClient()
  return {
    addToCart: useMutation(addToCart, {
      onSuccess: () => {
        queryClient.invalidateQueries(cartKeys.all)
      },
    }),
  }
}
