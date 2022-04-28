import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  shipItems,
  pickupItems,
  getShippingRates,
} from '../../../../../__mocks__/productItemListMockData'
import * as stories from '@/components/checkout/Shipping/OrderItems/ShippingMethod.stories'

import type { CrProductOption, ShippingRate } from '@/lib/gql/types'

interface ProductItemProps {
  image: string
  name: string
  options: CrProductOption[]
  price?: string
  salePrice?: string
  children?: ReactNode
}

interface ShippingMethodProps {
  shipItems: ProductItemProps[]
  pickupItems: ProductItemProps[]
  orderShipmentMethods: ShippingRate[]
  onChange: (name: string, value: string) => void
}

const { Common } = composeStories(stories)
const onChangeMock = jest.fn()

describe('[component] - ShippingMethod', () => {
  const setup = (params?: ShippingMethodProps) => {
    const props = params ? params : Common.args
    render(<Common {...props} onChange={onChangeMock} />)
  }

  it('should render component', () => {
    setup()
    const shippingMethod = screen.getByTestId('shipping-method')
    expect(shippingMethod).toBeInTheDocument()

    const shipItemTitle = screen.getByText(/Shipping to Home/i)
    expect(shipItemTitle).toBeInTheDocument()

    const pickupItemTitle = screen.getByText(/Pick up in Store/i)
    expect(pickupItemTitle).toBeInTheDocument()

    const kiboSelectBtn = screen.getByRole('button')
    expect(kiboSelectBtn).toBeInTheDocument()
    expect(kiboSelectBtn).toHaveTextContent('Select Shipping Option')
  })

  it('should render ship items and pickup items ', () => {
    setup()

    const shipItemElement = screen.getByTestId('ship-items')
    expect(shipItemElement).toBeInTheDocument()

    const pickupItemElement = screen.getByTestId('pickup-items')
    expect(pickupItemElement).toBeInTheDocument()
  })

  it('should have shippingMethods only for shipping to home items', async () => {
    const params = {
      shipItems: shipItems,
      pickupItems: [],
      orderShipmentMethods: getShippingRates.orderShipmentMethods,
      onChange: (name: string, value: string) => ({ name, value }),
    }

    setup(params)
    const kiboSelectBtn = screen.getByRole('button')
    expect(kiboSelectBtn).toBeInTheDocument()
    expect(kiboSelectBtn).toBeVisible()

    fireEvent.mouseDown(kiboSelectBtn)
    // Locate the corresponding popup (`listbox`) of options.
    const optionsPopupEl = await screen.findByRole('listbox')
    // Click an option in the popup.
    userEvent.click(within(optionsPopupEl).getByRole('option', { name: 'Flat Rate $15' }))
    expect(onChangeMock).toBeCalled()
  })

  it('should not have shippingMethods options if no shipping items are there', () => {
    const params = {
      shipItems: [],
      pickupItems: pickupItems,
      orderShipmentMethods: getShippingRates.orderShipmentMethods,
      onChange: (name: string, value: string) => ({ name, value }),
    }

    setup(params)
    const kiboSelectBtn = screen.queryByRole('button')
    expect(kiboSelectBtn).not.toBeInTheDocument()
  })

  it('should have products when order items are there', () => {
    const params = {
      shipItems: shipItems,
      pickupItems: pickupItems,
      orderShipmentMethods: getShippingRates.orderShipmentMethods,
      onChange: (name: string, value: string) => ({ name, value }),
    }

    setup(params)
    const products = screen.getAllByRole('img')
    const headings = screen.getAllByRole('heading')
    expect(products.length).toBe(3)
    expect(headings.length).toBe(3)
  })
})
