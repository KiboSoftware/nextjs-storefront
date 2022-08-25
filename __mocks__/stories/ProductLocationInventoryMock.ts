import type { LocationInventoryCollection } from '@/lib/gql/types'
export const productLocationInventoryMock: {
  productLocationInventory: LocationInventoryCollection
} = {
  productLocationInventory: {
    totalCount: 1,
    items: [
      {
        productCode: 'BackP_006',
        locationCode: 'RICHMOND',
        stockAvailable: 100,
        softStockAvailable: null,
      },
    ],
  },
}
