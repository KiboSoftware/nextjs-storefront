import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './MultiShippingStep.stories'
import { addBillingAddress } from '@/__test__/e2e/helper'
import { DialogRoot, ModalContextProvider, useModalContext, CheckoutStepProvider } from '@/context'
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

const TestComponent = () => {
  return (
    <div>
      <DialogRoot />
      <Common {...Common.args} />
    </div>
  )
}

const createCheckoutDestinationMock = {
  mutateAsync: jest.fn().mockImplementation(() => ({
    id: 'abc',
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

jest.mock('../../common/AddressDetailsView/AddressDetailsView', () => ({
  __esModule: true,
  default: () => <div data-testid="address-details-view"></div>,
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
            destinationInput: { itemId: 'mockItemId', destinationId: 'mockDestinationId' },
          })
        }
      >
        Create Or Update Destination
      </button>
      <button
        type="button"
        data-testid="onSelectCreateOrSetDestinationAddress"
        onClick={() => onSelectCreateOrSetDestinationAddress('mockId', 'mockValue')}
      >
        Handle Create Or Set Destination Address
      </button>
    </div>
  ),
}))

jest.mock('../../common/ShippingGroupsWithMethod/ShippingGroupsWithMethod', () => ({
  __esModule: true,
  default: () => <div data-testid="shipping-groups-with-method"></div>,
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
    const createOrUpdateDestination = screen.getByRole('button', {
      name: /Create Or Update Destination/i,
    })
    const onSelectCreateOrSetDestinationAddress = screen.getByRole('button', {
      name: /Handle Create Or Set Destination Address/i,
    })

    await user.click(createOrUpdateDestination)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeVisible()
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
    const user = userEvent.setup()

    const shippingHeading = screen.getAllByRole('heading', {
      name: /shipping/i,
    })

    expect(shippingHeading[0]).toBeVisible()
    const shipToHome = screen.getByRole('radio', {
      name: /Ship To Home/i,
    })

    await user.click(shipToHome)

    expect(screen.getByText(/previously-saved-shipping-addresses/i)).toBeVisible()
    expect(screen.getAllByTestId(/address-details-view/i)[0]).toBeVisible()
    const addNewAddress = screen.getByRole('button', { name: /add-new-address/i })
    expect(screen.getByTestId(/shipping-method/i)).toBeVisible()
    const handleSaveShipping = screen.getByRole('button', { name: /Handle Save Shipping/i })
    await user.click(handleSaveShipping)

    expect(onUpdateCheckoutShippingMethodMock).toHaveBeenCalled()
    expect(addNewAddress).toBeVisible()

    await user.click(addNewAddress)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    const saveShippingAddressButton = screen.getByRole('button', { name: /save-shipping-address/i })
    expect(screen.getByTestId(/address-form-component/i)).toBeVisible()
    expect(saveShippingAddressButton).toBeVisible()
    expect(saveShippingAddressButton).toBeDisabled()
    expect(cancelButton).toBeVisible()

    // await addBillingAddress(user)

    // expect(saveShippingAddressButton).not.toBeDisabled()

    // await user.click(saveShippingAddressButton)
    await user.click(screen.getByRole('button', { name: /On Save Address/i }))
    // expect(Common.args?.createCheckoutDestination).toHaveBeenCalledWith({checkoutId: Common.args?.checkout?.id, destinationInput: {
    //   destinationContact: contactMock
    // }})
    expect(createCheckoutDestinationMock.mutateAsync).toHaveBeenCalledWith({
      checkoutId: Common.args?.checkout?.id,
      destinationInput: {
        destinationContact: contactMock,
      },
    })
    await user.click(cancelButton)
  })
})
