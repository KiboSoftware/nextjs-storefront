import React from 'react'

import { fireEvent, screen, waitFor, within, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'
import mockRouter from 'next-router-mock'

import { server } from '@/__mocks__/msw/server'
import {
  checkoutGroupRatesMock,
  checkoutMock,
  extraCheckoutShipItem,
  extraGrouping,
  orderMock,
} from '@/__mocks__/stories'
import { addAddress, addNewCard } from '@/__test__/e2e/helper'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import { MultiShipCheckoutTemplate } from '@/components/page-templates'
import { AuthContext, DialogRoot, ModalContextProvider } from '@/context/'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'
import { PaymentType } from '@/lib/constants'
import { addressGetters, checkoutGetters, orderGetters, productGetters } from '@/lib/getters'

import {
  Checkout,
  CheckoutGrouping,
  CrContact,
  CrOrderItem,
  CrPayment,
  CrProduct,
  CustomerContact,
} from '@/lib/gql/types'

const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

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

const newDestination = {
  id: 'd3d30be35aa54ef7a0bdafa10094f988',
  destinationContact: {
    id: null,
    email: null,
    firstName: 'John',
    middleNameOrInitial: null,
    lastNameOrSurname: 'Doe',
    phoneNumbers: {
      home: '9938938494',
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
      isValidated: false,
      addressType: null,
    },
  },
}

const anotherNewDestination = {
  id: '2eb59e34ef954ced8cefafa200bd1488',
  destinationContact: {
    id: null,
    email: null,
    firstName: 'Mike',
    middleNameOrInitial: null,
    lastNameOrSurname: 'Tyson',
    phoneNumbers: {
      home: '9999999999',
    },
    address: {
      address1: '100, Lamar Street',
      address2: '13/1',
      address3: null,
      address4: null,
      cityOrTown: 'Austin',
      stateOrProvince: 'TX',
      postalOrZipCode: '98984',
      countryCode: 'US',
      isValidated: false,
      addressType: null,
    },
  },
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

const setup = ({
  initialActiveStep = 0,
  isAuthenticated = false,
  userId = 0,
  checkout = checkoutMock.checkout,
}) => {
  const user = userEvent.setup()

  mockRouter.push({
    pathname: '/checkout/14e11efc4376e9000197126600007656',
    query: {
      checkoutId: checkoutMock.checkout.id as string,
    },
  })

  renderWithQueryClient(
    <ModalContextProvider>
      <AuthContext.Provider value={userContextValues(isAuthenticated, userId)}>
        <CheckoutStepProvider
          steps={['details', 'shipping', 'payment', 'review']}
          initialActiveStep={initialActiveStep}
        >
          <DialogRoot />
          <MultiShipCheckoutTemplate checkout={checkout} isMultiShipEnabled={true} />
        </CheckoutStepProvider>
      </AuthContext.Provider>
    </ModalContextProvider>
  )
  return {
    user,
  }
}

const checkoutShippingMethodsMock = [
  {
    groupingId: checkoutMock.checkout.groupings?.[0]?.id,
    shippingRates: [
      {
        shippingMethodCode: 'e9379142190e459fb542a60701452ef1',
        shippingMethodName: 'Flat Rate',
        shippingZoneCode: 'United States',
        isValid: true,
        messages: [],
        data: null,
        currencyCode: null,
        price: 15,
      },
      {
        shippingMethodCode: 'fedex_FEDEX_2_DAY',
        shippingMethodName: 'FedEx 2Day®',
        shippingZoneCode: 'United States',
        isValid: true,
        messages: [],
        data: null,
        currencyCode: null,
        price: 33.24,
      },
      {
        shippingMethodCode: 'fedex_FEDEX_EXPRESS_SAVER',
        shippingMethodName: 'FedEx Express Saver®',
        shippingZoneCode: 'United States',
        isValid: true,
        messages: [],
        data: null,
        currencyCode: null,
        price: 30.76,
      },
      {
        shippingMethodCode: 'fedex_FEDEX_GROUND',
        shippingMethodName: 'FedEx Ground®',
        shippingZoneCode: 'United States',
        isValid: true,
        messages: [],
        data: null,
        currencyCode: null,
        price: 15.84,
      },
      {
        shippingMethodCode: 'ups_UPS_GROUND',
        shippingMethodName: 'UPS Ground',
        shippingZoneCode: 'United States',
        isValid: true,
        messages: [],
        data: null,
        currencyCode: null,
        price: 9.88,
      },
      {
        shippingMethodCode: 'ups_UPS_NEXT_DAY_AIR',
        shippingMethodName: 'UPS Next Day Air®',
        shippingZoneCode: 'United States',
        isValid: true,
        messages: [],
        data: null,
        currencyCode: null,
        price: 28.99,
      },
    ],
  },
]

const handleShippingMethod = async (user: any, checkoutData: Checkout): Promise<Checkout> => {
  server.use(
    graphql.query('getCheckoutShippingMethods', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkoutShippingMethods: checkoutShippingMethodsMock,
        })
      )
    })
  )

  expect(screen.getByRole('heading', { name: 'shipping-method' })).toBeVisible()

  const shippingMethodSelect = await screen.findByRole('button', { name: 'Select Shipping Option' })

  fireEvent.mouseDown(shippingMethodSelect)

  const shippingRate = checkoutGroupRatesMock.checkoutShippingMethods?.[0]?.shippingRates?.[0]

  const option = within(screen.getByRole('listbox')).getByText(
    `${shippingRate?.shippingMethodName as string} currency`
  )

  checkoutData = {
    ...checkoutData,
    groupings: [
      {
        ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
        destinationId: 'd3d30be35aa54ef7a0bdafa10094f988',
        shippingMethodCode: shippingRate?.shippingMethodCode,
        shippingMethodName: shippingRate?.shippingMethodName,
      },
      {
        ...(checkoutMock.checkout.groupings?.[1] as CheckoutGrouping),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
    ],
  }

  server.use(
    graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: checkoutData,
        })
      )
    })
  )

  await user.click(option)

  return checkoutData
}

