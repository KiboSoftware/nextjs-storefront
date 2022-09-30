import type { PrCategory } from '../gql/types'
import type { BreadCrumb } from '../types'

const buildBreadcrumbsList = (rootCat: PrCategory, bc: BreadCrumb[]): BreadCrumb[] => {
  const newBc = [
    ...bc,
    {
      text: rootCat.content?.name,
      link: `${rootCat.categoryCode}`,
    },
  ]
  return rootCat.parentCategory ? buildBreadcrumbsList(rootCat.parentCategory, newBc) : newBc
}

export const buildBreadcrumbsParams = (rootCat: PrCategory) =>
  buildBreadcrumbsList(rootCat, []).reverse()
