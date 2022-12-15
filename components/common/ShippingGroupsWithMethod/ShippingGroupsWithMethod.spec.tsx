import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ShippingGroupsWithMethod.stories'

import type { ShippingGroupsWithMethodProps } from './ShippingGroupsWithMethod'

const { Common } = composeStories(stories)

const KiboSelectMock = () => <div data-testid="kibo-select-component" />
jest.mock('@/components/common/KiboSelect/KiboSelect', () => () => KiboSelectMock())

const productItemMock = () => <div data-testid="product-item-component" />
jest.mock('@/components/common/ProductItem/ProductItem', () => () => productItemMock())

describe('[component] - ShippingGroupsWithMethod', () => {
  const setup = (params?: ShippingGroupsWithMethodProps) => {
    const props = params ? params : Common.args
    render(<Common {...props} />)
  }

  it('should render component with label', () => {
    setup()

    const kiboSelect = screen.getAllByTestId('kibo-select-component')
    const editMultiShippingDetails = screen.getAllByRole('button', { name: 'edit' })
    const productItems = screen.getAllByTestId('product-item-component')

    expect(kiboSelect[0]).toBeVisible()
    expect(editMultiShippingDetails[0]).toBeVisible()
    expect(productItems[0]).toBeInTheDocument()
    expect(productItems[0]).toBeVisible()
  })
})