const handleMultiShippingMethod = async (user: any, checkoutData: Checkout): Promise<Checkout> => {
  expect(screen.getByRole('heading', { name: 'shipping-method' })).toBeVisible()

  const firstShippingMethodSelect = screen.getAllByRole('button', {
    name: 'select-shipping-option',
  })[0]

  fireEvent.mouseDown(firstShippingMethodSelect)

  const firstShippingRate = checkoutGroupRatesMock.checkoutShippingMethods?.[0]?.shippingRates?.[0]

  const firstItemOption = within(screen.getByRole('listbox')).getByText(
    `${firstShippingRate?.shippingMethodName as string} currency`
  )

  checkoutData = {
    ...checkoutData,
    email: 'guest@email.com',
    items: [
      {
        ...(checkoutMock.checkout.items?.[0] as CrOrderItem),
        destinationId: newDestination.id,
      },
      {
        ...(checkoutMock.checkout.items?.[1] as CrOrderItem),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
      { ...extraCheckoutShipItem, destinationId: anotherNewDestination.id },
    ],
    destinations: [newDestination, anotherNewDestination],
    groupings: [
      {
        ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
        destinationId: newDestination.id,
        shippingMethodCode: firstShippingRate?.shippingMethodCode,
        shippingMethodName: firstShippingRate?.shippingMethodName,
      },
      {
        ...(checkoutMock.checkout.groupings?.[1] as CheckoutGrouping),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
      {
        ...extraGrouping,
        destinationId: anotherNewDestination.id,
      },
    ],
  }
  server.use(
    graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: checkoutData,
        })
      )
    })
  )

  await user.click(firstItemOption)

  const secondShippingMethodSelect = screen.getByRole('button', {
    name: 'select-shipping-option',
  })

  fireEvent.mouseDown(secondShippingMethodSelect)

  const secondShippingRate = checkoutGroupRatesMock.checkoutShippingMethods?.[1]?.shippingRates?.[0]

  const secondOption = within(screen.getByRole('listbox')).getByText(
    `${secondShippingRate?.shippingMethodName as string} currency`
  )

  checkoutData = {
    ...checkoutData,
    email: 'guest@email.com',
    items: [
      {
        ...(checkoutMock.checkout.items?.[0] as CrOrderItem),
        destinationId: newDestination.id,
      },
      {
        ...(checkoutMock.checkout.items?.[1] as CrOrderItem),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
      { ...extraCheckoutShipItem, destinationId: anotherNewDestination.id },
    ],
    destinations: [newDestination, anotherNewDestination],
    groupings: [
      {
        ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
        destinationId: newDestination.id,
        shippingMethodCode: firstShippingRate?.shippingMethodCode,
        shippingMethodName: firstShippingRate?.shippingMethodName,
      },
      {
        ...(checkoutMock.checkout.groupings?.[1] as CheckoutGrouping),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
      {
        ...extraGrouping,
        destinationId: anotherNewDestination.id,
        shippingMethodCode: secondShippingRate?.shippingMethodCode,
        shippingMethodName: secondShippingRate?.shippingMethodName,
      },
    ],
  }

  server.use(
    graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: checkoutData,
        })
      )
    })
  )

  await act(async () => {
    await user.click(secondOption)
  })

  return checkoutData
}

