import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductItemList.stories'

import type { ProductItemListProps } from './ProductItemList'

const { Common } = composeStories(stories)

const productItemMock = () => <div data-testid="product-item-component" />
jest.mock('@/components/common/ProductItem/ProductItem', () => () => productItemMock())

describe('[component] - ProductItemList', () => {
  const setup = (params?: ProductItemListProps) => {
    const props = params ? params : Common.args
    render(<Common {...props} />)
  }

  it('should render component with label', () => {
    setup()

    const productItemList = screen.getByTestId('product-item-stack')
    const productItems = screen.getAllByTestId('product-item-component')
    const itemsCount = (Common.args?.items && Common.args?.items.length) || 0

    expect(productItemList).toBeVisible()
    expect(productItems[0]).toBeInTheDocument()
    expect(productItems[0]).toBeVisible()
    expect(productItems).toHaveLength(itemsCount)
  })
})
