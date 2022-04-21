import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import { argsWithoutLabel, argsWithLabel } from '../../../../__mocks__/productItemListMockData'
import * as stories from '@/components/common/ProductItemList/ProductItemList.stories'

const { Common } = composeStories(stories)

describe('[component] - ProductItemList', () => {
  const setup = (params: any) => {
    const props = params ? params : Common.args
    const productItemListMock = jest.fn()
    render(<Common {...props} />)
    return {
      productItemListMock,
    }
  }
  it('should render component with label', () => {
    setup('')

    const productItemList = screen.getByTestId('product-item-stack')

    expect(productItemList).toBeVisible()
  })

  it('should render component without label', () => {
    setup(argsWithoutLabel)

    const productItemList = screen.getByTestId('product-item-stack')

    expect(productItemList).toBeVisible()
  })

  it('should render mock component', () => {
    // arrange
    setup(argsWithLabel)

    const productItemList = screen.getByTestId('product-item-stack')
    const productDetails = screen.getAllByTestId('productDetails')
    const name = screen.getAllByRole('heading')
    const images = screen.getAllByRole('img')

    expect(productItemList).toBeVisible()
    expect(productDetails[0]).toBeVisible()
    expect(name[0]).toBeVisible()
    expect(images).toHaveLength(argsWithoutLabel.length)
  })
})