const handleDetailsStep = async (user: any, checkoutData: Checkout): Promise<Checkout> => {
  const goToShippingButton = screen.getByRole('button', { name: /go-to-shipping/ })

  const personalDetailsHeader = screen.getByRole('heading', { name: /personal-details/ })

  expect(personalDetailsHeader).toBeVisible()
  expect(goToShippingButton).toBeDisabled()
  const emailInput = screen.getByRole('textbox', { name: /your-email/i })

  expect(emailInput).toHaveValue(checkoutData.email as string)

  checkoutData = {
    ...checkoutData,
    email: 'guest@email.com',
  }

  await act(async () => {
    server.use(
      graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
        return res.once(
          ctx.data({
            checkout: checkoutData,
          })
        )
      })
    )

    await user.clear(emailInput)

    await user.type(emailInput, 'guest@email.com')
  })

  await waitFor(() => {
    expect(emailInput).toHaveValue('guest@email.com')
  })

  await waitFor(() => {
    expect(goToShippingButton).toBeEnabled()
  })

  await user.click(goToShippingButton)
  return checkoutData
}

const handleSingleShipToHomeItem = async (user: any, checkoutData: Checkout) => {
  const shipToHome = screen.queryByRole('radio', { name: 'Ship to Home' })
  const shipToMoreAddress = screen.queryByRole('radio', {
    name: 'Ship to more than one address',
  })
  expect(shipToHome).not.toBeInTheDocument()
  expect(shipToMoreAddress).not.toBeInTheDocument()

  // Check go to payment button visibility
  const goToPaymentButton = screen.getByRole('button', { name: /go-to-payment/ })
  expect(goToPaymentButton).toBeDisabled()

  const saveShippingAddress = await screen.findByRole('button', { name: /save-shipping-address/ })

  expect(saveShippingAddress).toBeDisabled()

  await addAddress(user)

  expect(saveShippingAddress).toBeEnabled()

  server.use(
    graphql.mutation('createCheckoutDestination', (_req, res, ctx) => {
      return res.once(
        ctx.data({
          createCheckoutDestination: {
            ...newDestination,
            isDestinationCommercial: null,
          },
        })
      )
    })
  )

  checkoutData = {
    ...checkoutData,
    items: [
      {
        ...(checkoutMock.checkout.items?.[0] as CrOrderItem),
        destinationId: newDestination.id,
      },
      {
        ...(checkoutMock.checkout.items?.[1] as CrOrderItem),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
    ],
    destinations: [newDestination],
    groupings: [
      {
        ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
        destinationId: newDestination.id,
      },
      {
        ...(checkoutMock.checkout.groupings?.[1] as CheckoutGrouping),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
    ],
  }

  server.use(
    graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: checkoutData,
        })
      )
    })
  )

  await user.click(saveShippingAddress)

  expect(
    await screen.findByRole('heading', { name: 'previously-saved-shipping-addresses', level: 4 })
  ).toBeVisible()

  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'add-new-address' })).toBeVisible()
  })

  const newSavedAddressDetailsRadio = `400, Lamar Street,23/1,Austin,TX,98984`

  expect(screen.getByRole('radio', { name: newSavedAddressDetailsRadio })).toBeChecked()

  checkoutData = await handleShippingMethod(user, checkoutData)

  await waitFor(() => {
    expect(goToPaymentButton).toBeEnabled()
  })

  await user.click(goToPaymentButton)

  return checkoutData
}

