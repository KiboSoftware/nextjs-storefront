import { B2BAccount } from '../gql/types'
import { HierarchyTree } from '../types'

export const filterAccountsByDisableSorting = (
  hierarchy: HierarchyTree[],
  accounts: B2BAccount[]
) => {
  if (hierarchy.length === 0) return accounts
  // Initialize an empty array to store filtered accounts
  const filteredAccounts: B2BAccount[] = []

  // Helper function to recursively traverse the hierarchy
  function traverse(node: HierarchyTree) {
    // Check if the current node has disableSorting set to false
    if (node.disableSorting === false) {
      // Find the corresponding account based on rootAccountId
      const account = accounts.find((acc) => acc.id === node.id)

      // If an account is found, add it to the filteredAccounts array
      if (account) {
        filteredAccounts.push(account)
      }
    }

    // Recursively traverse children nodes
    if (node.children && node.children.length > 0) {
      node.children?.forEach((child) => {
        traverse(child)
      })
    }
  }

  // Start the traversal from the root of the hierarchy
  hierarchy?.forEach((rootNode) => {
    traverse(rootNode)
  })

  return filteredAccounts
}
