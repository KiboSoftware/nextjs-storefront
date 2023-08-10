import React from 'react'

import { cleanup, fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'

import { server } from '@/__mocks__/msw/server'
import { orderMock, shippingRateMock, userAddressMock } from '@/__mocks__/stories'
import { addAddress, getAccountCardId, getBillingAddresses } from '@/__test__/e2e/helper'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import { StandardShipCheckoutTemplate } from '@/components/page-templates'
import { AuthContext } from '@/context/'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'
import { PaymentType } from '@/lib/constants'
import { addressGetters, cardGetters, orderGetters, userGetters } from '@/lib/getters'

import { CrContact, CustomerContact } from '@/lib/gql/types'

const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

const updatedFulfillmentMock = {
  ...orderMock.checkout.fulfillmentInfo,
  fulfillmentContact: {
    email: 'test@email.com',
    firstName: 'jon',
    id: 1,
    middleNameOrInitial: null,
    lastNameOrSurname: 'doe',
    companyOrOrganization: null,
    phoneNumbers: {
      home: '9938938494',
      mobile: null,
      work: null,
    },
    address: {
      address1: '400, Lamar Street',
      address2: '23/1',
      address3: null,
      address4: null,
      cityOrTown: 'Austin',
      stateOrProvince: 'TX',
      postalOrZipCode: '98984',
      countryCode: 'US',
      addressType: null,
      isValidated: false,
    },
  },
}

jest.mock('@/lib/helpers/tokenizeCreditCardPayment', () => {
  return {
    tokenizeCreditCardPayment: jest.fn().mockImplementation(() => {
      return {
        id: '7d1a8a7b9c57487da07b8c0a2e6d0e1f',
        numberPart: '************1111',
      }
    }),
  }
})

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

afterEach(() => cleanup())

const setup = ({
  initialActiveStep = 0,
  isAuthenticated = false,
  userId = 0,
  checkout = orderMock.checkout,
}) => {
  const user = userEvent.setup()

  renderWithQueryClient(
    <AuthContext.Provider value={userContextValues(isAuthenticated, userId)}>
      <CheckoutStepProvider
        steps={['details', 'shipping', 'payment', 'review']}
        initialActiveStep={initialActiveStep}
      >
        <StandardShipCheckoutTemplate checkout={checkout} isMultiShipEnabled={false} />
      </CheckoutStepProvider>
    </AuthContext.Provider>
  )
  return {
    user,
  }
}

const handleDetailsStep = async (user: any) => {
  const goToShippingButton = screen.getByRole('button', { name: /go-to-shipping/ })

  const personalDetailsHeader = screen.getByRole('heading', { name: /personal-details/ })

  expect(personalDetailsHeader).toBeVisible()
  expect(goToShippingButton).toBeDisabled()

  const emailInput = screen.getByRole('textbox', { name: /your-email/i })

  expect(emailInput).toHaveValue('amolp@dev.com')

  await user.clear(emailInput)

  await user.type(emailInput, 'test@email.com')

  server.use(
    graphql.query('getCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: {
            ...orderMock.checkout,
            email: 'test@email.com',
          },
        })
      )
    })
  )
  await waitFor(() => {
    expect(emailInput).toHaveValue('test@email.com')
  })

  await waitFor(() => {
    expect(goToShippingButton).toBeEnabled()
  })

  server.use(
    graphql.query('getCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: {
            ...orderMock.checkout,
            email: 'test@email.com',
          },
        })
      )
    })
  )

  await user.click(goToShippingButton)
}

