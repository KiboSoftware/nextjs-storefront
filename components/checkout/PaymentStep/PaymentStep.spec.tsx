import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PaymentStep from './PaymentStep'
// eslint-disable-next-line import/order
import * as stories from './PaymentStep.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

import { customerAccountCardsMock, orderMock, userAddressMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { AuthContext, CheckoutStepProvider, STEP_STATUS } from '@/context'
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
  default: ({
    id,
    selected,
    onPaymentCardSelection,
  }: {
    id: string
    selected: string
    onPaymentCardSelection: (id: string) => void
  }) => (
    <>
      <div data-testid="selectedPaymentRadio">{selected}</div>
      <div data-testid="saved-payment-method-view-mock"></div>
      <button onClick={() => onPaymentCardSelection(id)}>handlePaymentCardSelection</button>
    </>
  ),
}))

const tokenizedCardResponseData = {
  id: 'bb1d6066919911eda1eb0242ac120002',
  numberPart: '************1111',
}

jest.mock('@/lib/helpers', () => ({
  tokenizeCreditCardPayment: jest.fn(() => Promise.resolve(tokenizedCardResponseData)),
}))

afterEach(() => cleanup())

const getBillingAddresses = () => {
  return userAddressMock?.customerAccountContacts?.items?.filter(
    (item) => item?.accountId === 1012 && item?.types?.find((type) => type?.name === 'Billing')
  )
}

const getBillingAddressAssociatedCard = (contactId: number) => {
  return customerAccountCardsMock.customerAccountCards.items?.find(
    (item) => item?.contactId === contactId
  )
}

const getAccountCardId = (): string => {
  const addresses = getBillingAddresses()

  const contactId = addresses?.length && addresses[0]?.id

  return getBillingAddressAssociatedCard(contactId as number)?.id as string
}

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

        await user.click(creditCardPaymentMethodRadio)

        expect(await screen.findByTestId('card-form-mock')).toBeVisible()
        expect(await screen.findByTestId('address-form-mock')).toBeVisible()
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

        await user.click(screen.getByRole('button', { name: /save-payment-method/ }))

        expect(tokenizeCreditCardPayment).toHaveBeenCalled()

        expect(screen.getAllByTestId('saved-payment-method-view-mock').length).toBe(1)

        //TODO
        expect(await screen.findByTestId('selectedPaymentRadio')).toHaveTextContent(
          tokenizedCardResponseData.id
        )
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

        await user.click(creditCardPaymentMethodRadio)

        expect(await screen.findByTestId('card-form-mock')).toBeVisible()
        expect(await screen.findByTestId('address-form-mock')).toBeVisible()

        await user.click(screen.getByRole('button', { name: /cancel/i }))

        expect(screen.queryByTestId('card-form-mock')).not.toBeInTheDocument()
        expect(screen.queryByTestId('address-form-mock')).not.toBeInTheDocument()
      })

      it('should display save-payment-method and billing-address-same-as-shipping checkbox', async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout, payments: [] },
          isAuthenticated: true,
          userId: 0,
        })

        await user.click(
          await screen.findByRole('radio', {
            name: 'Credit / Debit Card',
          })
        )
        const savePaymentMethodCheckbox = screen.getByRole('checkbox', {
          name: 'save-payment-method-checkbox',
        })
        const BillingSameAsShippingCheckbox = screen.getByRole('checkbox', {
          name: 'billing-address-same-as-shipping',
        })

        expect(savePaymentMethodCheckbox).toBeInTheDocument()
        expect(BillingSameAsShippingCheckbox).toBeInTheDocument()
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
          expect(screen.getAllByTestId('saved-payment-method-view-mock').length).toBe(
            totalAddressCount
          )
        })

        const cardId = getAccountCardId()

        expect(screen.getByTestId('selectedPaymentRadio')).toHaveTextContent(cardId)
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

        expect(screen.getAllByTestId('saved-payment-method-view-mock').length).toBe(
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
          expect(screen.getAllByTestId('saved-payment-method-view-mock').length).toBe(
            totalAddressCount
          )
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

        const cardId = checkoutPayments?.[0]?.billingInfo?.card?.paymentServiceCardId as string

        const selectedIds = await screen.findAllByTestId('selectedPaymentRadio')

        expect(selectedIds[1]?.textContent).toBe(cardId)
      })

      it(`should click a radio option and select the corresponding card and billing details`, async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout },
          isAuthenticated: true,
          userId: 1012,
        })

        const paymentCardSelectionButtons = await screen.findAllByRole('button', {
          name: /handlePaymentCardSelection/,
        })

        await user.click(paymentCardSelectionButtons[0])

        const selectedIds = await screen.findAllByTestId('selectedPaymentRadio')

        const cardId = getAccountCardId()

        await waitFor(() => {
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

    it('should select card and billing address is present in checkout by default', async () => {
      setup({
        checkout: { ...orderMock.checkout },
        isAuthenticated: false,
        userId: 0,
      })

      const checkoutPayments = orderGetters.getSelectedPaymentMethods(
        orderMock.checkout,
        PaymentType.CREDITCARD
      )

      const cardId = checkoutPayments?.[0]?.billingInfo?.card?.paymentServiceCardId as string

      const selectedIds = await screen.findAllByTestId('selectedPaymentRadio')

      expect(selectedIds[0]?.textContent).toBe(cardId)
    })
  })

  describe('Proceed to Review Step if checkout has payment method', () => {
    it('should handle Payment Step validation and proceed to Review Step', () => {
      const onVoidPaymentMock = jest.fn()
      const onAddPaymentMock = jest.fn()
      renderWithQueryClient(
        <AuthContext.Provider value={userContextValues(true, 1012)}>
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
          </CheckoutStepProvider>
        </AuthContext.Provider>
      )

      expect(onVoidPaymentMock).toBeCalled()
      expect(onAddPaymentMock).toBeCalled()
    })
  })
})
