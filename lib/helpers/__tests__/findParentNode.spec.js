import { categoryTreeDataMock } from '../../../__mocks__/stories/categoryTreeDataMock'
import { findParentNode } from '../findParentNode'

describe('[helpers] findParentNode function', () => {
  it("should return parent node if parent node is present and that's not root node", () => {
    const categories = categoryTreeDataMock.categoriesTree.items.filter((each) => each.isDisplayed)
    const node = findParentNode(categories, '32')
    expect(node).toStrictEqual(categories[0])
  })

  it('should return null if parent Node is root node', () => {
    const categories = categoryTreeDataMock.categoriesTree.items.filter((each) => each.isDisplayed)
    const node = findParentNode(categories, '27')
    expect(node).toStrictEqual(null)
  })

  it('should return undefined if searchable categoryCode is null', () => {
    const categories = categoryTreeDataMock.categoriesTree.items.filter((each) => each.isDisplayed)
    const node = findParentNode(categories, null)
    expect(node).toStrictEqual(undefined)
  })
})
