import { buildBreadcrumbs, uiHelpers } from '@/lib/helpers'
import type { BreadCrumb, FacetResultsData } from '@/lib/types'

import type { Facet, PrCategory } from '@/lib/gql/types'

interface SortOptionType {
  value: string
  id: string
}

const getBreadcrumbs = (searchData: { categories: PrCategory[] }): BreadCrumb[] => {
  const homeCrumb = [{ text: 'Home', link: '/' }]
  const { getCategoryLink } = uiHelpers()
  if (!searchData?.categories?.[0]) {
    return homeCrumb
  }
  const categoryCrumbs = buildBreadcrumbs(searchData?.categories[0]).map((b) => ({
    ...b,
    link: getCategoryLink(b?.link as string),
  }))

  return [...homeCrumb, ...categoryCrumbs]
}

const getSelectedFacets = (facets?: Facet[]) => {
  if (!facets) return []
  const selectedFacets = facets?.map((f) => f?.values?.filter((value) => value?.isApplied))
  return selectedFacets.flat()
}

const getSortOptions = (facetResultData: FacetResultsData, sortOptions: SortOptionType[]) => {
  const options = sortOptions.map((option) => ({
    ...option,
    selected: option.id === facetResultData.input?.sort,
  }))

  const selected = options.find((option) => option.selected)?.id || ''

  return { options, selected }
}

export const facetGetters = {
  getBreadcrumbs,
  getSelectedFacets,
  getSortOptions,
}
