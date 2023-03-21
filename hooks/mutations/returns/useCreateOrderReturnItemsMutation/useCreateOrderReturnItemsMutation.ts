/**
 * @module useCreateOrderReturnItemsMutation
 */
import { useMutation } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createReturnItemMutation } from '@/lib/gql/mutations'
import { buildCreateOrderReturnItemsParams } from '@/lib/helpers'
import type { CreateOrderReturnItemsInputParams } from '@/lib/types'

const createOrderReturnItems = async (params: CreateOrderReturnItemsInputParams) => {
  const { returnType, reason, originalOrderId, items, locationCode } = params
  const returnItems = buildCreateOrderReturnItemsParams({ items, returnType, reason })

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

/**
 * [Mutation hook] useCreateOrderReturnItemsMutation uses the graphQL mutation
 *
 * <b>createReturn(returnObjInput: ReturnObjInput): ReturnObj</b>
 *
 * Description : Creates a return order for placed order items. Orders to be returned can be managed in 'My Account section'.
 * Select the item to be returned with it's return reason from dropdown menu and returnType(refund or replace).
 *
 * Parameters passed to function createOrderReturnItems(params: CreateOrderReturnItemsInputParams) => expects object containing returnType, reason, originalOrderId, items, locationCode
 *
 * @returns 'response?.createReturn' which places the return order containing return reasons and return type with items to be returned
 */
export const useCreateOrderReturnItemsMutation = () => {
  return {
    createReturnItems: useMutation(createOrderReturnItems),
  }
}
