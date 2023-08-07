import React from 'react'

import '@testing-library/jest-dom'
import { useMediaQuery } from '@mui/material'
import { composeStories } from '@storybook/testing-react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './QuotesTable.stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { quoteGetters } from '@/lib/getters'

import { Quote } from '@/lib/gql/types'

const { Common, Mobile } = composeStories(stories)

const user = userEvent.setup()

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}))

const ProductItemMock = () => <div data-testid="product-item-component" />
jest.mock('@/components/common/ProductItem/ProductItem', () => () => ProductItemMock())

jest.mock('@/components/common/FulfillmentOptions/FulfillmentOptions', () => ({
  __esModule: true,
  default: ({ onFulfillmentOptionChange, onStoreSetOrUpdate }: any) => (
    <div data-testid="fulfillment-options-component">
      <button data-testid="onFulfillmentOptionChange-button" onClick={onFulfillmentOptionChange}>
        onFulfillmentOptionChange
      </button>
      <button data-testid="onStoreSetOrUpdate-button" onClick={onStoreSetOrUpdate}>
        onStoreSetOrUpdate
      </button>
    </div>
  ),
}))

jest.mock('@/components/common/QuantitySelector/QuantitySelector', () => ({
  __esModule: true,
  default: ({ onIncrease, onDecrease, onQuantityUpdate }: any) => (
    <div data-testid="quantity-selector-component">
      <button data-testid="onIncrease-button" onClick={onIncrease}>
        onIncrease
      </button>
      <button data-testid="onDecrease-button" onClick={onDecrease}>
        onDecrease
      </button>
      <button data-testid="onQuantityUpdate-button" onClick={onQuantityUpdate}>
        onQuantityUpdate
      </button>
    </div>
  ),
}))

describe('[components] - QuotesTable', () => {
  it("should show 'no-quotes-found' if quotes are not provided", () => {
    renderWithQueryClient(
      <Common
        quoteCollection={{ pageCount: 0, pageSize: 5, startIndex: 0, totalCount: 0, items: [] }}
      />
    )

    expect(screen.getByText('no-quotes-found')).toBeVisible()

    expect(screen.queryByTestId('data-testid="quotes-table-body"')).not.toBeInTheDocument()
  })

  describe('Desktop', () => {
    beforeAll(() => {
      const useMediaQueryMock = useMediaQuery as jest.Mock
      useMediaQueryMock.mockReturnValue(true)
    })
    it('should show number, name, expirationDate, createdDate, total, status info in desktop table', async () => {
      renderWithQueryClient(<Common />)

      Common.args?.quoteCollection?.items?.map((item, index) => {
        const { number, name, expirationDate, createdDate, status } = quoteGetters.getQuoteDetails(
          item as Quote
        )

        expect(screen.getAllByTestId('quote-number')[index]).toHaveTextContent(number.toString())
        expect(screen.getAllByTestId('quote-name')[index]).toHaveTextContent(name)
        expirationDate
          ? expect(screen.getAllByTestId('quote-expirationDate')[index]).toHaveTextContent(
              expirationDate
            )
          : expect(screen.getAllByTestId('quote-expirationDate')[index]).toBeEmptyDOMElement()
        expect(screen.getAllByTestId('quote-createdDate')[index]).toHaveTextContent(createdDate)
        expect(screen.getAllByTestId('quote-total')[index]).toHaveTextContent('currency')
        expect(screen.getAllByTestId('quote-status')[index]).toHaveTextContent(status)
      })
    })
  })

  describe('Mobile', () => {
    beforeEach(() => {
      const useMediaQueryMock = useMediaQuery as jest.Mock
      useMediaQueryMock.mockReturnValue(false)
    })
    it('should show number, name, status info in Mobile table', () => {
      renderWithQueryClient(<Mobile />)

      Mobile.args?.quoteCollection?.items?.map((item, index) => {
        const { number, name, expirationDate } = quoteGetters.getQuoteDetails(item as Quote)

        expect(screen.getAllByTestId('quote-number')[index]).toHaveTextContent(number.toString())
        expect(screen.getAllByTestId('quote-name')[index]).toHaveTextContent(name)
        expirationDate
          ? expect(screen.getAllByTestId('quote-expirationDate')[index]).toHaveTextContent(
              expirationDate
            )
          : expect(screen.getAllByTestId('quote-expirationDate')[index]).toBeEmptyDOMElement()
        expect(screen.getAllByTestId('quote-status-mobile')[index]).toBeVisible()
      })
    })
  })
})
