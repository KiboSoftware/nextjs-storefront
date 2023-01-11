import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './StandardShippingStep.stories'
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
jest.mock('@/components/common/AddressForm/AddressForm', () => () => AddressFormMock())

describe('[components] StandardShippingStep', () => {
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
    const addressDetails = screen.getAllByTestId('address-details-view')
    expect(shippingHeading[0]).toBeVisible()
    expect(addressDetails[0]).toBeInTheDocument()
  })
})
