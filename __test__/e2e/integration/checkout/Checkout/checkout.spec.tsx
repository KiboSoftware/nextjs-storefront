import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockCheckout } from '../../../../../__mocks__/msw/mockData'
import * as stories from '../../../../../components/page-templates/Checkout/Checkout.stories'
import { renderWithQueryClient } from '../../../../utils/renderWithQueryClient'

const { Common } = composeStories(stories)

const hooksMock = {
  useLoadCheckout: (_checkoutId: string) => ({
    data: mockCheckout,
    isLoading: false,
    isSuccess: true,
  }),
  useLoadFromCart: (_cartId: string) => ({
    data: mockCheckout,
    isLoading: false,
    isSuccess: true,
  }),
  useUpdatePersonalInfo: () => ({
    useUpdatePersonalInfo: {
      mutate: jest.fn(),
      isLoading: false,
      isSuccess: true,
    },
  }),
}
jest.mock('../../../../../hooks', () => hooksMock)

describe('[components] Checkout integration', () => {
  const setup = () => {
    renderWithQueryClient(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const kiboStepper = screen.getByTestId('kibo-stepper')
    const details = screen.getByTestId('checkout-details')
    const shipping = screen.queryByTestId('checkout-shipping')

    const nextButton = screen.getByRole('button', { name: /go-to-shipping/i })
    const backButton = screen.getByRole('button', { name: /back/i })

    expect(kiboStepper).toBeVisible()
    expect(details).toBeVisible()
    expect(shipping).not.toBeInTheDocument()

    expect(nextButton).toBeVisible()
    expect(backButton).toBeVisible()
    expect(backButton).toBeDisabled()
  })

  it('should activate next step(shipping) when user enters valid input and clicks on "Go to Shipping" button', async () => {
    setup()

    const email = 'Test@gmail.cm'
    const firstName = 'FirstName'
    const lastName = 'LastName'
    const password = 'TestSecret@1'

    const details: HTMLElement | null = screen.getByTestId('checkout-details')
    const shipping = screen.queryByTestId('checkout-shipping')

    const iWantToCreateAccount = screen.getByRole('checkbox', { name: /showaccountfields/i })
    await act(async () => {
      userEvent.click(iWantToCreateAccount)
    })

    const emailInput = screen.getByRole('textbox', { name: /your-email/i })
    const firstNameInput = screen.getByRole('textbox', { name: /first-name/i })
    const lastNameInput = screen.getByRole('textbox', { name: /last-name/i })
    const passwordInput = screen.getByRole('textbox', { name: /password/i })

    expect(details).toBeVisible()
    expect(shipping).not.toBeInTheDocument()

    const nextButton = screen.getByRole('button', { name: /go-to-shipping/i })

    await act(async () => {
      userEvent.clear(emailInput)
      userEvent.type(emailInput, email)

      userEvent.clear(firstNameInput)
      userEvent.type(firstNameInput, firstName)

      userEvent.clear(lastNameInput)
      userEvent.type(lastNameInput, lastName)

      userEvent.clear(passwordInput)
      userEvent.type(passwordInput, password)

      userEvent.click(nextButton)
    })

    expect(emailInput).toHaveValue(email)
    expect(firstNameInput).toHaveValue(firstName)
    expect(lastNameInput).toHaveValue(lastName)
    expect(passwordInput).toHaveValue(password)
  })
})
