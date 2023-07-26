import type { Maybe, PrCategory } from '@/lib/gql/types'

const addParent = (category: PrCategory, newParent: PrCategory): void => {
  if (category.parentCategory) return addParent(category.parentCategory, newParent)
  category.parentCategory = Object.assign({}, newParent)
}

export const selectCategoryFromTree = (
  categoryTree: Array<PrCategory>,
  categoryCode: string | string[]
): any => {
  let targetCategory: PrCategory | undefined = undefined

  const findCategoryById = (category: Maybe<PrCategory>, code: string | string[]) => {
    if (category?.categoryCode === code) {
      targetCategory = Object.assign({}, category)
      return true
    }
    return category?.childrenCategories?.find((childCategory: Maybe<PrCategory>) => {
      const found = findCategoryById(childCategory, code)
      if (found) {
        addParent(targetCategory as PrCategory, category)
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

export async function categoryTreeSearchByCode(
  searchParams: any,
  categoryTree: PrCategory[]
): Promise<PrCategory | undefined> {
  try {
    const { categoryCode } = searchParams
    if (!categoryCode) {
      return undefined
    }
    return selectCategoryFromTree(categoryTree || [], categoryCode)
  } catch (error) {
    console.error(error)
  }
}
