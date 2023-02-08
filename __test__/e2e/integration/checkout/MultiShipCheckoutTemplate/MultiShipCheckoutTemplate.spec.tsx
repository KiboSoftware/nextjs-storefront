import React from 'react'

import { cleanup, fireEvent, screen, waitFor, within, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'
import mockRouter from 'next-router-mock'

import { server } from '@/__mocks__/msw/server'
import {
  checkoutGroupRatesMock,
  checkoutMock,
  extraCheckoutShipItem,
  extraGrouping,
} from '@/__mocks__/stories'
import { addAddress } from '@/__test__/e2e/helper'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import { MultiShipCheckoutTemplate } from '@/components/page-templates'
import { AuthContext, DialogRoot, ModalContextProvider } from '@/context/'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'
import { FulfillmentOptions } from '@/lib/constants'
import { checkoutGetters } from '@/lib/getters'

import { Checkout, CheckoutGrouping, CrDestination, CrOrderItem } from '@/lib/gql/types'

const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

jest.mock('next/router', () => require('next-router-mock'))

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

const handleShippingMethod = async (user: any, checkoutData: Checkout) => {
  server.use(
    graphql.query('getCheckoutShippingMethods', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkoutShippingMethods: [
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
          ],
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

  server.use(
    graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
      checkoutData = {
        ...checkoutData,
        email: 'guest@email.com',
      }
      return res(
        ctx.data({
          checkout: {
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
          },
        })
      )
    })
  )

  await user.click(option)
}

const handleDetailsStep = async (user: any, checkoutData: Checkout) => {
  const goToShippingButton = screen.getByRole('button', { name: /go-to-shipping/ })

  const personalDetailsHeader = screen.getByRole('heading', { name: /personal-details/ })

  expect(personalDetailsHeader).toBeVisible()
  expect(goToShippingButton).toBeDisabled()
  const emailInput = screen.getByRole('textbox', { name: /your-email/i })

  expect(emailInput).toHaveValue(checkoutData.email as string)

  await act(async () => {
    server.use(
      graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
        checkoutData = {
          ...checkoutData,
          email: 'guest@email.com',
        }
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
    graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
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

  await handleShippingMethod(user, checkoutData)

  await waitFor(() => {
    expect(goToPaymentButton).toBeEnabled()
  })

  await user.click(goToPaymentButton)
}

const handleMultiShipToHomeItems = async (user: any, checkoutData: Checkout) => {
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

  await user.click(screen.getAllByRole('button', { name: 'add-new-address' })[0])

  const saveShippingAddress = await screen.findByRole('button', { name: /save/ })

  expect(saveShippingAddress).toBeDisabled()

  await addAddress(user)

  expect(saveShippingAddress).toBeEnabled()

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
    graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
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
      return res(
        ctx.data({
          checkout: checkoutData,
        })
      )
    })
  )

  await user.click(saveShippingAddress)

  expect(screen.getByTestId('checkout-shipping')).toMatchSnapshot()

  const shippingAddressFirstSelect = screen.getAllByRole('button', {
    name: 'John Doe, 400, Lamar Street, 23/1, Austin, TX, 98984, US',
  })

  expect(shippingAddressFirstSelect[0]).toBeVisible()

  server.use(
    graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
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
      return res(
        ctx.data({
          checkout: checkoutData,
        })
      )
    })
  )

  const shippingMethodSecondSelect = screen.getByRole('button', {
    name: 'select-a-saved-address',
  })

  expect(shippingMethodSecondSelect).toBeVisible()

  // fireEvent.mouseDown(shippingMethodSecondSelect)

  // const option = within(screen.getByRole('listbox')).getByText(
  //   'John Doe, 400, Lamar Street, 23/1, Austin, TX, 98984, US'
  // )

  // await user.click(option)

  // TODO
  // const newDestination = {
  //   id: 'd3d30be35aa54ef7a0bdafa10094f988',
  //   destinationContact: {
  //     id: null,
  //     email: null,
  //     firstName: 'John',
  //     middleNameOrInitial: null,
  //     lastNameOrSurname: 'Doe',
  //     phoneNumbers: {
  //       home: '9938938494',
  //     },
  //     address: {
  //       address1: '400, Lamar Street',
  //       address2: '23/1',
  //       address3: null,
  //       address4: null,
  //       cityOrTown: 'Austin',
  //       stateOrProvince: 'TX',
  //       postalOrZipCode: '98984',
  //       countryCode: 'US',
  //       isValidated: false,
  //       addressType: null,
  //     },
  //   },
  // }

  // server.use(
  //   graphql.mutation('createCheckoutDestination', (_req, res, ctx) => {
  //     return res.once(
  //       ctx.data({
  //         createCheckoutDestination: {
  //           ...newDestination,
  //           isDestinationCommercial: null,
  //         },
  //       })
  //     )
  //   })
  // )

  // server.use(
  //   graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
  //     checkoutData = {
  //       ...checkoutData,
  //       email: 'guest@email.com',
  //       items: [
  //         {
  //           ...(checkoutMock.checkout.items?.[0] as CrOrderItem),
  //           destinationId: newDestination.id,
  //         },
  //         {
  //           ...(checkoutMock.checkout.items?.[1] as CrOrderItem),
  //           destinationId: null,
  //           fulfillmentMethod: 'Pickup',
  //         },
  //       ],
  //       destinations: [newDestination],
  //       groupings: [
  //         {
  //           ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
  //           destinationId: newDestination.id,
  //         },
  //         {
  //           ...(checkoutMock.checkout.groupings?.[1] as CheckoutGrouping),
  //           destinationId: null,
  //           fulfillmentMethod: 'Pickup',
  //         },
  //       ],
  //     }
  //     return res(
  //       ctx.data({
  //         checkout: checkoutData,
  //       })
  //     )
  //   })
  // )

  // await user.click(saveShippingAddress)

  // expect(
  //   await screen.findByRole('heading', { name: 'previously-saved-shipping-addresses', level: 4 })
  // ).toBeVisible()

  // await waitFor(() => {
  //   expect(screen.getByRole('button', { name: 'add-new-address' })).toBeVisible()
  // })

  // const newSavedAddressDetailsRadio = `400, Lamar Street,23/1,Austin,TX,98984`

  // expect(screen.getByRole('radio', { name: newSavedAddressDetailsRadio })).toBeChecked()

  // await handleShippingMethod(user, checkoutData)

  // await waitFor(() => {
  //   expect(goToPaymentButton).toBeEnabled()
  // })

  // await user.click(goToPaymentButton)
}

