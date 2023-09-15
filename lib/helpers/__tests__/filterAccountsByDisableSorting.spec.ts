import { filterAccountsByDisableSorting } from '../filterAccountsByDisableSorting'
import { b2BAccountHierarchyResult, hierarchySortableTreeMock } from '@/__mocks__/stories'

describe('[Helper] filterAccountsByDisableSorting', () => {
  const hierarchy = hierarchySortableTreeMock
  const accounts = b2BAccountHierarchyResult.accounts

  it('should filter accounts with disableSorting set to false', () => {
    const filteredAccounts = filterAccountsByDisableSorting(hierarchy, accounts)
    expect(filteredAccounts).toHaveLength(4)
  })
})
