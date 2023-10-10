import { buildAccountHierarchy } from '../buildAccountHierarchy'
import { b2BAccountHierarchyResult, hierarchyTreeMock } from '@/__mocks__/stories'

describe('[helpers] buildAccountHierarchy function', () => {
  it('should return the hierarchy', () => {
    expect(buildAccountHierarchy(b2BAccountHierarchyResult.accounts, 123)).toStrictEqual(
      hierarchyTreeMock
    )
  })
})
