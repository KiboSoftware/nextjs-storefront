import { buildAccountHierarchy } from '../buildAccountHierarchy'
import { b2BAccountHierarchyResult, hierarchyTreeMock } from '@/__mocks__/stories'

describe('[helpers] buildAccountHierarchy function', () => {
  it('should return the hierarchy', () => {
    console.log(buildAccountHierarchy(b2BAccountHierarchyResult.accounts))
    expect(buildAccountHierarchy(b2BAccountHierarchyResult.accounts)).toStrictEqual(
      hierarchyTreeMock
    )
  })
})
