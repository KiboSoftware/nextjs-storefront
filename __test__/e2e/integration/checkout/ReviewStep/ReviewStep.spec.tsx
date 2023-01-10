import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mock } from 'jest-mock-extended'

import { createQueryClientWrapper } from '@/__test__/utils'
import * as stories from '@/components/checkout/ReviewStep/ReviewStep.stories'
import { AuthContext, AuthContextType } from '@/context/'
import { orderGetters } from '@/lib/getters'

import type { CrOrder } from '@/lib/gql/types'

const { Common } = composeStories(stories)

describe('[integration] ReviewStep', () => {
  const setup = (isAuthenticated = false) => {
    const user = userEvent.setup()

    const mockValues = mock<AuthContextType>()
    mockValues.isAuthenticated = isAuthenticated

    render(
      <AuthContext.Provider value={mockValues}>
        <Common {...Common.args} />
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
    // TODO: will handle in Review Step ticket
    // const shippingToHomeHeading = screen.getByRole('heading', {
    //   name: /shipping-to-home/i,
    // })
    // const pickupInStoreHeading = screen.getByRole('heading', {
    //   name: /pickup-in-store/i,
    // })
    // const productItemList = screen.getAllByTestId('product-item-stack')
    const orderPriceComponent = screen.getByTestId('order-price-component')
    const iAgreeCheckbox = screen.getByRole('checkbox', { name: /termsConditions/i })
    const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
      name: /showaccountfields/i,
    })

    expect(orderDetailsHeading).toBeVisible()
    // TODO: will handle in Review Step ticket
    // expect(shippingToHomeHeading).toBeVisible()
    // expect(pickupInStoreHeading).toBeVisible()
    // expect(productItemList).toHaveLength(2)
    expect(orderPriceComponent).toBeInTheDocument()
    expect(iAgreeCheckbox).toBeInTheDocument()
    expect(iWantToCreateAccountCheckbox).toBeInTheDocument()
  })

  it('should display productItems when items with shipping products', () => {
    setup()

    const checkout = Common.args?.checkout as CrOrder
    const { shipItems } = orderGetters.getCheckoutDetails(checkout)
    const productImage = screen.getByRole('img', {
      name: shipItems[0]?.product?.name as string,
    })

    expect(productImage).toBeVisible()
  })
})
