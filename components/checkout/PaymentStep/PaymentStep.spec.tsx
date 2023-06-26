import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, cleanup, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// eslint-disable-next-line import/order
import * as stories from './PaymentStep.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

import { orderMock, userAddressMock } from '@/__mocks__/stories'
import { getAccountCardId, getBillingAddresses } from '@/__test__/e2e/helper'
import { renderWithQueryClient } from '@/__test__/utils'
import { AuthContext } from '@/context'
import { PaymentType } from '@/lib/constants'
import { orderGetters } from '@/lib/getters'
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
          onSaveCardData({
            cardNumber: '4111111111111111',
            expiryDate: '01/2025',
            cvv: '123',
            cardType: 'VISA',
          })
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

const PaymentBillingCardMock = () => <div data-testid="payment-billing-card-mock" />
jest.mock(
  '@/components/common/PaymentBillingCard/PaymentBillingCard',
  () => () => PaymentBillingCardMock()
)

// jest.mock('../../checkout/SavedPaymentMethodView/SavedPaymentMethodView', () => ({
//   __esModule: true,
//   default: ({
//     id,
//     selected,
//     onPaymentCardSelection,
//   }: {
//     id: string
//     selected: string
//     onPaymentCardSelection: (id: string) => void
//   }) => (
//     <>
//       <div data-testid="selectedPaymentRadio">{selected}</div>
//       <div data-testid="saved-payment-method-view-mock"></div>
//       <button onClick={() => onPaymentCardSelection(id)}>handlePaymentCardSelection</button>
//     </>
//   ),
// }))

const tokenizedCardResponseData = {
  id: '7d1a8a7b9c57487da07b8c0a2e6d0e1f',
  numberPart: '************1111',
}

jest.mock('@/lib/helpers', () => ({
  tokenizeCreditCardPayment: jest.fn(() => Promise.resolve(tokenizedCardResponseData)),
}))

afterEach(() => cleanup())

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

const setup = (param: { checkout: CrOrder; isAuthenticated: boolean; userId: number }) => {
  const user = userEvent.setup()
  const { isAuthenticated, userId } = param

  renderWithQueryClient(
    <AuthContext.Provider value={userContextValues(isAuthenticated, userId)}>
      <Common {...Common.args} checkout={param.checkout} />
    </AuthContext.Provider>
  )

  return {
    user,
  }
}

