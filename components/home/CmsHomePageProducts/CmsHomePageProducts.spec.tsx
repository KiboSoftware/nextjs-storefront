import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import * as stories from './CmsHomePageProducts.stories' // import all stories from the stories file
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'

const { Common } = composeStories(stories)

jest.mock('@/components/product/ProductCard/ProductCard', () => ({
  __esModule: true,
  default: () => <div data-testid="product-card-mock" />,
}))

describe('[component] CmsHomePageProducts', () => {
  it('should render component', async () => {
    render(<Common {...Common.args} />)
    const title = screen.getAllByRole('heading')
    const itemCount = (productSearchResultMock?.items?.length || 0) * 2
    await waitFor(() => {
      const productCard = screen.getAllByTestId('product-card-mock')
      expect(productCard.length).toBe(itemCount)
    })
    expect(title[0]).toHaveTextContent(Common?.args?.recentlyViewed?.title as string)
    expect(title[1]).toHaveTextContent(Common?.args?.topSellings?.title as string)
  })
})
