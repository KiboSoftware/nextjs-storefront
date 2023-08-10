import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ViewOrderDetails.stories'

const { Common, WithReturnItemButton, ViewOrderDetailsWithoutPaymentDetails } =
  composeStories(stories)

const onReturnItemsVisibleMock = jest.fn()
const onGoBackToOrderHistoryMock = jest.fn()

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
const KeyValueDisplayMock = () => <div data-testid="key-value-display-component" />
jest.mock('@/components/common/KeyValueDisplay/KeyValueDisplay', () => () => KeyValueDisplayMock())
const PaymentBillingCardMock = () => <div data-testid="payment-billing-card-component" />
jest.mock(
  '@/components/common/PaymentBillingCard/PaymentBillingCard',
  () => () => PaymentBillingCardMock()
)

const setup = (isOrderStatus: boolean, title: string) => {
  const user = userEvent.setup()
  render(
    <Common
      {...Common.args}
      isOrderStatus={isOrderStatus}
      title={title}
      onGoBackToOrderHistory={onGoBackToOrderHistoryMock}
    />
  )
  return {
    user,
    onGoBackToOrderHistoryMock,
  }
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
    expect(screen.getAllByTestId('key-value-display-component')).toHaveLength(3)
    expect(screen.getByTestId('payment-billing-card-component')).toBeVisible()
    expect(screen.getByText('payment-information')).toBeVisible()
  })

  it('should call onGoBackToOrderHistory when user click on Order history icon', async () => {
    const { user, onGoBackToOrderHistoryMock } = setup(false, 'view-order-details')

    const orderHistory = screen.getByText(/order-history/i)
    user.click(orderHistory)
    await waitFor(() => {
      expect(onGoBackToOrderHistoryMock).toBeCalled()
    })
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

  it("should render 'return item' button and onClick, handleReturnItems function should be called", async () => {
    const { user } = returnItemSetup()

    const orderSummaryContent = screen.getByTestId('order-summary-component')
    const returnItemButton = screen.queryByRole('button', { name: 'return-items' }) as HTMLElement

    expect(orderSummaryContent).toContainElement(returnItemButton)

    user.click(returnItemButton)

    await waitFor(() => {
      expect(onReturnItemsVisibleMock).toHaveBeenCalledWith(true)
    })
  })

  it("should show 'No payment details found' when we don't have payments detail", async () => {
    render(
      <ViewOrderDetailsWithoutPaymentDetails
        {...ViewOrderDetailsWithoutPaymentDetails.args}
        isOrderStatus={false}
        title={'view-order-status'}
      />
    )

    expect(screen.getByText(/no-payment-details-found/i)).toBeInTheDocument()
  })
})
