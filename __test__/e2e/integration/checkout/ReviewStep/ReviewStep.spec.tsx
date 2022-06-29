import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from '@/components/checkout/ReviewStep/ReviewStep.stories'
import { checkoutGetters } from '@/lib/getters'

import type { Order } from '@/lib/gql/types'

const { Common } = composeStories(stories)

describe('[components] ReviewStep', () => {
  const setup = () => render(<Common {...Common.args} />)

  it('should render component', () => {
    setup()

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

    expect(orderDetailsHeading).toBeVisible()
    expect(shippingToHomeHeading).toBeVisible()
    expect(pickupInStoreHeading).toBeVisible()
    expect(productItemList).toHaveLength(2)
    expect(orderPriceComponent).toBeInTheDocument()
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
