import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { getShippingRates } from '@/__mocks__/productItemListMockData'
import { ShippingMethodProps } from '@/components/checkout/Shipping/OrderItems/ShippingMethod'
import * as stories from '@/components/checkout/Shipping/OrderItems/ShippingMethod.stories'

import type { Maybe, CrOrderItem } from '@/lib/gql/types'

const { Common } = composeStories(stories)
const onChangeMock = jest.fn()
const onClickStoreLocatorMock = jest.fn()

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
    expect(shippingMethod).toBeInTheDocument()

    const shipItemTitle = screen.getByTestId('ship-title')
    expect(shipItemTitle).toBeInTheDocument()

    const pickupItemTitle = screen.queryByTestId('pickup-title')
    expect(pickupItemTitle).toBeInTheDocument()

    const kiboSelectBtn = screen.getByRole('button', { name: 'Select Shipping Option' })
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
      shipItems: Common.args?.shipItems as Maybe<CrOrderItem>[],
      pickupItems: [],
      orderShipmentMethods: getShippingRates.orderShipmentMethods,
      onShippingMethodChange: (name: string, value: string) => ({ name, value }),
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
      pickupItems: Common.args?.pickupItems as Maybe<CrOrderItem>[],
      orderShipmentMethods: getShippingRates.orderShipmentMethods,
      onShippingMethodChange: (name: string, value: string) => ({ name, value }),
    }

    setup(params)
    const kiboSelectBtn = screen.queryByRole('button', { name: 'Select Shipping Option' })
    expect(kiboSelectBtn).not.toBeInTheDocument()
  })

  it('should have products when order items are there', () => {
    const params = {
      shipItems: Common.args?.shipItems as Maybe<CrOrderItem>[],
      pickupItems: Common.args?.pickupItems as Maybe<CrOrderItem>[],
      orderShipmentMethods: getShippingRates.orderShipmentMethods,
      onShippingMethodChange: (name: string, value: string) => ({ name, value }),
    }

    setup(params)
    const products = screen.getAllByRole('img')
    const headings = screen.getAllByRole('heading')
    expect(products.length).toBe(3)
    expect(headings.length).toBe(3)
  })

  it('should call onClickStoreLocatorMock when click onClickStoreLocator for pickupitems only', () => {
    const params = {
      shipItems: Common.args?.shipItems as Maybe<CrOrderItem>[],
      pickupItems: Common.args?.pickupItems as Maybe<CrOrderItem>[],
      orderShipmentMethods: getShippingRates.orderShipmentMethods,
      onShippingMethodChange: (name: string, value: string) => ({ name, value }),
    }
    setup(params)
    const changeStore = screen.getByTestId('change-store-MS-BTL-004')
    userEvent.click(changeStore)
    expect(onClickStoreLocatorMock).toHaveBeenCalled()
  })
})
