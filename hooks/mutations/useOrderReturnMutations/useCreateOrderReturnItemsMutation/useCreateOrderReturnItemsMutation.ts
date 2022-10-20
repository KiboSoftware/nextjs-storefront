import { useMutation } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createReturnItemMutation } from '@/lib/gql/mutations'
import { buildCreateOrderReturnItemsParams } from '@/lib/helpers'
import type { CreateOrderReturnItemsInputParams } from '@/lib/types'

const createOrderReturnItems = async (params: CreateOrderReturnItemsInputParams) => {
  const { returnType, reason, notes, originalOrderId, items, locationCode } = params
  const returnItems = buildCreateOrderReturnItemsParams({ items, returnType, reason, notes })

  const client = makeGraphQLClient()

  const variables = {
    returnObjInput: {
      returnType,
      originalOrderId,
      items: returnItems,
      locationCode,
    },
  }
  const response = await client.request({
    document: createReturnItemMutation,
    variables,
  })

  return response?.createReturn
}

export const useCreateOrderReturnItemsMutation = () => {
  return {
    createReturnItems: useMutation(createOrderReturnItems),
  }
}