const handleMultiShipToHomeItems = async (user: any, checkoutData: Checkout): Promise<Checkout> => {
  const shipToHome = screen.queryByRole('radio', { name: 'Ship to Home' })
  const shipToMoreAddress = screen.queryByRole('radio', {
    name: 'Ship to more than one address',
  })
  expect(shipToHome).toBeInTheDocument()
  expect(shipToMoreAddress).toBeChecked()

  // Check go to payment button visibility
  const goToPaymentButton = screen.getByRole('button', { name: /go-to-payment/ })
  expect(goToPaymentButton).toBeDisabled()

  checkoutData.items?.forEach((item) => {
    expect(screen.getByText(item?.product?.name as string)).toBeVisible()
  })

  const shipItems = checkoutGetters.getShipItems(checkoutData)

  expect(
    screen.queryByRole('button', {
      name: 'select-a-saved-address',
    })
  ).not.toBeInTheDocument()

  expect(screen.getAllByRole('button', { name: 'add-new-address' }).length).toBe(shipItems.length)
  expect(screen.queryByRole('button', { name: 'edit-address' })).not.toBeInTheDocument()

  // adding an address
  await user.click(screen.getAllByRole('button', { name: 'add-new-address' })[0])

  const saveShippingAddress = await screen.findByRole('button', { name: /save/ })

  expect(saveShippingAddress).toBeDisabled()

  await addAddress(user)

  expect(saveShippingAddress).toBeEnabled()

  server.use(
    graphql.mutation('createCheckoutDestination', (_req, res, ctx) => {
      return res.once(
        ctx.data({
          createCheckoutDestination: {
            ...newDestination,
            isDestinationCommercial: null,
          },
        })
      )
    })
  )

  server.use(
    graphql.query('getCheckoutShippingMethods', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkoutShippingMethods: [
            {
              groupingId: checkoutMock.checkout.groupings?.[0]?.id,
              shippingRates: [
                {
                  shippingMethodCode: '691f94b2b57e47239456ada600cdcc9e',
                  shippingMethodName: 'Flat Rate',
                  shippingZoneCode: 'Americas',
                  isValid: true,
                  messages: [],
                  data: null,
                  currencyCode: null,
                  price: 15,
                },
              ],
            },
            {
              groupingId: extraGrouping.id,
              shippingRates: [
                {
                  shippingMethodCode: 'fedex_FEDEX_2_DAY',
                  shippingMethodName: 'FedEx 2Day',
                  shippingZoneCode: 'United States',
                  isValid: true,
                  messages: [],
                  data: null,
                  currencyCode: null,
                  price: 33.24,
                },
              ],
            },
          ],
        })
      )
    })
  )

  checkoutData = {
    ...checkoutData,
    items: [
      {
        ...(checkoutMock.checkout.items?.[0] as CrOrderItem),
        destinationId: newDestination.id,
      },
      {
        ...(checkoutMock.checkout.items?.[1] as CrOrderItem),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
      extraCheckoutShipItem,
    ],
    destinations: [newDestination],
    groupings: [
      {
        ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
        destinationId: newDestination.id,
      },
      {
        ...(checkoutMock.checkout.groupings?.[1] as CheckoutGrouping),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
      extraGrouping,
    ],
  }

  server.use(
    graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: checkoutData,
        })
      )
    })
  )

  await user.click(saveShippingAddress)

  expect(
    screen.getAllByRole('button', {
      name: 'John Doe, 400, Lamar Street, 23/1, Austin, TX, 98984, US',
    }).length
  ).toBe(1)

  // selecting the same address for different select
  const shippingMethodSecondDefault = screen.getByRole('button', {
    name: 'select-a-saved-address',
  })

  expect(shippingMethodSecondDefault).toBeVisible()

  fireEvent.mouseDown(shippingMethodSecondDefault)

  checkoutData = {
    ...checkoutData,
    items: [
      {
        ...(checkoutMock.checkout.items?.[0] as CrOrderItem),
        destinationId: newDestination.id,
      },
      {
        ...(checkoutMock.checkout.items?.[1] as CrOrderItem),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
      { ...extraCheckoutShipItem, destinationId: newDestination.id },
    ],
    destinations: [newDestination],
    groupings: [
      {
        ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
        destinationId: newDestination.id,
      },
      {
        ...(checkoutMock.checkout.groupings?.[1] as CheckoutGrouping),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
      { ...extraGrouping, destinationId: newDestination.id },
    ],
  }

  server.use(
    graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: checkoutData,
        })
      )
    })
  )

  const existingOption = within(screen.getByRole('listbox')).getByText(
    'John Doe, 400, Lamar Street, 23/1, Austin, TX, 98984, US'
  )

  await user.click(existingOption)

  await waitFor(() => {
    expect(
      screen.getAllByRole('button', {
        name: 'John Doe, 400, Lamar Street, 23/1, Austin, TX, 98984, US',
      }).length
    ).toBe(2)
  })

  await user.click(
    screen.queryByRole('radio', {
      name: 'Ship to more than one address',
    })
  )

  // adding another new address
  await user.click(screen.getAllByRole('button', { name: 'add-new-address' })[1])

  await addAddress(user, true)

  server.use(
    graphql.mutation('createCheckoutDestination', (_req, res, ctx) => {
      return res.once(
        ctx.data({
          createCheckoutDestination: {
            ...anotherNewDestination,
            isDestinationCommercial: null,
          },
        })
      )
    })
  )

  checkoutData = {
    ...checkoutData,
    email: 'guest@email.com',
    items: [
      {
        ...(checkoutMock.checkout.items?.[0] as CrOrderItem),
        destinationId: newDestination.id,
      },
      {
        ...(checkoutMock.checkout.items?.[1] as CrOrderItem),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
      { ...extraCheckoutShipItem, destinationId: anotherNewDestination.id },
    ],
    destinations: [newDestination, anotherNewDestination],
    groupings: [
      {
        ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
        destinationId: newDestination.id,
      },
      {
        ...(checkoutMock.checkout.groupings?.[1] as CheckoutGrouping),
        destinationId: null,
        fulfillmentMethod: 'Pickup',
      },
      { ...extraGrouping, destinationId: anotherNewDestination.id },
    ],
  }

  server.use(
    graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: checkoutData,
        })
      )
    })
  )

  await user.click(await screen.findByRole('button', { name: /save/ }))

  await waitFor(() => {
    expect(
      screen.getByRole('button', {
        name: 'Mike Tyson, 100, Lamar Street, 13/1, Austin, TX, 98984, US',
      })
    ).toBeVisible()
  })

  await user.click(screen.getByRole('button', { name: 'continue' }))

  checkoutData = await handleMultiShippingMethod(user, checkoutData)

  await user.click(screen.getByRole('button', { name: 'go-to-payment' }))

  return checkoutData
}

