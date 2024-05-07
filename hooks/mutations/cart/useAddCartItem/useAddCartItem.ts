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
  const tenantOverrideProducts = {
    'acc2-1': { tenantOverridePrice: 10 },
    'acc2-2': { tenantOverridePrice: 10, isOverRidePriceSalePrice: true },
    'acc3-1': { tenantOverridePrice: 11 },
    'bike2-1': { tenantOverridePrice: 12 },
    'bike1-3': { tenantOverridePrice: 13 },
  } as any
  const client = makeGraphQLClient()
  const { product, quantity, subscription } = props
  const variables = {
    productToAdd: buildAddToCartParams(product, quantity, subscription),
  }
  const key = (
    variables.productToAdd.product?.variationProductCode ||
    variables.productToAdd.product?.productCode
  )?.toLowerCase() as string
  let overridePrice = false
  if (Object.keys(tenantOverrideProducts).includes(key as any)) {
    overridePrice = true
    const price = tenantOverrideProducts[key] as any
    ;(variables.productToAdd.product as any).price = { ...price }
  }
  if (overridePrice) {
    const response = await fetch('/api/add-to-cart', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
    })
    return await response.json()
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

/*
    Storefront SSO for users, TrustedSite
    Cart Takeover

    Surflive
*/
