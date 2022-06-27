import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ProductCustomMock } from '@/__mocks__/stories/ProductCustomMock'
import * as stories from '@/components/page-templates/ProductDetail/ProductDetailTemplate.stories' // import all stories from the stories file
import { productGetters } from '@/lib/getters'

const { Common } = composeStories(stories)

const mockedProduct = ProductCustomMock

const setup = () => {
  render(<Common {...Common.args} />)
}

describe('[component] - ProductDetailTemplate integration', () => {
  it('should handle quantity selector', () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'quantity' })

    const increaseButton = screen.getByRole('button', { name: 'increase' })

    userEvent.click(increaseButton)

    expect(input).toHaveValue('2')

    const decreaseButton = screen.getByRole('button', { name: 'decrease' })

    userEvent.click(decreaseButton)

    expect(input).toHaveValue('1')
  })

  it('should show all the Product Properties', () => {
    setup()

    const { properties } = productGetters.getProductDetails(mockedProduct)

    const accordian = screen.getByTestId('accordian')
    userEvent.click(accordian)

    properties?.map((prop) => {
      expect(screen.getByText(new RegExp(prop.name as string))).toBeVisible()
      expect(screen.getAllByText(new RegExp(prop.value as string))[0]).toBeVisible()
    })
  })

  it('should handle Color Selector', async () => {
    setup()

    const { productOptions } = productGetters.getProductDetails(mockedProduct)

    if (productOptions?.colourOptions?.values) {
      const colorOption = productOptions?.colourOptions?.values[0]?.value
      const option = screen.getByTestId(new RegExp(`colorvalue-${colorOption}`))
      userEvent.click(option)

      await waitFor(() => {
        expect(screen.getByTestId(new RegExp(`colorvalue-${colorOption}-selected`))).toBeVisible()
      })
    }
  })

  it('should handle ProductVariantSizeSelector', async () => {
    setup()

    const { productOptions } = productGetters.getProductDetails(mockedProduct)

    const sizeOption = screen.getByText(
      productOptions?.sizeOptions?.values && productOptions?.sizeOptions?.values[0]?.value
    )

    userEvent.click(sizeOption)

    await waitFor(() => {
      expect(screen.getByTestId(new RegExp(`size-options-${sizeOption}-selected`))).toBeVisible()
    })
  })

  it('should handle ProductOptionSelect', async () => {
    setup()

    const { productOptions } = productGetters.getProductDetails(mockedProduct)

    const mockOption =
      productOptions?.selectOptions &&
      productOptions?.selectOptions[0]?.values &&
      productOptions?.selectOptions[0]?.values[0]?.value

    const ProductOptionSelect = screen.getByRole('button', { name: 'select-product-option' })

    fireEvent.mouseDown(ProductOptionSelect)

    const listbox = within(screen.getByRole('listbox'))

    userEvent.click(listbox.getByText(mockOption))

    await waitFor(() => {
      expect(ProductOptionSelect).toHaveTextContent(mockOption)
    })
  }, 10000)

  it('should handle ProductOptionTextbox', async () => {
    setup()

    const { productOptions } = productGetters.getProductDetails(mockedProduct)

    const textbox = screen.getByRole('textbox', {
      name: productOptions?.textBoxOptions[0]?.attributeDetail?.name as string,
    })

    userEvent.type(textbox, 'Test')
    userEvent.tab()

    await waitFor(() => {
      expect(textbox).toHaveValue('Test')
    })
  }, 10000)

  it('should handle ProductOptionCheckbox', async () => {
    setup()

    const checkbox = within(screen.getByTestId('kibo-product-option-checkbox')).getByRole(
      'checkbox'
    )

    expect(checkbox).not.toBeChecked()

    userEvent.click(checkbox)

    await waitFor(() => {
      expect(checkbox).toBeChecked()
    })
  })
})
