/**
 * @module useProductMutation
 */
import { useMutation } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { configureProductMutation } from '@/lib/gql/mutations'

import type { ProductOptionSelectionInput } from '@/lib/gql/types'

/**
 * @hidden
 */
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

/**
 * [Mutation hook] useProductMutation uses the graphQL mutation
 *
 * </b>configureProduct(productCode: String!, includeOptionDetails: Boolean, skipInventoryCheck: Boolean, quantity: Int, purchaseLocation: String, variationProductCodeFilter: String, productOptionSelectionsInput: ProductOptionSelectionsInput): ConfiguredProduct</b>
 *
 * Description : Update the product configurations
 *
 * Parameters passed to internal function configureProduct(params: ConfigureProductDetails) => expects object containing productCode and updatedOptions.
 *
 * @returns 'response?.configureProduct', which has product details like productCode, purchaseLocation, options, productImages etc.
 */

export const useProductMutation = () => {
  return {
    configureProduct: useMutation(configureProduct),
  }
}
