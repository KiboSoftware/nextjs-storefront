import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// eslint-disable-next-line import/order
import PaymentStep from './PaymentStep'
// eslint-disable-next-line import/order
import * as stories from './PaymentStep.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

import { orderMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'
import { CheckoutStepProvider, STEP_STATUS } from '@/context'
import { tokenizeCreditCardPayment } from '@/lib/helpers'
import { Address, CardForm } from '@/lib/types'

import { CrOrder } from '@/lib/gql/types'

jest.mock('../CardDetailsForm/CardDetailsForm', () => ({
  __esModule: true,
  default: ({
    onSaveCardData,
    onFormStatusChange,
  }: {
    onSaveCardData: (cardData: CardForm) => void
    onFormStatusChange: (isValid: boolean) => void
  }) => (
    <div data-testid="card-form-mock">
      <button
        type="button"
        data-testid="changeCardFormStatus"
        onClick={() => onFormStatusChange(true)}
      >
        Change Card Form Status
      </button>
      <button
        type="button"
        data-testid="saveCardDataButton"
        onClick={() =>
          onSaveCardData({ cardNumber: '4111111111111111', expiryDate: '01/2025', cvv: '123' })
        }
      >
        Save Card Data
      </button>
    </div>
  ),
}))

jest.mock('../../common/AddressForm/AddressForm', () => ({
  __esModule: true,
  default: ({
    onSaveAddress,
    onFormStatusChange,
  }: {
    onSaveAddress: (address: Address) => void
    onFormStatusChange: (isValid: boolean) => void
  }) => (
    <div data-testid="address-form-mock">
      <button
        type="button"
        data-testid="changeBillingFormStatus"
        onClick={() => onFormStatusChange(true)}
      >
        Change Address Form Status
      </button>
      <button
        type="button"
        data-testid="saveAddressButton"
        onClick={() =>
          onSaveAddress({
            contact: {
              firstName: 'John',
              lastNameOrSurname: 'Doe',
              phoneNumbers: {
                home: '11112222333',
              },
              email: 'johndoe@example.com',
              address: {
                cityOrTown: 'New York',
                stateOrProvince: 'NY',
                postalOrZipCode: '111111',
                address1: 'New York No. 1 Lake Park',
                address2: '6A Avenue',
                countryCode: 'USA',
              },
            },
            isAddressValid: true,
          })
        }
      >
        Save Address
      </button>
    </div>
  ),
}))

jest.mock('../../checkout/SavedPaymentMethodView/SavedPaymentMethodView', () => ({
  __esModule: true,
  default: () => <div data-testid="saved-payment-method-view-mock" />,
}))

jest.mock('@/lib/helpers/tokenizeCreditCardPayment', () => ({
  tokenizeCreditCardPayment: jest.fn().mockReturnValue(() =>
    Promise.resolve({
      id: 'bb1d6066919911eda1eb0242ac120002',
      numberPart: '************1111',
    })
  ),
}))

afterEach(() => cleanup())

const setup = (param: { checkout: CrOrder }) => {
  const user = userEvent.setup()

  render(<Common {...Common.args} checkout={param.checkout} />)

  return {
    user,
  }
}

describe('[components] PaymentStep', () => {
  describe('No Saved Customer Address and Previously saved Payment Info is available', () => {
    it('should render Payment Method type Radio button', () => {
      setup({
        checkout: { ...orderMock.checkout, payments: [] },
      })
      const paymentTypes = screen.getByTestId('payment-types')
      expect(paymentTypes).toBeVisible()

      expect(screen.queryByTestId('card-form-mock')).not.toBeInTheDocument()
      expect(screen.queryByTestId('address-form-mock')).not.toBeInTheDocument()
    })

    it('should render card and address form if Credit / Debit Card radio button is clicked', async () => {
      const { user } = setup({
        checkout: { ...orderMock.checkout, payments: [] },
      })

      const creditCardPaymentMethodRadio = screen.getByRole('radio', {
        name: 'Credit / Debit Card',
      })

      expect(screen.queryByTestId('card-form-mock')).not.toBeInTheDocument()
      expect(screen.queryByTestId('address-form-mock')).not.toBeInTheDocument()

      await user.click(creditCardPaymentMethodRadio)

      expect(await screen.findByTestId('card-form-mock')).toBeVisible()
      expect(await screen.findByTestId('address-form-mock')).toBeVisible()
    })

    it('should call handleTokenization and saveCardDataToOrder', async () => {
      const { user } = setup({
        checkout: { ...orderMock.checkout, payments: [] },
      })

      await user.click(
        screen.getByRole('radio', {
          name: 'Credit / Debit Card',
        })
      )

      // mocking card and address form function calls
      await user.click(screen.getByRole('button', { name: /Change Card Form Status/ }))
      await user.click(screen.getByRole('button', { name: /Change Address Form Status/ }))
      await user.click(screen.getByRole('button', { name: /Save Card Data/ }))
      await user.click(screen.getByRole('button', { name: /Save Address/ }))

      await user.click(screen.getByRole('button', { name: /save-payment-method/ }))

      expect(tokenizeCreditCardPayment).toHaveBeenCalled()

      expect(screen.getAllByTestId('saved-payment-method-view-mock').length).toBe(1)
    })
  })

  describe('No Saved Customer Address but Previously saved Payment Info is available', () => {
    it('should call handleInitialCardDetailsLoad', () => {
      setup({
        checkout: orderMock.checkout,
      })

      expect(screen.getAllByTestId('saved-payment-method-view-mock').length).toBe(1)
    })
  })

  describe(' Saved Customer Address and Previously saved Payment Info is available', () => {
    let mockIsAuthenticated = false
    const userMock = {
      id: 0,
    }
    jest.mock('@/context/AuthContext', () => ({
      useAuthContext: () => {
        return {
          isAuthenticated: mockIsAuthenticated,
          user: userMock,
        }
      },
    }))
    it('should call handleInitialCardDetailsLoad and add a new Card details', async () => {
      mockIsAuthenticated = true
      userMock.id = 1012
      const { user } = setup({
        checkout: orderMock.checkout,
      })

      expect(screen.getAllByTestId('saved-payment-method-view-mock').length).toBe(1)

      const addPaymentMethodButton = screen.getByRole('button', {
        name: /add-payment-method/i,
      })

      await user.click(addPaymentMethodButton)

      // mocking card and address form function calls
      await user.click(screen.getByRole('button', { name: /Change Card Form Status/ }))
      await user.click(screen.getByRole('button', { name: /Change Address Form Status/ }))
      await user.click(screen.getByRole('button', { name: /Save Card Data/ }))
      await user.click(screen.getByRole('button', { name: /Save Address/ }))

      await user.click(screen.getByRole('button', { name: /save-payment-method/ }))

      expect(tokenizeCreditCardPayment).toHaveBeenCalled()

      expect(screen.getAllByTestId('saved-payment-method-view-mock').length).toBe(2)
    })

    it('should call saveCardDataToOrder function', () => {
      const onVoidPaymentMock = jest.fn()
      const onAddPaymentMock = jest.fn()
      mockIsAuthenticated = true
      userMock.id = 1012

      jest.mock('@/context/AuthContext', () => ({
        useAuthContext: () => {
          return {
            isAuthenticated: mockIsAuthenticated,
            user: userMock,
          }
        },
      }))
      render(
        <CheckoutStepProvider
          steps={['details', 'shipping', 'payment', 'review']}
          initialActiveStep={2}
          currentStepStatus={STEP_STATUS.SUBMIT}
        >
          <PaymentStep
            checkout={orderMock.checkout}
            onVoidPayment={onVoidPaymentMock}
            onAddPayment={onAddPaymentMock}
          />
        </CheckoutStepProvider>,
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      expect(onVoidPaymentMock).toBeCalled()
      expect(onAddPaymentMock).toBeCalled()
    })
  })
})
