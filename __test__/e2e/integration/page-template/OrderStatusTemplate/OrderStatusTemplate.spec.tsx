import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/page-templates/OrderStatusTemplate/OrderStatusTemplate.stories'

const { Common } = composeStories(stories)

const setup = () => {
  const user = userEvent.setup()

  render(<Common {...Common.args} />)

  return {
    user,
  }
}

describe('[component] - OrderStatusTemplate', () => {
  it('should view order status by providing the order number and billing email', async () => {
    const { user } = setup()
    const breadcrumbs = screen.getAllByLabelText('breadcrumb-link')
    expect(breadcrumbs[0]).toBeVisible()
    expect(screen.getByTestId('ViewOrderStatus')).toBeVisible()
    expect(screen.queryByTestId('ViewOrderDetails')).not.toBeInTheDocument()
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
    await waitFor(() => {
      expect(screen.getByTestId('ViewOrderDetails')).toBeVisible()
    })
  })
})
