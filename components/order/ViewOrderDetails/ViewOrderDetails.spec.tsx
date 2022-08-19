import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ViewOrderDetails.stories'

const { Common } = composeStories(stories)

const addressCardMock = () => <div data-testid="address-card-component" />
jest.mock('@/components/common/AddressCard/AddressCard', () => addressCardMock)
const orderSummaryMock = () => <div data-testid="order-summary-component" />
jest.mock('@/components/common/OrderSummary/OrderSummary', () => orderSummaryMock)
const ProductItemListMock = () => <div data-testid="product-item-list-component" />
jest.mock('@/components/common/ProductItemList/ProductItemList', () => ProductItemListMock)
const productOptionMock = () => <div data-testid="product-option-component" />
jest.mock('@/components/product/ProductOption/ProductOption', () => productOptionMock)
const savedPaymentMethodViewMock = () => <div data-testid="saved-payment-method-view-component" />
jest.mock(
  '@/components/checkout/SavedPaymentMethodView/SavedPaymentMethodView',
  () => savedPaymentMethodViewMock
)

describe('[component] - ViewOrderDetails', () => {
  const setup = (isOrderStatus: boolean, title: string) => {
    render(<Common {...Common.args} isOrderStatus={isOrderStatus} title={title} />)
  }

  it('should render component', () => {
    setup(false, 'view-order-details')

    expect(screen.getByText(/order-history/i)).toBeVisible()
    expect(screen.getByText(/view-order-details/i)).toBeVisible()
    expect(screen.getByText(/shipment-details/i)).toBeVisible()
    expect(screen.getByText(/delivered/i)).toBeVisible()
    expect(screen.getByText(/pickup-title/i)).toBeVisible()
    expect(screen.getByText(/est-pickup/i)).toBeVisible()
    expect(screen.getByTestId('address-card-component')).toBeInTheDocument()
    expect(screen.getByTestId('order-summary-component')).toBeVisible()
    expect(screen.getAllByTestId('product-item-list-component')).toHaveLength(2)
    expect(screen.getAllByTestId('product-option-component')).toHaveLength(3)
    expect(screen.getByTestId('saved-payment-method-view-component')).toBeVisible()
    expect(screen.getByText('checkout:payment-information')).toBeVisible()
  })

  it('should render component for Order status', () => {
    setup(true, 'view-order-status')

    expect(screen.queryByText(/order-history/i)).not.toBeInTheDocument()
    expect(screen.getByText(/view-order-status/i)).toBeVisible()
    expect(screen.getByText(/shipment-details/i)).toBeVisible()
    expect(screen.queryByTestId('order-summary-component')).not.toBeInTheDocument()
    expect(screen.queryByText('checkout:payment-information')).not.toBeInTheDocument()
  })
})
