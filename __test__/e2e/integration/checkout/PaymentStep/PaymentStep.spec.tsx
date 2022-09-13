import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent, waitFor, cleanup, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserEvent } from '@testing-library/user-event/dist/types/setup'
import getConfig from 'next/config'

import * as stories from '@/components/checkout/PaymentStep/PaymentStep.stories'
import { CheckoutStepProvider } from '@/context'
import { addNewCard } from '@/__test__/e2e/helper'

let mockIsAuthenticated = false
const userMock = {
  id: 0,
}

const { publicRuntimeConfig } = getConfig()

publicRuntimeConfig.apiHost = 'https://t29927-s49696.sandbox.mozu.com'
publicRuntimeConfig.pciHost = 'payments-sb.mozu.com'

const { Common } = composeStories(stories)
jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => {
    return {
      isAuthenticated: mockIsAuthenticated,
      user: userMock,
    }
  },
}))

jest.mock('@/lib/helpers/tokenizeCreditCardPayment', () => {
  return {
    tokenizeCreditCardPayment: jest.fn().mockImplementation(() => {
      return {
        id: 'hdah7d87ewbeed7wd8w8',
        numberPart: '************1111',
      }
    }),
  }
})

const setup = () => {
  const user = userEvent.setup()
  render(
    <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
      <Common {...Common.args} />
    </CheckoutStepProvider>
  )

  return {
    user,
  }
}

afterEach(() => cleanup())

describe('[components] PaymentStep', () => {
  describe('Unauthenticated user', () => {
    it('should handle adding new credit card', async () => {
      const { user } = setup()

      const paymentTypes = screen.getByTestId('payment-types')
      expect(paymentTypes).toBeVisible()

      const creditCardPaymentMethodRadio = screen.getByRole('radio')

      expect(screen.queryByTestId('card-details')).not.toBeInTheDocument()
      expect(screen.queryByTestId('address-form')).not.toBeInTheDocument()

      await user.click(creditCardPaymentMethodRadio)

      expect(screen.getByTestId('card-details')).toBeVisible()
      expect(screen.getByTestId('address-form')).toBeVisible()

      await addNewCard(user)

      expect(paymentTypes).not.toBeVisible()
    })
  })

  mockIsAuthenticated = true
  userMock.id = 1012

  describe('Authenticated user', () => {
    it('should handle adding new credit card', async () => {
      const { user } = setup()

      expect(screen.queryByTestId('card-details')).not.toBeInTheDocument()
      expect(screen.queryByTestId('address-form')).not.toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getByTestId('saved-payment-methods')).toBeVisible()
      })

      const radios = screen.getAllByRole('radio')

      expect(radios.length).toBe(2)

      const addPaymentMethodButton = screen.getByRole('button', {
        name: /common:add-payment-method/i,
      })

      await user.click(addPaymentMethodButton)

      expect(screen.getByTestId('card-details')).toBeVisible()
      expect(screen.getByTestId('address-form')).toBeVisible()

      await addNewCard(user)
    })
  })
})
