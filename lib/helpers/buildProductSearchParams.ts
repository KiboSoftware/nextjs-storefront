import { CategorySearchParams } from '../types'

import { QueryProductSearchArgs } from '@/lib/gql/types'

export const buildProductSearchParams = ({
  categoryCode = '',
  pageSize,
  filters = '',
  startIndex = 0,
  sort = '',
  search = '',
  filter = '',
}: CategorySearchParams): QueryProductSearchArgs => {
  let facetTemplate = ''
  let facetHierValue = ''
  let facet = ''
  facetTemplate = `categoryCode:${categoryCode || '_root'}`
  if (categoryCode) {
    facetHierValue = `categoryCode:${categoryCode}`
    facet = 'categoryCode'
    filter = `categoryCode req ${categoryCode}`
  }

  const facetValueFilter = filters
  return {
    query: search,
    startIndex: Number(startIndex),
    pageSize: Number(pageSize),
    sortBy: sort,
    facet,
    facetHierValue,
    facetTemplate,
    facetValueFilter,
    filter,
  }
}
