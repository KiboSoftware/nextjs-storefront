/* eslint-disable  testing-library/no-unnecessary-act */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './DetailsStep.stories'
import { orderMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { AuthContext, DialogRoot, ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

const userContextValues = (isAuthenticated: boolean, userId: number) => ({
  isAuthenticated: isAuthenticated,
  user: {
    id: userId,
  },
  login: jest.fn(),
  createAccount: jest.fn(),
  setAuthError: jest.fn(),
  authError: '',
  logout: jest.fn(),
})

const setup = (param: { isAuthenticated: boolean; userId: number }) => {
  const user = userEvent.setup()
  const { isAuthenticated, userId } = param
  renderWithQueryClient(
    <ModalContextProvider>
      <AuthContext.Provider value={userContextValues(isAuthenticated, userId)}>
        <DialogRoot />
        <Common {...Common.args} />
      </AuthContext.Provider>
    </ModalContextProvider>
  )
  return {
    user,
  }
}

describe('[components] Details', () => {
  describe('Authenticated user', () => {
    it('should render email input, features section & should not render sign-into-your-account button', async () => {
      setup({ isAuthenticated: true, userId: 1012 })
      await act(() => {
        const emailTitle = screen.getByText(/your-email/i)
        const emailInput = screen.getByRole('textbox', { name: /your-email/i })

        expect(emailTitle).toBeVisible()
        expect(emailInput).toBeVisible()

        const personalDetailsHeader = screen.getByRole('heading', { name: /personal-details/i })
        const enjoyPerksText = screen.getByText(/enjoy-these-perks-with-your-free-account/i)
        const fasterCheckoutText = screen.getByText(/faster-checkout/i)
        const earnCreditsText = screen.getByText(/earn-credits-with-every-purchase/i)
        const fullRewardsText = screen.getByText(/full-rewards-program-benifits/i)
        const manageYourWishList = screen.getByText(/manage-your-wishlist/i)

        expect(personalDetailsHeader).toBeVisible()
        expect(enjoyPerksText).toBeVisible()
        expect(fasterCheckoutText).toBeVisible()
        expect(earnCreditsText).toBeVisible()
        expect(fullRewardsText).toBeVisible()
        expect(manageYourWishList).toBeVisible()

        expect(
          screen.queryByRole('button', { name: /sign-into-your-account/i })
        ).not.toBeInTheDocument()
        expect(screen.queryByText(/or-fill-the-details-below/i)).not.toBeInTheDocument()
      })
    })

    it('should fill email textbox with checkout email value if present', async () => {
      setup({ isAuthenticated: true, userId: 1012 })
      await act(() => {
        const emailInput = screen.getByRole('textbox', { name: /your-email/i })
        expect(emailInput).toHaveValue(orderMock?.checkout?.email as string)
      })
    })

    it('email should display required field error when user focus out (blur event) the email field', async () => {
      const { user } = setup({ isAuthenticated: true, userId: 1012 })
      let emailError = screen.queryByText(/this\-field\-is\-required/i)
      expect(emailError).not.toBeInTheDocument()
      const emailInput = screen.getByRole('textbox', { name: /your-email/i })

      act(() => {
        emailInput.focus()
        user.clear(emailInput)
        user.tab()
      })

      await waitFor(() => {
        emailError = screen.getByText(/this\-field\-is\-required/i)
        expect(emailError).toBeVisible()
      })
    })
  })

  describe('Anonymous user', () => {
    it('should render email input & sign-into-your-account button', async () => {
      setup({ isAuthenticated: false, userId: 0 })
      await act(() => {
        const emailTitle = screen.getByText(/your-email/i)
        const emailInput = screen.getByRole('textbox', { name: /your-email/i })

        expect(emailTitle).toBeVisible()
        expect(emailInput).toBeVisible()
        expect(screen.queryByRole('button', { name: /sign-into-your-account/i })).toBeVisible()
        expect(screen.queryByText(/or-fill-the-details-below/i)).toBeVisible()
      })
    })

    it('should open login dialog after clicking on sign-into-your-account-button', async () => {
      const { user } = setup({ isAuthenticated: false, userId: 0 })
      const signInButton = screen.getByRole('button', { name: /sign-into-your-account/i })

      user.click(signInButton)

      await waitFor(() => {
        expect(screen.getByRole('dialog', { name: /log-in/i })).toBeVisible()
      })
    })
  })
})
