import { ProductCustomMock } from '../../../__mocks__/stories/ProductCustomMock'
import { buildBreadcrumbsParams } from '../buildBreadcrumbsParams'

describe('[helpers] buildBreadcrumbsParams function', () => {
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
    expect(buildBreadcrumbsParams(ProductCustomMock.categories[0])).toStrictEqual(breadcrumbs)
  })
})
