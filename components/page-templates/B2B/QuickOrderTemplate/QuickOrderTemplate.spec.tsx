import React from 'react'

import { useMediaQuery } from '@mui/material'
import { composeStories } from '@storybook/testing-react'
import { screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'
import mockRouter from 'next-router-mock'

import * as stories from './QuickOrderTemplate.stories'
import { server } from '@/__mocks__/msw/server'
import { cartMock, newCartItem, quoteMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { DialogRoot, ModalContextProvider } from '@/context'

import { CrCartItem } from '@/lib/gql/types'
const { Common, QuickOrderTemplateMobile } = composeStories(stories)

const user = userEvent.setup()

const nonConfigurableProductMock = {
  options: [
    {
      isRequired: false,
    },
  ],
}

const configurableProductMock = {
  options: [
    {
      isRequired: true,
    },
  ],
}

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}))

const KeyValueDisplayMock = () => <div data-testid="key-value-display-component" />
jest.mock('@/components/common/KeyValueDisplay/KeyValueDisplay', () => () => KeyValueDisplayMock())

jest.mock('@/components/common/PromoCodeBadge/PromoCodeBadge', () => ({
  __esModule: true,
  default: ({ promoList, onApplyCouponCode, onRemoveCouponCode }: any) => (
    <div data-testid="promo-code-badge-component">
      <button data-testid="apply-promo-button" onClick={() => onApplyCouponCode('test-coupon')}>
        Apply Promo
      </button>
      <button data-testid="remove-promo-button" onClick={() => onRemoveCouponCode('test-coupon')}>
        Remove Promo
      </button>
      {promoList?.map((promo: string) => {
        return (
          <div key={promo} data-testid="applied-coupon">
            {promo}
          </div>
        )
      })}
    </div>
  ),
}))

jest.mock('@/components/b2b/B2BProductDetailsTable/B2BProductDetailsTable', () => ({
  __esModule: true,
  default: ({ items }: any) => (
    <div data-testid="b2b-product-details-table-component">
      <div data-testid="cartItems-length">{items.length}</div>
    </div>
  ),
}))

jest.mock('@/components/cart/CartItemList/CartItemList', () => ({
  __esModule: true,
  default: ({ cartItems }: any) => (
    <div data-testid="cart-item-list-component">
      <div data-testid="cartItems-length">{cartItems.length}</div>
    </div>
  ),
}))

jest.mock('@/components/b2b/B2BProductSearch/B2BProductSearch', () => ({
  __esModule: true,
  default: ({ onAddProduct }: any) => (
    <div data-testid="b2b-product-search-component">
      <button
        data-testid="add-non-configurable-product-button"
        onClick={() => onAddProduct(nonConfigurableProductMock)}
      >
        Add Non Configurable Product
      </button>
      <button
        data-testid="add-configurable-product-button"
        onClick={() => onAddProduct(configurableProductMock)}
      >
        Add Configurable Product
      </button>
    </div>
  ),
}))

const addToCartTest = async () => {
  const cartItemCount = (cartMock.currentCart.items as [])?.length

  await waitFor(() => {
    expect(screen.queryByTestId('cartItems-length')).toHaveTextContent(cartItemCount.toString())
  })

  server.use(
    graphql.query('cart', (_req, res, ctx) => {
      return res(
        ctx.data({
          ...cartMock,
          currentCart: {
            ...cartMock.currentCart,
            items: [...(cartMock.currentCart.items as CrCartItem[]), newCartItem],
          },
        })
      )
    })
  )

  user.click(screen.getByTestId('add-non-configurable-product-button'))

  await waitFor(() => {
    expect(screen.queryByTestId('cartItems-length')).toHaveTextContent(
      (cartItemCount + 1).toString()
    )
  })
}

afterEach(() => {
  cleanup()
})

