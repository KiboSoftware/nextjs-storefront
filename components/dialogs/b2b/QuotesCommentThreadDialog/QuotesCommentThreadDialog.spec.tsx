import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './QuotesCommentThreadDialog.stories'

const { Common } = composeStories(stories)

const QuotesCommentThreadMock = () => <div data-testid="quotes-comments-mock" />
jest.mock(
  '@/components/b2b/QuotesCommentThread/QuotesCommentThread',
  () => () => QuotesCommentThreadMock()
)

describe('[components]  QuoteCommentThreadDialog', () => {
  const setup = (params = {}) => {
    const user = userEvent.setup()
    render(<Common {...params} />)

    return { user }
  }

  it('should render QuoteCommentThread component', () => {
    setup()

    expect(screen.getByTestId('quotes-comments-mock')).toBeVisible()
  })
})
