import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ShippingStep.stories'
import { CheckoutStepProvider } from '@/context'

const { Common } = composeStories(stories)

const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

const AddressListMock = () => <div data-testid="address-list-component" />
jest.mock('@/components/common/AddressList/AddressList', () => AddressListMock)
const AddressFormMock = () => <div data-testid="address-form-component" />
jest.mock('@/components/common/AddressForm/AddressForm', () => AddressFormMock)

describe('[components] ShippingStep', () => {
  const setup = () => {
    render(
      <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
        <Common {...Common.args} />
      </CheckoutStepProvider>
    )
  }

  it('should stepperStatus validate', () => {
    setup()
    const stepperStatus = 'VALIDATE'

    expect(stepperStatus).toBe('VALIDATE')
  })
  it('should render shippingStep component', () => {
    setup()

    const addressList = screen.getByTestId('address-list-component')
    const addressForm = screen.getByTestId('address-form-component')
    expect(addressList).toBeInTheDocument()
    expect(addressForm).toBeInTheDocument()
  })
})