describe('[components] QuickOrderTemplate', () => {
  describe('Desktop', () => {
    beforeEach(() => {
      const useMediaQueryMock = useMediaQuery as jest.Mock
      useMediaQueryMock.mockReturnValue(true)
    })
    it('should render QuickOrderTemplate component', async () => {
      renderWithQueryClient(<Common {...Common.args} />)

      const quickOrderText = screen.getByText(/quick-order/i)
      const initiateQuoteButton = screen.getByRole('button', { name: 'initiate-quote' })
      const checkoutButton = screen.getByRole('button', { name: 'checkout' })
      const b2bProductComponent = screen.getByTestId('b2b-product-search-component')
      const promoCodeComponent = screen.getByTestId('promo-code-badge-component')
      const orderTotalComponent = screen.getByTestId('key-value-display-component')

      expect(quickOrderText).toBeVisible()
      expect(screen.getByText(/my-account/i)).toBeVisible()
      expect(b2bProductComponent).toBeVisible()

      await waitFor(() => {
        const quickOrderTableComponent = screen.queryByTestId('b2b-product-details-table-component')
        expect(quickOrderTableComponent).toBeVisible()
      })

      expect(initiateQuoteButton).toBeVisible()
      expect(checkoutButton).toBeVisible()
      expect(promoCodeComponent).toBeVisible()
      expect(orderTotalComponent).toBeVisible()
    })

    it('should add product in list when user clicks on non configurable product', async () => {
      renderWithQueryClient(<Common {...Common.args} />)

      expect(screen.queryByTestId('b2b-product-details-table-component')).toBeVisible()

      await addToCartTest()
    })

    it('should display configure dialogue when user clicks on configurable product', async () => {
      renderWithQueryClient(
        <ModalContextProvider>
          <Common {...Common.args} />
          <DialogRoot />
        </ModalContextProvider>
      )

      expect(screen.queryByTestId('b2b-product-details-table-component')).toBeVisible()

      user.click(screen.getByTestId('add-configurable-product-button'))

      await waitFor(() => {
        expect(screen.queryByText('product-configuration-options')).toBeVisible()
      })
    })

    it('should apply coupon when user enters valid coupon code', async () => {
      renderWithQueryClient(<Common {...Common.args} />)

      const couponCount = cartMock.currentCart.couponCodes?.length as number

      await waitFor(() => {
        expect(screen.queryAllByTestId('applied-coupon')).toHaveLength(couponCount)
      })

      server.use(
        graphql.query('cart', (_req, res, ctx) => {
          return res(
            ctx.data({
              ...cartMock,
              currentCart: {
                ...cartMock.currentCart,
                couponCodes: [...(cartMock.currentCart.couponCodes as string[]), 'test-coupon'],
              },
            })
          )
        })
      )

      await user.click(screen.getByTestId('apply-promo-button'))

      await waitFor(() => {
        expect(screen.queryAllByTestId('applied-coupon')).toHaveLength(couponCount + 1)
      })
    })

    it('should remove coupon when user removes it', async () => {
      renderWithQueryClient(<Common {...Common.args} />)

      const couponCount = cartMock.currentCart.couponCodes?.length as number

      await waitFor(() => {
        expect(screen.queryAllByTestId('applied-coupon')).toHaveLength(couponCount)
      })

      server.use(
        graphql.query('cart', (_req, res, ctx) => {
          return res(
            ctx.data({
              ...cartMock,
              currentCart: {
                ...cartMock.currentCart,
                couponCodes: [cartMock.currentCart.couponCodes?.[0]],
              },
            })
          )
        })
      )

      user.click(screen.getByTestId('remove-promo-button'))

      await waitFor(() => {
        expect(screen.queryAllByTestId('applied-coupon')).toHaveLength(couponCount - 1)
      })
    })

    it('should redirect to checkout page when users click on checkout button', async () => {
      renderWithQueryClient(<Common {...Common.args} />)

      const checkout = screen.getByText(/checkout/i)

      user.click(checkout)

      await waitFor(() => {
        expect(mockRouter).toMatchObject({
          asPath: '/checkout/137a94b6402be000013718d80000678b',
          pathname: '/checkout/137a94b6402be000013718d80000678b',
          query: {},
        })
      })
    })

    it('should initiate a quote when users click on initiate quote button', async () => {
      renderWithQueryClient(<Common {...Common.args} />)

      const initiateQuoteButton = screen.getByRole('button', { name: /initiate-quote/i })

      user.click(initiateQuoteButton)

      await waitFor(() => {
        expect(mockRouter).toMatchObject({
          asPath: `/my-account/b2b/quote/${quoteMock?.items?.[0].id}?mode=create`,
          pathname: `/my-account/b2b/quote/${quoteMock?.items?.[0].id}`,
          query: {},
        })
      })
    })
  })

  describe('Mobile', () => {
    beforeEach(() => {
      const useMediaQueryMock = useMediaQuery as jest.Mock
      useMediaQueryMock.mockReturnValue(false)
    })

    it('should render QuickOrderTemplate Mobile component', async () => {
      renderWithQueryClient(<QuickOrderTemplateMobile {...QuickOrderTemplateMobile.args} />)
      const quickOrderText = screen.getByText(/quick-order/i)
      const b2bProductComponent = screen.getByTestId('b2b-product-search-component')

      expect(b2bProductComponent).toBeVisible()
      expect(quickOrderText).toBeVisible()

      await waitFor(() => {
        const cartItemListComponents = screen.queryByTestId('cart-item-list-component')
        expect(cartItemListComponents).toBeVisible()
      })
      await waitFor(() => {
        const initiateQuoteButton = screen.queryByRole('button', { name: /initiate-quote/i })
        expect(initiateQuoteButton).toBeVisible()
      })
      await waitFor(() => {
        const checkoutButton = screen.queryByRole('button', { name: /checkout/i })
        expect(checkoutButton).toBeVisible()
      })
    })

    it('should add product in list when user clicks on non configurable product', async () => {
      const useMediaQueryMock = useMediaQuery as jest.Mock
      useMediaQueryMock.mockReturnValueOnce(false)

      renderWithQueryClient(<Common {...Common.args} />)

      expect(screen.queryByTestId('cart-item-list-component')).toBeVisible()

      await addToCartTest()
    })
  })
})
