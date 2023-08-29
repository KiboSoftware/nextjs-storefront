import { Item } from 'react-nestable'

import { NestableOnChangeArgs } from '../types'

export const getSwapAccountParams = ({
  dragItem,
  items,
  targetPath,
}: NestableOnChangeArgs): { accountId: number; parentAccountId: number } => {
  let parent: Item = items
  targetPath.forEach((hierarchyIndex: number, index: number) => {
    if (index < targetPath?.length - 1) {
      parent = parent[hierarchyIndex] ?? parent?.children[hierarchyIndex]
    }
  })

  return {
    accountId: dragItem?.id,
    parentAccountId: parent?.id,
  }
}