const handlePaymentStep = async (user: any, checkoutData: Checkout): Promise<Checkout> => {
  const paymentHeader = screen.getByRole('heading', { level: 2, name: 'payment-method' })

  expect(paymentHeader).toBeVisible()

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

  expect(screen.getByRole('button', { name: /review-order/ })).toBeEnabled()

  checkoutData = {
    ...checkoutData,
    payments: orderMock.checkout.payments,
  }
  server.use(
    graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: checkoutData,
        })
      )
    })
  )

  await user.click(screen.getByRole('button', { name: /review-order/ }))
  return checkoutData
}

const handleReviewStep = async (user: any, checkoutData: Checkout) => {
  expect(screen.getByRole('heading', { name: 'order-details', level: 2 })).toBeVisible()
  expect(screen.getByTestId('review-step-component')).toBeVisible()

  const personalDetailsSection = screen.getByTestId('personal-details')
  expect(within(personalDetailsSection).getByText(checkoutData.email as string)).toBeVisible()

  // shipping address
  const multiShippingAddressesList = checkoutGetters.getOrderAddresses(
    checkoutData
  ) as CustomerContact[]
  const shippingDetailsSection = screen.getByTestId('shipping-details')

  const shippingAddressCard = within(shippingDetailsSection).getAllByTestId('address-card')
  expect(shippingAddressCard.length).toBe(multiShippingAddressesList.length)

  multiShippingAddressesList.forEach((multiAddress, index) => {
    expect(shippingAddressCard[index]).toBeVisible()
    expect(
      within(shippingAddressCard[index]).getByText(
        `${multiAddress.firstName} ${multiAddress.lastNameOrSurname}`
      )
    ).toBeVisible()
    expect(
      within(shippingAddressCard[index]).getByText(multiAddress?.address?.address1 as string)
    ).toBeVisible()
    expect(
      within(shippingAddressCard[index]).getByText(multiAddress?.address?.address2 as string)
    ).toBeVisible()
    expect(
      within(shippingAddressCard[index]).getByText(multiAddress?.address?.cityOrTown as string)
    ).toBeVisible()
    expect(
      within(shippingAddressCard[index]).getByText(multiAddress?.address?.stateOrProvince as string)
    ).toBeVisible()
    expect(
      within(shippingAddressCard[index]).getByText(multiAddress?.address?.postalOrZipCode as string)
    ).toBeVisible()
  })

  // billing address
  const billingAddressSection = screen.getByTestId('billing-address')
  const selectedPayment = orderGetters.getSelectedPaymentType(checkoutData, PaymentType.CREDITCARD)
  const billingContact = selectedPayment?.billingInfo?.billingContact

  const billingAddressCard = within(billingAddressSection).getByTestId('address-card')
  expect(billingAddressCard).toBeVisible()
  expect(
    within(billingAddressCard).getByText(
      `${billingContact?.firstName} ${billingContact?.lastNameOrSurname}`
    )
  ).toBeVisible()
  expect(
    within(billingAddressCard).getByText(billingContact?.address?.address1 as string)
  ).toBeVisible()
  expect(
    within(billingAddressCard).getByText(billingContact?.address?.address2 as string)
  ).toBeVisible()
  expect(
    within(billingAddressCard).getByText(billingContact?.address?.cityOrTown as string)
  ).toBeVisible()
  expect(
    within(billingAddressCard).getByText(billingContact?.address?.stateOrProvince as string)
  ).toBeVisible()
  expect(
    within(billingAddressCard).getByText(billingContact?.address?.postalOrZipCode as string)
  ).toBeVisible()

  //payment-method
  const paymentMethodSection = screen.getByTestId('payment-method')
  const paymentCard = within(paymentMethodSection).getByTestId('payment-info')
  expect(paymentCard).toBeVisible()

  expect(
    within(paymentCard).getByText(selectedPayment?.billingInfo?.card?.paymentOrCardType as string)
  ).toBeVisible()
  expect(
    within(paymentCard).getByText(
      selectedPayment?.billingInfo?.card?.cardNumberPartOrMask as string
    )
  ).toBeVisible()

  expect(
    within(paymentCard).getByText(
      `${selectedPayment?.billingInfo?.card?.expireMonth} / ${selectedPayment?.billingInfo?.card?.expireYear}`
    )
  ).toBeVisible()

  // ship items
  const shipItemsSection = screen.getByTestId('product-item-stack-multi-ship')

  const { shipItems } = checkoutGetters.getCheckoutDetails(checkoutData)

  shipItems.forEach((item) => {
    const destination = checkoutData.destinations?.find(
      (destination) => destination?.id === item?.destinationId
    )
    const formattedAddress = destination
      ? addressGetters.getFormattedAddress(destination?.destinationContact as CrContact)
      : ''
    expect(within(shipItemsSection).getByText(formattedAddress))
    expect(
      within(shipItemsSection).getByText(productGetters.getName(item.product as CrProduct))
    ).toBeVisible()
  })

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

describe.skip('[integration] MultiShipCheckoutTemplate', () => {
  describe('checking out for one single ship to home and one pickup in store item', () => {
    const checkoutData = {
      mock: {
        ...checkoutMock.checkout,
        destinations: [],
        items: [
          { ...(checkoutMock.checkout.items?.[0] as CrOrderItem), destinationId: null },
          {
            ...(checkoutMock.checkout.items?.[1] as CrOrderItem),
            destinationId: null,
            fulfillmentMethod: 'Pickup',
          },
        ],
        groupings: [
          {
            ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
            destinationId: null,
          },
          {
            ...(checkoutMock.checkout.groupings?.[1] as CheckoutGrouping),
            destinationId: null,
            fulfillmentMethod: 'Pickup',
          },
        ],
      } as Checkout,
    }
    beforeEach(() => {
      server.use(
        graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
          return res(
            ctx.data({
              checkout: checkoutData.mock,
            })
          )
        })
      )
    })

    it('should handle the checkout flow', async () => {
      const { user } = setup({
        isAuthenticated: true,
      })

      checkoutData.mock = await handleDetailsStep(user, checkoutData.mock)

      checkoutData.mock = await handleSingleShipToHomeItem(user, checkoutData.mock)

      checkoutData.mock = await handlePaymentStep(user, checkoutData.mock)

      await handleReviewStep(user, checkoutData.mock)
    })
  })

  describe('checking out for more than one single ship to home', () => {
    const checkoutData = {
      mock: {
        ...checkoutMock.checkout,
        destinations: [],
        items: [
          { ...(checkoutMock.checkout.items?.[0] as CrOrderItem), destinationId: null },
          {
            ...(checkoutMock.checkout.items?.[1] as CrOrderItem),
            destinationId: null,
            fulfillmentMethod: 'Pickup',
          },
          extraCheckoutShipItem,
        ],
        groupings: [
          {
            ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
            destinationId: null,
          },
          {
            ...(checkoutMock.checkout.groupings?.[1] as CheckoutGrouping),
            destinationId: null,
            fulfillmentMethod: 'Pickup',
          },
          extraGrouping,
        ],
      } as Checkout,
    }

    beforeEach(() => {
      server.use(
        graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
          return res(
            ctx.data({
              checkout: checkoutData.mock,
            })
          )
        })
      )
    })

    it.only('should handle checkout flow', async () => {
      const { user } = setup({
        isAuthenticated: true,
      })

      checkoutData.mock = await handleDetailsStep(user, checkoutData.mock)

      checkoutData.mock = await handleMultiShipToHomeItems(user, checkoutData.mock)

      checkoutData.mock = await handlePaymentStep(user, checkoutData.mock)

      await handleReviewStep(user, checkoutData.mock)
    })
  })
})
