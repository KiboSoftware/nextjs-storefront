import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './MultiShippingStep.stories'
import { DialogRoot, ModalContextProvider, CheckoutStepProvider } from '@/context'
import type { CustomDestinationInput } from '@/lib/types'

import type { CrContact } from '@/lib/gql/types'
const { Common } = composeStories(stories)
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
const createCheckoutDestinationMock = {
  mutateAsync: jest.fn().mockImplementation(() => ({
    id: 'testId',
  })),
}

const TestComponent = () => {
  return (
    <div>
      <DialogRoot />
      <Common {...Common.args} createCheckoutDestination={createCheckoutDestinationMock} />
    </div>
  )
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

jest.mock('../../common/AddressDetailsView/AddressDetailsView', () => ({
  __esModule: true,
  default: ({
    handleRadioChange,
  }: {
    handleRadioChange: (destinationIdOrAddressId: string) => void
  }) => (
    <div data-testid="address-details-view">
      <button
        type="button"
        data-testid="handleRadioChange"
        onClick={() => handleRadioChange('bf92ade4f3514c08bbeeaf6400833d00')}
      >
        Handle Radio Change
      </button>
    </div>
  ),
}))

jest.mock('../../common/ProductItemWithAddressList/ProductItemWithAddressList', () => ({
  __esModule: true,
  default: ({
    onUpdateDestinationAddress,
    onSelectCreateOrSetDestinationAddress,
  }: {
    onUpdateDestinationAddress: (params: { destinationInput: CustomDestinationInput }) => void
    onSelectCreateOrSetDestinationAddress: (id: string, value: string) => void
  }) => (
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
        Create Or Update Destination
      </button>
      <button
        type="button"
        data-testid="setDestinationAddress"
        onClick={() =>
          onSelectCreateOrSetDestinationAddress('mockId', 'bf92ade4f3514c08bbeeaf6400833d00')
        }
      >
        Create Destination Address
      </button>

      <button
        type="button"
        data-testid="createDestinationAddress"
        onClick={() => onSelectCreateOrSetDestinationAddress('mockId', '1441')}
      >
        Set Destination Address
      </button>
    </div>
  ),
}))

jest.mock('../../common/ShippingGroupsWithMethod/ShippingGroupsWithMethod', () => ({
  __esModule: true,
  default: () => <div data-testid="shipping-groups-with-method"></div>,
}))

const updateCheckoutItemDestinationMock = jest.fn()
const updateCheckoutDestinationMock = jest.fn()

jest.mock('@/hooks', () => ({
  useUpdateCheckoutItemDestinationMutations: jest.fn(() => {
    return {
      mutateAsync: updateCheckoutItemDestinationMock,
    }
  }),
  useUpdateCheckoutDestinationMutations: jest.fn(() => {
    return {
      mutateAsync: updateCheckoutDestinationMock,
    }
  }),
}))

describe('[components] MultiShippingStep', () => {
  const setup = () => {
    render(
      <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
        <Common {...Common.args} />
      </CheckoutStepProvider>
    )
  }

  it('should render component', async () => {
    setup()
    const shippingHeading = screen.getAllByRole('heading', {
      name: /shipping/i,
    })
    const shipToHome = screen.getByRole('radio', {
      name: /Ship To Home/i,
    })
    const shipToMoreThanOneAddress = screen.getByRole('radio', {
      name: /Ship to more than one address/i,
    })

    expect(shippingHeading[0]).toBeVisible()
    expect(shipToHome).toBeInTheDocument()
    expect(shipToMoreThanOneAddress).toBeInTheDocument()
  })
})

describe('Ship To Multi Address', () => {
  const setup = () => {
    render(
      <ModalContextProvider>
        <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
          <TestComponent />
        </CheckoutStepProvider>
      </ModalContextProvider>
    )
  }
  const user = userEvent.setup()
  it('should render component when initial Shipping Option is ShipToMultiAddress', async () => {
    setup()
    const continueButton = screen.getByRole('button', { name: 'continue' })

    expect(screen.getByTestId('product-item-with-address-list-mock')).toBeVisible()
    expect(continueButton).toBeInTheDocument()
  })

  it('should render ShippingGroupsMethod component when users click on continue button', async () => {
    setup()

    const user = userEvent.setup()
    const continueButton = screen.getByRole('button', { name: 'continue' })

    await user.click(continueButton)

    expect(screen.getByTestId('shipping-groups-with-method')).toBeVisible()
    expect(screen.queryByTestId('product-item-with-address-list-mock')).not.toBeInTheDocument()
  })

  it('should call handleCreateOrSetDestinationAddress method', async () => {
    setup()
    const setDestinationAddress = screen.getByRole('button', {
      name: /Set Destination Address/i,
    })

    await user.click(setDestinationAddress)

    expect(updateCheckoutItemDestinationMock).toBeCalled()

    const createDestinationAddress = screen.getByRole('button', {
      name: /Create Destination Address/i,
    })

    await user.click(createDestinationAddress)
    expect(createCheckoutDestinationMock.mutateAsync).toBeCalled()
    expect(updateCheckoutItemDestinationMock).toBeCalled()
  })

  it('should call createOrUpdateDestination and  handleUpdateDestinationAddress method', async () => {
    setup()
    const createOrUpdateDestination = screen.getByRole('button', {
      name: /Create Or Update Destination/i,
    })

    await user.click(createOrUpdateDestination)

    const dialog = screen.getByRole('dialog')

    expect(dialog).toBeVisible()

    await user.click(screen.getByRole('button', { name: /On Save Address/i }))

    expect(createCheckoutDestinationMock.mutateAsync).toBeCalled()
    expect(createCheckoutDestinationMock.mutateAsync).toHaveReturnedWith({ id: 'testId' })
    expect(updateCheckoutItemDestinationMock).toBeCalled()
  })
})

describe('Ship To Home', () => {
  const setup = () => {
    render(
      <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
        <Common
          {...Common.args}
          createCheckoutDestination={createCheckoutDestinationMock}
          onUpdateCheckoutShippingMethod={onUpdateCheckoutShippingMethodMock}
        />
      </CheckoutStepProvider>
    )
  }
  it('should render component when initial Shipping Option is ShipToMultiAddress', async () => {
    setup()
    const shippingHeading = screen.getAllByRole('heading', {
      name: /shipping/i,
    })
    expect(shippingHeading[0]).toBeVisible()
  })

  it('should render previously saved shipping address and Address Detail view component when initial Shipping Option is ShipToMultiAddress', async () => {
    setup()
    const user = userEvent.setup()
    const shipToHome = screen.getByRole('radio', {
      name: /Ship To Home/i,
    })
    await user.click(shipToHome)
    expect(screen.getByText(/previously-saved-shipping-addresses/i)).toBeVisible()
    expect(screen.getAllByTestId(/address-details-view/i)[0]).toBeVisible()
  })

  it('should render shipping method component when initial Shipping Option is ShipToMultiAddress', async () => {
    setup()
    const user = userEvent.setup()
    const shipToHome = screen.getByRole('radio', {
      name: /Ship To Home/i,
    })
    await user.click(shipToHome)
    const addNewAddress = screen.getByRole('button', { name: /add-new-address/i })

    expect(screen.getByTestId(/shipping-method/i)).toBeVisible()

    const handleSaveShipping = screen.getByRole('button', { name: /Handle Save Shipping/i })
    await user.click(handleSaveShipping)
    expect(onUpdateCheckoutShippingMethodMock).toHaveBeenCalled()
    expect(addNewAddress).toBeVisible()
  })

  it('should render Address Form component when users click on add new address button', async () => {
    setup()
    const user = userEvent.setup()
    const shipToHome = screen.getByRole('radio', {
      name: /Ship To Home/i,
    })
    await user.click(shipToHome)
    const addNewAddress = screen.getByRole('button', { name: /add-new-address/i })

    await user.click(addNewAddress)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    const saveShippingAddressButton = screen.getByRole('button', { name: /save-shipping-address/i })

    expect(screen.getByTestId(/address-form-component/i)).toBeVisible()
    expect(saveShippingAddressButton).toBeVisible()
    expect(saveShippingAddressButton).toBeDisabled()
    expect(cancelButton).toBeVisible()

    await user.click(screen.getByRole('button', { name: /On Save Address/i }))

    expect(createCheckoutDestinationMock.mutateAsync).toHaveBeenCalledWith({
      checkoutId: Common.args?.checkout?.id,
      destinationInput: {
        destinationContact: contactMock,
      },
    })
  })

  it('should call handleAddressSelect', async () => {
    setup()
    const user = userEvent.setup()
    const shipToHome = screen.getByRole('radio', {
      name: /Ship To Home/i,
    })

    await user.click(shipToHome)
    expect(screen.getByText(/previously-saved-shipping-addresses/i)).toBeVisible()
    expect(screen.getAllByTestId(/address-details-view/i)[0]).toBeVisible()

    await user.click(screen.getAllByRole('button', { name: /Handle Radio Change/ })[0])

    expect(updateCheckoutItemDestinationMock).toBeCalled()
  })
})
