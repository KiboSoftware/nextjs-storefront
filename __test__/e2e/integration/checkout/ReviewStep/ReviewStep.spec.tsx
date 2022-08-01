import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mock } from 'jest-mock-extended'

import { createQueryClientWrapper } from '@/__test__/utils'
import * as stories from '@/components/checkout/ReviewStep/ReviewStep.stories'
import { LoginData } from '@/components/layout/Login/LoginContent/LoginContent'
import { AuthContext, AuthContextType } from '@/context/'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'
import { checkoutGetters } from '@/lib/getters'

import type { Order } from '@/lib/gql/types'

const { Common } = composeStories(stories)

describe('[components] ReviewStep', () => {
  const setup = (isAuthenticated = false) => {
    const user = userEvent.setup()

    const mockValues = mock<AuthContextType>()
    mockValues.isAuthenticated = isAuthenticated

    render(
      <AuthContext.Provider value={mockValues}>
        <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
          <Common {...Common.args} />
        </CheckoutStepProvider>
      </AuthContext.Provider>,
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    return {
      user,
    }
  }

  it('should render component', () => {
    const isAuthenticated = false
    setup(isAuthenticated)

    const orderDetailsHeading = screen.getByRole('heading', {
      name: /order-details/i,
    })

    const shippingToHomeHeading = screen.getByRole('heading', {
      name: /shipping-to-home/i,
    })
    const pickupInStoreHeading = screen.getByRole('heading', {
      name: /pickup-in-store/i,
    })
    const productItemList = screen.getAllByTestId('product-item-stack')
    const orderPriceComponent = screen.getByTestId('order-price-component')
    const iAgreeCheckbox = screen.getByRole('checkbox', { name: /termsConditions/i })
    const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
      name: /showaccountfields/i,
    })

    expect(orderDetailsHeading).toBeVisible()
    expect(shippingToHomeHeading).toBeVisible()
    expect(pickupInStoreHeading).toBeVisible()
    expect(productItemList).toHaveLength(2)
    expect(orderPriceComponent).toBeInTheDocument()
    expect(iAgreeCheckbox).toBeInTheDocument()
    expect(iWantToCreateAccountCheckbox).toBeInTheDocument()
  })

  it('should display productItems when items with shipping products', () => {
    setup()

    const checkout = Common.args?.checkout as Order
    const { shipItems } = checkoutGetters.getCheckoutDetails(checkout)
    const productImage = screen.getByRole('img', {
      name: shipItems[0]?.product?.name as string,
    })

    expect(productImage).toBeVisible()
  })
})
