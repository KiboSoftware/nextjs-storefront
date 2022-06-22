import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ViewOrderDetails.stories'

const { Common } = composeStories(stories)

const productOptionMock = () => <div data-testid="product-option-component" />
jest.mock('@/components/product/ProductOption/ProductOption', () => productOptionMock)

describe('[component] - ViewOrderDetails', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const productOptions = screen.getAllByTestId('product-option-component')

    expect(productOptions).toBeVisible()
  })
})
