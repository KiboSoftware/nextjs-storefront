import React from 'react'

import '@testing-library/jest-dom'
import { useMediaQuery } from '@mui/material'
import { composeStories } from '@storybook/testing-react'
import { cleanup, fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getConfig from 'next/config'

import * as stories from './QuotesTable.stories'
import { quotesMock } from '@/__mocks__/stories/quotesMock'
import { renderWithQueryClient } from '@/__test__/utils'
import { DialogRoot, ModalContextProvider } from '@/context'
import { quoteGetters } from '@/lib/getters'

import { Quote } from '@/lib/gql/types'

const { Common, Mobile } = composeStories(stories)

const user = userEvent.setup()

const { publicRuntimeConfig } = getConfig()

publicRuntimeConfig.debounceTimeout = 1000

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}))

const setQuotesSearchParamMock = jest.fn()

describe('[components] - QuotesTable', () => {
  it("should show 'no-quotes-found' if quotes are not provided", () => {
    renderWithQueryClient(
      <Common
        quoteCollection={{ pageCount: 0, pageSize: 5, startIndex: 0, totalCount: 0, items: [] }}
        setQuotesSearchParam={setQuotesSearchParamMock}
      />
    )

    expect(screen.getByText('no-quotes-found')).toBeVisible()

    expect(screen.queryByTestId('data-testid="quotes-table-body"')).not.toBeInTheDocument()
  })

  it('should handle search filter with name', async () => {
    renderWithQueryClient(
      <Common
        quoteCollection={quotesMock}
        filters={{
          expirationDate: '',
          createDate: '',
          status: '',
          name: '',
          number: '',
        }}
        setQuotesSearchParam={setQuotesSearchParamMock}
      />
    )

    const searchInput = screen.getByRole('textbox', { name: 'search-input' })

    await user.type(searchInput, 'Quote')

    await waitFor(
      () => {
        expect(setQuotesSearchParamMock).toHaveBeenLastCalledWith({ filter: 'name cont Quote' })
      },
      { timeout: 100000 }
    )

    const clearButton = screen.getByRole('button', { name: 'clear-search' })

    await user.click(clearButton)

    await waitFor(
      () => {
        expect(setQuotesSearchParamMock).toHaveBeenLastCalledWith({ filter: '' })
      },
      { timeout: 100000 }
    )
  })

  it('should handle search filter with number', async () => {
    renderWithQueryClient(
      <Common
        quoteCollection={quotesMock}
        filters={{
          expirationDate: '',
          createDate: '',
          status: '',
          name: '',
          number: '',
        }}
        setQuotesSearchParam={setQuotesSearchParamMock}
      />
    )

    const searchInput = screen.getByRole('textbox', { name: 'search-input' })

    await user.clear(searchInput)

    await user.type(searchInput, '75')

    await waitFor(
      () => {
        expect(setQuotesSearchParamMock).toHaveBeenLastCalledWith({
          filter: 'name cont 75 or number eq 75',
        })
      },
      {
        timeout: 100000,
      }
    )
  })

  it('should handle search filter with status', async () => {
    renderWithQueryClient(
      <ModalContextProvider>
        <Common
          quoteCollection={quotesMock}
          filters={{
            expirationDate: '',
            createDate: '',
            status: '',
            name: '',
            number: '',
          }}
          setQuotesSearchParam={setQuotesSearchParamMock}
        />
        <DialogRoot />
      </ModalContextProvider>
    )

    const filterButton = screen.getByTestId('filter-button')
    expect(filterButton).toBeVisible()

    await user.click(filterButton)

    await waitFor(async () => {
      expect(screen.getByRole('radio', { name: 'pending' })).not.toBeChecked()
    })

    await user.click(screen.getByRole('radio', { name: 'pending' }))

    expect(screen.getByRole('radio', { name: 'pending' })).toBeChecked()

    await user.click(screen.getByRole('button', { name: 'apply' }))

    await waitFor(() => {
      expect(setQuotesSearchParamMock).toHaveBeenLastCalledWith({
        filter: 'status eq Pending',
      })
    })
  })

  it('should handle search filter with expirationDate', async () => {
    renderWithQueryClient(
      <ModalContextProvider>
        <Common
          quoteCollection={quotesMock}
          filters={{
            expirationDate: '',
            createDate: '',
            status: '',
            name: '',
            number: '',
          }}
          setQuotesSearchParam={setQuotesSearchParamMock}
        />
        <DialogRoot />
      </ModalContextProvider>
    )

    const filterButton = screen.getByTestId('filter-button')
    expect(filterButton).toBeVisible()

    await user.click(filterButton)

    expect(screen.getByRole('textbox', { name: 'expiration-date' })).toBeVisible()

    await user.type(screen.getByRole('textbox', { name: 'expiration-date' }), '2021-10-10')

    await user.click(screen.getByRole('button', { name: 'apply' }))

    await waitFor(() => {
      expect(setQuotesSearchParamMock).toHaveBeenLastCalledWith({
        filter: 'expirationDate ge 2021-10-10',
      })
    })
  })

  it('should handle sorting', async () => {
    renderWithQueryClient(
      <Common
        quoteCollection={quotesMock}
        filters={{
          expirationDate: '',
          createDate: '',
          status: '',
          name: '',
          number: '',
        }}
        setQuotesSearchParam={setQuotesSearchParamMock}
      />
    )

    const selectButton = screen.getByRole('button', { name: 'sort-plp' })

    fireEvent.mouseDown(selectButton)

    const listbox = within(screen.getByRole('listbox'))

    fireEvent.click(listbox.getByText(/Quote number: Low-High/i))

    await waitFor(() => {
      expect(setQuotesSearchParamMock).toHaveBeenLastCalledWith({
        sortBy: 'number asc',
      })
    })
  })

  describe('Desktop', () => {
    beforeAll(() => {
      const useMediaQueryMock = useMediaQuery as jest.Mock
      useMediaQueryMock.mockReturnValue(true)
    })
    it('should show number, name, expirationDate, createdDate, total, status info in desktop table', async () => {
      renderWithQueryClient(<Common setQuotesSearchParam={setQuotesSearchParamMock} />)

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
      renderWithQueryClient(<Mobile setQuotesSearchParam={setQuotesSearchParamMock} />)

      Mobile.args?.quoteCollection?.items?.map((item, index) => {
        const { number, name, expirationDate } = quoteGetters.getQuoteDetails(item as Quote)

        expect(screen.getAllByTestId('quote-number')[index]).toHaveTextContent(number.toString())
        expect(screen.getAllByTestId('quote-name')[index]).toHaveTextContent(name)
        expirationDate
          ? expect(screen.getAllByTestId('quote-expirationDate')[index]).toHaveTextContent(
              expirationDate
            )
          : expect(screen.getAllByTestId('quote-expirationDate')[index]).toBeEmptyDOMElement()
      })
    })
  })
})
