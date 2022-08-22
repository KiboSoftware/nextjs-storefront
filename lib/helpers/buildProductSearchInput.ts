import { CategorySearchParams } from '../types'

import { QueryProductSearchArgs } from '@/lib/gql/types'

function getFacetValueFilter(categoryCode: string, filters: Array<string> = []) {
  let facetValueFilter = ''
  if (categoryCode) {
    facetValueFilter = `categoryCode:${categoryCode},`
  }
  return facetValueFilter + filters
}

export const buildProductSearchInput = ({
  categoryCode = '',
  pageSize = 16,
  filters = [],
  startIndex = 0,
  sort = '',
  search = '',
  filter = '',
  productCodes = [],
}: CategorySearchParams): QueryProductSearchArgs => {
  if (productCodes.length > 0) {
    const productCodeFilter: Array<string> = []
    productCodes.map((code) => {
      productCodeFilter.push(`productCode eq ${code?.productCode}`)
    })
    return { filter: productCodeFilter.join(' or ') }
  } else {
    let facetTemplate = ''
    let facetHierValue = ''
    facetTemplate = `categoryCode:${categoryCode || '_root'}`
    if (categoryCode) {
      facetHierValue = `categoryCode:${categoryCode}`
    }

    const facetValueFilter = getFacetValueFilter(categoryCode, filters)
    return {
      query: search,
      startIndex,
      pageSize: Number(pageSize),
      sortBy: sort,
      facetHierValue,
      facetTemplate,
      facetValueFilter,
      filter,
    }
  }
}
