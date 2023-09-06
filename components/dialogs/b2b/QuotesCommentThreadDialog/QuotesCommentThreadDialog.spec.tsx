import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './QuotesCommentThreadDialog.stories'
import { DialogRoot, ModalContextProvider, useModalContext } from '@/context'

const { Common } = composeStories(stories)
const onAddCommentToQuoteMock = jest.fn()

const TestComponent = () => {
  const { showModal } = useModalContext()

  const showYourModal = () => {
    showModal({
      Component: Common,
      props: { ...Common.args, onAddCommentToQuote: onAddCommentToQuoteMock },
    })
  }

  return (
    <div>
      <DialogRoot />
      <button data-testid="show-modal" onClick={showYourModal}>
        Show Modal
      </button>
    </div>
  )
}

describe('[components]  QuoteCommentThreadDialog', () => {
  const setup = (params = {}) => {
    const user = userEvent.setup()
    render(
      <ModalContextProvider>
        <TestComponent />
      </ModalContextProvider>
    )

    return { user }
  }

  it('should render component', async () => {
    const { user } = setup()
    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    user.click(showModalButton)
    await waitFor(() => {
      expect(screen.getByText(/comment-thread/i)).toBeVisible()
    })
  })

  it('should close dialog when user clicks on closeIcon button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    user.click(showModalButton)

    await waitFor(() => {
      const closeIconButton = screen.getByRole('button', {
        name: /close/i,
      })
      user.click(closeIconButton)
    })

    const dialog = await screen.findByRole('dialog')
    expect(dialog).not.toBeVisible()
  })

  it('should add comment to quote when user clicks on add comment button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    user.click(showModalButton)

    await waitFor(() => {
      user.type(screen.getByPlaceholderText('type-something'), 'New Comment')
    })

    await waitFor(() => {
      user.click(screen.getByRole('button', { name: 'add-comment' }))
    })

    await waitFor(() => {
      expect(onAddCommentToQuoteMock).toHaveBeenCalled()
    })
  })
})
