import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, within, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductDetailTemplate.stories' // import all stories from the stories file
import {
  locationCollectionMock,
  locationInventoryCollectionMock,
  userResponseMock,
  wishlistMock,
  productSearchResultMock,
  fulfillmentOptionsMock,
} from '@/__mocks__/stories'
import { productPriceMock } from '@/__mocks__/stories/productPriceMock'

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

const mockProduct = Common?.args?.product
const mockWishlist = wishlistMock?.items[0]
const { id, name, customerAccountId } = mockWishlist
const mockCreateWishlist = { createWishlist: { id, name, customerAccountId, items: [] } }
const mockUser = userResponseMock
const mockProductSearch = productSearchResultMock
const mockLocationsResponse = locationCollectionMock.spLocations
const mockInventory = locationInventoryCollectionMock
const mockProductPrice = productPriceMock

jest.mock('@/hooks', () => ({
  useProductDetailTemplate: jest.fn(() => {
    return {
      currentProduct: mockProduct,
    }
  }),
  useAddToCartMutation: jest.fn(() => {
    return {
      addToCart: mockProduct,
    }
  }),
  useUserQueries: jest.fn(() => {
    return {
      customerAccount: mockUser,
    }
  }),
  useWishlist: jest.fn(() => {
    return {
      addOrRemoveWishlistItem: jest.fn(() => true),
      checkProductInWishlist: jest.fn(() => true),
    }
  }),
  useWishlistQueries: jest.fn(() => mockWishlist),
  useCreateWishlistMutation: jest.fn(() => mockCreateWishlist),
  useAddToWishlistMutation: jest.fn(() => mockWishlist?.items[0]),
  useRemoveWishlistItemMutation: jest.fn(() => true),
  usePurchaseLocationQueries: jest.fn(() => ({})),
  useModalContext: jest.fn(() => ({})),
  useProductsQueries: jest.fn(() => mockProductSearch),
  useStoreLocationsQueries: jest.fn(() => ({ mockLocationsResponse })),
  useProductLocationInventoryQueries: jest.fn(() => mockInventory),
  usePriceRangeFormatter: jest.fn(() => '$100 - $200'),
  useProductPriceQueries: jest.fn(() => ({ mockProductPrice })),
}))

const setup = () => {
  render(<Common {...Common?.args} />)
}

jest.unmock('next/link')
describe('[component] Product Detail Template component', () => {
  it('should render the Breadcrumb component', () => {
    setup()

    const breadcrumbList = screen.getByRole('list')

    const breadcrumbLinks = within(breadcrumbList).getAllByRole('link')

    expect(breadcrumbLinks.length).toBe(1)
  })

  it('should render the Product name', () => {
    setup()

    const productName = screen.getByRole('heading', {
      name: new RegExp(Common?.args?.product?.content?.productName as string),
    })

    expect(productName).toBeVisible()
  })

  it('should render the Product short description', () => {
    setup()

    const desc = screen.getByTestId('short-description')

    expect(desc.innerHTML).toBe(Common?.args?.product?.content?.productShortDescription)
  })

  it('should render the Product rating', () => {
    setup()

    const rating = screen.getAllByTestId('StarRoundedIcon')

    expect(rating.length).toBe(10)
  })

  it('should render the ColorSelector component', () => {
    setup()

    const ColorSelector = screen.getByTestId('color-selector-mock')

    expect(ColorSelector).toBeVisible()
  })

  it('should render the ProductVariantSizeSelector', () => {
    setup()

    const SizeSelector = screen.getByTestId('size-selector-mock')

    expect(SizeSelector).toBeVisible()
  })

  it('should render the ProductOptionSelect component', () => {
    setup()

    const ProductOptionSelect = screen.getByTestId('product-option-select-mock')
    expect(ProductOptionSelect).toBeVisible()
  })

  it('should render the ProductOptionCheckbox component', () => {
    setup()

    const ProductOptionCheckbox = screen.getByTestId('product-option-checkbox-mock')
    expect(ProductOptionCheckbox).toBeVisible()
  })

  it('should render the ProductOptionTextbox component', () => {
    setup()

    const ProductOptionTextBox = screen.getByTestId('product-option-textbox-mock')
    expect(ProductOptionTextBox).toBeVisible()
  })

  it('should render the QuantitySelector component', () => {
    setup()

    const QuantitySelector = screen.getByTestId('quantity-selector-mock')
    expect(QuantitySelector).toBeVisible()
  })

  it('should render the fulfillment Options', () => {
    setup()
    const mockFulfillmentOptions = fulfillmentOptionsMock || []

    const sthBtn = screen.getByRole('radio', {
      name: new RegExp(`${mockFulfillmentOptions[0]?.shortName}`),
    })
    const pickupBtn = screen.getByRole('radio', {
      name: new RegExp(`${mockFulfillmentOptions[1]?.shortName}`),
    })
    expect(sthBtn).toBeInTheDocument()
    expect(pickupBtn).toBeInTheDocument()
  })

  it('should render the Add to Cart Button', () => {
    setup()

    expect(
      screen.getByRole('button', {
        name: 'add-to-cart',
      })
    ).toBeVisible()
  })

  it('should render the Add to Wishlist Button', () => {
    setup()

    expect(
      screen.getByRole('button', {
        name: 'add-to-wishlist',
      })
    ).toBeVisible()
  })

  it('should render the 1 click checkout Button', () => {
    setup()

    expect(
      screen.getByRole('button', {
        name: 'one-click-checkout',
      })
    ).toBeVisible()
  })

  it('should render ProductInformation component', () => {
    setup()

    expect(screen.getByTestId('product-information-mock')).toBeVisible()
  })

  it('should not render moredetails link', () => {
    setup()

    const moreDetails = screen.queryByRole('link', {
      name: /more-details/i,
    })
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