describe('[integration] MultiShipCheckoutTemplate', () => {
  describe('Authenticated user', () => {
    describe("user doesn't have any saved addresses", () => {
      describe('checking out for one single ship to home and one pickup in store item', () => {
        const checkoutData: Checkout = {
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
        }
        beforeEach(() => {
          server.use(
            graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
              return res(
                ctx.data({
                  checkout: checkoutData,
                })
              )
            })
          )
        })

        it('should handle the checkout flow', async () => {
          const { user } = setup({
            isAuthenticated: true,
          })

          await handleDetailsStep(user, checkoutData)

          await handleSingleShipToHomeItem(user, checkoutData)
        })
      })

      describe('checking out for more than one single ship to home', () => {
        const checkoutData: Checkout = {
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
        }

        beforeEach(() => {
          server.use(
            graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
              return res(
                ctx.data({
                  checkout: checkoutData,
                })
              )
            })
          )
        })

        it('should handle checkout flow', async () => {
          const { user } = setup({
            isAuthenticated: true,
          })

          await handleDetailsStep(user, checkoutData)

          await handleMultiShipToHomeItems(user, checkoutData)
        })
      })
    })
  })
})

const NoSavedDestinationMultipleItemCheckoutData = {
  ...checkoutMock.checkout,
  destinations: [],
  items: [
    { ...(checkoutMock.checkout.items?.[0] as CrOrderItem), destinationId: null },
    { ...(checkoutMock.checkout.items?.[1] as CrOrderItem), destinationId: null },
  ],
  groupings: [
    {
      ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
      destinationId: null,
    },
  ],
}

const SameDestinationMultipleItemCheckoutData = {
  ...checkoutMock.checkout,
  destinations: [
    {
      ...(checkoutMock.checkout.destinations?.[0] as CrDestination),
    },
  ],
  items: [
    {
      ...(checkoutMock.checkout.items?.[0] as CrOrderItem),
      destinationId: 'bf92ade4f3514c08bbeeaf6400833d00',
    },
    {
      ...(checkoutMock.checkout.items?.[1] as CrOrderItem),
      destinationId: 'bf92ade4f3514c08bbeeaf6400833d00',
    },
  ],
  groupings: [
    {
      ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
      destinationId: 'bf92ade4f3514c08bbeeaf6400833d00',
    },
  ],
}

const DifferentDestinationMultipleItemCheckoutData = {
  ...checkoutMock.checkout,
}
