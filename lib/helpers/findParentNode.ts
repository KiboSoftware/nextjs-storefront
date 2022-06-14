import type { Maybe, PrCategory } from '../gql/types'

export const findParentNode = (
  items: Maybe<PrCategory>[],
  categoryCode?: string | null,
  parent?: Maybe<PrCategory>
): Maybe<PrCategory | undefined> => {
  /* looping through all the categories to find the provided categoryCode.
      If a match is found and it's the root label, return null else return the immediate parent.
      findParent will be called recursively */
  for (const item of items) {
    const res: Maybe<PrCategory | undefined> =
      item?.categoryCode === categoryCode
        ? parent
        : item?.childrenCategories &&
          findParentNode(item?.childrenCategories as PrCategory[], categoryCode, item)
    if (res || res === null) return res
  }
}
