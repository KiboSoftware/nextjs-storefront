import { ParsedUrlQuery } from 'querystring'

import { uiHelpers } from '@/lib/helpers'

import type { Maybe, PrCategory } from '@/lib/gql/types'

const addParent = (category: PrCategory, newParent: PrCategory): void => {
  if (category.parentCategory) return addParent(category.parentCategory, newParent)
  category.parentCategory = Object.assign({}, newParent)
}

let targetCategory: PrCategory
let metaInformation: any
let seoFriendlyUrl: string
export const selectCategoryFromTree = (
  categoryTree: Array<PrCategory>,
  categoryCode: string | string[]
): any => {
  const { getCategoryLink } = uiHelpers()
  const findCategoryById = (category: Maybe<PrCategory>, code: string | string[]) => {
    if (category?.categoryCode === code) {
      targetCategory = Object.assign({}, category)
      seoFriendlyUrl = category.content?.slug as string
      metaInformation = {
        metaTagTitle: category?.content?.metaTagTitle,
        metaTagDescription: category?.content?.metaTagDescription,
        metaTagKeywords: category?.content?.metaTagKeywords,
        canonical: getCategoryLink(category.categoryCode, category.content?.slug as string),
      }
      return true
    }
    return category?.childrenCategories?.find((childCategory: Maybe<PrCategory>) => {
      const found = findCategoryById(childCategory, code)
      if (found) {
        addParent(targetCategory, category)
        return true
      }
      return false
    })
  }
  for (const rootCategory of categoryTree) {
    if (findCategoryById(rootCategory, categoryCode)) {
      continue
    }
  }

  return { targetCategory, metaInformation, seoFriendlyUrl }
}

export default async function categoryTreeSearchByCode(
  searchParams: ParsedUrlQuery,
  categoryTree: PrCategory[]
) {
  try {
    const { categoryCode } = searchParams
    if (!categoryCode) {
      return { categories: categoryTree || [] }
    }
    const category = selectCategoryFromTree(categoryTree || [], categoryCode)
    return {
      categories: category?.targetCategory ? [category?.targetCategory] : [],
      metaInformation: category?.metaInformation,
      seoFriendlyUrl: category?.seoFriendlyUrl,
    }
  } catch (error) {
    console.error(error)
  }
}
