import { useMutation } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { addToCartMutation } from '@/lib/gql/mutations'
import { buildAddToCartInput } from '@/lib/helpers/buildAddToCartInput'

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

export const useCartMutation = () => {
  return {
    addToCart: useMutation(addToCart), //todo - invalidate query
  }
}
