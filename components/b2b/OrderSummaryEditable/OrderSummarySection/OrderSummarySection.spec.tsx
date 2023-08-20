import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getConfig from 'next/config'

import * as stories from './OrderSummarySection.stories'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'

const { Common, EditMode } = composeStories(stories)

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

const onChangeMock = jest.fn()
const { publicRuntimeConfig } = getConfig()

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string, options?: { val: number | string }) =>
      key === 'currency' ? `$${options?.val}` : key,
  }),
}))

describe('[components] - OrderSummaryEditable', () => {
  it('should render component in view mode', async () => {
    renderWithQueryClient(<Common />)

    const accordionButton = screen.getByRole('button', {
      name: `titleTotal $${Common?.args?.total?.toString()}`,
    })

    expect(accordionButton).toBeVisible()

    await user.click(accordionButton)

    expect(screen.getByRole('listitem', { name: 'subTotal' })).toBeVisible()
    expect(screen.getByRole('listitem', { name: 'adjustment' })).toBeVisible()
    expect(screen.getByRole('listitem', { name: 'tax' })).toBeVisible()
  })

  it('should render component in edit mode', async () => {
    renderWithQueryClient(<EditMode />)

    expect(screen.getByRole('listitem', { name: 'subTotal' })).toBeVisible()
    expect(screen.getByRole('listitem', { name: 'adjustment' })).toBeVisible()
    expect(screen.getByRole('listitem', { name: 'tax' })).toBeVisible()

    expect(screen.getByRole('textbox', { name: 'adjustment-input' })).toBeVisible()
    expect(screen.getByRole('radiogroup', { name: 'adjustment-type' })).toBeVisible()
  })

  it('should call onSave callback on saving adjustment changes', async () => {
    const setAdjustmentValueMock = jest.fn()
    renderWithQueryClient(<EditMode setAdjustmentValue={setAdjustmentValueMock} />)

    const itemAdjustmentTextBox = screen.getAllByRole('textbox', { name: 'adjustment-input' })[0]
    const itemAmountAdjustmentRadio = screen.getAllByRole('radio', { name: 'amount' })[0]
    const itemPercentageAdjustmentRadio = screen.getAllByRole('radio', { name: 'percentage' })[0]

    const adjustMentSelect = screen.getAllByRole('button', { name: 'adjustment' })[0]

    expect(itemAmountAdjustmentRadio).toBeChecked()
    expect(itemPercentageAdjustmentRadio).not.toBeChecked()
    expect(adjustMentSelect).toBeVisible()

    const adjustmentProp = EditMode.args?.adjustment?.toString() as string
    const subtotalProp = EditMode.args?.subTotal?.toString() as string

    expect(screen.getAllByRole('listitem', { name: 'adjustment' })[0]).toHaveTextContent(
      adjustmentProp
    )

    await user.type(itemAdjustmentTextBox, '50')

    await waitFor(() => {
      expect(setAdjustmentValueMock).toHaveBeenLastCalledWith(-50)
    })

    await user.click(itemPercentageAdjustmentRadio)

    await waitFor(() => {
      expect(setAdjustmentValueMock).toHaveBeenLastCalledWith(-parseInt(subtotalProp) * (50 / 100))
    })

    fireEvent.mouseDown(adjustMentSelect)

    const listbox = within(screen.getByRole('listbox'))

    fireEvent.click(listbox.getByText(/Add to Item Subtotal/i))

    expect(itemAdjustmentTextBox).toHaveValue('')

    await user.type(itemAdjustmentTextBox, '200')

    await waitFor(() => {
      expect(setAdjustmentValueMock).toHaveBeenLastCalledWith(parseInt(subtotalProp) * (200 / 100))
    })
  })
})
