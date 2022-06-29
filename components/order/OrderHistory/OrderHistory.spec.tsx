import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './OrderHistory.stories'

import type { OrderCollection } from '@/lib/gql/types'

const { Common } = composeStories(stories)

const FilterOrdersMock = () => <div data-testid="filter-orders-mock" />
const FilterTilesMock = () => <div data-testid="filter-tiles-mock" />
const OrderHistoryItemMock = () => <div data-testid="order-history-mock" />
const ViewOrderDetailsMock = () => <div data-testid="view-order-details-mock" />

jest.mock('@/components/common/FilterOrders/FilterOrders', () => FilterOrdersMock)
jest.mock('@/components/common/FilterTiles/FilterTiles', () => FilterTilesMock)
jest.mock('@/components/order/OrderHistoryItem/OrderHistoryItem', () => OrderHistoryItemMock)
jest.mock('@/components/order/view-order-details/ViewOrderDetails', () => ViewOrderDetailsMock)

describe('[component] - OrderHistory', () => {
  it('should render component', () => {
    render(<Common {...Common?.args} />)

    const orders = Common?.args?.orders as OrderCollection
    const itemsLength = orders.items ? orders.items.length : 0
    const accountTitle = Common?.args?.accountTitle as string

    const accountTitleText = screen.getByText(accountTitle)
    const orderHistoryText = screen.getByText('order-history')
    const filterOrders = screen.getByTestId('filter-orders-mock')
    const filterTiles = screen.getByTestId('filter-tiles-mock')
    const orderHistoryItem = screen.getAllByTestId('order-history-mock')
    const viewOrderDetails = screen.queryByTestId('view-order-details-mock')

    expect(accountTitleText).toBeVisible()
    expect(orderHistoryText).toBeVisible()
    expect(filterOrders).toBeVisible()
    expect(filterTiles).toBeVisible()
    expect(orderHistoryItem).toHaveLength(itemsLength)
    expect(viewOrderDetails).not.toBeInTheDocument()
  })
})
