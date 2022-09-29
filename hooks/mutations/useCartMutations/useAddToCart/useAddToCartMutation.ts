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
