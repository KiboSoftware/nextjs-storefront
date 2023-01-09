import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './MultiShippingStep.stories'
import { CheckoutStepProvider } from '@/context'

const { Common } = composeStories(stories)

const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

const AddressFormMock = () => <div data-testid="address-form-component" />
jest.mock('@/components/common/AddressForm/AddressForm', () => () => AddressFormMock())

jest.mock('../../checkout/ShippingMethod/ShippingMethod', () => ({
  __esModule: true,
  default: () => <div data-testid="shipping-method"></div>,
}))

jest.mock('../../common/AddressDetailsView/AddressDetailsView', () => ({
  __esModule: true,
  default: () => <div data-testid="address-details-view"></div>,
}))

jest.mock('../../common/ProductItemWithAddressList/ProductItemWithAddressList', () => ({
  __esModule: true,
  default: () => <div data-testid="product-item-with-address-list-mock"></div>,
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
      <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
        <Common {...Common.args} />
      </CheckoutStepProvider>
    )
  }
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
})

describe('Ship To Home', () => {
  const setup = () => {
    render(
      <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
        <Common {...Common.args} />
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

    expect(addNewAddress).toBeVisible()

    await user.click(addNewAddress)

    const addressFormComponent = screen.getByTestId('address-form-component')
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    const saveShippingAddressButton = screen.getByRole('button', { name: /save-shipping-address/i })
    expect(addressFormComponent).toBeVisible()
    expect(saveShippingAddressButton).toBeVisible()
    expect(saveShippingAddressButton).toBeDisabled()
    expect(cancelButton).toBeVisible()

    await user.click(cancelButton)
    expect(screen.queryByTestId('address-form-component')).not.toBeInTheDocument()
  })
})
