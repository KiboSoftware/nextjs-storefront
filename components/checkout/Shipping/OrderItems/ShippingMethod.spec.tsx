import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import {
  shipItems,
  pickupItems,
  getShippingRates,
} from '../../../../__mocks__/productItemListMockData'
import * as stories from './ShippingMethod.stories'
import { ShippingMethodProps } from '@/components/checkout/Shipping/OrderItems/ShippingMethod'

const { Common } = composeStories(stories)

const onChangeMock = jest.fn()
const onClickStoreLocatorMock = jest.fn()

const KiboSelectMock = () => <div data-testid="kibo-select-component" />
jest.mock('@/components/common/KiboSelect/KiboSelect', () => KiboSelectMock)

const productItemMock = () => <div data-testid="product-item-component" />
jest.mock('@/components/common/ProductItem/ProductItem', () => productItemMock)

describe('[component] - ShippingMethod', () => {
  const setup = (params?: ShippingMethodProps) => {
    const props = params ? params : Common.args
    render(
      <Common
        {...props}
        onShippingMethodChange={onChangeMock}
        onClickStoreLocator={onClickStoreLocatorMock}
      />
    )
  }

  it('should render component', () => {
    setup()
    const shippingMethod = screen.getByTestId('shipping-method')
    const shipItemTitle = screen.getByTestId('ship-title')
    const pickupItemTitle = screen.getByTestId('pickup-title')
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

    const shipItemTitle = screen.getByTestId('ship-title')
    expect(shipItemTitle).toBeInTheDocument()

    const pickupItemTitle = screen.queryByTestId('pickup-title')
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

    const shipItemTitle = screen.queryByTestId('ship-title')
    expect(shipItemTitle).not.toBeInTheDocument()

    const pickupItemTitle = screen.getByTestId('pickup-title')
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

    const shipItemTitle = screen.getByTestId('ship-title')
    expect(shipItemTitle).toBeInTheDocument()

    const pickupItemTitle = screen.getByTestId('pickup-title')
    expect(pickupItemTitle).toBeInTheDocument()
  })
})
