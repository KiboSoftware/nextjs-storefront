import React from 'react'

import { Button } from '@mui/material'
import { composeStories } from '@storybook/testing-react'
import { screen, cleanup, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/order
import getConfig from 'next/config'
import PaymentStep from './PaymentStep'
import * as stories from './PaymentStep.stories' // import all stories from the stories file
const { Common } = composeStories(stories)
import { cardPaymentMock, orderMock, purchaseOrderPaymentMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { AuthContext } from '@/context'
import { useCheckoutStepContext, CheckoutStepProvider } from '@/context'
import { cardGetters } from '@/lib/getters'
import { Address, CardForm } from '@/lib/types'

import {
  CardCollection,
  CrOrder,
  CrPurchaseOrderPayment,
  CustomerContactCollection,
  CustomerPurchaseOrderAccount,
} from '@/lib/gql/types'

jest.mock('@/lib/helpers/hasPermission', () => ({
  hasPermission: jest.fn().mockImplementation(() => true),
}))

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
            isDataUpdated: true,
          })
        }
      >
        Save Card Data
      </button>
    </div>
  ),
}))

jest.mock('../PurchaseOrderForm/PurchaseOrderForm', () => ({
  __esModule: true,
  default: ({
    onSavePurchaseData,
    onFormStatusChange,
  }: {
    onSavePurchaseData: (data: CrPurchaseOrderPayment & { isDataUpdated: boolean }) => void
    onFormStatusChange: (isValid: boolean) => void
  }) => (
    <div data-testid="purchase-order-form-mock">
      <button
        type="button"
        data-testid="changePurchaseOrderFormStatus"
        onClick={() => onFormStatusChange(true)}
      >
        Change Purchase Order Form Status
      </button>
      <button
        type="button"
        data-testid="savePurchaseOrderFormDataButton"
        onClick={() =>
          onSavePurchaseData({
            paymentTerm: {
              code: '30',
              description: '30',
            },
            purchaseOrderNumber: '100',
            isDataUpdated: true,
          })
        }
      >
        Save Purchase Order Form Data
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
            isDataUpdated: true,
          })
        }
      >
        Save Address
      </button>
    </div>
  ),
}))

// jest.mock('../../common/PaymentBillingCard/PaymentBillingCard', () => ({
//   __esModule: true,
//   default: ({
//     onSaveAddress,
//     onFormStatusChange,
//   }: {
//     onSaveAddress: (address: Address) => void
//     onFormStatusChange: (isValid: boolean) => void
//   }) => (
//     <div data-testid="pmock">

//     </div>
//   ),
// }))

// const PaymentBillingCardMock = () => <div data-testid="payment-billing-card-mock" />
// jest.mock(
//   '@/components/common/PaymentBillingCard/PaymentBillingCard',
//   () => () => PaymentBillingCardMock()
// )

const tokenizedCardResponseData = {
  id: '7d1a8a7b9c57487da07b8c0a2e6d0e1f',
  numberPart: '************1111',
}

jest.mock('@/lib/helpers/tokenizeCreditCardPayment', () => ({
  tokenizeCreditCardPayment: jest.fn(() => Promise.resolve(tokenizedCardResponseData)),
}))

afterEach(() => cleanup())

const onAddPaymentMock = jest.fn()
const onVoidPaymentMock = jest.fn()
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

const { publicRuntimeConfig } = getConfig()

const TestComponent = (param: any) => {
  const { activeStep, setStepStatusSubmit } = useCheckoutStepContext()

  const handleSubmit = () => {
    setStepStatusSubmit()
  }

  return (
    <>
      <div data-testid="activeStep">{activeStep}</div>
      <PaymentStep
        checkout={param?.checkout || Common.args?.checkout}
        cardCollection={param?.cardCollection || Common.args?.cardCollection}
        addressCollection={param?.addressCollection || Common.args?.addressCollection}
        customerPurchaseOrderAccount={
          param?.customerPurchaseOrderAccount || Common.args?.customerPurchaseOrderAccount
        }
        onAddPayment={onAddPaymentMock}
        onVoidPayment={onVoidPaymentMock}
      />
      <Button onClick={handleSubmit}>Review Order</Button>
    </>
  )
}

