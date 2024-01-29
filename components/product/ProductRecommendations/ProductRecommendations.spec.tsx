import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import * as stories from './ProductRecommendations.stories' // import all stories from the stories file
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'

const { Common } = composeStories(stories)

jest.mock('@splidejs/react-splide', () => ({
  ...jest.requireActual('@splidejs/react-splide'), // Use the actual implementation for any unmocked parts
  Splide: jest.fn(({ children }) => <div>{children}</div>),
  SplideSlide: jest.fn(({ children }) => <div>{children}</div>),
}))

const ProductCardMock = () => <div data-testid="product-card-mock" />
jest.mock('../ProductCard/ProductCard', () => () => ProductCardMock())

describe('[component] ProductRecommendations component', () => {
  it('should render the title', () => {
    render(<Common {...Common.args} />)

    const title = screen.getByText(Common?.args?.title as string)

    expect(title).toBeVisible()
  })

  it('should render the product cards', async () => {
    render(<Common {...Common.args} />)
    await waitFor(() => {
      const productCard = screen.getAllByTestId('product-card-mock')
      expect(productCard.length).toBe(productSearchResultMock?.items?.length)
    })
  })
})
