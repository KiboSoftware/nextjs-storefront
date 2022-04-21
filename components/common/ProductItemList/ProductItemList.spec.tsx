import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import { argsWithoutLabel, argsWithLabel } from '../../../__mocks__/productItemListMockData'
import * as stories from './ProductItemList.stories'

import type { CrProductOption } from '@/lib/gql/types'

const { Common } = composeStories(stories)

const productItemMock = () => <div data-testid="product-item-component" />
jest.mock('@/components/common/ProductItem/ProductItem', () => productItemMock)

interface ProductItemListProps {
  image: string
  name: string
  options: CrProductOption[]
  price?: string
  salePrice?: string
  qty?: number
  children?: ReactNode
}

describe('[component] - ProductItemList', () => {
  const setup = (params: { items: ProductItemListProps[] }) => {
    const props = params ? params : Common.args
    const productItemListMock = jest.fn()
    render(<Common {...props} />)
    return {
      productItemListMock,
    }
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

  it('should render mock component', () => {
    // arrange
    setup({ items: argsWithLabel })

    // act
    const productItems = screen.getAllByTestId('product-item-component')

    // // assert
    expect(productItems[0]).toBeInTheDocument()
    expect(productItems[0]).toBeVisible()
    expect(productItems).toHaveLength(argsWithLabel.length)
  })
})
