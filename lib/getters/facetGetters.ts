import { PrCategory } from '../gql/types'
import { buildBreadcrumbs } from '../helpers'
import { BreadCrumb } from '../types'

const getBreadcrumbs = (searchData: { categories: PrCategory[] }): BreadCrumb[] => {
  const homeCrumb = [{ text: 'Home', link: '/' }]
  if (!searchData?.categories?.[0]) {
    return homeCrumb
  }
  const categoryCrumbs = buildBreadcrumbs(searchData?.categories[0]).map((b) => ({
    ...b,
    link: `/category/${b.link}`,
  }))

  return [...homeCrumb, ...categoryCrumbs]
}

export const facetGetters = {
  getBreadcrumbs,
}
