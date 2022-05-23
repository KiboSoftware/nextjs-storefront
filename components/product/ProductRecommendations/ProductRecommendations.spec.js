import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import * as stories from './ProductRecommendations.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const ProductCardMock = () => <div data-testid="product-card-mock" />
jest.mock('../ProductCard/ProductCard', () => ProductCardMock)

describe('[component] ProductOptionCheckbox component', () => {
  it('should render the title', () => {
    render(<Common {...Common.args} />)

    const title = screen.getByText(Common.args.title)

    expect(title).toBeVisible()
  })

  it('should render the product cards', () => {
    render(<Common {...Common.args} />)

    const productCard = screen.getAllByTestId('product-card-mock')

    expect(productCard.length).toBe(5)
  })
})
