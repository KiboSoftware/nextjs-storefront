import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/page-templates/OrderHistoryTemplate/OrderHistoryTemplate.stories'

const { Common } = composeStories(stories)

describe('[component] - OrderHistoryTemplate', () => {
  it('should display ViewOrderDetails component when user clicks on any Order Item', async () => {
    const user = userEvent.setup()
    render(<Common {...Common?.args} />)

    const orderHistoryItem = screen.getAllByTestId('history-item')

    const viewOrderDetailsBefore = screen.queryByRole('heading', { name: /view-order-details/i })
    expect(viewOrderDetailsBefore).not.toBeInTheDocument()

    await user.click(orderHistoryItem[0])

    const viewOrderDetailsAfter = screen.getByRole('heading', { name: /view-order-details/i })
    await waitFor(() => expect(viewOrderDetailsAfter).toBeInTheDocument())
  })
})
