import { FacetValue, ProductSearchResult } from '../gql/types'
const getProducts = (searchData: ProductSearchResult) => {
  if (!searchData) return []
  return searchData?.items
}

const getFacetByName = (searchData: ProductSearchResult, facetName: string) => {
  return searchData?.facets?.find((facet) => facet?.field === facetName)
}

const getCategoryFacet = (
  productSearchResult: ProductSearchResult,
  categoryCode?: string | string[]
) => {
  const facetName = 'CategoryCode'

  // Searching categories by facetName i.e. : CategoryCode
  const facet = getFacetByName(productSearchResult, facetName)
  const parent = facet?.values?.find((facet) => categoryCode === facet?.value)
  const header = parent?.label as string
  const childrenCategories = parent?.childrenFacetValues as FacetValue[]
  return { header, childrenCategories }
}

const getTotalProducts = (searchData: ProductSearchResult) => {
  return searchData?.totalCount
}

export const productSearchGetters = {
  getProducts,
  getFacetByName,
  getCategoryFacet,
  getTotalProducts,
}
