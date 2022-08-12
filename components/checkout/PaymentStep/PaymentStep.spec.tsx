import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor, cleanup } from '@testing-library/react'

// eslint-disable-next-line import/order
import * as stories from '../PaymentStep/PaymentStep.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onBlurMock = jest.fn()

const AddressFormMock = () => <div data-testid="address-form" />
const CardDetailsFormMock = () => <div data-testid="card-details" />
const KiboTextBoxMock = () => <input data-testid="text-box-mock" onBlur={onBlurMock} />
import { CheckoutStepProvider } from '@/context'

jest.mock('../../common/KiboTextBox/KiboTextBox', () => KiboTextBoxMock)
jest.mock('../CardDetailsForm/CardDetailsForm', () => CardDetailsFormMock)
jest.mock('../../common/AddressForm/AddressForm', () => AddressFormMock)

const mockIsAuthenticated = true
const mockUser: { id?: number } = {
  id: 1012,
}

jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => {
    return {
      isAuthenticated: mockIsAuthenticated,
      user: mockUser,
    }
  },
}))

afterEach(() => cleanup())

const setup = () =>
  render(
    <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
      <Common {...Common.args} />
    </CheckoutStepProvider>
  )

describe('[components] PaymentStep', () => {
  it('should render saved payment methods radio and card/address form if authenticated', async () => {
    setup()

    await waitFor(() => {
      expect(screen.getByTestId('saved-payment-methods')).toBeVisible()
    })
    expect(screen.queryByTestId('payment-types')).not.toBeInTheDocument()
    expect(screen.queryByTestId('card-details')).not.toBeInTheDocument()
    expect(screen.queryByTestId('address-form')).not.toBeInTheDocument()
  })
})
