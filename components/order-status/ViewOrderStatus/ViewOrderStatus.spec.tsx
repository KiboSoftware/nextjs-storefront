import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import { ViewOrderStatusProps } from './ViewOrderStatus'
import * as stories from './ViewOrderStatus.stories' // import all stories from the stories file

const { Common, WithErrorMeesage } = composeStories(stories)

const onChangeMock = jest.fn()
const onBlurMock = jest.fn()
const KiboTextBoxMock = () => (
  <input
    data-testid="text-box-mock"
    onChange={(value) => onChangeMock(value)}
    onBlur={onBlurMock}
  />
)
jest.mock('@/components/common/KiboTextBox/KiboTextBox', () => KiboTextBoxMock)

describe('[component] - ViewOrderStatus', () => {
  const { lookupErrorMessage } = WithErrorMeesage?.args as ViewOrderStatusProps

  const setup = (args?: ViewOrderStatusProps) => {
    const onOrderStatusSubmitMock = jest.fn()

    const params = args ? args : Common?.args

    render(<Common {...params} onOrderStatusSubmit={onOrderStatusSubmitMock} />)
    return { onOrderStatusSubmitMock, lookupErrorMessage }
  }

  it('should render component', () => {
    setup()

    const viewOrderStatusText = screen.getByText(/view-order-status/i)
    const checkingTheStatusOfYourOrderText = screen.getByText(
      /checking-the-status-of-your-order-is-fast-and-simple/i
    )
    const simplyEnterYourOrderText = screen.getByText(
      /simply-enter-your-order-number-and-billing-email-to-track-your-order/i
    )
    const textBoxMock = screen.getAllByTestId('text-box-mock')
    const checkOrderStatusButton = screen.getByRole('button', { name: /check-order-status/i })
    const lookupMessage = screen.queryByText(lookupErrorMessage as string)

    expect(viewOrderStatusText).toBeVisible()
    expect(checkingTheStatusOfYourOrderText).toBeVisible()
    expect(simplyEnterYourOrderText).toBeVisible()
    expect(textBoxMock).toHaveLength(2)
    expect(checkOrderStatusButton).toBeDisabled()
    expect(lookupMessage).not.toBeInTheDocument()
  })

  it('should display lookupErrorMessage', () => {
    setup(WithErrorMeesage.args as ViewOrderStatusProps)
    const lookupMessage = screen.getByText(lookupErrorMessage as string)
    expect(lookupMessage).toBeVisible()
  })
})
