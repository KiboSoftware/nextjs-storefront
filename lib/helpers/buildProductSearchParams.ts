import { CategorySearchParams } from '../types'

import { QueryProductSearchArgs } from '@/lib/gql/types'

function getFacetValueFilter(categoryCode: string, filters: Array<string> = []) {
  let facetValueFilter = ''
  if (categoryCode) {
    facetValueFilter = `categoryCode:${categoryCode},`
  }
  return facetValueFilter + filters
}

export const buildProductSearchParams = ({
  categoryCode = '',
  pageSize,
  filters = [],
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
  }

  const facetValueFilter = getFacetValueFilter(categoryCode, filters)
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