const handleShippingStep = async (user: any) => {
  const shippingHeader = screen.getByRole('heading', { level: 2, name: 'shipping' })

  expect(shippingHeader).toBeVisible()

  const goToPaymentButton = screen.getByRole('button', { name: /go-to-payment/ })

  expect(goToPaymentButton).toBeDisabled()

  expect(screen.getAllByRole('radio').length).toBe(3)

  const selectedRadio = screen.getByRole('radio', {
    name: addressGetters.getFormattedAddress(
      orderMock.checkout.fulfillmentInfo?.fulfillmentContact as CrContact
    ),
  })

  expect(selectedRadio).toBeChecked()

  // clicking different radio

  const savedShippingAddress = userGetters.getUserShippingAddress(
    userAddressMock?.customerAccountContacts?.items as CustomerContact[]
  )?.[0]

  const anotherRadioOption = screen.getByRole('radio', {
    name: addressGetters.getFormattedAddress(savedShippingAddress),
  })

  await user.click(anotherRadioOption)

  expect(anotherRadioOption).toBeChecked()

  // add new address
  const addNewAddress = screen.getByRole('button', { name: 'add-new-address' })

  await user.click(addNewAddress)

  await addAddress(user)

  server.use(
    graphql.query('getCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: {
            ...orderMock.checkout,
            email: 'test@email.com',
            fulfillmentInfo: {
              ...orderMock.checkout.fulfillmentInfo,
              ...updatedFulfillmentMock,
            },
          },
        })
      )
    })
  )

  await user.click(screen.getByRole('button', { name: 'save-shipping-address' }))

  const newAddressRadio = await screen.findByRole('radio', {
    name: addressGetters.getFormattedAddress(updatedFulfillmentMock.fulfillmentContact),
  })

  await waitFor(() => {
    expect(newAddressRadio).toBeChecked()
  })

  await user.click(selectedRadio)

  expect(selectedRadio).toBeChecked()

  // Shipping Method selection

  const shippingMethodSelect = screen.getByRole('button', { name: 'Select Shipping Option' })

  fireEvent.mouseDown(shippingMethodSelect)

  const option = within(screen.getByRole('listbox')).getByText(
    `${shippingRateMock.orderShipmentMethods?.[0]?.shippingMethodName as string} currency`
  )

  server.use(
    graphql.query('getCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: {
            ...orderMock.checkout,
            email: 'test@email.com',
            fulfillmentInfo: {
              ...orderMock.checkout.fulfillmentInfo,
              ...updatedFulfillmentMock,
              shippingMethodCode: 'f863f9f5d4cf4f088105ae3200fd4f9b',
              shippingMethodName: 'Second Day Air',
            },
          },
        })
      )
    })
  )

  await user.click(option)

  await waitFor(() => {
    expect(goToPaymentButton).toBeEnabled()
  })

  await user.click(goToPaymentButton)
}

const handlePaymentStep = async (user: any) => {
  const paymentHeader = screen.getByRole('heading', { level: 2, name: 'payment-method' })

  expect(paymentHeader).toBeVisible()

  const addresses = getBillingAddresses()
  const checkoutPayments = orderGetters.getSelectedPaymentType(
    orderMock.checkout,
    PaymentType.CREDITCARD
  )

  const totalAddressCount = (addresses?.length as number) + 1

  await waitFor(() => {
    expect(screen.getAllByRole('radio').length).toBe(totalAddressCount)
  })

  expect(
    screen.getByRole('radio', {
      name: checkoutPayments?.billingInfo?.card?.paymentServiceCardId as string,
    })
  ).toBeChecked()

  const cardId = getAccountCardId()

  const anotherPaymentRadio = screen.getByRole('radio', { name: cardId })

  await user.click(anotherPaymentRadio)

  expect(anotherPaymentRadio).toBeChecked()

  expect(screen.getByRole('button', { name: /review-order/ })).toBeEnabled()

  await user.click(screen.getByRole('button', { name: /review-order/ }))
}

