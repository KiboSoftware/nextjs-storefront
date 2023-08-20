import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getConfig from 'next/config'

import * as stories from './OrderSummaryEditable.stories'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'

const { Common } = composeStories(stories)

const user = userEvent.setup()

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      debounceTimeout: '100',
      b2bProductSearchPageSize: 16,
    },
  })
})

const ProductItemMock = () => (
  <div data-testid="product-item-component">
    <button data-testid="product-item">Product Item</button>
  </div>
)
jest.mock('@/components/common/ProductItem/ProductItem', () => () => ProductItemMock())

jest.mock('@/components/b2b/OrderSummaryEditable/OrderSummarySection/OrderSummarySection', () => ({
  __esModule: true,
  default: ({ setAdjustmentValue }: any) => (
    <div data-testid="OrderSummarySection-component">
      <button
        data-testid="setAdjustmentValue-button"
        onClick={() => setAdjustmentValue(100, 'adjustment')}
      >
        adjustment
      </button>
      <button
        data-testid="setShippingAdjustmentValue-button"
        onClick={() => setAdjustmentValue(200, 'shippingAdjustment')}
      >
        shippingAdjustment
      </button>
      <button
        data-testid="setHandlingAdjustmentValue-button"
        onClick={() => setAdjustmentValue(300, 'handlingAdjustment')}
      >
        handlingAdjustment
      </button>
    </div>
  ),
}))

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string, options?: { val: number | string }) =>
      key === 'currency' ? `$${options?.val}` : key,
  }),
}))

describe('[components] - OrderSummaryEditable', () => {
  it('should render component', async () => {
    renderWithQueryClient(<Common />)

    expect(screen.getByText('summary')).toBeVisible()

    expect(screen.getByRole('listitem', { name: 'duty-total' })).toBeVisible()
    expect(screen.getAllByTestId('OrderSummarySection-component').length).toBe(3)
  })

  it('should call onSave callback on saving adjustment changes', async () => {
    const onSaveMock = jest.fn()
    renderWithQueryClient(<Common onSave={onSaveMock} />)

    await user.click(screen.getByRole('button', { name: 'edit' }))

    user.click(screen.getAllByTestId('setAdjustmentValue-button')[0])
    user.click(screen.getAllByTestId('setShippingAdjustmentValue-button')[1])
    user.click(screen.getAllByTestId('setHandlingAdjustmentValue-button')[2])

    await user.click(screen.getByRole('button', { name: 'save' }))

    await waitFor(() => {
      expect(onSaveMock).toBeCalledWith({
        adjustment: 100,
        shippingAdjustment: 200,
        handlingAdjustment: 300,
      })
    })
  })
})
