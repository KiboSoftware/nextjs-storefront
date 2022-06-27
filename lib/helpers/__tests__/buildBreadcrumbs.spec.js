import { ProductCustomMock } from '../../../__mocks__/stories/ProductCustomMock'
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
    expect(buildBreadcrumbs(ProductCustomMock.categories[0])).toStrictEqual(breadcrumbs)
  })
})
