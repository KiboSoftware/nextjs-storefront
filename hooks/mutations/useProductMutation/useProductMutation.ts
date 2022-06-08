import { useMutation, useQueryClient } from 'react-query'

// import { checkoutKeys } from '../../lib/react-query/queryKeys'
import { makeGraphQLClient } from '@/lib/gql/client'
import { configureProductMutation } from '@/lib/gql/mutations'
import { ConfigureOption } from '@/lib/types'

export interface ConfigureProductDetails {
  updatedOptions: ConfigureOption[]
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
