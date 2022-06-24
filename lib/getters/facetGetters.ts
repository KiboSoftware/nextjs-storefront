import { buildBreadcrumbs } from '@/lib/helpers'
import { uiHelpers } from '@/lib/helpers'
import type { BreadCrumb } from '@/lib/types'

import type { Facet, PrCategory } from '@/lib/gql/types'

const getBreadcrumbs = (searchData: { categories: PrCategory[] }): BreadCrumb[] => {
  const homeCrumb = [{ text: 'Home', link: '/' }]
  const { getCatLink } = uiHelpers()
  if (!searchData?.categories?.[0]) {
    return homeCrumb
  }
  const categoryCrumbs = buildBreadcrumbs(searchData?.categories[0]).map((b) => ({
    ...b,
    link: getCatLink(b?.link as string),
  }))

  return [...homeCrumb, ...categoryCrumbs]
}

const getSelectedFacets = (facets?: Facet[]) => {
  if (!facets) return []
  const selectedFacets = facets?.map((f) => f?.values?.filter((value) => value?.isApplied))
  return selectedFacets.flat()
}

export const facetGetters = {
  getBreadcrumbs,
  getSelectedFacets,
}
