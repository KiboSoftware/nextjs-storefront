import { composeStories } from '@storybook/testing-react'
import { render, within, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useTranslation } from 'next-i18next'

import * as stories from './ProductDetailTemplate.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

afterEach(cleanup)

const ColorSelectorMock = () => <div data-testid="color-selector-mock" />
jest.mock('../../product/ColorSelector/ColorSelector', () => ColorSelectorMock)

const ProductVariantSizeSelectorMock = () => <div data-testid="size-selector-mock" />
jest.mock(
  '../../product/ProductVariantSizeSelector/ProductVariantSizeSelector',
  () => ProductVariantSizeSelectorMock
)

const ProductOptionCheckboxMock = () => <div data-testid="product-option-checkbox-mock" />
jest.mock(
  '../../product/ProductOptionCheckbox/ProductOptionCheckbox',
  () => ProductOptionCheckboxMock
)

const ProductOptionSelectMock = () => <div data-testid="product-option-select-mock" />
jest.mock('../../product/ProductOptionSelect/ProductOptionSelect', () => ProductOptionSelectMock)

const ProductOptionTextBoxMock = () => <div data-testid="product-option-textbox-mock" />
jest.mock('../../product/ProductOptionTextBox/ProductOptionTextBox', () => ProductOptionTextBoxMock)

const QuantitySelectorMock = () => <div data-testid="quantity-selector-mock" />
jest.mock('../../common/QuantitySelector/QuantitySelector', () => QuantitySelectorMock)

const FulfillmentOptionsMock = () => <div data-testid="fulfillment-options-mock" />
jest.mock('../../common/FulfillmentOptions/FulfillmentOptions', () => FulfillmentOptionsMock)

const mockProduct = Common.args.product
jest.mock('@/hooks', () => ({
  useProductDetailTemplate: jest.fn(() => {
    return {
      currentProduct: mockProduct,
    }
  }),
}))

const setUp = () => {
  render(<Common {...Common.args} />)
}

describe('[component] Product Detail Template component', () => {
  it('should render the Breadcrumb component', () => {
    setUp()

    const breadcrumbList = screen.getByRole('list')

    const breadcrumbLinks = within(breadcrumbList).getAllByRole('link')

    expect(breadcrumbLinks.length).toBe(1)
  })

  it('should render the Product name', () => {
    setUp()

    const name = screen.getByRole('heading', {
      name: new RegExp(Common.args.product.content.productName),
    })

    expect(name).toBeVisible()
  })

  it('should render the Product price', () => {
    setUp()

    const { t } = useTranslation('common')

    const price = screen.getByText(
      new RegExp(t('currency', { val: Common.args.product.price.price }))
    )

    expect(price).toBeVisible()
  })

  it('should render the Product short description', () => {
    setUp()

    const desc = screen.getByTestId('short-description')

    expect(desc.innerHTML).toBe(Common.args.product.content.productShortDescription)
  })

  it('should render the Product rating', () => {
    setUp()

    const rating = screen.getAllByTestId('StarRoundedIcon')

    expect(rating.length).toBe(10)
  })

  it('should render the ColorSelector component', () => {
    setUp()

    const ColorSelector = screen.getByTestId('color-selector-mock')

    expect(ColorSelector).toBeVisible()
  })

  it('should render the ProductVariantSizeSelector', () => {
    setUp()

    const SizeSelector = screen.getByTestId('size-selector-mock')

    expect(SizeSelector).toBeVisible()
  })

  it('should render the ProductOptionSelect component', () => {
    setUp()

    const ProductOptionSelect = screen.getByTestId('product-option-select-mock')
    expect(ProductOptionSelect).toBeVisible()
  })

  it('should render the ProductOptionCheckbox component', () => {
    setUp()

    const ProductOptionCheckbox = screen.getByTestId('product-option-checkbox-mock')
    expect(ProductOptionCheckbox).toBeVisible()
  })

  it('should render the ProductOptionTextbox component', () => {
    setUp()

    const ProductOptionTextBox = screen.getByTestId('product-option-textbox-mock')
    expect(ProductOptionTextBox).toBeVisible()
  })

  it('should render the QuantitySelector component', () => {
    setUp()

    const QuantitySelector = screen.getByTestId('quantity-selector-mock')
    expect(QuantitySelector).toBeVisible()
  })

  it('should render the FulfillmentOptions component', () => {
    setUp()

    const FulfillmentOptions = screen.getByTestId('fulfillment-options-mock')
    expect(FulfillmentOptions).toBeVisible()
  })

  it('should render the Add to Cart Button', () => {
    setUp()

    const { t } = useTranslation('common')

    expect(
      screen.getByRole('button', {
        name: t('common:add-to-cart'),
      })
    ).toBeVisible()
  })

  it('should render the Add to Wishlist Button', () => {
    setUp()

    const { t } = useTranslation('common')

    expect(
      screen.getByRole('button', {
        name: t('common:add-to-wishlist'),
      })
    ).toBeVisible()
  })

  it('should render the 1 click checkout Button', () => {
    setUp()

    const { t } = useTranslation('common')

    expect(
      screen.getByRole('button', {
        name: t('common:one-click-checkout'),
      })
    ).toBeVisible()
  })
})
