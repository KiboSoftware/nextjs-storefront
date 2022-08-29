import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { createMockRouter } from '@/__test__/utils'
import * as stories from '@/components/page-templates/OrderHistoryTemplate/OrderHistoryTemplate.stories'
import { FacetTypeForHistory } from '@/lib/constants'
import { orderGetters } from '@/lib/getters'

import type { Order } from '@/lib/gql/types'

const { Common } = composeStories(stories)
const order = Common.args?.orderCollection?.items || []

const setup = () => {
  const user = userEvent.setup()
  const mockOnAccountTitleClick = jest.fn()
  const router = createMockRouter()

  render(
    <RouterContext.Provider value={router}>
      <Common {...Common.args} onAccountTitleClick={mockOnAccountTitleClick} />
    </RouterContext.Provider>
  )

  return {
    user,
    mockOnAccountTitleClick,
    router,
  }
}

describe('[component] - OrderHistoryTemplate', () => {
  it('should get order list by applying the time filters', async () => {
    const { user } = setup()
    const submittedDate = orderGetters.getSubmittedDate(order[0] as Order)
    const productNames = orderGetters.getProductNames(order[0] as Order)

    const filterOrderText = screen.getByText(/filter-orders/i)
    await user.click(filterOrderText)
    expect(screen.getByText(/filter-by/i)).toBeVisible()
    expect(screen.getByText(FacetTypeForHistory[0].label)).toBeVisible()

    const accordian = screen.getByRole('button', { name: new RegExp(FacetTypeForHistory[0].label) })
    await user.click(accordian)
    const checkbox = screen.getByRole('checkbox', {
      name: new RegExp(FacetTypeForHistory[0].values[1].label),
    })
    await user.click(checkbox)
    await waitFor(() => expect(checkbox).toBeChecked())

    const applyButton = screen.getByRole('button', { name: /apply/i })
    await user.click(applyButton)
    const historyItem = await screen.findAllByTestId('history-item')
    expect(historyItem).toHaveLength(order.length)
    expect(screen.getByText(submittedDate)).toBeVisible()
    expect(screen.getByText(productNames)).toBeVisible()
  })

  it('should display Order Details when user clicks on any Order Item', async () => {
    const { user } = setup()

    const orderHistoryItem = screen.getAllByTestId('history-item')

    const viewOrderDetailsBefore = screen.queryByRole('heading', { name: /view-order-details/i })
    expect(viewOrderDetailsBefore).not.toBeInTheDocument()

    await user.click(orderHistoryItem[0])

    const viewOrderDetailsAfter = screen.getByRole('heading', { name: /view-order-details/i })
    await waitFor(() => expect(viewOrderDetailsAfter).toBeInTheDocument())
  })

  it('should go back to my account page on clicking on back arrow icon', async () => {
    const { user, mockOnAccountTitleClick } = setup()
    const applyButton = screen.getByTestId(/ArrowBackIosIcon/i)
    await user.click(applyButton)
    expect(mockOnAccountTitleClick).toBeCalled()
    expect(screen.getByText(/my-account/i)).toBeVisible()
  })
})
