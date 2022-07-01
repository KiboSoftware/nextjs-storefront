import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ViewOrderStatusProps } from './ViewOrderStatus'
import * as stories from './ViewOrderStatus.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

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
  const { lookupErrorMessage } = Common?.args as ViewOrderStatusProps

  const setup = () => {
    const onOrderStatusSubmitMock = jest.fn()
    render(<Common {...Common?.args} onOrderStatusSubmit={onOrderStatusSubmitMock} />)
    return { onOrderStatusSubmitMock }
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

    expect(viewOrderStatusText).toBeVisible()
    expect(checkingTheStatusOfYourOrderText).toBeVisible()
    expect(simplyEnterYourOrderText).toBeVisible()
  })
})
