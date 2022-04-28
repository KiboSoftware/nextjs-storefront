import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import {
  shipItems,
  pickupItems,
  getShippingRates,
} from '../../../../__mocks__/productItemListMockData'
import * as stories from './ShippingMethod.stories'

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

const KiboSelectMock = () => <div data-testid="kibo-select-component" />
jest.mock('@/components/common/KiboSelect/KiboSelect', () => KiboSelectMock)
const productItemMock = () => <div data-testid="product-item-component" />
jest.mock('@/components/common/ProductItem/ProductItem', () => productItemMock)

describe('[component] - ShippingMethod', () => {
  const setup = (params?: ShippingMethodProps) => {
    const props = params ? params : Common.args
    render(<Common {...props} />)
  }

  it('should render component', () => {
    setup()
    const shippingMethod = screen.getByTestId('shipping-method')
    const shipItemTitle = screen.getByText(/Shipping to Home/i)
    const pickupItemTitle = screen.getByText(/Pick up in Store/i)
    const kiboSelect = screen.getByTestId('kibo-select-component')
    const productItems = screen.getAllByTestId('product-item-component')

    expect(shippingMethod).toBeInTheDocument()
    expect(shipItemTitle).toBeInTheDocument()
    expect(pickupItemTitle).toBeInTheDocument()
    expect(kiboSelect).toBeInTheDocument()
    expect(productItems.length).toBeGreaterThan(0)
  })

  it('should render only shipItems when only shipItems are present', () => {
    const params = {
      shipItems: shipItems,
      pickupItems: [],
      orderShipmentMethods: getShippingRates.orderShipmentMethods,
      onChange: (name: string, value: string) => ({ name, value }),
    }
    setup(params)

    const shipItemTitle = screen.getByText(/Shipping to Home/i)
    expect(shipItemTitle).toBeInTheDocument()

    const pickupItemTitle = screen.queryByText(/Pick up in Store/i)
    expect(pickupItemTitle).not.toBeInTheDocument()
  })

  it('should render only pickupItems when only pickupItems are there', () => {
    const params = {
      shipItems: [],
      pickupItems: pickupItems,
      orderShipmentMethods: getShippingRates.orderShipmentMethods,
      onChange: (name: string, value: string) => ({ name, value }),
    }
    setup(params)

    const shipItemTitle = screen.queryByText(/Shipping to Home/i)
    expect(shipItemTitle).not.toBeInTheDocument()

    const pickupItemTitle = screen.getByText(/Pick up in Store/i)
    expect(pickupItemTitle).toBeInTheDocument()
  })

  it('should render both shipItems and pickupItems when both are there', () => {
    const params = {
      shipItems: shipItems,
      pickupItems: pickupItems,
      orderShipmentMethods: getShippingRates.orderShipmentMethods,
      onChange: (name: string, value: string) => ({ name, value }),
    }
    setup(params)

    const shipItemTitle = screen.queryByText(/Shipping to Home/i)
    expect(shipItemTitle).toBeInTheDocument()

    const pickupItemTitle = screen.getByText(/Pick up in Store/i)
    expect(pickupItemTitle).toBeInTheDocument()
  })
})
