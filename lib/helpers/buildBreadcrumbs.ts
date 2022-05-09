import type { PrCategory } from '../gql/types'
import type { BreadcrumbsListReturnType } from '../types'

const buildBreadcrumbsList = (
  rootCat: PrCategory,
  bc: BreadcrumbsListReturnType
): BreadcrumbsListReturnType => {
  const newBc = [
    ...bc,
    {
      text: rootCat.content?.name,
      link: `${rootCat.categoryCode}`,
    },
  ]
  const result = rootCat.parentCategory
    ? buildBreadcrumbsList(rootCat.parentCategory, newBc)
    : newBc

  return result
}

export const buildBreadcrumbs = (rootCat: PrCategory) => buildBreadcrumbsList(rootCat, []).reverse()
