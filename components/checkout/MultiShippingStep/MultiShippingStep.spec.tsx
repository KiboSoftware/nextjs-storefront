import React from 'react'

import { screen, waitFor, within, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'

import MultiShippingStep from './MultiShippingStep'
import { server } from '@/__mocks__/msw/server'
import { checkoutGroupRatesMock, checkoutMock, userAddressResponse } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { DialogRoot, ModalContextProvider, CheckoutStepProvider, AuthContext } from '@/context'
import { useGetCurrentCheckout } from '@/hooks'
import type { CustomDestinationInput } from '@/lib/types'

import type {
  Checkout,
  CheckoutGrouping,
  CheckoutGroupRates,
  CrContact,
  CrOrderItem,
  CustomerContactCollection,
} from '@/lib/gql/types'

const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
const contactMock = {
  id: 1052,
  email: 'amol23@kibo.com',
  firstName: 'Susanta',
  middleNameOrInitial: null,
  lastNameOrSurname: 'Samanta',
  phoneNumbers: {
    home: '24523423423',
  },
  address: {
    address1: 'address22',
    address2: 'address44',
    address3: null,
    address4: null,
    cityOrTown: 'al-ct',
    stateOrProvince: 'AK',
    postalOrZipCode: '23423',
    countryCode: 'US',
    isValidated: false,
    addressType: 'Residential',
  },
}

const newDestinationId = '96729d68f0c045fc919cd7b1c43e3371'
const createCheckoutDestinationMock = {
  mutateAsync: jest.fn().mockImplementation(() => ({
    id: newDestinationId,
  })),
}

const onUpdateCheckoutShippingMethodMock = jest.fn()

jest.mock('../../common/AddressForm/AddressForm', () => ({
  __esModule: true,
  default: ({
    onSaveAddress,
  }: {
    onSaveAddress: ({ contact }: { contact: CrContact }) => void
  }) => (
    <div data-testid="address-form-component">
      <button
        type="button"
        data-testid="edit"
        onClick={() => onSaveAddress({ contact: contactMock })}
      >
        On Save Address
      </button>
    </div>
  ),
}))

jest.mock('../../checkout/ShippingMethod/ShippingMethod', () => ({
  __esModule: true,
  default: ({
    onShippingMethodChange,
  }: {
    onShippingMethodChange: (shippingMethodCode: string) => void
  }) => (
    <div data-testid="shipping-method">
      <button
        type="button"
        data-testid="edit"
        onClick={() => onShippingMethodChange('shippingMethodCodeMock')}
      >
        Handle Save Shipping
      </button>
    </div>
  ),
}))

const AddressCardMock = () => <div data-testid="address-card-mock" />
jest.mock('@/components/common/AddressCard/AddressCard', () => () => AddressCardMock())

// jest.mock('../../common/AddressDetailsView/AddressDetailsView', () => ({
//   __esModule: true,
//   default: ({
//     handleRadioChange,
//   }: {
//     handleRadioChange: (destinationIdOrAddressId: string) => void
//   }) => (
//     <div data-testid="address-details-view">
//       <button
//         type="button"
//         data-testid="handleRadioChange"
//         onClick={() =>
//           handleRadioChange(
//             String(
//               userAddressResponse.items?.find((item) =>
//                 item?.types?.some((type) => type?.name === 'Shipping')
//               )?.id
//             )
//           )
//         }
//       >
//         Handle Radio Change
//       </button>
//     </div>
//   ),
// }))

interface ProductItemWithAddressListProps {
  onUpdateDestinationAddress: (params: { destinationInput: CustomDestinationInput }) => void
  onSelectCreateOrSetDestinationAddress: (id: string, value: string) => void
}
jest.mock('../../common/ProductItemWithAddressList/ProductItemWithAddressList', () => ({
  __esModule: true,
  default: ({
    onUpdateDestinationAddress,
    onSelectCreateOrSetDestinationAddress,
  }: ProductItemWithAddressListProps) => (
    <div data-testid="product-item-with-address-list-mock">
      <button
        type="button"
        data-testid="createOrUpdateDestination"
        onClick={() =>
          onUpdateDestinationAddress({
            destinationInput: { itemId: 'mockItemId' },
          })
        }
      >
        Add Destination
      </button>

      <button
        type="button"
        data-testid="createOrUpdateDestination"
        onClick={() =>
          onUpdateDestinationAddress({
            destinationInput: { itemId: 'mockItemId' },
          })
        }
      >
        Update Destination
      </button>
      <button
        type="button"
        data-testid="setDestinationAddress"
        onClick={() => onSelectCreateOrSetDestinationAddress('mockId', '1441')}
      >
        Select Address
      </button>
    </div>
  ),
}))

interface ShippingGroupsWithMethodProps {
  onUpdateCheckoutShippingMethod: (params: {
    shippingMethodGroup: CheckoutGroupRates
    shippingMethodCode: string
  }) => void
}

jest.mock('../../common/ShippingGroupsWithMethod/ShippingGroupsWithMethod', () => ({
  __esModule: true,
  default: ({ onUpdateCheckoutShippingMethod }: ShippingGroupsWithMethodProps) => (
    <div data-testid="shipping-groups-with-method">
      <button
        onClick={() =>
          onUpdateCheckoutShippingMethod({
            shippingMethodCode: 'test-code',
            shippingMethodGroup: checkoutGroupRatesMock?.checkoutShippingMethods[0],
          })
        }
      >
        Update Checkout Shipping Method
      </button>
    </div>
  ),
}))

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

const TestComponent = ({ param }: { param: any }) => {
  const { data: checkout } = useGetCurrentCheckout({
    checkoutId: '148a06a207b12d0001492285000045a4' as string,
    isMultiShip: true,
  })
  const {
    isAuthenticated,
    savedUserAddressData = userAddressResponse,
    shippingMethods = checkoutGroupRatesMock?.checkoutShippingMethods,
  } = param
  return (
    <MultiShippingStep
      checkout={checkout as Checkout}
      isAuthenticated={isAuthenticated}
      savedUserAddressData={savedUserAddressData}
      shippingMethods={shippingMethods}
      onUpdateCheckoutShippingMethod={onUpdateCheckoutShippingMethodMock}
      createCheckoutDestination={createCheckoutDestinationMock}
    />
  )
}

const setup = (param: {
  isAuthenticated: boolean
  userId: number
  savedUserAddressData?: CustomerContactCollection
  shippingMethods?: CheckoutGroupRates[]
}) => {
  const user = userEvent.setup()
  const { isAuthenticated, userId } = param
  const steps = ['details', 'shipping', 'payment', 'review']

  renderWithQueryClient(
    <ModalContextProvider>
      <CheckoutStepProvider steps={steps} initialActiveStep={1}>
        <AuthContext.Provider value={userContextValues(isAuthenticated, userId)}>
          <DialogRoot />
          <TestComponent param={param} />
        </AuthContext.Provider>
      </CheckoutStepProvider>
    </ModalContextProvider>
  )

  return {
    user,
  }
}

const addressFormIsVisibleAssertion = () => {
  expect(screen.getByTestId('address-form-component')).toBeVisible()
  expect(screen.getByRole('button', { name: 'save-shipping-address' })).toBeVisible()
  expect(screen.getByRole('button', { name: 'cancel' })).toBeVisible()
}

const addressFormIsHiddenAssertion = async () => {
  await waitFor(() => {
    expect(screen.queryByTestId('address-form-component')).not.toBeInTheDocument()
  })

  await waitFor(() => {
    expect(screen.queryByRole('button', { name: 'save-shipping-address' })).not.toBeInTheDocument()
  })

  await waitFor(() => {
    expect(screen.queryByRole('button', { name: 'cancel' })).not.toBeInTheDocument()
  })
}

const goToShipToMoreThanOneAddressView = async (user: any) => {
  const shipToHome = screen.getByRole('radio', { name: 'Ship to Home' })
  const shipToMoreAddress = screen.getByRole('radio', {
    name: 'Ship to more than one address',
  })
  expect(shipToHome).toBeChecked()
  expect(shipToMoreAddress).toBeInTheDocument()

  // addressFormIsVisibleAssertion()

  user.click(shipToMoreAddress)

  await addressFormIsHiddenAssertion()
  await waitFor(() => {
    expect(screen.getByTestId('product-item-with-address-list-mock')).toBeVisible()
  })
}

describe('[component] MultiShippingStep', () => {
  describe('Authenticated User', () => {
    describe('No saved address available', () => {
      describe('there are only one item with ship fulfillment', () => {
        server.use(
          graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
            return res(
              ctx.data({
                checkout: {
                  ...checkoutMock.checkout,
                  destinations: [],
                  items: [
                    { ...(checkoutMock.checkout.items?.[0] as CrOrderItem), destinationId: null },
                  ],
                  groupings: [
                    {
                      ...(checkoutMock.checkout.groupings?.[0] as CheckoutGrouping),
                      destinationId: null,
                    },
                  ],
                },
              })
            )
          })
        )
        it('should render shipping address form and handle saving new address', async () => {
          const { user } = setup({
            isAuthenticated: true,
            userId: 0, // user that has no address saved.
            savedUserAddressData: { ...userAddressResponse, items: [] },
          })

          expect(screen.getByTestId('address-form-component')).toBeVisible()
          expect(screen.getByRole('button', { name: 'save-shipping-address' })).toBeVisible()
          expect(screen.getByRole('button', { name: 'cancel' })).toBeVisible()

          user.click(screen.getByRole('button', { name: 'On Save Address' }))

          // TODO
          // await waitFor(() => {
          //   expect(createCheckoutDestinationMock.mutateAsync).toBeCalled()
          // })

          await waitFor(() => {
            expect(screen.getByRole('button', { name: 'add-new-address' })).toBeVisible()
          })
        })
      })

      describe('there are more than one item with ship fulfillment', () => {
        server.use(
          graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
            return res(
              ctx.data({
                checkout: {
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
                },
              })
            )
          })
        )

        it('should render ship option radio and select Ship to more than one address radio to render multiShip view', async () => {
          const { user } = setup({
            isAuthenticated: true,
            userId: 0, // user that has no address saved.
            savedUserAddressData: { ...userAddressResponse, items: [] },
          })

          await addressFormIsVisibleAssertion()
          await goToShipToMoreThanOneAddressView(user)

          await waitFor(() => {
            expect(screen.queryByTestId('shipping-groups-with-method')).not.toBeInTheDocument()
          })

          await waitFor(() => {
            expect(screen.getByRole('button', { name: 'continue' })).toBeVisible()
          })

          user.click(screen.getByRole('button', { name: 'continue' }))

          await waitFor(() => {
            expect(screen.getByTestId('shipping-groups-with-method')).toBeVisible()
          })
        })

        it('should handle Add address for every shipping items', async () => {
          const { user } = setup({
            isAuthenticated: true,
            userId: 0, // user that has no address saved.
            savedUserAddressData: { ...userAddressResponse, items: [] },
          })

          await goToShipToMoreThanOneAddressView(user)

          user.click(screen.getByRole('button', { name: 'Add Destination' }))

          await waitFor(() => {
            expect(screen.getByRole('dialog')).toBeVisible()
          })

          await waitFor(() => {
            expect(within(screen.getByRole('dialog')).getByText('add-new-address')).toBeVisible()
          })
        })

        it('should handle shippingMethod selection for every ship items', async () => {
          const { user } = setup({
            isAuthenticated: true,
            userId: 0, // user that has no address saved.
            savedUserAddressData: { ...userAddressResponse, items: [] },
          })

          addressFormIsVisibleAssertion()

          await goToShipToMoreThanOneAddressView(user)

          user.click(screen.getByRole('button', { name: 'continue' }))

          await waitFor(() => {
            expect(screen.getByTestId('shipping-groups-with-method')).toBeVisible()
          })

          user.click(screen.getByRole('button', { name: 'Update Checkout Shipping Method' }))

          await waitFor(() => {
            expect(onUpdateCheckoutShippingMethodMock).toBeCalledWith({
              shippingMethodCode: 'test-code',
              shippingMethodGroup: checkoutGroupRatesMock?.checkoutShippingMethods[0],
            })
          })
        })
      })
    })

    describe('Saved addresses are available', () => {
      server.use(
        graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
          return res(
            ctx.data({
              checkout: {
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
              },
            })
          )
        })
      )
      it('should render shipping address type radio and Saved addresses radio', async () => {
        setup({
          isAuthenticated: true,
          userId: 1012, // user that has no address saved.
        })

        const shipToHome = screen.getByRole('radio', { name: 'Ship to Home' })
        const shipToMoreAddress = screen.getByRole('radio', {
          name: 'Ship to more than one address',
        })
        expect(shipToHome).toBeChecked()
        expect(shipToMoreAddress).toBeInTheDocument()

        expect(screen.queryByTestId('address-form-component')).not.toBeInTheDocument()

        const addressDetailsViewCount = userAddressResponse.items?.filter((item) =>
          item?.types?.some((type) => type?.name === 'Shipping')
        ).length

        expect(screen.getAllByTestId('address-card-mock').length).toBe(addressDetailsViewCount)
      })

      it('should handle address change for shipToHome', async () => {
        const { user } = setup({
          isAuthenticated: true,
          userId: 1012, // user that has no address saved.
        })

        expect(screen.getByRole('radio', { name: 'Ship to Home' })).toBeChecked()

        user.click(screen.getByRole('radio', { name: /Ship to more than one address/ }))

        // TODO
        // await waitFor(() => {
        //   expect(createCheckoutDestinationMock.mutateAsync).toBeCalled()
        // })
      })

      it('should handle address change in multiShip', async () => {
        const { user } = setup({
          isAuthenticated: true,
          userId: 0, // user that has no address saved.
        })

        await goToShipToMoreThanOneAddressView(user)

        user.click(screen.getByRole('button', { name: 'Select Address' }))

        // TODO
        // await waitFor(() => {
        //   expect(createCheckoutDestinationMock.mutateAsync).toBeCalled()
        // })
      })
    })
  })
})
