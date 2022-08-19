import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/order/ViewOrderStatus/ViewOrderStatus.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] - ViewOrderStatus', () => {
  const setup = () => {
    const user = userEvent.setup()
    const onOrderStatusSubmitMock = jest.fn()

    render(<Common {...Common?.args} onOrderStatusSubmit={onOrderStatusSubmitMock} />)
    return { user, onOrderStatusSubmitMock }
  }

  it('should display required message when user does not enters Order Number', async () => {
    const { user } = setup()

    const orderNumberTextBox = screen.getByRole('textbox', { name: /order-number/i })
    await user.click(orderNumberTextBox)
    await user.tab()

    const orderNumberErrorMessage = screen.getByText(/order-number-is-required/i)

    expect(orderNumberErrorMessage).toBeVisible()
  })

  it('should display required message when user does not enters Billing Email', async () => {
    const { user } = setup()

    const billingEmailTextBox = screen.getByRole('textbox', { name: /billing-email/i })
    await user.click(billingEmailTextBox)
    await user.tab()

    const billingEmailErrorMessage = screen.getByText(/billing-email-is-required/i)

    expect(billingEmailErrorMessage).toBeVisible()
  })

  it('should display invalid message message when user enters invalid Billing Email', async () => {
    const { user } = setup()

    const billingEmailTextBox = screen.getByRole('textbox', { name: /billing-email/i })
    await user.type(billingEmailTextBox, 'gmail.com')

    const billingEmailErrorMessage = screen.getByText(/billing-email-must-be-a-valid-email/i)

    expect(billingEmailErrorMessage).toBeVisible()
  })

  it('should disable "Check Order Status" button as default', async () => {
    setup()

    const checkOrderStatusButton = screen.getByRole('button', { name: /check-order-status/i })

    expect(checkOrderStatusButton).toBeDisabled()
  })

  it('should enable "Check Order Status" button when user enters valid Order Number and Billing Email', async () => {
    const { user } = setup()

    const testOrderNumber = '123'
    const testBuinessEmail = 'test@gmail.com'

    const orderNumberTextBox = screen.getByRole('textbox', { name: /order-number/i })
    const billingEmailTextBox = screen.getByRole('textbox', { name: /billing-email/i })

    await user.type(orderNumberTextBox, testOrderNumber)
    await user.type(billingEmailTextBox, testBuinessEmail)
    const checkOrderStatusButton = screen.getByRole('button', { name: /check-order-status/i })

    expect(checkOrderStatusButton).toBeEnabled()
  })

  it('should call "onOrderStatusSubmit" callback function when user clicks on "Check Order Status" button', async () => {
    const { user, onOrderStatusSubmitMock } = setup()

    const testOrderNumber = '123'
    const testBuinessEmail = 'test@gmail.com'

    const orderNumberTextBox = screen.getByRole('textbox', { name: /order-number/i })
    const billingEmailTextBox = screen.getByRole('textbox', { name: /billing-email/i })

    await user.type(orderNumberTextBox, testOrderNumber)
    await user.type(billingEmailTextBox, testBuinessEmail)
    const checkOrderStatusButton = screen.getByRole('button', { name: /check-order-status/i })

    expect(checkOrderStatusButton).toBeEnabled()

    await user.click(checkOrderStatusButton)

    expect(onOrderStatusSubmitMock).toHaveBeenCalledWith({
      orderNumber: testOrderNumber,
      billingEmail: testBuinessEmail,
    })
  })
})
