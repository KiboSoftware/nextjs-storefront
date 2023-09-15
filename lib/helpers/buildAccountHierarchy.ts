import { B2BAccount } from '../gql/types'
import { HierarchyNode, HierarchyTree } from '../types'

const findAndAddChildren = (
  group: any,
  hierarchy: HierarchyNode[],
  currentUserAccountId: number
): HierarchyNode[] => {
  if (hierarchy?.length) {
    hierarchy?.forEach((child: any) => {
      if (group[child.id]) {
        child.children = group[child.id]
        if (child.id === currentUserAccountId || !child.disableSorting) {
          child.disableSorting = false
          child.children = child.children.map((each: any) => {
            each.disableSorting = false
            return each
          })
        }
        delete group[child.id]
        findAndAddChildren(group, child?.children, currentUserAccountId)
      }
    })
  }
  return hierarchy
}

export const buildAccountHierarchy = (
  b2BAccounts: B2BAccount[],
  currentUserAccountId: number
): HierarchyTree[] | undefined => {
  const parentAccountGroup = b2BAccounts?.reduce(
    (group: { [key: number]: any }, { id, parentAccountId }) => {
      const accountId = (parentAccountId as number) ?? 0
      if (!group[accountId])
        group[accountId] = [{ id, collapsed: false, disableSorting: true, children: [] }]
      else group[accountId].push({ id, collapsed: false, disableSorting: true, children: [] })
      return group
    },
    {}
  )
  const hierarchyInit = parentAccountGroup[0]
  delete parentAccountGroup[0]
  const hierarchy = findAndAddChildren(parentAccountGroup, hierarchyInit, currentUserAccountId)
  return hierarchy
}
