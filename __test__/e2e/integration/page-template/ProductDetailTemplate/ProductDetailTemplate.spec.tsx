import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { screen, waitFor, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as cookienext from 'cookies-next'
import { graphql } from 'msw'

import { server } from '@/__mocks__/msw/server'
import { fulfillmentOptionsMock } from '@/__mocks__/stories/fulfillmentOptionsMock'
import { ProductCustomMock } from '@/__mocks__/stories/ProductCustomMock'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import * as stories from '@/components/page-templates/ProductDetail/ProductDetailTemplate.stories' // import all stories from the stories file
import { DialogRoot, ModalContextProvider } from '@/context'
import { productGetters } from '@/lib/getters'

const { Common, WithSubscription } = composeStories(stories)
const mockedProduct = ProductCustomMock
const mockFulfillmentOptions = fulfillmentOptionsMock || []

const setup = () => {
  const user = userEvent.setup()
  renderWithQueryClient(
    <ModalContextProvider>
      <DialogRoot />
      <Common {...Common.args} />
    </ModalContextProvider>
  )

  return {
    user,
  }
}

let mockIsAuthenticated = true
jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => ({ isAuthenticated: mockIsAuthenticated }),
}))

describe('[component] - ProductDetailTemplate integration', () => {
  it('should handle quantity selector ', async () => {
    const { user } = setup()

    const input = screen.getByRole('textbox', { name: 'quantity' })
    expect(input).toHaveValue('1')

    const increaseButton = screen.getByRole('button', { name: 'increase' })

    await user.click(increaseButton)

    const newInput = screen.getByRole('textbox', { name: 'quantity' })
    await waitFor(() => {
      expect(newInput).toHaveValue('2')
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

    const mockOptionName =
      productOptions?.selectOptions &&
      productOptions?.selectOptions[0]?.attributeDetail &&
      productOptions?.selectOptions[0]?.attributeDetail.name

    const ProductOptionSelect = screen.getByRole('button', { name: mockOptionName as string })

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

  it('should add ship to home item to cart', async () => {
    const { user } = setup()

    const shipRadio = screen.getByRole('radio', {
      name: new RegExp(`${mockFulfillmentOptions[0]?.shortName}`),
    })

    await user.click(shipRadio)
    expect(shipRadio).toBeChecked()

    const addToCartButton = screen.getByRole('button', {
      name: /add-to-cart/i,
    })

    await user.click(addToCartButton)

    await waitFor(() => {
      expect(screen.getByTestId('title-component')).toBeVisible()
    })

    const view = screen.getByTestId('title-component')

    const dialogHeader = within(view).getByRole('heading', {
      name: /added-to-cart/i,
    })

    expect(dialogHeader).toBeVisible()
  })

  it('should add item to cart for one-time purchase option if subscription is enabled', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(
      <ModalContextProvider>
        <DialogRoot />
        <WithSubscription {...WithSubscription?.args} />
      </ModalContextProvider>
    )

    const onetimePurchaseBtn = screen.getByRole('radio', { name: /one\-time purchase/i })
    await user.click(onetimePurchaseBtn)
    expect(onetimePurchaseBtn).toBeChecked()

    const shipRadio = screen.getByRole('radio', {
      name: /Ship/i,
    })
    await user.click(shipRadio)

    const addToCartButton = await screen.findByRole('button', {
      name: /add-to-cart/i,
    })
    await user.click(addToCartButton)

    const dialogHeader = within(screen.getByTestId('title-component')).getByRole('heading', {
      name: /added-to-cart/i,
    })
    expect(dialogHeader).toBeVisible()
  })

  it('should add ship to home item to cart for subscription option if subscription is enabled', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(
      <ModalContextProvider>
        <DialogRoot />
        <WithSubscription {...WithSubscription?.args} />
      </ModalContextProvider>
    )

    const subscriptionRadio = screen.getByRole('radio', { name: /subscription/i })
    await user.click(subscriptionRadio)
    expect(subscriptionRadio).toBeChecked()

    const selectButton = await screen.findByLabelText(/subscription-frequency/i)
    expect(selectButton).toBeVisible()
    await user.click(selectButton)

    const listbox = within(screen.getByRole('listbox'))
    expect(listbox.getByRole('option', { name: '45 Days' })).toBeVisible()
    await user.click(listbox.getByText(/45 Days/i))
    await user.tab()

    const addToCartButton = await screen.findByRole('button', {
      name: /add-to-cart/i,
    })
    await user.click(addToCartButton)
    const dialogHeader = within(screen.getByTestId('title-component')).getByRole('heading', {
      name: /added-to-cart/i,
    })
    expect(dialogHeader).toBeVisible()
  })

  it('should show store selector dialog if selecting pickup radio and location is not set', async () => {
    const { user } = setup()

    const pickupRadio = screen.getByRole('radio', {
      name: new RegExp(`${mockFulfillmentOptions[1].shortName}`),
    })

    await user.click(pickupRadio)

    const selectStore = screen.queryAllByText('select-store')

    await waitFor(() => expect(selectStore[0]).toBeInTheDocument())

    expect(pickupRadio).not.toBeChecked()
  })

  it('should add pickup item to cart if pickup location is set', async () => {
    cookienext.setCookie('kibo_purchase_location', 'IlJJQ0hNT05EIg==')

    const { user } = setup()

    const pickupRadio = await screen.findByRole('radio', {
      name: new RegExp(`${mockFulfillmentOptions[1].shortName}`),
    })

    await user.click(pickupRadio)

    await waitFor(() => expect(pickupRadio).toBeChecked())

    const addToCartButton = screen.getByRole('button', {
      name: /add-to-cart/i,
    })

    expect(addToCartButton).toBeEnabled()

    cookienext.deleteCookie('kibo_purchase_location')
  }, 50000)

  it('should display login when add to wishlist button clicks ', async () => {
    mockIsAuthenticated = false
    const { user } = setup()

    const addToWishlistButton = screen.getByRole('button', {
      name: 'add-to-wishlist',
    })

    await user.click(addToWishlistButton)

    const title = screen.getAllByText('log-in')[0]

    expect(title).toBeVisible()
  })

  it('should open wishlist popover when logged in user clicks on add to wishlist button', async () => {
    mockIsAuthenticated = true
    const { user } = setup()

    const addToWishlistButton = screen.getByRole('button', {
      name: 'add-to-wishlist',
    })

    await user.click(addToWishlistButton)
    const popover = await screen.findByTestId('wishlist-component')
    await waitFor(() => expect(popover).toBeInTheDocument())
  })

  it('should throw error on add to cart', async () => {
    server.resetHandlers(
      graphql.mutation('addToCart', (_req, res, ctx) => {
        return res(ctx.status(403))
      }),
      graphql.query('cart', (_req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const { user } = setup()
    const shipRadio = screen.getByRole('radio', {
      name: new RegExp(`${mockFulfillmentOptions[0].shortName}`),
    })

    await user.click(shipRadio)
    expect(shipRadio).toBeChecked()

    const addToCartButton = screen.getByRole('button', {
      name: /add-to-cart/i,
    })
    await user.click(addToCartButton)

    const view = screen.queryByTestId('title-component')
    expect(view).not.toBeInTheDocument()
  })
})
