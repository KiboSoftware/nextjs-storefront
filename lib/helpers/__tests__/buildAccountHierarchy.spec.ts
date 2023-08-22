import { buildAccountHierarchy } from '../buildAccountHierarchy'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'

describe('[helpers] buildAccountHierarchy function', () => {
  it('should return the hierarchy', () => {
    expect(buildAccountHierarchy(b2BAccountHierarchyResult.accounts)).toStrictEqual([
      b2BAccountHierarchyResult.hierarchy,
    ])
  })
})
