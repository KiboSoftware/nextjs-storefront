import type { Maybe, CrOrderItem } from '@/lib/gql/types'

export interface CreateOrderReturnItemsParams {
  items: Maybe<CrOrderItem>[]
  returnType: string
  reason: string
}
export interface CreateOrderReturnItemsInputParams extends CreateOrderReturnItemsParams {
  originalOrderId: string
  locationCode: string
}