describe('[components] PaymentStep', () => {
  describe('Authenticated User', () => {
    describe('There are no previously saved card and billing addresses to choose from', () => {
      it('should not display previously saved card or billing address radio buttons', () => {
        setup({
          checkout: { ...orderMock.checkout, payments: [] },
          isAuthenticated: true,
          userId: 0,
        })

        const paymentTypes = screen.getByTestId('payment-types')

        expect(paymentTypes).toBeVisible()
        expect(screen.queryByTestId('card-form-mock')).not.toBeInTheDocument()
        expect(screen.queryByTestId('address-form-mock')).not.toBeInTheDocument()
      })

      it('should display forms to add new card and associated billing address', async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout, payments: [] },
          isAuthenticated: true,
          userId: 0,
        })

        const creditCardPaymentMethodRadio = screen.getByRole('radio', {
          name: 'Credit / Debit Card',
        })

        expect(screen.queryByTestId('card-form-mock')).not.toBeInTheDocument()
        expect(screen.queryByTestId('address-form-mock')).not.toBeInTheDocument()

        user.click(creditCardPaymentMethodRadio)

        await waitFor(async () => {
          expect(await screen.findByTestId('card-form-mock')).toBeVisible()
        })
        await waitFor(async () => {
          expect(await screen.findByTestId('address-form-mock')).toBeVisible()
        })
      })

      it('should add new card and billing address and that should be selected by default', async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout, payments: [] },
          isAuthenticated: true,
          userId: 0,
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

        user.click(screen.getByRole('button', { name: /save-payment-method/ }))

        await waitFor(() => {
          expect(tokenizeCreditCardPayment).toHaveBeenCalled()
        })

        await waitFor(() => {
          expect(screen.getAllByTestId('payment-billing-card-mock').length).toBe(1)
        })

        const selectedPayment = screen.getByRole('radio', { name: tokenizedCardResponseData.id })

        expect(selectedPayment).toBeChecked()
      })

      it('should close the card and address form when user clicks on Cancel button', async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout, payments: [] },
          isAuthenticated: true,
          userId: 0,
        })

        const creditCardPaymentMethodRadio = screen.getByRole('radio', {
          name: 'Credit / Debit Card',
        })

        user.click(creditCardPaymentMethodRadio)

        await waitFor(async () => {
          expect(await screen.findByTestId('card-form-mock')).toBeVisible()
        })
        await waitFor(async () => {
          expect(await screen.findByTestId('address-form-mock')).toBeVisible()
        })

        user.click(screen.getByRole('button', { name: /cancel/i }))

        await waitFor(() => {
          expect(screen.queryByTestId('card-form-mock')).not.toBeInTheDocument()
        })
        await waitFor(() => {
          expect(screen.queryByTestId('address-form-mock')).not.toBeInTheDocument()
        })
      })

      it('should display save-payment-method and billing-address-same-as-shipping checkbox', async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout, payments: [] },
          isAuthenticated: true,
          userId: 0,
        })

        const cardOptions = await screen.findByRole('radio', {
          name: 'Credit / Debit Card',
        })

        user.click(cardOptions)

        await waitFor(() => {
          const savePaymentMethodCheckbox = screen.getByRole('checkbox', {
            name: 'save-payment-method-checkbox',
          })
          expect(savePaymentMethodCheckbox).toBeInTheDocument()
        })

        await waitFor(() => {
          const BillingSameAsShippingCheckbox = screen.getByRole('checkbox', {
            name: 'billing-address-same-as-shipping',
          })
          expect(BillingSameAsShippingCheckbox).toBeInTheDocument()
        })
      })
    })

    describe('There are previously saved card and billing address in account but not in checkout', () => {
      it('should display card and billing address(saved in account) radio buttons with default payment option selected', async () => {
        setup({
          checkout: { ...orderMock.checkout, payments: [] },
          isAuthenticated: true,
          userId: 1012,
        })

        const addresses = getBillingAddresses()
        const totalAddressCount = addresses?.length as number

        await waitFor(() => {
          expect(screen.getAllByTestId('payment-billing-card-mock').length).toBe(totalAddressCount)
        })

        const cardId = getAccountCardId()

        const selectedPayment = screen.getByRole('radio', { name: cardId })

        expect(selectedPayment).toBeChecked()

        // expect(screen.getByTestId('selectedPaymentRadio')).toHaveTextContent(cardId)
        expect(screen.getByText(/primary/i)).toBeVisible()
      })

      it('should display add-payment-method button and after clicking show card and billing address', async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout, payments: [] },
          isAuthenticated: true,
          userId: 1012,
        })

        const addPaymentMethodButton = await screen.findByRole('button', {
          name: /add-payment-method/i,
        })

        expect(addPaymentMethodButton).toBeVisible()

        await user.click(addPaymentMethodButton)

        // mocking card and address form function calls
        await user.click(await screen.findByRole('button', { name: /Change Card Form Status/ }))
        await user.click(await screen.findByRole('button', { name: /Change Address Form Status/ }))
        await user.click(await screen.findByRole('button', { name: /Save Card Data/ }))
        await user.click(await screen.findByRole('button', { name: /Save Address/ }))
        await user.click(await screen.findByRole('button', { name: /save-payment-method/ }))

        expect(tokenizeCreditCardPayment).toHaveBeenCalled()

        const addresses = getBillingAddresses()
        const totalAddressCount = addresses?.length as number

        expect(screen.getAllByTestId('payment-billing-card-mock').length).toBe(
          totalAddressCount + 1
        )
      })
    })

    describe('There are previously saved card or billing address in account and checkout', () => {
      it('should display card and billing address radio buttons(saved in account and checkout)', async () => {
        setup({
          checkout: { ...orderMock.checkout },
          isAuthenticated: true,
          userId: 1012,
        })

        const totalAddressCount =
          (orderMock?.checkout?.payments?.length as number) +
          (userAddressMock?.customerAccountContacts?.items?.filter(
            (item) =>
              item?.accountId === 1012 && item?.types?.find((type) => type?.name === 'Billing')
          ).length as number) // should be 2

        await waitFor(() => {
          expect(screen.getAllByTestId('payment-billing-card-mock').length).toBe(totalAddressCount)
        })
      })

      it('should select card and billing address present in checkout by default', async () => {
        setup({
          checkout: { ...orderMock.checkout },
          isAuthenticated: true,
          userId: 1012,
        })

        const checkoutPayments = orderGetters.getSelectedPaymentMethods(
          orderMock.checkout,
          PaymentType.CREDITCARD
        )

        const cardId = checkoutPayments?.billingInfo?.card?.paymentServiceCardId as string

        const selectedPayment = screen.getByRole('radio', { name: cardId })

        expect(selectedPayment).toBeChecked()
      })

      it(`should click a radio option and select the corresponding card and billing details`, async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout },
          isAuthenticated: true,
          userId: 1012,
        })

        const paymentCardSelectionButtons = await screen.findAllByRole('radio', {
          name: /kibo-radio/,
        })

        user.click(paymentCardSelectionButtons[0])

        await waitFor(async () => {
          const selectedIds = await screen.findAllByTestId('selectedPaymentRadio')
          const cardId = getAccountCardId()
          expect(selectedIds[0]?.textContent).toBe(cardId)
        })
      })
    })
  })

  describe('Anonymous User', () => {
    it('should not display previously saved card or billing address radio buttons', () => {
      setup({
        checkout: { ...orderMock.checkout, payments: [] },
        isAuthenticated: false,
        userId: 0,
      })

      const paymentTypes = screen.getByTestId('payment-types')

      expect(paymentTypes).toBeVisible()
      expect(screen.queryByTestId('card-form-mock')).not.toBeInTheDocument()
      expect(screen.queryByTestId('address-form-mock')).not.toBeInTheDocument()
    })

    it.only('should select card and billing address is present in checkout by default', async () => {
      setup({
        checkout: { ...orderMock.checkout },
        isAuthenticated: false,
        userId: 0,
      })

      const checkoutPayments = orderGetters.getSelectedPaymentMethods(
        orderMock.checkout,
        PaymentType.CREDITCARD
      )

      const cardId = checkoutPayments?.billingInfo?.card?.paymentServiceCardId as string

      // const selectedIds = await screen.findAllByTestId('selectedPaymentRadio')

      // expect(selectedIds[0]?.textContent).toBe(cardId)

      const selectedPayment = screen.getByRole('radio', { name: cardId })

      expect(selectedPayment).toBeChecked()
    })
  })
})
