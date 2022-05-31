import { ProductDataMock } from '../../../__mocks__/stories/ProductDataMock'
import { buildBreadcrumbs } from '../buildBreadcrumbs'

describe('[helpers] buildBreadcrumbs function', () => {
  it('should return the breadcrumbs', () => {
    const breadcrumbs = [
      {
        text: 'Biking',
        link: `30`,
      },
      {
        text: 'Mountain',
        link: `42`,
      },
    ]
    expect(buildBreadcrumbs(ProductDataMock.categories[0])).toStrictEqual(breadcrumbs)
  })
})
