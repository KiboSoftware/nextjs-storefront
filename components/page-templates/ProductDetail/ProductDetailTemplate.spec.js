import { composeStories } from '@storybook/testing-react'
import { render, within, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useTranslation } from 'next-i18next'

import * as stories from './ProductDetailTemplate.stories' // import all stories from the stories file

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
  '@/components/product/ProductOptionTextbox/ProductOptionTextbox',
  () => ProductOptionTextBoxMock
)

const QuantitySelectorMock = () => <div data-testid="quantity-selector-mock" />
jest.mock('@/components/common/QuantitySelector/QuantitySelector', () => QuantitySelectorMock)

const FulfillmentOptionsMock = () => <div data-testid="fulfillment-options-mock" />
jest.mock('@/components/common/FulfillmentOptions/FulfillmentOptions', () => FulfillmentOptionsMock)

describe('[component] Product Detail Template component', () => {
  it('should render the Breadcrumb component', () => {
    render(<Common {...Common.args} />)
    const breadcrumbList = screen.getByRole('list')

    const breadcrumbLinks = within(breadcrumbList).getAllByRole('link')

    expect(breadcrumbLinks.length).toBe(3)
  })

  it('should render the Product name', () => {
    render(<Common {...Common.args} />)

    const name = screen.getByRole('heading', {
      name: new RegExp(Common.args.product.content.productName),
    })

    expect(name).toBeVisible()
  })

  it('should render the Product price', () => {
    render(<Common {...Common.args} />)

    const { t } = useTranslation('common')

    const price = screen.getByText(
      new RegExp(t('currency', { val: Common.args.product.price.price }))
    )

    expect(price).toBeVisible()
  })

  // it('should render the Product short description', () => {
  //   render(<Common {...Common.args} />)

  //   const desc = screen.getByText(
  //     new RegExp(Common.args.product.content.productShortDescription)
  //   )

  //   expect(desc).toBeVisible()
  // })

  it('should render the Product rating', () => {
    render(<Common {...Common.args} />)

    const rating = screen.getAllByTestId('StarRoundedIcon')

    expect(rating.length).toBe(10)
  })

  it('should render the ColorSelector component', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('color-selector-mock')).toBeVisible()
  })

  it('should render the ProductVariantSizeSelector', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('size-selector-mock')).toBeVisible()
  })

  it('should render the ProductOptionSelect component', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('product-option-select-mock')).toBeVisible()
  })

  it('should render the ProductOptionCheckbox component', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('product-option-checkbox-mock')).toBeVisible()
  })

  it('should render the QuantitySelector component', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('quantity-selector-mock')).toBeVisible()
  })

  it('should render the FulfillmentOptions component', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('fulfillment-options-mock')).toBeVisible()
  })

  it('should render the Add to Cart Button', () => {
    render(<Common {...Common.args} />)
    const { t } = useTranslation('common')

    expect(
      screen.getByRole('button', {
        name: t('common:add-to-cart'),
      })
    ).toBeVisible()
  })

  it('should render the Add to Wishlist Button', () => {
    render(<Common {...Common.args} />)
    const { t } = useTranslation('common')

    expect(
      screen.getByRole('button', {
        name: t('common:add-to-wishlist'),
      })
    ).toBeVisible()
  })

  it('should render the 1 click checkout Button', () => {
    render(<Common {...Common.args} />)
    const { t } = useTranslation('common')

    expect(
      screen.getByRole('button', {
        name: t('common:one-click-checkout'),
      })
    ).toBeVisible()
  })
})
