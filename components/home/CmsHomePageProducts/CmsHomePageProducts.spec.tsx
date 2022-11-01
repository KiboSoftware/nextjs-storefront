import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import * as stories from './CmsHomePageProducts.stories' // import all stories from the stories file
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'

const { Common } = composeStories(stories)

const ProductCardMock = () => <div data-testid="product-card-mock" />
jest.mock('@/components/product/ProductCard/ProductCard', () => ProductCardMock)

describe('[component] CmsHomePageProducts', () => {
  it('should render component', async () => {
    render(<Common {...Common.args} />)
    const title = screen.getAllByRole('heading')

    await waitFor(() => {
      const productCard = screen.getAllByTestId('product-card-mock')
      const count = (productSearchResultMock?.items?.length as number) * 2
      expect(productCard.length).toBe(count)
    })
    expect(title[0]).toHaveTextContent(Common?.args?.recentlyViewed?.title as string)
    expect(title[1]).toHaveTextContent(Common?.args?.topSellings?.title as string)
  })
})
