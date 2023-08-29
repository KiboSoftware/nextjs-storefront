import { getSwapAccountParams } from '../getSwapAccountParams'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'

const dragItem = { id: 1024, children: [] }
const items = [b2BAccountHierarchyResult?.hierarchy]
const targetPath = [0, 0]

describe('[helpers] getSwapAccountParams function', () => {
  it('should return accountId and parentAccountId', () => {
    expect(getSwapAccountParams({ dragItem, items, targetPath })).toStrictEqual({
      accountId: 1024,
      parentAccountId: 1004,
    })
  })
})
