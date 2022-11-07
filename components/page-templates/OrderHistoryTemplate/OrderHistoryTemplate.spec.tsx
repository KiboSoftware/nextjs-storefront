import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'

import * as stories from './OrderHistoryTemplate.stories'
import { orderCollection } from '@/__mocks__/stories'

const { Common } = composeStories(stories)

const FilterOrdersMock = () => <div data-testid="filter-orders-mock" />
const FilterTilesMock = () => <div data-testid="filter-tiles-mock" />
const OrderHistoryItemMock = () => <div data-testid="order-history-item-mock" />
const ViewOrderDetailsMock = () => <div data-testid="view-order-details-mock" />
const FullWidthDividerMock = () => <div data-testid="full-width-divider-mock"></div>

jest.mock('@/components/common/FilterOrders/FilterOrders', () => () => FilterOrdersMock())
jest.mock('@/components/common/FilterTiles/FilterTiles', () => () => FilterTilesMock())
jest.mock(
  '@/components/order/OrderHistoryItem/OrderHistoryItem',
  () => () => OrderHistoryItemMock()
)
jest.mock(
  '@/components/order/ViewOrderDetails/ViewOrderDetails',
  () => () => ViewOrderDetailsMock()
)
jest.mock(
  '@/components/common/FullWidthDivider/FullWidthDivider',
  () => () => FullWidthDividerMock()
)

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(false),
}))

describe('[component] - OrderHistoryTemplate', () => {
  it('should render component', async () => {
    render(<Common {...Common?.args} />)
    await waitFor(async () => {
      const orders = orderCollection.orders
      const itemsLength = orders.items ? orders.items.length : 0

      const accountTitleText = screen.getByText('my-account')
      const orderHistoryText = screen.getByText('order-history')
      const filterOrderText = screen.getByText('filter-orders')
      const filterTiles = screen.getByTestId('filter-tiles-mock')
      const orderHistoryItem = screen.getAllByTestId('order-history-item-mock')
      const viewOrderDetails = screen.queryByTestId('view-order-details-mock')

      expect(accountTitleText).toBeVisible()
      await waitFor(() => expect(orderHistoryText).toBeVisible())
      await waitFor(() => expect(filterOrderText).toBeVisible())
      await waitFor(() => expect(filterTiles).toBeVisible())
      await waitFor(() => expect(orderHistoryItem).toHaveLength(itemsLength))
      await waitFor(() => expect(viewOrderDetails).not.toBeInTheDocument())
    })
  })
})
