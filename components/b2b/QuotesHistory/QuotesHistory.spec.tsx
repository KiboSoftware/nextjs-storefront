import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './QuotesHistory.stories'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'

const { Common } = composeStories(stories)

describe('[components] - QuoteHistory', () => {
  userEvent.setup()

  it('should render QuoteHistory component with all provided records', () => {
    renderWithQueryClient(<Common />)

    expect(screen.getAllByTestId(/quote-history-item/).length).toBe(
      Common.args?.auditHistory?.length
    )
  })

  it("should show 'no-quote-history' if no records are present", () => {
    renderWithQueryClient(<Common auditHistory={[]} />)

    expect(screen.queryByTestId(/quote-history-item/)).not.toBeInTheDocument()

    expect(screen.getByText(/no-quote-history/)).toBeVisible()
  })
})
