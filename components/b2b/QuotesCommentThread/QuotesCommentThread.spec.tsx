import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './QuotesCommentThread.stories'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'

const { Common } = composeStories(stories)

describe('[components] - QuotesCommentThread', () => {
  const setup = () => {
    const onAddCommentMock = jest.fn()
    const user = userEvent.setup()
    renderWithQueryClient(<Common onAddComment={onAddCommentMock} />)
    return {
      user,
      onAddCommentMock,
    }
  }

  it('should render QuotesCommentThread component with all the comments', () => {
    setup()

    Common.args?.comments?.map((comment) => {
      expect(screen.getByText(comment.text as string)).toBeVisible()
    })
  })

  it('should render Add Comment textbox and button', async () => {
    const { user, onAddCommentMock } = setup()

    const addCommentTextbox = screen.getByPlaceholderText('type-something')
    const addCommentButton = screen.getByRole('button', { name: 'add-comment' })

    expect(addCommentTextbox).toBeVisible()
    expect(addCommentButton).toBeVisible()

    await user.type(addCommentTextbox, 'New Comment')

    user.click(addCommentButton)

    await waitFor(() => {
      expect(onAddCommentMock).toBeCalledWith('New Comment')
    })
  })
})
