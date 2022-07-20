import { ProductOption } from '@/lib/gql/types'

export interface WishlistProductInput {
  options: ProductOption[]
  productCode: string
  isPackagedStandAlone: boolean
  variationProductCode?: string
}