const handleReviewStep = async (user: any) => {
  const orderDetailsHeader = screen.getByRole('heading', { level: 2, name: 'order-details' })
  expect(orderDetailsHeader).toBeVisible()

  const shipToHomeHeader = screen.getByRole('heading', { level: 3, name: 'shipping-to-home' })
  const pickupHeader = screen.getByRole('heading', { level: 3, name: 'pickup-in-store' })

  expect(shipToHomeHeader).toBeVisible()
  expect(pickupHeader).toBeVisible()
  expect(screen.getAllByTestId('review-ship-items').length).toBe(2)
  expect(screen.getAllByTestId('review-pickup-items').length).toBe(1)

  //review personal details
  const ReviewPersonalDetails = screen.getByTestId(/personal-details/)
  const personalDetailsReviewHeader = screen.getByRole('heading', {
    name: /personal-details/,
    level: 6,
  })

  expect(ReviewPersonalDetails).toContainElement(personalDetailsReviewHeader)

  expect(within(ReviewPersonalDetails).getByText('test@email.com')).toBeVisible()
  expect(
    within(ReviewPersonalDetails).getByText(
      addressGetters.getPhoneNumbers(updatedFulfillmentMock.fulfillmentContact as CrContact).home
    )
  ).toBeVisible()

  //review shipping details

  const ReviewShippingDetails = screen.getByTestId(/shipping-details/)
  const shippingDetailsReviewHeader = screen.getByRole('heading', {
    name: /shipping-details/,
    level: 6,
  })

  expect(ReviewShippingDetails).toContainElement(shippingDetailsReviewHeader)

  const contact = updatedFulfillmentMock.fulfillmentContact

  expect(within(ReviewShippingDetails).getByText(addressGetters.getFullName(contact))).toBeVisible()
  expect(
    within(ReviewShippingDetails).getByText(addressGetters.getAddress1(contact.address))
  ).toBeVisible()
  expect(
    within(ReviewShippingDetails).getByText(addressGetters.getAddress2(contact.address))
  ).toBeVisible()
  expect(
    within(ReviewShippingDetails).getByText(addressGetters.getCityOrTown(contact.address))
  ).toBeVisible()
  expect(
    within(ReviewShippingDetails).getByText(addressGetters.getStateOrProvince(contact.address))
  ).toBeVisible()
  expect(
    within(ReviewShippingDetails).getByText(addressGetters.getPostalOrZipCode(contact.address))
  ).toBeVisible()

  //review billing details
  const ReviewBillingDetails = screen.getByTestId(/billing-address/)
  const billingDetailsReviewHeader = screen.getByRole('heading', {
    name: /billing-address/,
    level: 6,
  })

  expect(ReviewBillingDetails).toContainElement(billingDetailsReviewHeader)

  const billingContact = orderMock.checkout.billingInfo?.billingContact

  expect(
    within(ReviewBillingDetails).getByText(addressGetters.getFullName(billingContact as CrContact))
  ).toBeVisible()
  expect(
    within(ReviewBillingDetails).getByText(addressGetters.getAddress1(billingContact?.address))
  ).toBeVisible()
  expect(
    within(ReviewBillingDetails).getByText(addressGetters.getAddress2(billingContact?.address))
  ).toBeVisible()
  expect(
    within(ReviewBillingDetails).getByText(addressGetters.getCityOrTown(billingContact?.address))
  ).toBeVisible()
  expect(
    within(ReviewBillingDetails).getByText(
      addressGetters.getStateOrProvince(billingContact?.address)
    )
  ).toBeVisible()
  expect(
    within(ReviewBillingDetails).getByText(
      addressGetters.getPostalOrZipCode(billingContact?.address)
    )
  ).toBeVisible()

  //review Payment details
  const ReviewPaymentDetails = screen.getByTestId(/payment-method/)
  const paymentMethodReviewHeader = screen.getByRole('heading', {
    name: /payment-method/,
    level: 6,
  })

  expect(ReviewPaymentDetails).toContainElement(paymentMethodReviewHeader)

  const card = orderGetters.getPaymentMethods(orderMock.checkout)?.[0]

  expect(within(ReviewPaymentDetails).getByText(cardGetters.getCardType(card))).toBeVisible()
  expect(within(ReviewPaymentDetails).getByText(card.cardNumberPartOrMask)).toBeVisible()

  expect(within(ReviewPaymentDetails).getByText(card.expiry)).toBeVisible()

  const iAgreeCheckbox = screen.getByRole('checkbox', { name: /termsConditions/i })

  expect(iAgreeCheckbox).not.toBeChecked()

  await user.click(iAgreeCheckbox)

  const confirmAndPayButton = screen.getByRole('button', {
    name: /confirm-and-pay/i,
  })

  expect(confirmAndPayButton).toBeEnabled()

  await user.click(confirmAndPayButton)

  expect(
    screen.getByRole('heading', { name: /your-order-was-placed-successfully/, level: 1 })
  ).toBeVisible()
}

describe.skip('[integration] StandardShipCheckoutTemplate', () => {
  describe('Authenticated user with no checkout details', () => {
    it('should handle standard checkout flow', async () => {
      const { user } = setup({
        isAuthenticated: true,
        userId: 1012,
      })

      // details step
      await handleDetailsStep(user)

      // Shipping Step
      await handleShippingStep(user)

      // Payment Step
      await handlePaymentStep(user)

      // Review Step
      await handleReviewStep(user)
    })
  })
})
