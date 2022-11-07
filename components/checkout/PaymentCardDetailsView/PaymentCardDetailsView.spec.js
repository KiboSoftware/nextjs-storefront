import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './PaymentCardDetailsView.stories' // import all stories from the stories file

const { Common, Radio } = composeStories(stories)

const mockOnPaymentCardSelection = jest.fn()

const PaymentCardMock = () => <div data-testid="payment-card-mock" />
jest.mock('@/components/common/PaymentCard/PaymentCard', () => () => PaymentCardMock())

const user = userEvent.setup()

describe('[component] - PaymentCardDetailsView', () => {
  it('should render radio button if radio prop is true', async () => {
    render(<Radio {...Radio.args} onPaymentCardSelection={mockOnPaymentCardSelection} />)

    const radio = screen.getByRole('radio', { name: Radio.args.cardNumberPart })

    await user.click(radio)

    expect(mockOnPaymentCardSelection).toBeCalled()
  })

  it('should render component if radio is false', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('payment-card-mock')).toBeVisible()
  })
})
