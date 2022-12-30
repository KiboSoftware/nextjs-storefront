import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mock } from 'jest-mock-extended'

import * as stories from './CheckoutUITemplate.stories'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import { AuthContext, AuthContextType, CheckoutStepProvider } from '@/context'

const { Common } = composeStories(stories)

jest.mock('../../common/OrderSummary/OrderSummary', () => ({
  __esModule: true,
  default: () => <div data-testid="order-summary-mock" />,
}))
jest.mock('../../order/OrderConfirmation/OrderConfirmation', () => ({
  __esModule: true,
  default: () => <div data-testid="order-confirmation-mock" />,
}))
jest.mock('../../checkout/OrderReview/OrderReview', () => ({
  __esModule: true,
  default: () => <div data-testid="order-review-mock" />,
}))

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(false),
}))

const setup = (initialActiveStep = 0, isAuthenticated = false) => {
  const user = userEvent.setup()

  const mockValues = mock<AuthContextType>()
  mockValues.isAuthenticated = isAuthenticated

  renderWithQueryClient(
    <AuthContext.Provider value={mockValues}>
      <CheckoutStepProvider
        steps={['details', 'shipping', 'payment', 'review']}
        initialActiveStep={initialActiveStep}
      >
        <Common {...Common.args} />
      </CheckoutStepProvider>
    </AuthContext.Provider>
  )
  return {
    user,
  }
}

describe('[component] - CheckoutUITemplate', () => {
  it('should render checkout stepper component', async () => {
    const initialActiveStep = 0
    setup(initialActiveStep)

    const kiboStepper = screen.getByTestId('kibo-stepper')
    const orderSummary = screen.getByTestId('order-summary-mock')

    expect(kiboStepper).toBeVisible()
    expect(orderSummary).toBeVisible()
  })

  it('should render order confirmation component', async () => {
    const initialActiveStep = 4
    setup(initialActiveStep)

    const orderConfirmation = screen.getByTestId('order-confirmation-mock')
    expect(orderConfirmation).toBeVisible()
  })
})
