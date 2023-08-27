import { B2BAccount } from '../gql/types'
import { HierarchyNode } from '../types'

const findAndAddChildren = (group: any, hierarchy: HierarchyNode[]): HierarchyNode[] => {
  if (hierarchy?.length) {
    hierarchy.forEach((child: any) => {
      if (group[child.id]) {
        child.children = group[child.id]
        delete group[child.id]
        findAndAddChildren(group, child?.children)
      }
    })
  }
  return hierarchy
}

export const buildAccountHierarchy = (b2BAccounts: B2BAccount[]): HierarchyNode[] | undefined => {
  const parentAccountGroup = b2BAccounts.reduce(
    (group: { [key: number]: any }, { id, parentAccountId }) => {
      const accountId = (parentAccountId as number) ?? 0
      if (!group[accountId]) group[accountId] = [{ id, children: [] }]
      else group[accountId].push({ id, children: [] })
      return group
    },
    {}
  )
  const hierarchyInit = parentAccountGroup[0]
  delete parentAccountGroup[0]
  const hierarchy = findAndAddChildren(parentAccountGroup, hierarchyInit)
  return hierarchy
}