const setup = (param: {
  checkout?: CrOrder
  cardCollection?: CardCollection
  addressCollection?: CustomerContactCollection
  customerPurchaseOrderAccount?: CustomerPurchaseOrderAccount
  isAuthenticated: boolean
  userId: number
}) => {
  const user = userEvent.setup()
  const { isAuthenticated, userId } = param

  renderWithQueryClient(
    <AuthContext.Provider value={userContextValues(isAuthenticated, userId)}>
      <CheckoutStepProvider
        steps={['details', 'shipping', 'payment', 'review']}
        initialActiveStep={2}
      >
        <TestComponent {...param} />
      </CheckoutStepProvider>
    </AuthContext.Provider>
  )

  return {
    user,
  }
}

describe('[components] PaymentStep', () => {
  describe('Authenticated user', () => {
    it('should show Card and Purchase Order payment type radio', async () => {
      setup({
        checkout: { ...orderMock.checkout, payments: [] },
        isAuthenticated: true,
        userId: 1012,
      })

      let paymentTypes: any = null

      await waitFor(() => {
        paymentTypes = screen.getByRole('radiogroup', { name: 'payment-types' })
        expect(paymentTypes).toBeVisible()
      })

      await waitFor(() => {
        const paymentTypeOptions = within(paymentTypes).getAllByRole('radio')
        expect(paymentTypeOptions.length).toBe(publicRuntimeConfig.paymentTypes.length)
      })
    })

    describe('Purchase Order', () => {
      it('should select Purchase Order Radio if previously saved in checkout session', () => {
        setup({
          checkout: { ...orderMock.checkout, payments: [purchaseOrderPaymentMock] },
          isAuthenticated: true,
          userId: 1012,
        })

        expect(
          screen.getByRole('radio', { name: publicRuntimeConfig.paymentTypes[0].name })
        ).toBeChecked()
        expect(
          screen.getByText(purchaseOrderPaymentMock.billingInfo.purchaseOrder.purchaseOrderNumber)
        ).toBeVisible()
        expect(
          screen.getByText(
            purchaseOrderPaymentMock.billingInfo.purchaseOrder.paymentTerm.description
          )
        ).toBeVisible()
      })

      it(`shouldn't select Purchase Order if not saved before; Should add new purchase order.`, async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout, payments: [] },
          isAuthenticated: true,
          userId: 1012,
        })

        const purchaseOrderRadio = screen.getByRole('radio', {
          name: publicRuntimeConfig.paymentTypes[0].name,
        })
        expect(purchaseOrderRadio).not.toBeChecked()

        await user.click(purchaseOrderRadio)

        expect(screen.getByRole('button', { name: 'add-payment-method' })).toBeVisible()

        await user.click(screen.getByRole('button', { name: 'add-payment-method' }))

        await waitFor(() => {
          expect(screen.getByTestId('purchase-order-form-mock')).toBeVisible()
        })

        await waitFor(() => {
          expect(screen.getByTestId('address-form-mock')).toBeVisible()
        })

        await user.click(screen.getByTestId('changePurchaseOrderFormStatus'))
        await user.click(screen.getByRole('button', { name: /Change Address Form Status/ }))

        user.click(screen.getByRole('button', { name: /save-payment-method/ }))

        await user.click(screen.getByTestId('savePurchaseOrderFormDataButton'))
        await user.click(screen.getByRole('button', { name: /Save Address/ }))

        let purchaseOrderCard: any = null

        await waitFor(() => {
          purchaseOrderCard = screen.queryByTestId('purchase-order-card')
          expect(purchaseOrderCard).toBeVisible()
        })

        await waitFor(() => {
          expect(within(purchaseOrderCard).getByText('100')).toBeVisible()
        })

        await waitFor(() => {
          expect(within(purchaseOrderCard).getByText('30')).toBeVisible()
        })
      })

      it('should submit purchase order data', async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout, payments: [purchaseOrderPaymentMock] },
          isAuthenticated: true,
          userId: 1012,
        })

        await waitFor(() => {
          expect(screen.getByRole('button', { name: 'Review Order' })).toBeEnabled()
        })

        await user.click(screen.getByRole('button', { name: 'Review Order' }))

        await waitFor(() => {
          expect(onVoidPaymentMock).toBeCalled()
        })

        await waitFor(() => {
          expect(onAddPaymentMock).toBeCalled()
        })
      })
    })

    describe('cards', () => {
      it('should select Credit Card Radio if previously saved in checkout session', () => {
        setup({
          checkout: { ...orderMock.checkout, payments: [cardPaymentMock] },
          isAuthenticated: true,
          userId: 1012,
        })

        expect(
          screen.getByRole('radio', { name: publicRuntimeConfig.paymentTypes[1].name })
        ).toBeChecked()

        expect(
          screen.getByRole('radio', {
            name: cardGetters.getPaymentServiceCardId(cardPaymentMock.billingInfo.card),
          })
        ).toBeChecked()
      })

      it("shouldn't select card if not previously saved in session; no saved account cards; add new card.", async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout, payments: [] },
          cardCollection: { items: [], totalCount: 0 },
          isAuthenticated: true,
          userId: 1012,
        })

        const cardRadio = screen.getByRole('radio', {
          name: publicRuntimeConfig.paymentTypes[1].name,
        })

        expect(cardRadio).not.toBeChecked()

        await user.click(cardRadio)

        expect(screen.getByRole('button', { name: 'add-payment-method' })).toBeVisible()

        await user.click(screen.getByRole('button', { name: 'add-payment-method' }))

        await waitFor(() => {
          expect(screen.getByTestId('card-form-mock')).toBeVisible()
        })

        await waitFor(() => {
          expect(screen.getByTestId('address-form-mock')).toBeVisible()
        })

        await user.click(screen.getByTestId('changeCardFormStatus'))
        await user.click(screen.getByRole('button', { name: /Change Address Form Status/ }))

        user.click(screen.getByRole('button', { name: /save-payment-method/ }))

        await user.click(screen.getByTestId('saveCardDataButton'))
        await user.click(screen.getByRole('button', { name: /Save Address/ }))

        let creditCard: any = null

        await waitFor(() => {
          creditCard = screen.queryByTestId('credit-card-view')
          expect(creditCard).toBeVisible()
        })
      })

      it('should show account saved cards on Credit Card radio select, if any', async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout, payments: [] },
          isAuthenticated: true,
          userId: 1012,
        })

        const cardRadio = screen.getByRole('radio', {
          name: publicRuntimeConfig.paymentTypes[1].name,
        })

        expect(cardRadio).not.toBeChecked()

        await user.click(cardRadio)

        expect(screen.getByTestId('credit-card-view')).toBeVisible()
      })

      it('should submit card details to checkout session', async () => {
        const { user } = setup({
          checkout: { ...orderMock.checkout, payments: [cardPaymentMock] },
          isAuthenticated: true,
          userId: 1012,
        })

        expect(
          screen.queryByRole('radio', {
            name: cardGetters.getPaymentServiceCardId(cardPaymentMock.billingInfo.card),
          })
        ).toBeChecked()

        const cvvTextbox = screen.getAllByLabelText(/security-code/i)
        expect(cvvTextbox[1]).toBeVisible()
        await user.type(cvvTextbox[1] as Element, '123')

        expect(screen.getByRole('button', { name: 'Review Order' })).toBeEnabled()
        await user.click(screen.getByRole('button', { name: 'Review Order' }))

        await waitFor(() => {
          expect(screen.getByTestId('activeStep')).toHaveTextContent('3')
        })
      })
    })
  })

  describe('Guest User', () => {
    it('should show Card payment type radio, not purchase order', () => {
      setup({
        checkout: { ...orderMock.checkout, payments: [] },
        isAuthenticated: false,
        userId: 0,
        customerPurchaseOrderAccount: undefined,
      })

      const paymentTypes = screen.getByRole('radiogroup', { name: 'payment-types' })

      expect(paymentTypes).toBeVisible()

      const paymentTypeOptions = within(paymentTypes).getAllByRole('radio')

      expect(paymentTypeOptions.length).toBe(1)
    })
  })
})
