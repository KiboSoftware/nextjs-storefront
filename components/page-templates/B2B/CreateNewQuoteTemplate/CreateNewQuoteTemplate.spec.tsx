import React from 'react'

import { useMediaQuery } from '@mui/material'
import { composeStories } from '@storybook/testing-react'
import { screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'

import * as stories from './CreateNewQuoteTemplate.stories'
import { server } from '@/__mocks__/msw/server'
import { quoteMock, singleQuoteItemMock, singleQuoteMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { DialogRoot, ModalContextProvider } from '@/context'

import { CrOrderItem } from '@/lib/gql/types'
const { Common, CreateNewQuoteTemplateMobile } = composeStories(stories)

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
      <div data-testid="quoteItems-length">{items?.length}</div>
    </div>
  ),
}))

jest.mock('@/components/cart/CartItemList/CartItemList', () => ({
  __esModule: true,
  default: ({ cartItems }: any) => (
    <div data-testid="cart-item-list-component">
      <div data-testid="quoteItems-length">{cartItems?.length}</div>
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

const addToQuoteTest = async () => {
  const quoteItemCount = quoteMock.items?.[0]?.items?.length

  await waitFor(() => {
    expect(screen.queryByTestId('quoteItems-length')).toHaveTextContent(quoteItemCount.toString())
  })

  server.use(
    graphql.query('getQuoteByID', (_req, res, ctx) => {
      return res(
        ctx.data({
          ...singleQuoteMock,
          quote: {
            items: [...(singleQuoteMock.quote?.items as CrOrderItem[]), singleQuoteItemMock],
          },
        })
      )
    })
  )

  user.click(screen.getByTestId('add-non-configurable-product-button'))

  await waitFor(() => {
    expect(screen.queryByTestId('quoteItems-length')).toHaveTextContent(
      (quoteItemCount + 1).toString()
    )
  })
}

afterEach(() => {
  cleanup()
})

describe('[components] CreateNewQuoteTemplate', () => {
  describe('Desktop', () => {
    beforeEach(() => {
      const useMediaQueryMock = useMediaQuery as jest.Mock
      useMediaQueryMock.mockReturnValue(true)
    })
    it('should render CreateNewQuoteTemplate component', async () => {
      renderWithQueryClient(<Common {...Common.args} />)

      const quotesText = screen.getByText(/quotes/i)
      const createQuote = screen.getByText(/create-a-quote/i)
      const quoteDetails = screen.getByText(/quote-details/i)
      const quoteSummary = screen.getByText(/quote-summary/i)

      const clearChangesButton = screen.getByRole('button', { name: 'clear-changes' })
      const saveAndExitButton = screen.getByRole('button', { name: 'save-and-exit' })
      const submitForApprovalButton = screen.getByRole('button', { name: 'submit-for-approval' })
      const printQuoteButton = screen.getByRole('button', { name: 'print-quote' })
      const b2bProductComponent = screen.getByTestId('b2b-product-search-component')

      expect(quotesText).toBeVisible()
      expect(createQuote).toBeVisible()
      expect(quoteDetails).toBeVisible()
      expect(quoteSummary).toBeVisible()
      expect(clearChangesButton).toBeVisible()
      expect(saveAndExitButton).toBeVisible()
      expect(submitForApprovalButton).toBeVisible()
      expect(printQuoteButton).toBeVisible()
      expect(b2bProductComponent).toBeVisible()

      await waitFor(() => {
        const quickOrderTableComponent = screen.queryByTestId('b2b-product-details-table-component')
        expect(quickOrderTableComponent).toBeVisible()
      })
    })

    xit('should add product in list when user clicks on non configurable product', async () => {
      renderWithQueryClient(<Common {...Common.args} />)

      expect(screen.queryByTestId('b2b-product-details-table-component')).toBeVisible()

      await addToQuoteTest()
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

    it('should redirect to quotes pages when users click on Quotes back button', async () => {
      const handleAccountTitleClickMock = jest.fn()
      renderWithQueryClient(
        <Common {...Common.args} onAccountTitleClick={handleAccountTitleClickMock} />
      )
      const quotesText = screen.getByText(/quotes/i)
      user.click(quotesText)

      await waitFor(() => {
        expect(handleAccountTitleClickMock).toHaveBeenCalled()
      })
    })
  })

  describe('Mobile', () => {
    beforeEach(() => {
      const useMediaQueryMock = useMediaQuery as jest.Mock
      useMediaQueryMock.mockReturnValue(false)
    })

    it('should render CreateNewQuoteTemplate Mobile component', async () => {
      renderWithQueryClient(<CreateNewQuoteTemplateMobile {...CreateNewQuoteTemplateMobile.args} />)
      const b2bProductComponent = screen.getByTestId('b2b-product-search-component')

      expect(b2bProductComponent).toBeVisible()

      await waitFor(() => {
        const cartItemListComponents = screen.queryByTestId('cart-item-list-component')
        expect(cartItemListComponents).toBeVisible()
      })
    })

    xit('should add product in list when user clicks on non configurable product', async () => {
      const useMediaQueryMock = useMediaQuery as jest.Mock
      useMediaQueryMock.mockReturnValueOnce(false)

      renderWithQueryClient(<Common {...Common.args} />)

      expect(screen.queryByTestId('cart-item-list-component')).toBeVisible()

      await addToQuoteTest()
    })
  })
})
