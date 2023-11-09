import React from 'react'

import { useMediaQuery } from '@mui/material'
import { composeStories } from '@storybook/testing-react'
import { screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'
import mockRouter from 'next-router-mock'

import QuoteDetailsTemplate from './QuoteDetailsTemplate'
import * as stories from './QuoteDetailsTemplate.stories'
import { server } from '@/__mocks__/msw/server'
import {
  customerB2BUserForPage0Mock,
  orderMock,
  quoteMock,
  singleQuoteItemMock,
  singleQuoteMock,
} from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { DialogRoot, ModalContextProvider } from '@/context'
import { useGetQuoteByID } from '@/hooks/queries/b2b/quotes/useGetQuoteById/useGetQuoteById'

jest.mock('@/lib/helpers/hasPermission', () => ({
  hasPermission: jest.fn().mockImplementation(() => true),
}))
import { CrOrderItem, Quote } from '@/lib/gql/types'
const {
  Common,
  QuoteDetailsTemplateMobile,
  QuoteDetailsTemplateDesktop,
  QuoteDetailsTemplateViewModeDesktop,
  QuoteDetailsTemplateReadyForCheckoutDesktop,
  QuoteDetailsTemplateViewModeMobile,
  QuoteDetailsTemplateShipToHomeDesktop,
} = composeStories(stories)

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
const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
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

jest.mock('@/components/page-templates/B2B/QuoteDetailsTemplate/QuoteDetailsPrintTemplate', () => ({
  __esModule: true,
  default: () => <div data-testid="QuoteDetailsPrintTemplate"></div>,
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

const ConfirmationDialogMock = () => <div data-testid="confirmation-dialog-mock" />
jest.mock(
  '@/components/dialogs/ConfirmationDialog/ConfirmationDialog.tsx',
  () => () => ConfirmationDialogMock()
)

const QuoteCommentThreadDialogMock = () => <div data-testid="quote-comment-thread-dialog-mock" />
jest.mock(
  '@/components/dialogs/b2b/QuotesCommentThreadDialog/QuotesCommentThreadDialog.tsx',
  () => () => QuoteCommentThreadDialogMock()
)

const QuotesHistoryDialogMock = () => <div data-testid="quotes-history-dialog-mock" />
jest.mock(
  '@/components/dialogs/b2b/QuotesHistoryDialog/QuotesHistoryDialog.tsx',
  () => () => QuotesHistoryDialogMock()
)

const AddressFormMock = () => <div data-testid="address-card-mock" />
jest.mock('@/components/common/AddressForm/AddressForm', () => () => AddressFormMock())
const TestComponent = () => {
  const { data: quoteResult } = useGetQuoteByID({
    quoteId: 'test-quote-id',
    draft: false,
  })
  const onAccountTitleClickMock = jest.fn()
  const props = {
    quote: quoteResult as Quote,
    mode: 'edit',
    initialB2BUsers: customerB2BUserForPage0Mock,
    currentB2BUser: customerB2BUserForPage0Mock,
    onAccountTitleClick: onAccountTitleClickMock,
  }
  return <QuoteDetailsTemplate {...props} />
}
const setup = () => {
  renderWithQueryClient(<TestComponent />)
}
const addToQuoteTest = async () => {
  const quoteItemCount = quoteMock.items?.[0]?.items?.length

  await waitFor(() => {
    expect(screen.queryByTestId('quoteItems-length')).toHaveTextContent(quoteItemCount.toString())
  })

  server.use(
    graphql.query('getQuoteByID', (_req, res, ctx) => {
      return res(
        ctx.data({
          quote: {
            ...singleQuoteMock.quote,
            items: [...(singleQuoteMock.quote?.items as CrOrderItem[]), singleQuoteItemMock],
          },
        })
      )
    })
  )

  await user.click(screen.getByTestId('add-non-configurable-product-button'))

  await waitFor(() => {
    expect(screen.queryByTestId('quoteItems-length')).toHaveTextContent(
      (quoteItemCount + 1).toString()
    )
  })
}

afterEach(() => {
  cleanup()
})

describe('[components] QuoteDetailsTemplate', () => {
  describe('Desktop', () => {
    beforeEach(() => {
      const useMediaQueryMock = useMediaQuery as jest.Mock
      useMediaQueryMock.mockReturnValue(true)
    })
    it('should render QuoteDetailsTemplate component', async () => {
      renderWithQueryClient(<QuoteDetailsTemplateDesktop {...QuoteDetailsTemplateDesktop.args} />)

      const quotesText = screen.getByText(/quotes/i)
      const createQuote = screen.getByText(/create-a-quote/i)
      const quoteDetails = screen.getByText(/quote-details/i)
      const quoteSummary = screen.getByText(/quote-summary/i)

      const clearChangesButton = screen.getByRole('button', { name: 'clear-changes' })
      const submitForApprovalButton = screen.getByRole('button', { name: 'submit-for-approval' })
      const printQuoteButton = screen.getByRole('button', { name: 'print-quote' })
      const b2bProductComponent = screen.getByTestId('b2b-product-search-component')

      expect(quotesText).toBeVisible()
      expect(createQuote).toBeVisible()
      expect(quoteDetails).toBeVisible()
      expect(quoteSummary).toBeVisible()
      expect(clearChangesButton).toBeVisible()
      expect(submitForApprovalButton).toBeVisible()
      expect(printQuoteButton).toBeVisible()
      expect(b2bProductComponent).toBeVisible()

      await waitFor(() => {
        const quickOrderTableComponent = screen.queryByTestId('b2b-product-details-table-component')
        expect(quickOrderTableComponent).toBeVisible()
      })
    })

    it('should add product in list when user clicks on non configurable product', async () => {
      setup()

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
      const quoteName = Common?.args?.quote?.name || ''
      expect(screen.getByText(quoteName)).toBeVisible()
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

    it('should open a quote details page in edit mode when user clicks on edit button', async () => {
      renderWithQueryClient(
        <QuoteDetailsTemplateViewModeDesktop {...QuoteDetailsTemplateViewModeDesktop.args} />
      )
      const editButton = screen.getByRole('button', { name: 'edit-quote' })
      user.click(editButton)

      await waitFor(() => {
        expect(mockRouter).toMatchObject({
          asPath: `/my-account/b2b/quote/${quoteMock?.items?.[0]?.id}?mode=edit`,
          pathname: `/my-account/b2b/quote/${quoteMock?.items?.[0]?.id}`,
          query: {},
        })
      })
    })

    it('should open address from when users click on add new address button', async () => {
      renderWithQueryClient(
        <QuoteDetailsTemplateShipToHomeDesktop {...QuoteDetailsTemplateShipToHomeDesktop.args} />
      )
      const addNewAddress = screen.getByRole('button', { name: 'add-new-address' })
      user.click(addNewAddress)

      expect(addNewAddress).toBeVisible()
      await waitFor(() => {
        expect(screen.getByTestId('address-card-mock')).toBeVisible()
      })
    })

    it('should open a quote details page in edit mode when user clicks on edit button', async () => {
      renderWithQueryClient(
        <QuoteDetailsTemplateViewModeMobile {...QuoteDetailsTemplateViewModeMobile.args} />
      )
      const editButton = screen.getByRole('button', { name: 'edit-quote' })
      user.click(editButton)

      expect(
        screen.getByText(QuoteDetailsTemplateViewModeMobile?.args?.quote?.name || '')
      ).toBeVisible()
      await waitFor(() => {
        expect(mockRouter).toMatchObject({
          asPath: `/my-account/b2b/quote/${quoteMock?.items?.[0]?.id}?mode=edit`,
          pathname: `/my-account/b2b/quote/${quoteMock?.items?.[0]?.id}`,
          query: {},
        })
      })
    })

    it('should open clear changes dialog when users click on clear changes button', async () => {
      renderWithQueryClient(<Common {...Common.args} />)
      const clearChangesButton = screen.getByRole('button', { name: 'clear-changes' })

      user.click(clearChangesButton)

      await waitFor(() => {
        expect(screen.getByTestId('confirmation-dialog-mock')).toBeVisible()
      })
    })

    it('should open quote comments dialog when users click on view full comment thread link', async () => {
      renderWithQueryClient(<Common {...Common.args} />)
      const fullCommentThread = screen.getByText(/view-full-comment-thread/i)

      user.click(fullCommentThread)

      await waitFor(() => {
        expect(screen.getByTestId('quote-comment-thread-dialog-mock')).toBeVisible()
      })
    })

    it('should open quote history dialog when users click on full history link', async () => {
      renderWithQueryClient(<Common {...Common.args} />)
      const viewFullHistory = screen.getByText(/view-full-history/i)

      user.click(viewFullHistory)

      await waitFor(() => {
        expect(screen.getByTestId('quotes-history-dialog-mock')).toBeVisible()
      })
    })

    it('should redirect to checkout page when users click on continue to checkout button', async () => {
      renderWithQueryClient(
        <QuoteDetailsTemplateReadyForCheckoutDesktop
          {...QuoteDetailsTemplateReadyForCheckoutDesktop.args}
        />
      )
      const continueToCheckoutButton = screen.getByRole('button', { name: 'continue-to-checkout' })

      user.click(continueToCheckoutButton)

      await waitFor(() => {
        expect(mockRouter).toMatchObject({
          asPath: `/checkout/${orderMock?.checkout?.id}`,
          pathname: `/checkout/${orderMock?.checkout?.id}`,
          query: {},
        })
      })
    })

    it('should redirect to quotes pages when users click on submit for approval button', async () => {
      renderWithQueryClient(<Common {...Common.args} />)
      const submitForApproval = screen.getByRole('button', { name: 'submit-for-approval' })

      user.click(submitForApproval)

      await waitFor(() => {
        expect(screen.getByTestId('confirmation-dialog-mock')).toBeVisible()
      })
    })

    it('should show quote name when users click on save quote button', async () => {
      setup()

      const quoteNameTextBox = screen.getByPlaceholderText('enter-quote-name')

      await user.type(quoteNameTextBox, 'Quote Name')

      const saveQuoteName = screen.getByTestId('save-quote-name')
      const cancelQuoteName = screen.getByTestId('cancel-quote-name')
      user.click(saveQuoteName)

      server.use(
        graphql.query('getQuoteByID', (_req, res, ctx) => {
          return res(ctx.data({ quote: { ...quoteMock?.items?.[0], name: 'Quote Name' } }))
        })
      )

      await waitFor(() => {
        expect(cancelQuoteName).toBeVisible()
      })
      await waitFor(() => {
        expect(screen.getByText('Quote Name')).toBeVisible()
      })
    })

    it('should apply coupon when user enters valid coupon code', async () => {
      renderWithQueryClient(<Common {...Common.args} />)

      const couponCount = quoteMock?.items?.[0]?.couponCodes?.length as number

      await waitFor(() => {
        expect(screen.queryAllByTestId('applied-coupon')).toHaveLength(couponCount)
      })

      server.use(
        graphql.query('getQuoteByID', (_req, res, ctx) => {
          return res(
            ctx.data({
              quote: {
                ...quoteMock?.items?.[0],
                couponCodes: [quoteMock?.items?.[0]?.couponCodes?.[0], 'test-coupon'],
              },
            })
          )
        })
      )

      await user.click(screen.getByTestId('apply-promo-button'))

      await waitFor(() => {
        expect(screen.queryAllByTestId('applied-coupon')).toHaveLength(couponCount)
      })
    })

    it('should remove coupon when user removes it', async () => {
      renderWithQueryClient(<Common {...Common.args} />)

      const couponCount = quoteMock?.items?.[0]?.couponCodes?.length as number

      await waitFor(() => {
        expect(screen.queryAllByTestId('applied-coupon')).toHaveLength(couponCount)
      })

      server.use(
        graphql.query('getQuoteByID', (_req, res, ctx) => {
          return res(
            ctx.data({
              quote: {
                ...quoteMock?.items?.[0],
                couponCodes: [quoteMock?.items?.[0]?.couponCodes?.[0]],
              },
            })
          )
        })
      )

      user.click(screen.getByTestId('remove-promo-button'))

      await waitFor(() => {
        expect(screen.queryAllByTestId('applied-coupon')).toHaveLength(couponCount)
      })
    })
  })

  describe('Mobile', () => {
    beforeEach(() => {
      const useMediaQueryMock = useMediaQuery as jest.Mock
      useMediaQueryMock.mockReturnValue(false)
    })

    it('should render QuoteDetailsTemplate Mobile component', async () => {
      renderWithQueryClient(<QuoteDetailsTemplateMobile {...QuoteDetailsTemplateMobile.args} />)
      const b2bProductComponent = screen.getByTestId('b2b-product-search-component')

      expect(b2bProductComponent).toBeVisible()

      await waitFor(() => {
        const cartItemListComponents = screen.queryByTestId('cart-item-list-component')
        expect(cartItemListComponents).toBeVisible()
      })
    })

    it('should add product in list when user clicks on non configurable product', async () => {
      setup()

      await waitFor(() => {
        const cartItemListComponents = screen.queryByTestId('cart-item-list-component')
        expect(cartItemListComponents).toBeVisible()
      })
      await addToQuoteTest()
    })
  })
})
