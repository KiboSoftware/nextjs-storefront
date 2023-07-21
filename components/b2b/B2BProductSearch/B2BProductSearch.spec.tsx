import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getConfig from 'next/config'

import * as stories from './B2BProductSearch.stories'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'

const { Common } = composeStories(stories)

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
describe('[components] - B2BProductSearch', () => {
  const setup = () => {
    const user = userEvent.setup()
    renderWithQueryClient(<Common onAddProduct={onChangeMock} />)
    return {
      user,
      onChangeMock,
    }
  }

  it('should render component', async () => {
    setup()

    const textBox = screen.getByRole('textbox', { name: 'search-for-product' })

    expect(textBox).toBeVisible()
  })

  it('should verify whether searched products are displayed or not', async () => {
    const { user } = setup()

    const textBox = screen.getByRole('textbox', { name: 'search-for-product' })

    user.type(textBox, 'jacket')

    await waitFor(() => {
      const productItems = screen.queryAllByTestId(/product-item-component/i)
      expect(productItems.length).toBe(publicRuntimeConfig?.b2bProductSearchPageSize)
    })
  })

  it('should call handleChange callback function when user clicks on product item', async () => {
    const { user, onChangeMock } = setup()

    const textBox = screen.getByRole('textbox', { name: 'search-for-product' })

    user.type(textBox, 'shirt')

    await waitFor(() => {
      const productItems = screen.getAllByRole('button', { name: /Product Item/i })
      user.click(productItems[0])
    })
    await waitFor(() => {
      expect(onChangeMock).toBeCalled()
    })
  })
})
