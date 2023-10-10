import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import * as stories from './QuotesTemplate.stories'
import { quoteMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'

const { Common } = composeStories(stories)
const user = userEvent.setup()

const QuotesTableMock = () => <div data-testid="quote-table-component" />
jest.mock('@/components/b2b/QuotesTable/QuotesTable', () => () => QuotesTableMock())

jest.mock('@/components/b2b/QuotesTable/QuotesTable', () => ({
  __esModule: true,
  default: ({ setQuotesSearchParam }: any) => (
    <div data-testid="quote-table-component">
      <button onClick={setQuotesSearchParam}>setQuotesSearchParam</button>
    </div>
  ),
}))

describe('[Templates]  QuotesTemplate', () => {
  it('should render component', async () => {
    const setQuotesSearchParamMock = jest.fn()

    renderWithQueryClient(
      <Common {...Common.args} setQuotesSearchParam={setQuotesSearchParamMock} />
    )

    expect(screen.getByRole('heading', { name: 'quotes' })).toBeVisible()

    expect(screen.getByRole('button', { name: 'create-a-quote' })).toBeVisible()

    expect(screen.getByTestId('quote-table-component')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'setQuotesSearchParam' }))

    expect(setQuotesSearchParamMock).toHaveBeenCalled()
  })

  it('should redirect to create New Quote page when users click on create a quote button', async () => {
    const setQuotesSearchParamMock = jest.fn()

    renderWithQueryClient(
      <Common {...Common.args} setQuotesSearchParam={setQuotesSearchParamMock} />
    )

    const createQuote = screen.getByRole('button', { name: 'create-a-quote' })

    await user.click(createQuote)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: `/my-account/b2b/quote/${quoteMock?.items?.[0].id}?mode=create`,
        pathname: `/my-account/b2b/quote/${quoteMock?.items?.[0].id}`,
        query: {},
      })
    })
  })
})
