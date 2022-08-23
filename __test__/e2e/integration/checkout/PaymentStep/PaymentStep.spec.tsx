import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent, waitFor, cleanup, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserEvent } from '@testing-library/user-event/dist/types/setup'
import getConfig from 'next/config'

import * as stories from '@/components/checkout/PaymentStep/PaymentStep.stories'
import { CheckoutStepProvider } from '@/context'

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

      expect(radios.length).toBe(1)

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

const addNewCard = async (user: UserEvent) => {
  await addCardDetails(user)
  await addBillingAddress(user)

  const saveMethod = screen.getByRole('button', {
    name: /common:save-payment-method/i,
  })

  await waitFor(() => {
    expect(saveMethod).toBeEnabled()
  })

  await user.click(saveMethod)
}

const addCardDetails = async (user: UserEvent) => {
  // Card form values
  const cardNumber = screen.getByRole('textbox', {
    name: /card-number/i,
  })

  const expiryDate = screen.getByRole('textbox', {
    name: /expiry-date/i,
  })

  const cvv = screen.getByPlaceholderText(/security-code-placeholder/i)

  await user.type(cardNumber, '4111111111111111')
  await user.type(expiryDate, '01/2026')
  await user.type(cvv, '123')
  await user.tab()
}

const addBillingAddress = async (user: UserEvent) => {
  const firstName = screen.getByRole('textbox', { name: /first-name/i })
  const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name-or-sur-name/i })
  const address1 = screen.getByRole('textbox', { name: /address1/i })
  const address2 = screen.getByRole('textbox', { name: /address2/i })
  const cityOrTown = screen.getByRole('textbox', { name: /city/i })
  const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })
  const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })
  const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
  const countryCode = screen.getByRole('button', { name: 'country-code' })

  await user.type(firstName, 'John')
  await user.type(lastNameOrSurname, 'Doe')
  await user.type(address1, '400, Lamar Street')
  await user.type(address2, '23/1')
  await user.type(cityOrTown, 'Austin')
  await user.type(stateOrProvince, 'TX')
  await user.type(postalOrZipCode, '989848')
  await user.type(phoneNumberHome, '9938938494')
  fireEvent.mouseDown(countryCode)

  const listbox = within(screen.getByRole('listbox'))
  await user.click(listbox.getByText(/US/i))
  await user.tab()
}
