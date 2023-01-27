import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ViewOrderDetails.stories'

const { Common, WithReturnItemButton } = composeStories(stories)

const onReturnItemsVisibleMock = jest.fn()

const addressCardMock = () => <div data-testid="address-card-component" />
jest.mock('@/components/common/AddressCard/AddressCard', () => () => addressCardMock())

jest.mock('@/components/common/OrderSummary/OrderSummary', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="order-summary-component">{children}</div>
  ),
}))
const ProductItemListMock = () => <div data-testid="product-item-list-component" />
jest.mock('@/components/common/ProductItemList/ProductItemList', () => () => ProductItemListMock())
const productOptionMock = () => <div data-testid="product-option-component" />
jest.mock('@/components/product/ProductOption/ProductOption', () => () => productOptionMock())
const savedPaymentMethodViewMock = () => <div data-testid="saved-payment-method-view-component" />
jest.mock(
  '@/components/checkout/SavedPaymentMethodView/SavedPaymentMethodView',
  () => () => savedPaymentMethodViewMock()
)

const setup = (isOrderStatus: boolean, title: string) => {
  render(<Common {...Common.args} isOrderStatus={isOrderStatus} title={title} />)
}
const returnItemSetup = () => {
  const user = userEvent.setup()
  render(
    <WithReturnItemButton
      {...WithReturnItemButton.args}
      isOrderStatus={false}
      title={'view-order-status'}
      onReturnItemsVisible={onReturnItemsVisibleMock}
    />
  )
  return {
    user,
  }
}

describe('[component] - ViewOrderDetails', () => {
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
    expect(screen.getByText('payment-information')).toBeVisible()
  })

  it('should render component for Order status', () => {
    setup(true, 'view-order-status')

    expect(screen.queryByText(/order-history/i)).not.toBeInTheDocument()
    expect(screen.getByText(/view-order-status/i)).toBeVisible()
    expect(screen.getByText(/shipment-details/i)).toBeVisible()
    expect(screen.queryByTestId('order-summary-component')).not.toBeInTheDocument()
    expect(screen.queryByText('payment-information')).not.toBeInTheDocument()
  })

  it('should render component with order status false and return item button should not be visible', () => {
    setup(false, 'view-order-status')

    expect(screen.queryByText(/return-items/i)).not.toBeInTheDocument()
  })

  it('should render return item button and handleReturnItems function should be called', async () => {
    const { user } = returnItemSetup()

    const orderSummaryContent = screen.getByTestId('order-summary-component')
    const returnItemButton = screen.queryByRole('button', { name: 'return-items' }) as HTMLElement

    expect(orderSummaryContent).toContainElement(returnItemButton)

    await user.click(returnItemButton)
    expect(onReturnItemsVisibleMock).toHaveBeenCalled()
  })
})
