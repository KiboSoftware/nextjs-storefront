import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import { argsWithoutLabel, argsWithLabel } from '../../../../__mocks__/productItemListMockData'
import type { ProductItemListProps } from '@/components/common/ProductItemList/ProductItemList'
import * as stories from '@/components/common/ProductItemList/ProductItemList.stories'

const { Common } = composeStories(stories)

describe('[component] - ProductItemList Integration', () => {
  const setup = (params?: ProductItemListProps) => {
    const props = params ? params : Common.args
    render(<Common {...props} />)
  }

  it('should render component with label', () => {
    setup()

    const productItemList = screen.getByTestId('product-item-stack')
    expect(productItemList).toBeVisible()
  })

  it('should render component without label', () => {
    setup({ items: argsWithoutLabel })

    const productItemList = screen.getByTestId('product-item-stack')
    expect(productItemList).toBeVisible()
  })

  it('should show product labels', () => {
    setup({ items: argsWithLabel })

    const productItemList = screen.getByTestId('product-item-stack')
    const productDetails = screen.getAllByTestId('productDetails')
    const name = screen.getAllByRole('heading')

    expect(productItemList).toBeVisible()
    expect(productDetails[0]).toBeVisible()
    expect(name[0]).toBeVisible()
  })

  it('should render image  component', () => {
    setup({ items: argsWithLabel })

    const images = screen.getAllByRole('img')

    expect(images[0]).toBeInTheDocument()
    expect(images[0]).toBeVisible()
    expect(images).toHaveLength(argsWithLabel.length)
  })

  it('should have price label inside details', () => {
    setup({ items: argsWithLabel })

    const price = screen.getAllByText(argsWithLabel[0]?.price || '')
    const salePrice = screen.getAllByText(argsWithLabel[0]?.salePrice || '')

    expect(price[0]).toBeVisible()
    expect(salePrice[0]).toBeVisible()
  })
})
