import { FacetListForHistory, FacetTypeForHistory } from '../constants'
import { buildBreadcrumbsParams, uiHelpers } from '@/lib/helpers'
import type { BreadCrumb, FacetResultsData } from '@/lib/types'

import type { Facet, FacetValue, PrCategory } from '@/lib/gql/types'

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
  const categoryCrumbs = buildBreadcrumbsParams(searchData?.categories[0]).map((b) => ({
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

const getSelectedFacetItems = (facetList: FacetValue[]) => {
  const facetItemValues = Array.from(
    facetList.reduce((set, item) => {
      if (item?.isApplied) {
        set.add(item?.filterValue)
      }
      return set
    }, new Set())
  )
  return facetItemValues.join(',')
}

const getFacetListByQueryFilter = (filters: string[]) => {
  FacetListForHistory.forEach(
    (facet) => (facet.isApplied = filters.some((filter) => filter === facet.filterValue))
  )
  return FacetListForHistory.flat()
}

const getFacetTypeForHistory = (t: any) => {
  FacetTypeForHistory.forEach((facetType) => {
    facetType.label = t(`${facetType.label}`)
    facetType.values.forEach((facet) => (facet.label = t(`${facet.label}`)))
  })
  return FacetTypeForHistory
}

const getAppliedFacetList = (facetList: FacetValue[]) => facetList?.filter((f) => f?.isApplied)

export const facetGetters = {
  getBreadcrumbs,
  getSelectedFacets,
  getSortOptions,
  getSelectedFacetItems,
  getFacetListByQueryFilter,
  getFacetTypeForHistory,
  getAppliedFacetList,
}
