import { composeStories } from '@storybook/testing-react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './QuotesTemplate.stories'
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

    expect(screen.getByRole('heading', { name: 'quotes', level: 1 })).toBeVisible()

    expect(screen.getByRole('button', { name: 'create-a-quote' })).toBeVisible()

    expect(screen.getByTestId('quote-table-component')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'setQuotesSearchParam' }))

    expect(setQuotesSearchParamMock).toHaveBeenCalled()
  })
})
