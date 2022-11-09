import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ShippingStep.stories'
import { CheckoutStepProvider } from '@/context'

const { Common } = composeStories(stories)

const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

const AddressDetailsViewMock = () => <div data-testid="address-details-view" />
jest.mock(
  '@/components/common/AddressDetailsView/AddressDetailsView',
  () => () => AddressDetailsViewMock()
)
const AddressFormMock = () => <div data-testid="address-form-component" />
jest.mock('@/components/common/AddressForm/AddressForm', () => AddressFormMock)
const ProductItemWithAddressList = () => (
  <div data-testid="product-item-with-address-list-component" />
)
jest.mock(
  '@/components/common/ProductItemWithAddressList/ProductItemWithAddressList',
  () => ProductItemWithAddressList
)
const ShippingGroupsWithMethod = () => <div data-testid="shipping-group-with-method-component" />
jest.mock(
  '@/components/common/ShippingGroupsWithMethod/ShippingGroupsWithMethod',
  () => ShippingGroupsWithMethod
)

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

  it('should render component', () => {
    setup()

    const shippingHeading = screen.getAllByRole('heading', {
      name: /shipping/i,
    })
    const productItemWithAddressList = screen.getByTestId(
      'product-item-with-address-list-component'
    )
    const shippingGroupWithMethod = screen.getByTestId('shipping-group-with-method-component')
    const addressDetails = screen.getAllByTestId('address-details-view')
    expect(shippingHeading[0]).toBeVisible()
    expect(productItemWithAddressList).toBeVisible()
    expect(shippingGroupWithMethod).toBeVisible()
    expect(addressDetails[0]).toBeInTheDocument()
  })
})
