import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ReviewProductItemsWithAddresses.stories'
import { orderMock } from '@/__mocks__/stories'

import type { ReviewProductItemsWithAddressesProps } from './ReviewProductItemsWithAddresses'

const { Common } = composeStories(stories)

jest.mock('@/components/common/ProductItem/ProductItem', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => (
    <>
      <div data-testid="product-item-component-multi-ship">
        <p data-testid="product-item-name">{name}</p>
      </div>
    </>
  ),
}))

describe('[component] - ReviewProductItemsWithAddresses', () => {
  const setup = (params?: ReviewProductItemsWithAddressesProps) => {
    const props = params ? params : Common.args
    render(<Common {...props} />)
  }

  it('should render component', () => {
    setup()
    const { checkout } = orderMock
    const productNameMock =
      checkout?.items && checkout?.items[0]?.product && checkout?.items[0]?.product.name

    const productItems = screen.getAllByTestId('product-item-component-multi-ship')
    const itemsCount = (Common.args?.items && Common.args?.items.length) || 0
    const productItemName = screen.getAllByTestId('product-item-name')

    const estArrivalTexts = screen.getAllByText(/est-arrival/i)
    const shippingAddressTexts = screen.getAllByText(/ship-to/i)

    expect(productItems[0]).toBeInTheDocument()
    expect(productItems).toHaveLength(itemsCount)
    expect(estArrivalTexts[0]).toBeVisible()
    expect(shippingAddressTexts[0]).toBeVisible()
    expect(productItemName[0].innerHTML).toEqual(productNameMock)
  })
})
