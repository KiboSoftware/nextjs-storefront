import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductItemList.stories'
import DefaultImage from '@/public/product_placeholder.svg'

import type { CrOrderItem, CrProductOption } from '@/lib/gql/types'

const { Common } = composeStories(stories)

const priceMock = () => <div data-testid="price-component" />
jest.mock('@/components/common/Price/Price', () => priceMock)

const productItemMock = () => <div data-testid="product-item-component" />
jest.mock('@/components/common/ProductItem/ProductItem', () => productItemMock)

const items: CrOrderItem[] = [
  {
    fulfillmentMethod: 'Pickup',
    id: '9f59a72a79e04064ae75ae7d00885386',
    total: 49,
    subtotal: 49,
    discountTotal: 0,
    quantity: 7,
    product: {
      productCode: 'MS-BTL-004',
      name: 'Vida Small',
      description:
        'Its tapered profile and ergonomic handle make it a joy to hold. Our smooth, threadless spout replicates our Perfect Spout, a first for any steel bottle.',
      imageUrl:
        '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/3e90a2f3-01af-4280-93f5-6d35f84f78e5',
      options: [],
      properties: [
        {
          attributeFQN: 'tenant~availability',
          name: 'Availability',
          values: [
            {
              value: '24-48hrs',
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          name: 'Rating',
          values: [
            {
              value: 4,
            },
          ],
        },
        {
          attributeFQN: 'tenant~popularity',
          name: 'Popularity',
          values: [
            {
              value: 3,
            },
          ],
        },
        {
          attributeFQN: 'Tenant~color',
          name: 'Color',
          values: [
            {
              value: 'Black',
            },
          ],
        },
      ],
      sku: null,
      price: {
        price: 7,
        salePrice: null,
      },
      categories: [
        {
          id: 3,
        },
        {
          id: 9,
        },
      ],
    },
  },
  {
    fulfillmentMethod: 'Ship',
    id: '35d7252efb6b46a7a6c8ae7d00885386',
    total: 100,
    subtotal: 100,
    discountTotal: 0,
    quantity: 10,
    product: {
      productCode: 'MS-BTL-001',
      name: 'Delta',
      description:
        'Delta representss the art of high style, high performance hydration with its striking, yet simple design and ergonomics',
      imageUrl: null,
      options: [],
      properties: [
        {
          attributeFQN: 'tenant~availability',
          name: 'Availability',
          values: [
            {
              value: '24-48hrs',
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          name: 'Rating',
          values: [
            {
              value: 5,
            },
          ],
        },
        {
          attributeFQN: 'tenant~popularity',
          name: 'Popularity',
          values: [
            {
              value: 1,
            },
          ],
        },
        {
          attributeFQN: 'Tenant~color',
          name: 'Color',
          values: [],
        },
      ],
      sku: null,
      price: {
        price: 10,
        salePrice: 10,
      },
      categories: [
        {
          id: 3,
        },
        {
          id: 9,
        },
      ],
    },
  },
  {
    fulfillmentMethod: 'Ship',
    id: 'eeaa8c35be764f53b138ae7d00885386',
    total: 3600,
    subtotal: 3600,
    discountTotal: 0,
    quantity: 9,
    product: {
      productCode: 'MS-CAM-001',
      name: 'Garmin VIRB Elite Action Camera',
      description:
        '<span style="color: rgb(51, 51, 51); font-family: verdana, sans-serif; line-height: 17px; text-align: left; "><font size="3"><i>The Wi-Fi-enabled Garmin VIRB Elite action camera harnesses the power of GPS allowing video recordings that automatically start and stop with GPS-enabled triggers you set, such as speed or altitude.</i></font></span>',
      imageUrl:
        '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/6e0389db-5b78-490d-88b0-28af87528c5b',
      options: [],
      properties: [
        {
          attributeFQN: 'tenant~availability',
          name: 'Availability',
          values: [
            {
              value: '24-48hrs',
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          name: 'Rating',
          values: [
            {
              value: 2,
            },
          ],
        },
        {
          attributeFQN: 'tenant~popularity',
          name: 'Popularity',
          values: [
            {
              value: 4,
            },
          ],
        },
        {
          attributeFQN: 'Tenant~brand',
          name: 'Brand',
          values: [
            {
              value: 'Garmin',
            },
          ],
        },
        {
          attributeFQN: 'Tenant~Best-Use',
          name: 'Best Use',
          values: [],
        },
      ],
      sku: null,
      price: {
        price: 400,
        salePrice: null,
      },
      categories: [
        {
          id: 2,
        },
        {
          id: 4,
        },
        {
          id: 19,
        },
      ],
    },
  },
]

const argsWithoutPriceLabel = items.map((item) => {
  return {
    image: item.product?.imageUrl || DefaultImage,
    name: item.product?.name || '',
    options: item.product?.options as Array<CrProductOption>,
  }
})

const argsWithPriceLabel = items.map((item) => {
  return {
    image: item.product?.imageUrl || DefaultImage,
    name: item.product?.name || '',
    options: item.product?.options as Array<CrProductOption>,
    price: '$' + (item.product?.price?.price || 0).toString(),
    salePrice: '$' + (item.product?.price?.salePrice || 0).toString(),
  }
})

describe('[component] - ProductItemList', () => {
  const setup = (params: any) => {
    const props = params ? params : Common.args
    const productItemListMock = jest.fn()
    render(<Common {...props} />)
    return {
      productItemListMock,
    }
  }
  it('should render component with price label', () => {
    setup(argsWithPriceLabel)

    const productItemList = screen.getByTestId('product-item-stack')

    expect(productItemList).toBeVisible()
  })
  it('should render component without price label', () => {
    setup(argsWithoutPriceLabel)

    const productItemList = screen.getByTestId('product-item-stack')

    expect(productItemList).toBeVisible()
  })

  it('should render mock component', () => {
    // arrange
    setup(argsWithPriceLabel)

    // act
    const productItems = screen.getAllByTestId('product-item-component')

    // // assert
    expect(productItems[0]).toBeInTheDocument()
    expect(productItems[0]).toBeVisible()
    expect(productItems).toHaveLength(argsWithPriceLabel.length)
  })
})
