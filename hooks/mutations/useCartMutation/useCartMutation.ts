import { useMutation } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { addToCartMutation } from '@/lib/gql/mutations'
import { buildAddToCartInput } from '@/lib/helpers/buildAddToCartInput'

import type { ProductOptionSelectionInput } from '@/lib/gql/types'

export interface ConfigureProductDetails {
  updatedOptions: ProductOptionSelectionInput[]
  productCode: string
}

const addToCart = async ({ product, quantity }: any) => {
  const client = makeGraphQLClient()

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
