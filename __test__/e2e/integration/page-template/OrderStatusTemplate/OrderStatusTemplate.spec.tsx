import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { orderCollection } from '@/__mocks__/stories/orderCollection'
import { createMockRouter } from '@/__test__/utils'
import * as stories from '@/components/page-templates/OrderStatusTemplate/OrderStatusTemplate.stories'
import { orderGetters } from '@/lib/getters'

import type { Order } from '@/lib/gql/types'

const { Common } = composeStories(stories)
const order = orderCollection?.orders.items || []

const setup = () => {
  const user = userEvent.setup()
  const mockOnAccountTitleClick = jest.fn()
  const router = createMockRouter()

  render(
    <RouterContext.Provider value={router}>
      <Common {...Common.args} />
    </RouterContext.Provider>
  )

  return {
    user,
    mockOnAccountTitleClick,
    router,
  }
}

describe('[component] - OrderStatusTemplate', () => {
  it('should view order status by providing the order number and billing email', async () => {
    const { user } = setup()
    const submittedDate = orderGetters.getSubmittedDate(order[0] as Order)
    const orderNumber = orderGetters.getOrderNumber(order[0] as Order)
    const shippedTo = orderGetters.getShippedTo(order[0] as Order)

    const orderNumberTextbox = screen.getByRole('textbox', { name: /order-number/i })
    const billingEmailTextbox = screen.getByRole('textbox', { name: /billing-email/i })
    await user.type(orderNumberTextbox, '81')
    await user.type(billingEmailTextbox, 'chandra@email.com')
    await user.tab()

    const checkOrderStatusButton = screen.getByRole('button', { name: /check-order-status/i })
    await waitFor(() => {
      expect(checkOrderStatusButton).toBeEnabled()
    })
    await user.click(checkOrderStatusButton)

    expect(await screen.findByText(/order-number/i)).toBeVisible()
    expect(await screen.findByText(orderNumber as number)).toBeVisible()
    expect(await screen.findByText(/order-date/i)).toBeVisible()
    expect(await screen.findByText(submittedDate)).toBeVisible()
    expect(await screen.findByText(/shipped-to/i)).toBeVisible()
    expect(await screen.findByText(shippedTo)).toBeVisible()
  })
})
