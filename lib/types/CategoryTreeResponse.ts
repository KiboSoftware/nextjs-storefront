import type { CategoryCollection } from '@/lib/gql/types'

export interface CategoryTreeResponse {
  data: {
    categoriesTree: {
      items: CategoryCollection
    }
  }
}
