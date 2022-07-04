import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor, fireEvent, within, act, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ProductCustomMock } from '@/__mocks__/stories/ProductCustomMock'
import * as stories from '@/components/page-templates/ProductDetail/ProductDetailTemplate.stories' // import all stories from the stories file
import { DialogRoot, ModalContextProvider } from '@/context'
import { productGetters } from '@/lib/getters'

const { Common } = composeStories(stories)

const mockedProduct = ProductCustomMock

const setup = () => {
  const user = userEvent.setup()
  render(
    <ModalContextProvider>
      <DialogRoot />
      <Common {...Common.args} />
    </ModalContextProvider>
  )

  return {
    user,
  }
}

afterEach(() => {
  cleanup()
})

describe('[component] - ProductDetailTemplate integration', () => {
  it('should handle quantity selector ', async () => {
    const { user } = setup()

    const input = screen.getByRole('textbox', { name: 'quantity' })
    const increaseButton = screen.getByRole('button', { name: 'increase' })

    await user.click(increaseButton)

    await waitFor(() => {
      expect(input).toHaveValue('2')
    })
  })

  it('should show all the Product Properties', async () => {
    const { user } = setup()

    const { properties } = productGetters.getProductDetails(mockedProduct)

    const accordian = screen.getByTestId('accordian')
    await user.click(accordian)

    properties?.map((prop) => {
      expect(screen.getByText(new RegExp(prop.name as string))).toBeVisible()
      expect(screen.getAllByText(new RegExp(prop.value as string))[0]).toBeVisible()
    })
  })

  it('should handle Color Selector', async () => {
    const { user } = setup()

    const { productOptions } = productGetters.getProductDetails(mockedProduct)

    if (productOptions?.colourOptions?.values) {
      const colorOption = productOptions?.colourOptions?.values[0]?.value
      const option = screen.getByTestId(new RegExp(`colorvalue-${colorOption}`))
      await user.click(option)

      await waitFor(() => {
        expect(screen.getByTestId(new RegExp(`colorvalue-${colorOption}-selected`))).toBeVisible()
      })
    }
  })

  it('should handle ProductVariantSizeSelector', async () => {
    const { user } = setup()

    const { productOptions } = productGetters.getProductDetails(mockedProduct)

    const sizeOption = screen.getByText(
      productOptions?.sizeOptions?.values && productOptions?.sizeOptions?.values[0]?.value
    )

    await user.click(sizeOption)

    await waitFor(() => {
      expect(screen.getByTestId(new RegExp(`size-options-${sizeOption}-selected`))).toBeVisible()
    })
  })

  it('should handle ProductOptionSelect', async () => {
    const { user } = setup()

    const { productOptions } = productGetters.getProductDetails(mockedProduct)

    const mockOption =
      productOptions?.selectOptions &&
      productOptions?.selectOptions[0]?.values &&
      productOptions?.selectOptions[0]?.values[0]?.value

    const ProductOptionSelect = screen.getByRole('button', { name: 'select-product-option' })

    fireEvent.mouseDown(ProductOptionSelect)

    const listbox = within(screen.getByRole('listbox'))

    await user.click(listbox.getByText(mockOption))
    await waitFor(() => {
      expect(ProductOptionSelect).toHaveTextContent(mockOption)
    })
  })

  it('should handle ProductOptionTextbox', async () => {
    const { user } = setup()

    const { productOptions } = productGetters.getProductDetails(mockedProduct)

    const textbox = screen.getByRole('textbox', {
      name: productOptions?.textBoxOptions[0]?.attributeDetail?.name as string,
    })

    await user.type(textbox, 'Test')

    await user.tab()

    await waitFor(() => {
      expect(textbox).toHaveValue('Test')
    })
  })

  it('should handle ProductOptionCheckbox', async () => {
    const { user } = setup()

    const checkbox = within(screen.getByTestId('kibo-product-option-checkbox')).getByRole(
      'checkbox'
    )

    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)

    await waitFor(() => {
      expect(checkbox).toBeChecked()
    })
  })

  it('should handle adding item to cart', async () => {
    const { user } = setup()

    const addToCartButton = screen.getByRole('button', {
      name: /common:add-to-cart/i,
    })

    await user.click(addToCartButton)

    const view = screen.getByTestId('title-component')

    const dialogHeader = within(view).getByRole('heading', {
      name: /added-to-cart/i,
    })

    expect(dialogHeader).toBeVisible()
  })
})
