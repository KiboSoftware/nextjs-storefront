import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { addToCartMutation } from '@/lib/gql/mutations'
import { buildAddToCartInput } from '@/lib/helpers/buildAddToCartInput'
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
    productToAdd: buildAddToCartInput(product, quantity),
  }

  const response = await client.request({
    document: addToCartMutation,
    variables,
  })

  return response?.addItemToCurrentCart
}

export const useCartMutationAddToCart = () => {
  const queryClient = useQueryClient()
  return {
    addToCart: useMutation(addToCart, {
      onSuccess: () => {
        queryClient.invalidateQueries(cartKeys.all)
      },
    }),
  }
}
