export const accountHierarchyNodeRecursive = `
fragment accountHierarchyNodeRecursive on AccountHierarchyNode {
   id
   children {
    ...accountHierarchyNodeRecursive
   }
} 
`
