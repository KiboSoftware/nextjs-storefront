/**
 * @module useUpdateOrderItemPrice
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cartKeys, checkoutKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */
export interface UpdateOrderItemPriceParams {
  params: {
    orderId: string
    orderItemId: string
    price: number
  }
}

const updateOrderItemPrice = async (params: UpdateOrderItemPriceParams) => {
  const response = await fetch('/api/update-order-item-price', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  return await response.json()
}

/**
 * [Mutation hook] useUpdateOrderItemPrice uses the graphQL mutation
 *
 *
 * Description : Update existing order item price
 *
 * Parameters passed to function updateOrderItemPrice() => expects object of type 'UpdateOrderItemPriceParams'
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result
 *
 * @returns 'response?.updateOrderItemPrice' which contains Order number, payment status, product items with totals, shipping and billing details, fulfillment methods.
 */
export const useUpdateOrderItemPrice = () => {
  const queryClient = useQueryClient()

  return {
    updateOrderItemPrice: useMutation({
      mutationFn: updateOrderItemPrice,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
