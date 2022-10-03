import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './OrderConfirmation.stories'

const { Common } = composeStories(stories)

const orderSummaryMock = () => <div data-testid="order-summary-component" />
jest.mock('@/components/common/OrderSummary/OrderSummary', () => () => orderSummaryMock())
const productItemListMock = () => <div data-testid="product-item-list-component" />
jest.mock('@/components/common/ProductItemList/ProductItemList', () => () => productItemListMock())
const productOptionListMock = () => <div data-testid="product-option-list-component" />
jest.mock('@/components/product/ProductOption/ProductOption', () => () => productOptionListMock())

describe('[component] - ViewOrderDetails', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    expect(
      screen.getByRole('heading', {
        name: /thank-you/i,
      })
    ).toBeVisible()
    expect(screen.getByText(/currency/i)).toBeVisible()
    expect(screen.getByText(/your-order-was-placed-successfully/i)).toBeVisible()
    expect(screen.getByText(/check-your-email-for-your-order-confirmation/i)).toBeVisible()
    expect(screen.getByText(/we-have-sent-the-order-confirmation-details-to/i)).toBeVisible()
    expect(screen.getByText(/order-details/i)).toBeVisible()
    expect(screen.getByTestId('order-summary-component')).toBeVisible()
    expect(screen.getAllByTestId('product-item-list-component')).toHaveLength(2)
    expect(screen.getAllByTestId('product-option-list-component')).toHaveLength(2)
  })
})
