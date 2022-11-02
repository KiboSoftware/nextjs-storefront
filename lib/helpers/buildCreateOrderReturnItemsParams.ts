import type { CreateOrderReturnItemsParams } from '@/lib/types'

export const buildCreateOrderReturnItemsParams = (params: CreateOrderReturnItemsParams) => {
  const { items, returnType, reason } = params

  return items.map((item) => {
    return {
      product: item?.product,
      quantityReceived: item?.quantity,
      quantityShipped: item?.quantity,
      quantityRestockable: item?.quantity,
      quantityRestocked: item?.quantity,
      quantityRefunded: 0,
      orderLineId: item?.lineId,
      returnType,
      orderItemOptionAttributeFQN: '',
      excludeProductExtras: false,
      reasons: {
        reason,
        quantity: item?.quantity,
      },
    }
  })
}
