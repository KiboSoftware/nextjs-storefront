import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getConfig from 'next/config'

import { orderMock } from '@/__mocks__/stories'
import { addNewCard } from '@/__test__/e2e/helper'
import * as stories from '@/components/checkout/PaymentStep/PaymentStep.stories'
import { CheckoutStepProvider } from '@/context'

import type { CrOrder } from '@/lib/gql/types'

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

const setup = (param: { checkout: CrOrder }) => {
  const user = userEvent.setup()

  render(
    <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
      <Common {...Common.args} checkout={param.checkout} />
    </CheckoutStepProvider>
  )

  return {
    user,
  }
}

describe('[components] PaymentStep', () => {
  describe('Unauthenticated user', () => {
    it('should handle adding new credit card', async () => {
      const { user } = setup({
        checkout: { ...orderMock.checkout, payments: [] },
      })

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

  describe('Authenticated user', () => {
    it('should handle adding new credit card', async () => {
      mockIsAuthenticated = true
      userMock.id = 1012
      const { user } = setup(orderMock)

      expect(screen.queryByTestId('card-details')).not.toBeInTheDocument()
      expect(screen.queryByTestId('address-form')).not.toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getByTestId('saved-payment-methods')).toBeVisible()
      })

      const radios = screen.getAllByRole('radio')

      expect(radios.length).toBe(2)

      const addPaymentMethodButton = screen.getByRole('button', {
        name: /add-payment-method/i,
      })

      await user.click(addPaymentMethodButton)

      expect(screen.getByTestId('card-details')).toBeVisible()
      expect(screen.getByTestId('address-form')).toBeVisible()

      await addNewCard(user)
    })
  })
})
