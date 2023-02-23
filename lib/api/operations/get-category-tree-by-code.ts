import { ParsedUrlQuery } from 'querystring'

// import { fetcher } from '@/lib/api/util'
// import { getCategoryTreeQuery } from '@/lib/gql/queries'
import getCategoryTree from './get-category-tree'

import type { Maybe, PrCategory } from '@/lib/gql/types'

const addParent = (category: PrCategory, newParent: PrCategory): void => {
  if (category.parentCategory) return addParent(category.parentCategory, newParent)
  category.parentCategory = Object.assign({}, newParent)
}

let targetCategory: PrCategory
export const selectCategoryFromTree = (
  categoryTree: Array<PrCategory>,
  categoryCode: string | string[]
): PrCategory => {
  const findCategoryById = (category: Maybe<PrCategory>, code: string | string[]) => {
    if (category?.categoryCode === code) {
      targetCategory = Object.assign({}, category)
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
  return targetCategory
}

export default async function search(searchParams: ParsedUrlQuery) {
  try {
    const { categoryCode } = searchParams
    const categoryTree = await getCategoryTree()
    if (!categoryCode) {
      return { categories: categoryTree || [] }
    }
    const category = selectCategoryFromTree(categoryTree || [], categoryCode)
    return { categories: category ? [category] : [] }
  } catch (error) {
    console.error(error)
  }
}
