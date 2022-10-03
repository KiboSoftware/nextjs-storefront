import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './OrderStatusTemplate.stories'

const { Common } = composeStories(stories)

const KiboBreadcrumbsMock = () => <div data-testid="kibo-breadcrumbs-mock" />
const ViewOrderDetailsMock = () => <div data-testid="view-order-details-mock" />
const ViewOrderStatusMock = () => <div data-testid="view-order-status-mock" />
jest.mock('@/components/core/Breadcrumbs/KiboBreadcrumbs', () => () => KiboBreadcrumbsMock())
jest.mock(
  '@/components/order/ViewOrderDetails/ViewOrderDetails',
  () => () => ViewOrderDetailsMock()
)
jest.mock('@/components/order/ViewOrderStatus/ViewOrderStatus', () => () => ViewOrderStatusMock())

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(false),
}))

describe('[component] - OrderStatusTemplate', () => {
  it('should render component', () => {
    render(<Common />)

    const kiboBreadcrumbs = screen.queryByTestId('kibo-breadcrumbs-mock')
    const viewOrderDetails = screen.queryByTestId('view-order-details-mock')
    const viewOrderStatus = screen.queryByTestId('view-order-status-mock')

    expect(kiboBreadcrumbs).toBeVisible()
    expect(viewOrderStatus).toBeVisible()
    expect(viewOrderDetails).not.toBeInTheDocument()
  })
})
