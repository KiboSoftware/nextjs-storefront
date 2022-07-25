import { composeStories } from '@storybook/testing-react'
import { render, within, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import * as stories from './ProductDetailTemplate.stories' // import all stories from the stories file
import { userResponseMock } from '@/__mocks__/stories/userMock'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'

const { Common } = composeStories(stories)

afterEach(cleanup)

const ColorSelectorMock = () => <div data-testid="color-selector-mock" />
jest.mock('@/components/product/ColorSelector/ColorSelector', () => ColorSelectorMock)

const ProductVariantSizeSelectorMock = () => <div data-testid="size-selector-mock" />
jest.mock(
  '@/components/product/ProductVariantSizeSelector/ProductVariantSizeSelector',
  () => ProductVariantSizeSelectorMock
)

const ProductOptionCheckboxMock = () => <div data-testid="product-option-checkbox-mock" />
jest.mock(
  '@/components/product/ProductOptionCheckbox/ProductOptionCheckbox',
  () => ProductOptionCheckboxMock
)

const ProductOptionSelectMock = () => <div data-testid="product-option-select-mock" />
jest.mock(
  '@/components/product/ProductOptionSelect/ProductOptionSelect',
  () => ProductOptionSelectMock
)

const ProductOptionTextBoxMock = () => <div data-testid="product-option-textbox-mock" />
jest.mock(
  '@/components/product/ProductOptionTextBox/ProductOptionTextBox',
  () => ProductOptionTextBoxMock
)

const QuantitySelectorMock = () => <div data-testid="quantity-selector-mock" />
jest.mock('@/components/common/QuantitySelector/QuantitySelector', () => QuantitySelectorMock)

const FulfillmentOptionsMock = () => <div data-testid="fulfillment-options-mock" />
jest.mock('@/components/common/FulfillmentOptions/FulfillmentOptions', () => FulfillmentOptionsMock)

const ProductInformationMock = () => <div data-testid="product-information-mock" />
jest.mock(
  '@/components/product/ProductInformation/ProductInformation',
  () => ProductInformationMock
)

const mockProduct = Common?.args?.product
const mockWishlist = wishlistMock?.items[0]
const mockUser = userResponseMock
jest.mock('@/hooks', () => ({
  useProductDetailTemplate: jest.fn(() => {
    return {
      currentProduct: mockProduct,
    }
  }),
  useCartMutation: jest.fn(() => {
    return {
      addToCart: mockProduct,
    }
  }),
  useUserQueries: jest.fn(() => {
    return {
      customerAccount: mockUser,
    }
  }),
  useWishlistQueries: jest.fn(() => mockWishlist),
  useAddToWishlistMutation: jest.fn(() => mockWishlist?.items[0]),
  useRemoveWishlistItemMutation: jest.fn(() => true),
  usePurchaseLocation: jest.fn(() => ({})),
  useModalContext: jest.fn(() => ({})),
}))

const setup = () => {
  render(<Common {...Common?.args} />)
}

describe('[component] Product Detail Template component', () => {
  it('should render the Breadcrumb component', () => {
    setup()

    const breadcrumbList = screen.getByRole('list')

    const breadcrumbLinks = within(breadcrumbList).getAllByRole('link')

    expect(breadcrumbLinks.length).toBe(1)
  })

  it('should render the Product name', () => {
    setup()

    const name = screen.getByRole('heading', {
      name: new RegExp(Common?.args?.product?.content?.productName as string),
    })

    expect(name).toBeVisible()
  })

  it('should render the Product price', () => {
    setup()

    const price = screen.getByText(/currency/i)

    expect(price).toBeVisible()
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

  it('should render the FulfillmentOptions component', () => {
    setup()

    const FulfillmentOptions = screen.getByTestId('fulfillment-options-mock')
    expect(FulfillmentOptions).toBeVisible()
  })

  it('should render the Add to Cart Button', () => {
    setup()

    expect(
      screen.getByRole('button', {
        name: 'common:add-to-cart',
      })
    ).toBeVisible()
  })

  it('should render the Add to Wishlist Button', () => {
    setup()

    expect(
      screen.getByRole('button', {
        name: 'common:add-to-wishlist',
      })
    ).toBeVisible()
  })

  it('should render the 1 click checkout Button', () => {
    setup()

    expect(
      screen.getByRole('button', {
        name: 'common:one-click-checkout',
      })
    ).toBeVisible()
  })

  it('should render ProductInformation component', () => {
    setup()

    expect(screen.getByTestId('product-information-mock')).toBeVisible()
  })
})
