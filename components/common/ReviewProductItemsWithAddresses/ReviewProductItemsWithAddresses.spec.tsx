import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ReviewProductItemsWithAddresses.stories'

import type { ReviewProductItemsWithAddressesProps } from './ReviewProductItemsWithAddresses'

const { Common } = composeStories(stories)

const productItemMock = () => <div data-testid="product-item-component-multi-ship" />
jest.mock('@/components/common/ProductItem/ProductItem', () => () => productItemMock())

describe('[component] - ReviewProductItemsWithAddresses', () => {
  const setup = (params?: ReviewProductItemsWithAddressesProps) => {
    const props = params ? params : Common.args
    render(<Common {...props} />)
  }

  it('should render component', () => {
    setup()

    const productItemMultiShipList = screen.getByTestId('product-item-stack-multi-ship')
    const productItems = screen.getAllByTestId('product-item-component-multi-ship')
    const itemsCount = (Common.args?.items && Common.args?.items.length) || 0

    expect(productItemMultiShipList).toBeVisible()
    expect(productItems[0]).toBeInTheDocument()
    expect(productItems[0]).toBeVisible()
    expect(productItems).toHaveLength(itemsCount)
  })

  it('should render Est Arrival and Shipping Address', () => {
    setup()

    const estArrivalTexts = screen.getAllByText(/est-arrival/i)
    const shippingAddressTexts = screen.getAllByText(/ship-to/i)

    expect(estArrivalTexts[0]).toBeVisible()
    expect(shippingAddressTexts[0]).toBeVisible()
  })
})
