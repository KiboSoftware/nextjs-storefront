import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, within, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductDetailTemplate.stories' // import all stories from the stories file
import { wishlistMock, fulfillmentOptionsMock } from '@/__mocks__/stories'

const { Common, WithMoreDetails, WithSubscription } = composeStories(stories)

const user = userEvent.setup()

const ColorSelectorMock = () => <div data-testid="color-selector-mock" />
jest.mock('@/components/product/ColorSelector/ColorSelector', () => () => ColorSelectorMock())

const ProductVariantSizeSelectorMock = () => <div data-testid="size-selector-mock" />
jest.mock(
  '@/components/product/ProductVariantSizeSelector/ProductVariantSizeSelector',
  () => () => ProductVariantSizeSelectorMock()
)

const ProductOptionCheckboxMock = () => <div data-testid="product-option-checkbox-mock" />
jest.mock(
  '@/components/product/ProductOptionCheckbox/ProductOptionCheckbox',
  () => () => ProductOptionCheckboxMock()
)

const ProductOptionSelectMock = () => <div data-testid="product-option-select-mock" />
jest.mock(
  '@/components/product/ProductOptionSelect/ProductOptionSelect',
  () => () => ProductOptionSelectMock()
)

const ProductOptionTextBoxMock = () => <div data-testid="product-option-textbox-mock" />
jest.mock(
  '@/components/product/ProductOptionTextBox/ProductOptionTextBox',
  () => () => ProductOptionTextBoxMock()
)

const QuantitySelectorMock = () => <div data-testid="quantity-selector-mock" />
jest.mock(
  '@/components/common/QuantitySelector/QuantitySelector',
  () => () => QuantitySelectorMock()
)

const ProductInformationMock = () => <div data-testid="product-information-mock" />
jest.mock(
  '@/components/product/ProductInformation/ProductInformation',
  () => () => ProductInformationMock()
)

const mockWishlist = wishlistMock?.items[0]

const setup = () => {
  render(<Common {...Common?.args} />)
}

jest.unmock('next/link')
describe('[component] Product Detail Template component', () => {
  it('should render component', () => {
    setup()

    const breadcrumbList = screen.getByRole('list')
    const breadcrumbLinks = within(breadcrumbList).getAllByRole('link')
    const productName = screen.getByRole('heading', {
      name: new RegExp(Common?.args?.product?.content?.productName as string),
    })
    const desc = screen.getByTestId('short-description')
    const rating = screen.getAllByTestId('StarRoundedIcon')
    const ColorSelector = screen.getByTestId('color-selector-mock')
    const SizeSelector = screen.getByTestId('size-selector-mock')
    const ProductOptionSelect = screen.getByTestId('product-option-select-mock')
    const ProductOptionCheckbox = screen.getByTestId('product-option-checkbox-mock')
    const ProductOptionTextBox = screen.getByTestId('product-option-textbox-mock')
    const QuantitySelector = screen.getByTestId('quantity-selector-mock')
    const mockFulfillmentOptions = fulfillmentOptionsMock || []
    const sthBtn = screen.getByRole('radio', {
      name: new RegExp(`${mockFulfillmentOptions[0]?.shortName}`),
    })
    const pickupBtn = screen.getByRole('radio', {
      name: new RegExp(`${mockFulfillmentOptions[1]?.shortName}`),
    })
    const moreDetails = screen.queryByRole('link', {
      name: /more-details/i,
    })

    expect(breadcrumbLinks.length).toBe(1)
    expect(productName).toBeVisible()
    expect(desc.innerHTML).toBe(Common?.args?.product?.content?.productShortDescription)
    expect(rating.length).toBe(10)
    expect(ColorSelector).toBeVisible()
    expect(SizeSelector).toBeVisible()
    expect(ProductOptionSelect).toBeVisible()
    expect(ProductOptionCheckbox).toBeVisible()
    expect(ProductOptionTextBox).toBeVisible()
    expect(QuantitySelector).toBeVisible()
    expect(sthBtn).toBeInTheDocument()
    expect(pickupBtn).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'add-to-cart',
      })
    ).toBeVisible()
    expect(
      screen.getByRole('button', {
        name: 'add-to-wishlist',
      })
    ).toBeVisible()
    expect(
      screen.getByRole('button', {
        name: 'one-click-checkout',
      })
    ).toBeVisible()
    expect(screen.getByTestId('product-information-mock')).toBeVisible()
    expect(moreDetails).not.toBeInTheDocument()
  })

  it('should  render moredetails link', () => {
    render(<WithMoreDetails {...WithMoreDetails.args} isQuickViewModal={true} />)
    const moreDetail = screen.queryByRole('link', {
      name: /more-details/i,
    })

    expect(moreDetail).toBeInTheDocument()
  })

  it('should be selected one-time purchase option by default and fulfillment option should be visible', async () => {
    render(<WithSubscription {...WithSubscription?.args} />)

    const onetimePurchaseBtn = screen.getByRole('radio', { name: /one\-time purchase/i })
    const subscriptionBtn = screen.getByRole('radio', { name: /subscription/i })
    expect(onetimePurchaseBtn).toBeInTheDocument()
    expect(subscriptionBtn).toBeInTheDocument()
    expect(onetimePurchaseBtn).toBeChecked()
    const fulfillmentOptions = screen.getByText(/fulfillment-options/i)
    expect(fulfillmentOptions).toBeInTheDocument()
  })

  it('should select subscription option and display subscription frequency, hide the fulfillment option', async () => {
    render(<WithSubscription {...WithSubscription?.args} />)
    const subscriptionBtn = screen.getByRole('radio', { name: /subscription/i })
    await user.click(subscriptionBtn)
    expect(subscriptionBtn).toBeChecked()

    const selectButton = await screen.findByLabelText(/subscription-frequency/i)
    expect(selectButton).toBeVisible()
    await user.click(selectButton)

    const listbox = within(screen.getByRole('listbox'))
    expect(listbox.getByRole('option', { name: '45 Days' })).toBeVisible()

    const fulfillmentOptions = screen.queryByText(/fulfillment-options/i)
    expect(fulfillmentOptions).not.toBeInTheDocument()
  })
})
