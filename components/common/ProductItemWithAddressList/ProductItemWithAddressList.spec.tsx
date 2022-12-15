import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductItemWithAddressList.stories'

import type { ProductItemWithAddressListProps } from './ProductItemWithAddressList'

const { Common } = composeStories(stories)

const productItemMock = () => <div data-testid="product-item-component" />
jest.mock('@/components/common/ProductItem/ProductItem', () => () => productItemMock())
const kiboSelect = () => <div data-testid="kibo-select-component" />
jest.mock('@/components/common/KiboSelect/KiboSelect', () => () => kiboSelect())

describe('[component] - ProductItemWithAddressList', () => {
  const setup = (params?: ProductItemWithAddressListProps) => {
    const props = params ? params : Common.args
    render(<Common {...props} />)
  }

  it('should render component with label', () => {
    setup()

    const kiboSelect = screen.getAllByTestId('kibo-select-component')
    const editAddress = screen.getAllByRole('button', { name: 'edit-address' })
    const addAddress = screen.getAllByRole('button', { name: 'add-new-address' })
    const splitItemLink = screen.getAllByRole('button', { name: 'split-into-multiple-shipments' })

    const productItems = screen.getAllByTestId('product-item-component')

    expect(kiboSelect[0]).toBeVisible()
    expect(editAddress[0]).toBeVisible()
    expect(addAddress[0]).toBeVisible()
    expect(splitItemLink[0]).toBeVisible()
    expect(productItems[0]).toBeInTheDocument()
    expect(productItems[0]).toBeVisible()
  })
})
