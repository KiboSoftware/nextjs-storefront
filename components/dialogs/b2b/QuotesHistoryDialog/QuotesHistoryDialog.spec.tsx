import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './QuotesHistoryDialog.stories'

const { Common } = composeStories(stories)

const QuotesHistoryThreadMock = () => <div data-testid="quotes-history-mock" />
jest.mock('@/components/b2b/QuotesHistory/QuotesHistory', () => () => QuotesHistoryThreadMock())

const closeModalMock = jest.fn()

describe('[components]  QuotesHistoryDialog', () => {
  const setup = (params = {}) => {
    const user = userEvent.setup()
    render(<Common {...params} />)

    return { user }
  }

  it('should render QuoteCommentThread component', () => {
    const { user } = setup({
      closeModal: closeModalMock,
    })

    expect(screen.getByTestId('quotes-history-mock')).toBeVisible()

    const closeButtons = screen.getAllByRole('button', { name: 'close' })

    closeButtons.forEach(async (closeButton) => {
      expect(closeButton).toBeVisible()

      await user.click(closeButton)

      expect(closeModalMock).toBeCalled()
    })
  })
})
