import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import { argsWithoutLabel, argsWithLabel } from '../../../__mocks__/productItemListMockData'
import * as stories from './ProductItemList.stories'

import type { ProductItemListProps } from './ProductItemList'

const { Common } = composeStories(stories)

const productItemMock = () => <div data-testid="product-item-component" />
jest.mock('@/components/common/ProductItem/ProductItem', () => productItemMock)

describe('[component] - ProductItemList', () => {
  const setup = (params: ProductItemListProps) => {
    const props = params ? params : Common.args
    render(<Common {...props} />)
  }

  it('should render component with label', () => {
    setup({ items: argsWithLabel })

    const productItemList = screen.getByTestId('product-item-stack')

    expect(productItemList).toBeVisible()
  })
  it('should render component without label', () => {
    setup({ items: argsWithoutLabel })

    const productItemList = screen.getByTestId('product-item-stack')

    expect(productItemList).toBeVisible()
  })

  it('should render productItem  component', () => {
    setup({ items: argsWithLabel })

    const productItems = screen.getAllByTestId('product-item-component')

    expect(productItems[0]).toBeInTheDocument()
    expect(productItems[0]).toBeVisible()
    expect(productItems).toHaveLength(argsWithLabel.length)
  })
})
