import { ProductCustomMock } from '../../../__mocks__/stories/ProductCustomMock'
import { buildBreadcrumbsParams } from '../buildBreadcrumbsParams'

import { PrCategory } from '@/lib/gql/types'

describe('[helpers] buildBreadcrumbsParams function', () => {
  it('should return the breadcrumbs', () => {
    const breadcrumbs = [
      {
        text: 'Biking',
        seoFriendlyUrl: 'biking',
        link: `30`,
      },
      {
        text: 'Mountain',
        seoFriendlyUrl: 'mountain',
        link: `42`,
      },
    ]
    expect(buildBreadcrumbsParams(ProductCustomMock.categories?.[0] as PrCategory)).toStrictEqual(
      breadcrumbs
    )
  })
})
