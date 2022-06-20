import { fetcher } from '@/lib/api/util'
import { searchProductsQuery } from '@/lib/gql/queries'

import type { QueryProductSearchArgs } from '@/lib/gql/types'

function getFacetValueFilter(categoryCode: string, filters: Array<string> = []) {
  let facetValueFilter = ''
  if (categoryCode) {
    facetValueFilter = `categoryCode:${categoryCode},`
  }
  return facetValueFilter + filters
}

const buildProductSearchVars = ({
  categoryCode = '',
  pageSize = 30,
  filters = [],
  startIndex = 0,
  sort = '',
  search = '',
  filter = '',
}: {
  categoryCode: string
  pageSize: number
  filters: Array<string>
  startIndex: number
  sort: string
  search: string
  filter: string
}): QueryProductSearchArgs => {
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
    pageSize,
    sortBy: sort,
    facetHierValue,
    facetTemplate,
    facetValueFilter,
    filter,
  }
}

export default async function search(searchParams: any) {
  try {
    const variables = buildProductSearchVars(searchParams)
    return await fetcher({ query: searchProductsQuery, variables })
  } catch (error) {
    console.error(error)
  }
}
