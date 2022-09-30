import { useMutation } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { configureProductMutation } from '@/lib/gql/mutations'

import type { ProductOptionSelectionInput } from '@/lib/gql/types'

export interface ConfigureProductDetails {
  updatedOptions: ProductOptionSelectionInput[]
  productCode: string
}

const configureProduct = async (configureProductDetails: ConfigureProductDetails) => {
  const client = makeGraphQLClient()

  const { productCode, updatedOptions: options } = configureProductDetails

  const variables = {
    productCode,
    selectedOptions: {
      options,
    },
  }

  const response = await client.request({
    document: configureProductMutation,
    variables,
  })

  return response.configureProduct
}

export const useProductMutation = () => {
  return {
    configureProduct: useMutation(configureProduct),
  }
}
