import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from '../OrderReview/OrderReview.stories'
import { orderGetters } from '@/lib/getters'

import type { CrOrder } from '@/lib/gql/types'

const { Common, WithMultiShippingAddresses, OrderReviewWithPurchaseOrder } = composeStories(stories)

const AddressDetailsViewMock = () => <div data-testid="address-card-mock" />
jest.mock('@/components/common/AddressCard/AddressCard', () => () => AddressDetailsViewMock())

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
    const editLinks = screen.getAllByText(/edit/i)

    expect(reviewComponent).toBeVisible()
    expect(personalDetailsHeading).toBeVisible()
    expect(paymentMethodHeading).toBeVisible()
    expect(editLinks).toHaveLength(4)
  })

  it('should display address details more than two times when multiShip is enabled', () => {
    render(<WithMultiShippingAddresses {...WithMultiShippingAddresses.args} />)

    const addressDetailComponent = screen.getAllByTestId('address-card-mock')
    expect(addressDetailComponent.length).toBeGreaterThan(2)
  })

  it('should display address details two times when multiShip is disabled', () => {
    setup()

    const addressDetailComponent = screen.getAllByTestId('address-card-mock')
    expect(addressDetailComponent.length).toBe(2)
  })

  it('should display the personal details', () => {
    setup()

    const checkout = Common.args?.checkout as CrOrder
    const { personalDetails, shippingDetails, paymentMethods } =
      orderGetters.getCheckoutDetails(checkout)

    const { email } = personalDetails
    const { shippingPhoneHome } = shippingDetails

    const userName = screen.getByText(email as string)
    const userPhoneHome = screen.getByText(shippingPhoneHome)

    const cardType = screen.getByAltText(paymentMethods[0].cardType)
    const cardNumberPartOrMask = screen.getByText(paymentMethods[0].cardNumberPartOrMask)
    const expiry = screen.getByText(`${paymentMethods[0].expiry}`)

    expect(userName).toBeVisible()
    expect(userPhoneHome).toBeVisible()

    expect(cardType).toBeVisible()
    expect(cardNumberPartOrMask).toBeVisible()
    expect(expiry).toBeVisible()
  })

  it('should render purchase order number and payment term', () => {
    render(<OrderReviewWithPurchaseOrder {...OrderReviewWithPurchaseOrder.args} />)
    const checkout = OrderReviewWithPurchaseOrder.args?.checkout as CrOrder
    const { purchaseOrderPaymentMethods } = orderGetters.getCheckoutDetails(checkout)

    const purchaseOrderNumber = screen.getByText(/po-number/i)
    const paymentTerms = screen.getByText(/payment-terms/i)

    expect(purchaseOrderNumber).toBeInTheDocument()
    expect(paymentTerms).toBeInTheDocument()
    expect(
      screen.getByText(purchaseOrderPaymentMethods?.[0].purchaseOrderNumber)
    ).toBeInTheDocument()
    expect(screen.getByText(purchaseOrderPaymentMethods?.[0].paymentTerms)).toBeInTheDocument()
  })
})
