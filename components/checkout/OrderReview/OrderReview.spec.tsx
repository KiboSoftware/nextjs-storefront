import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../OrderReview/OrderReview.stories'

const { Common } = composeStories(stories)

const AddressDetailsViewMock = () => <div data-testid="address-details-view-mock" />
jest.mock(
  '@/components/checkout/AddressDetailsView/AddressDetailsView',
  () => AddressDetailsViewMock
)
const onSetActiveStepMock = jest.fn()

describe('[components] OrderReview', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const reviewComponent = screen.getByRole('heading', {
      name: /order-review/i,
    })
    const personalDetailsHeading = screen.getByRole('heading', {
      name: /personal-details/i,
    })
    const paymentMethodHeading = screen.getByRole('heading', {
      name: /payment-method/i,
    })
    const editPersonalDetails = screen.getByTestId(/edit-personal-details/i)
    const editShippingDetails = screen.getByTestId(/edit-shipping-details/i)
    const editBillingAddress = screen.getByTestId(/edit-billing-address/i)
    const editPaymentMethod = screen.getByTestId(/edit-payment-method/i)

    expect(reviewComponent).toBeVisible()
    expect(personalDetailsHeading).toBeVisible()
    expect(editPersonalDetails).toBeVisible()
    expect(editShippingDetails).toBeVisible()
    expect(editBillingAddress).toBeVisible()
    expect(editPaymentMethod).toBeVisible()
    expect(paymentMethodHeading).toBeVisible()
  })

  // it('should redirect to details page when click on edit link', () => {
  //   const onHandleEditActionMock = jest.fn()
  //   render(<Common {...Common.args} setActiveStep={onSetActiveStepMock} />)

  //   const editPersonalDetails = screen.getByTestId(/edit-personal-details/i)
  //   fireEvent.click(editPersonalDetails, { target: { 'data-step': 'details' } })

  //   expect(onSetActiveStepMock).toHaveBeenCalled()
  // })
})
