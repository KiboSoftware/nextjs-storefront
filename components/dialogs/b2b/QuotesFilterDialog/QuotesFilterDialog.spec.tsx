import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './QuotesFilterDialog.stories'

const { Common } = composeStories(stories)

const onApplyMock = jest.fn()
const onClearMock = jest.fn()

describe('[components]  QuotesFilterDialog', () => {
  const setup = (params = {}) => {
    const user = userEvent.setup()
    render(<Common {...params} />)

    return { user }
  }

  it('should render QuoteCommentThread component', () => {
    setup({
      onApply: onApplyMock,
      onClear: onClearMock,
    })

    expect(screen.getByRole('textbox', { name: 'Expiration Date' })).toBeVisible()
    expect(screen.getByRole('textbox', { name: 'Date Created' })).toBeVisible()

    const statusRadioGroup = screen.getByRole('radiogroup', { name: 'quote-status' })

    expect(statusRadioGroup).toBeVisible()
  })
})
